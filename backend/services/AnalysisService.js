import Record from "../models/Match/Record";

class AnalysisService {
  static async getAnalysis({ team }) {
    let records;
    if (team) records = await Record.find({ team }).populate("sets");
    else records = await Record.find({}).populate("sets");

    const analysis = {
      matches: {
        all: 0,
        win: 0,
        lose: 0,
      },
      sets: {
        all: 0,
        win: 0,
        lose: 0,
      },
    };
    console.log("~~", analysis);
    let done = 0;
    const result = new Promise((resolve, reject) => {
      records.forEach((record) => {
        if (team && record.team !== team) {
          done += 1;
        } else {
          console.log(record.sets);
          const all = record.sets.length;
          const win = record.sets.filter(
            (set) => set.teamScore > set.opponentScore
          ).length;
          const lose = all - win;
          analysis.sets.all += all;
          analysis.sets.win += win;
          analysis.sets.lose += lose;
          console.log(all, win, lose, analysis);

          analysis.matches.all += 1;
          if (win > lose) analysis.matches.win += 1;
          else if (lose > win) analysis.matches.lose += 1;

          done += 1;
        }
        if (done === records.length) resolve();
      });
    });
    return analysis;
  }
}

export default AnalysisService;
