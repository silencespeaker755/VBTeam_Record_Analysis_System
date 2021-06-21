import Event from "../models/Event";
import User from "../models/User";

class CalendarService {
  static async getEvents() {
    return Event.find({});
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

  static async attendEvent({ eventId, userId }) {
    const event = await Event.findById(eventId);
    if (!event) throw "Event not exist!";

    const user = await User.findById(userId);
    event.attendance.push(user);
    await event.save();

    return event;
  }
}

export default CalendarService;
