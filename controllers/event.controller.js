const Event = require("../models/Event.model");
const Disco = require("../models/Disco.model");

module.exports.create = (req, res, next) => {
  const { _id } = req.payload;
  const date = new Date(req.body.date + "Z");
  Event.create({ ...req.body, disco: _id, date })
    .then((event) => {
      return Disco.findByIdAndUpdate(_id, { $push: { events: event._id } }, { new: true });
    })
    .then((response) => res.json({ message: "event successfully created" }))
    .catch((err) => next(err));
};

module.exports.list = async (req, res, next) => {
  try {
    let eventList;
    if (req.query.djId) {
      eventList = await Event.find({ dj: req.query.djId }).populate("disco").populate("dj");
    } else {
      eventList = await Event.find().populate("disco").populate("dj");
    }
    return res.status(200).json(eventList);
  } catch (err) {
    next(err);
  }
};

module.exports.detail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventId = await Event.findById(id).populate("disco").populate("dj").populate("playlist");
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
