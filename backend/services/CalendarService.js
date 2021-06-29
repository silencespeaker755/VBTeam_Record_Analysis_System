import Event from "../models/Event";
import User from "../models/User";

class CalendarService {
  static async getEvents() {
    return Event.find({}).populate("attendance");
  }

  static async createEvent({ event, userId }) {
    const user = await User.findById(userId);
    if (!user.isAdmin) throw "Admin required!";

    const newEvent = new Event({
      start: event.start,
      end: event.end,
      title: event.title,
      place: event.place,
      attendance: [],
      notes: event.notes,
      creator: user,
      createTime: Date.now(),
    });
    await newEvent.save();

    return newEvent;
  }

  static async deleteEvent({ eventId, userId }) {
    const user = await User.findById(userId);
    if (!user.isAdmin) throw "Admin required!";

    const deletedEvent = Event.findOneAndDelete({ _id: eventId });
    if (!deletedEvent) throw "Event not found!";

    return deletedEvent;
  }

  static async updateEvent({ event, userId }) {
    const user = await User.findById(userId);
    if (!user.isAdmin) throw "Admin required!";

    const updateEvent = await Event.findById(event._id);
    if (!updateEvent) throw "Event not found!";

    updateEvent.start = event.start;
    updateEvent.end = event.end;
    updateEvent.title = event.title;
    updateEvent.place = event.place;
    updateEvent.attendance = event.attendance;
    updateEvent.notes = event.notes;

    await updateEvent.save();

    return updateEvent;
  }

  static async checkAttendance({ eventId, userId }) {
    const event = await Event.findById(eventId);
    if (!event) throw "Event not exists!";

    const user = await User.findById(userId);
    if (!user) throw "User not exists!";

    return !!event.attendance.find((uid) => uid === userId);
  }

  static async attendEvent({ eventId, userId, attend }) {
    const event = await Event.findById(eventId);
    if (!event) throw "Event not exists!";

    const user = await User.findById(userId);
    if (!user) throw "User not exists!";

    if (attend && event.attendance.indexOf(user._id) === -1)
      event.attendance.push(user);
    else if (!attend && event.attendance.indexOf(user._id) !== -1)
      event.attendance.splice(event.attendance.indexOf(user._id));

    await event.save();

    return event;
  }
}

export default CalendarService;
