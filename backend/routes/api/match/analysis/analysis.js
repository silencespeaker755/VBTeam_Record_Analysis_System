import { Router } from "express";
import AnalysisService from "../../../../services/AnalysisService";

const router = Router();

router.get("/", (req, res) => {
  console.log("/api/match/analysis", req.query);

  const { team } = req.query;
  AnalysisService.getAnalysis({ team })
    .then((analysis) => {
      console.log("analysis:", analysis);
      res.status(200).json(analysis);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

router.get("/teamList", (req, res) => {
  console.log("/api/match/analysis/teamList");

  AnalysisService.getTeamList()
    .then((teamList) => {
      console.log("All teams' name:", teamList);
      res.status(200).json(teamList);
    })
    .catch((err) => {
      console.log(err);
      res.staus(404).send(err);
    });
});

router.get("/players", (req, res) => {
  console.log("/api/match/analysis/players");
  AnalysisService.getPlayersAnalysis()
    .then((analysis) => {
      console.log("All players' analysis:", analysis);
      res.status(200).json(analysis);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

export default router;
