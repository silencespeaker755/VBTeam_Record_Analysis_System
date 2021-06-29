import Data from "../models/Match/Data";
import Record from "../models/Match/Record";
import Set from "../models/Match/Set";
import User from "../models/User";

class RecordService {
  static async getRecords({ userId }) {
    let records;
    if (userId) {
      const user = await User.findById(userId);
      if (!user) throw "User not found!";
      records = await Record.find({ creator: user });
    } else {
      records = await Record.find({});
    }
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
      creator: user,
      createTime: Date.now(),
    });

    await newRecord.save();
    return newRecord;
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

  static async createSet({ recordId, set, userId }) {
    const user = await User.findById(userId);
    if (!user) throw "User not found!";
    else if (!user.isAdmin) throw "Admin required!";

    const updateRecord = await Record.findById(recordId).populate({
      path: "sets",
      populate: { path: "data" },
    });
    if (!updateRecord) throw "Record not found!";

    const newSet = new Set({
      number: set.number,
      teamScore: set.teamScore,
      opponentScore: set.opponentScore,
      data: [],
    });
    await newSet.save();

    updateRecord.sets.push(newSet);
    await updateRecord.save();
    return updateRecord;
  }

  static async deleteSet({ recordId, setId, userId }) {
    const user = await User.findById(userId);
    if (!user) throw "User not found!";
    else if (!user.isAdmin) throw "Admin required!";

    const record = await Record.findById(recordId);
    if (!record) throw "Record not found!";
    const set = await Set.findById(setId).populate("data");
    if (!set) throw "Set not found!";

    // delete Data under this Set
    set.data.forEach(async (d) => {
      await d.deleteOne();
    });

    const deletedSet = await set.deleteOne();

    // delete Set ref in Record
    record.sets = record.sets.filter((s) => s._id !== deletedSet._id);
    await record.save();

    return deletedSet;
  }

  static async createData({ setId, userId }) {
    const user = await User.findById(userId);
    if (!user) throw "User not found!";
    else if (!user.isAdmin) throw "Admin required!";

    const set = await Set.findById(setId);
    if (!set) throw "Set not found!";

    const newData = new Data({
      name: "",
      passesOrSets: {
        good: "",
        ok: "",
        bad: "",
      },
      serveReceptions: {
        good: "",
        ok: "",
        bad: "",
      },
      attacks: {
        times: "",
        success: "",
        fail: "",
      },
      drops: {
        times: "",
        success: "",
        fail: "",
      },
      serves: {
        times: "",
        ace: "",
        fail: "",
      },
      blocks: {
        success: "",
        effective: "",
        fail: "",
      },
      faults: { times: "", types: "" },
      notes: "",
    });
    await newData.save();

    set.data.push(newData);
    await set.save();

    return newData._id;
  }

  static async deleteData({ setId, dataId, userId }) {
    const user = await User.findById(userId);
    if (!user) throw "User not found!";
    else if (!user.isAdmin) throw "Admin required!";

    const set = await Set.findById(setId);
    if (!set) throw "Set not found!";
    set.data = set.data.filter((d) => d._id !== dataId);
    await set.save();

    const data = await Data.findById(dataId);
    if (!data) throw "Data not found!";

    await data.deleteOne();

    return data;
  }

  static async updateData({ data, userId }) {
    const user = await User.findById(userId);
    if (!user) throw "User not found!";
    else if (!user.isAdmin) throw "Admin required!";

    let done = 0;
    const result = new Promise((resolve, reject) => {
      data.forEach(async (d) => {
        const updateData = await Data.findById(d._id);
        if (!updateData) throw "Data not found!";

        updateData.name = d.name;
        updateData.player = d.player;
        updateData.passesOrSets = {
          good: d.passesOrSets.good,
          ok: d.passesOrSets.ok,
          bad: d.passesOrSets.bad,
        };
        updateData.serveReceptions = {
          good: d.serveReceptions.good,
          ok: d.serveReceptions.ok,
          bad: d.serveReceptions.bad,
        };
        updateData.attacks = {
          times: d.attacks.times,
          success: d.attacks.success,
          fail: d.attacks.fail,
        };
        updateData.drops = {
          times: d.drops.times,
          success: d.drops.success,
          fail: d.drops.fail,
        };
        updateData.serves = {
          times: d.serves.times,
          ace: d.serves.ace,
          fail: d.serves.fail,
        };
        updateData.blocks = {
          success: d.blocks.success,
          effective: d.blocks.effective,
          fail: d.blocks.fail,
        };
        updateData.faults = { times: d.faults.times, types: d.faults.types };
        updateData.notes = d.notes;

        await updateData.save();
        done += 1;
        if (done === data.length) resolve();
      });
    });

    result.then(() => {
      return data;
    });
  }
}

export default RecordService;
