import Data from "../models/Match/Data";
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
    let done = 0;
    const result = new Promise((resolve, reject) => {
      records.forEach((record) => {
        if (team && record.team !== team) {
          done += 1;
        } else {
          const all = record.sets.length;
          const win = record.sets.filter(
            (set) => set.teamScore > set.opponentScore
          ).length;
          const lose = all - win;
          analysis.sets.all += all;
          analysis.sets.win += win;
          analysis.sets.lose += lose;

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

  static async getTeamList() {
    const records = await Record.find({});

    return records
      .map((record) => record.team)
      .filter((el, idx, arr) => arr.indexOf(el) === idx);
  }

  static async getPlayersAnalysis() {
    const allData = await Data.find({});

    const analysis = [];
    allData.forEach((data) => {
      if (data.name !== "" && !analysis.find((d) => d.name === data.name)) {
        analysis.push({
          name: data.name,
          passesOrSets: {
            good: parseInt(data.passesOrSets.good, 10) || 0,
            ok: parseInt(data.passesOrSets.ok, 10) || 0,
            bad: parseInt(data.passesOrSets.bad, 10) || 0,
          },
          serveReceptions: {
            good: parseInt(data.serveReceptions.good, 10) || 0,
            ok: parseInt(data.serveReceptions.ok, 10) || 0,
            bad: parseInt(data.serveReceptions.bad, 10) || 0,
          },
          attacks: {
            times: parseInt(data.attacks.times, 10) || 0,
            success: parseInt(data.attacks.success, 10) || 0,
            fail: parseInt(data.attacks.fail, 10) || 0,
          },
          drops: {
            times: parseInt(data.drops.times, 10) || 0,
            success: parseInt(data.drops.success, 10) || 0,
            fail: parseInt(data.drops.fail, 10) || 0,
          },
          serves: {
            times: parseInt(data.serves.times, 10) || 0,
            ace: parseInt(data.serves.ace, 10) || 0,
            fail: parseInt(data.serves.fail, 10) || 0,
          },
          blocks: {
            success: parseInt(data.blocks.success, 10) || 0,
            effective: parseInt(data.blocks.effective, 10) || 0,
            fail: parseInt(data.blocks.fail, 10) || 0,
          },
          faults: { times: parseInt(data.faults.times, 10) || 0 },
        });
      } else if (data.name !== "") {
        const updateData = analysis.find((d) => d.name === data.name);

        updateData.passesOrSets.good +=
          parseInt(data.passesOrSets.good, 10) || 0;
        updateData.passesOrSets.ok += parseInt(data.passesOrSets.ok, 10) || 0;
        updateData.passesOrSets.bad += parseInt(data.passesOrSets.bad, 10) || 0;

        updateData.serveReceptions.good +=
          parseInt(data.serveReceptions.good, 10) || 0;
        updateData.serveReceptions.ok +=
          parseInt(data.serveReceptions.ok, 10) || 0;
        updateData.serveReceptions.bad +=
          parseInt(data.serveReceptions.bad, 10) || 0;

        updateData.attacks.times += parseInt(data.attacks.times, 10) || 0;
        updateData.attacks.success += parseInt(data.attacks.success, 10) || 0;
        updateData.attacks.fail += parseInt(data.attacks.fail, 10) || 0;

        updateData.drops.times += parseInt(data.drops.times, 10) || 0;
        updateData.drops.success += parseInt(data.drops.success, 10) || 0;
        updateData.drops.fail += parseInt(data.drops.fail, 10) || 0;

        updateData.serves.times += parseInt(data.serves.times, 10) || 0;
        updateData.serves.ace += parseInt(data.serves.ace, 10) || 0;
        updateData.serves.fail += parseInt(data.serves.fail, 10) || 0;

        updateData.blocks.success += parseInt(data.blocks.success, 10) || 0;
        updateData.blocks.effective += parseInt(data.blocks.effective, 10) || 0;
        updateData.blocks.fail += parseInt(data.blocks.fail, 10) || 0;

        updateData.faults.times += parseInt(data.faults.times, 10) || 0;
      }
    });

    return analysis;
  }
}

export default AnalysisService;
