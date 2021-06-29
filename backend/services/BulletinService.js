const { spawn } = require("child_process");

class BulletinService {
  static async getFbPosts({ req, res }) {
    const pythonProcess = spawn("python3", ["../Python/fb_post_scraper.py"]);
    pythonProcess.stdout.on("data", (data) => {
      console.log("data: ", data);
      res.write(data);
    });
    pythonProcess.stderr.on("err", (err) => {
      console.log(err);
    });
  }
}

export default BulletinService;
