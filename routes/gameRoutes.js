const mongoose = require("mongoose");

const Game = mongoose.model("games");

module.exports = app => {
  app.get("/api/games", async (req, res) => {
    const game = await Game.find({}); // find all

    res.json(game);
  });

  app.get("/api/games/:id", async (req, res) => {
    const { id } = req.params;

    const game = await Game.findById(id);

    res.json(game);
  });

  app.post("/api/games", async (req, res) => {
    const game = await new Game().save();

    res.json(game);
  });

  app.patch("/api/games/:id", async (req, res) => {
    const { player } = req.body;
    const { id } = req.params;

    const game = await Game.findByIdAndUpdate(
      id,
      { $push: { players: player } },
      { new: true }
    );

    res.json(game);
  });
};
