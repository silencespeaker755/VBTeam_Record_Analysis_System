import Record from "../models/Match/Record";
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

    const record = await Record.findById(recordId);
    if (!record) throw "Record not found!";

    const deletedRecord = await record.deleteOne();
    return deletedRecord;
  }

  static async updateRecord({ record, userId }) {
    const user = await User.findById(userId);
    if (!user) throw "User not found!";
    else if (!user.isAdmin) throw "Admin required!";

    const updateRecord = await Record.findById(record._id);
    if (!updateRecord) throw "Record not found!";

    updateRecord.type = record.type;
    updateRecord.team = record.team;
    updateRecord.opponent = record.opponent;
    updateRecord.date = record.date;
    // Todo

    await updateRecord.save();

    return updateRecord;
  }
}

export default RecordService;
