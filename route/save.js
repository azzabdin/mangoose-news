var db = require("../models");

module.exports = function (app) {

  app.get("/save", function (req, res) {
    db.save.find({})
      .then(function (dbsave) {
        res.json(dbsave)
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.post("/save", function (req, res) {
    db.save.create(req.body)
      .then(function (dbsave) {
        res.json(dbsave)
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.get("/delete/:id", function (req, res) {
    db.save.remove({
      _id: req.params.id
    },
      function (error, removed) {
        if (error) {
          console.log(error)
          res.send(error)
        } else {
          res.send(removed)
        }
      });
  });
  app.get("/save/:id", function (req, res) {
    db.save.findOne({
      _id: req.params.id
    })
      .populate("note")
      .then(function (dbsave) {
        res.json(dbsave)
      })
      .catch(function (error) {
        res.send(error)
      });
  });

  app.post("/save/:id", function (req, res) {
    db.note.create(req.body)
      .then(function (dbnote) {
        return db.save.findOneAndUpdate({
          _id: req.params.id
        }, { $push: { note: dbnote._id } }, { new: true })
      })
      .then(function (dbsave) {
        res.json(dbsave)
      })
      .catch(function (error) {
        res.json(error)
      });
  });


}
