import { Router } from "express";
import queryString from "query-string";
import axios from "axios";
import passport from "passport";
import strategy from "passport-facebook";
import config from "../../../../config";
import FacebookService from "../../../../services/FacebookService";

const router = Router();

const FacebookStrategy = strategy.Strategy;

const stringifiedParams = queryString.stringify({
  client_id: config.FacebookAppId,
  redirect_uri: "http://localhost:5000/api/admin/facebook/auth/callback",
  scope: ["email", "publish_to_groups", "groups_access_member_info"].join(","),
  response_type: "code",
  auth_type: "request",
  display: "popup",
});

// const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;

const getAccessTokenFromCode = async (code) => {
  const { data } = await axios({
    url: "https://graph.facebook.com/v4.0/oauth/access_token",
    method: "get",
    params: {
      client_id: process.env.APP_ID_GOES_HERE,
      client_secret: process.env.APP_SECRET_GOES_HERE,
      redirect_uri: "https://www.example.com/authenticate/facebook/",
      code,
    },
  });
  console.log(data); // { access_token, token_type, expires_in }
  return data.access_token;
};

passport.use(
  new FacebookStrategy(
    {
      clientID: config.FacebookAppId,
      clientSecret: config.FacebookAppSecret,
      callbackURL: "http://localhost:5000/api/admin/facebook/auth/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("accessToken:", accessToken);
      console.log("refreshToken", refreshToken);
      console.log("profile:", profile);
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

router.get("/", (req, res) => {
  res.send(`<a href="/api/admin/facebook/auth">Login with Facebook</a>`);
});

router.get("/success", function (req, res, next) {
  console.log(req.user);
  res.send("success!");
  // res.render("success", { data: req.user });
});

router.get(
  "/auth",
  passport.authenticate("facebook", {
    scope: [
      "email",
      "publish_to_groups",
      "groups_access_member_info",
      "pages_read_engagement",
      "pages_manage_posts",
    ],
  })
);

router.get(
  "/auth/callback",
  passport.authenticate("facebook", {
    successRedirect: "/api/admin/facebook/success",
    failureRedirect: "/api/admin/facebook",
  })
);

// router.get("/auth", (req, res) => {
//   console.log(req.body);
//   passport.authenticate("facebook");

//   // FacebookService.auth({ req, res }).then(() => {});
// });

// router.get("/auth/callback", (req, res) => {
//   console.log(req.body);
//   FacebookService.lauthCallback({ req, res }).then(() => {});
// });

export default router;
