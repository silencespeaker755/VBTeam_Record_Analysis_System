import session from "express-session";
import passport from "passport";

export default ({ app }) => {
  app.use(
    session({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
