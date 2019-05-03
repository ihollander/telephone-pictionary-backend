const mongoose = require("mongoose");

const Game = mongoose.model("games");

module.exports = app => {
  app.get("/api/games/:id", async (req, res) => {
    const { id } = req.params;

    const game = await Game.findById(id);

    res.send(game);
  });

  app.post("/api/games", async (req, res) => {
    const { player } = req.body;

    const game = await new Game({
      players: [player]
    }).save();

    res.send(game);
  });
};
