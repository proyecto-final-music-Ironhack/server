const Event = require("../models/Event.model");

module.exports.create = async (req, res, next) => {
  try {
    if (!req.body.name) return res.status(400).json({ message: "Bad request" });
    const event = await Event.create(req.body);
    return res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

module.exports.list = async (req, res, next) => {
  try {
    const EventList = await Event.find().populate("disco").populate("dj");
    return res.status(200).json(EventList);
  } catch (err) {
    next(err);
  }
};

module.exports.detail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventId = await Event.findById(id);
    return res.status(200).json(eventId);
  } catch (err) {
    next(err);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updateEvent);
  } catch (err) {
    next(err);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: "Evento borrado correctamente" });
  } catch (err) {
    next(err);
  }
};
