const mongoose = require("mongoose");
const shortid = require("shortid");
const { Schema } = mongoose;
const playerSchema = require("./Player");

const gameSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  players: [playerSchema]
});

mongoose.model("games", gameSchema);
