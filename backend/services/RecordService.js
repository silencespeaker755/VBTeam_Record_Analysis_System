import Data from "../models/Match/Data";
import Record from "../models/Match/Record";
import Set from "../models/Match/Set";
import User from "../models/User";

class RecordService {
  static async getRecords() {
    const records = await Record.find({});
    records.map((record) => {
      return {
        type: record.type,
        team: record.team,
        opponent: record.opponent,
        date: record.date,
      };
    });

    return records.sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  static async getRecord({ recordId }) {
    const record = await Record.findById(recordId).populate({
      path: "sets",
      populate: { path: "data" },
    });

    if (!record) throw "Record not found!";
    return record;
  }

  static async createRecord({ record, userId }) {
    const user = await User.findById(userId);
    if (!user) throw "User not found!";
    else if (!user.isAdmin) throw "Admin required!";

    if (
      await Record.findOne({
        type: record.type,
        team: record.team,
        opponent: record.opponent,
        date: record.date,
      })
    ) {
      throw "Record already exists!";
    }

    const newRecord = new Record({
      type: record.type,
      team: record.team,
      opponent: record.opponent,
      date: record.date,
      sets: [],
    });

    await newRecord.save();
    return newRecord._id;
  }

  static async deleteRecord({ recordId, userId }) {
    const user = await User.findById(userId);
    if (!user) throw "User not found!";
    else if (!user.isAdmin) throw "Admin required!";

    const record = await Record.findById(recordId).populate({
      path: "sets",
      populate: { path: "data" },
    });
    if (!record) throw "Record not found!";

    record.sets.forEach(async (set) => {
      // delete Data under this Set
      set.data.forEach(async (d) => {
        await d.deleteOne();
      });
      await set.deleteOne();
    });

    const deletedRecord = await record.deleteOne();

    return deletedRecord;
  }

  static async deleteSet({ recordId, setId, userId }) {
    const user = await User.findById(userId);
    if (!user) throw "User not found!";
    else if (!user.isAdmin) throw "Admin required!";

    let record = await Record.findById(recordId);
    if (!record) throw "Record not found!";
    const set = await Set.findById(setId).populate("data");
    if (!set) throw "Set not found!";

    // delete Data under this Set
    set.data.forEach(async (d) => {
      await d.deleteOne();
    });

    const deletedSet = await set.deleteOne();

    // delete Set ref in Record
    record = record.sets.filter((s) => s._id !== deletedSet._id);
    await record.save();

    return deletedSet;
  }

  static async updateRecord({ record, userId }) {
    const user = await User.findById(userId);
    if (!user) throw "User not found!";
    else if (!user.isAdmin) throw "Admin required!";

    const updateRecord = await Record.findById(record._id).populate({
      path: "sets",
      populate: { path: "data" },
    });
    if (!updateRecord) throw "Record not found!";

    updateRecord.type = record.type;
    updateRecord.team = record.team;
    updateRecord.opponent = record.opponent;
    updateRecord.date = record.date;

    record.sets.forEach(async (set) => {
      if (!set._id || !(await Set.findById(set._id))) {
        // create new Set
        const newSet = new Set({
          number: set.number,
          teamScore: set.teamScore,
          opponentScore: set.opponentScore,
          data: [],
        });
        await newSet.save();

        updateRecord.sets.push(newSet);
        await updateRecord.save();
      } else {
        // update old Set
        const updateSet = await Set.findById(set._id);

        updateSet.number = set.number;
        updateSet.teamScore = set.teamScore;
        updateSet.opponentScore = set.opponentScore;

        updateSet.data = await set.data.map(async (d) => {
          if (!d._id || !(await Data.findById(d._id))) {
            // create new Data
            console.log("create!!!", d);
            const newData = new Data({
              name: d.name,
              // player: d.player,
              passesOrSets: {},
              //   good: d.passesOrSets.good,
              //   ok: d.passesOrSets.ok,
              //   bad: d.passesOrSets.bad,
              // },
              serveReceptions: {},
              //   good: d.passesOrSets.good,
              //   OK: d.passesOrSets.ok,
              //   bad: d.passesOrSets.bad,
              // },
              attacks: {},
              //   times: d.attacks.times,
              //   success: d.attacks.success,
              //   failure: d.attacks.failure,
              // },
              drops: {},
              //   times: d.drops.times,
              //   success: d.drops.success,
              //   failure: d.drops.failure,
              // },
              serves: {},
              //   times: d.serves.times,
              //   ace: d.serves.ace,
              //   failure: d.serves.failure,
              // },
              blocks: {
                // success: d.blocks.success,
                // effective: d.blocks.effective,
                // failure: d.blocks.failure,
              },
              faults: {}, // { times: d.faults.times, types: d.faults.types },
              notes: d.notes,
            });
            await newData.save();
            return newData;
          }
          return d;
        });

        await updateSet.save();
      }
    });

    return updateRecord;
  }
}

export default RecordService;
