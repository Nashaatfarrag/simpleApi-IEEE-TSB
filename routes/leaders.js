const express = require("express");
const Joi = require("joi");
const router = express.Router();
const startupDebugger = require("debug")("app:startup");

const leaders = [
  {
    id: 1,
    committee: "Media",
    tasks: []
  },
  {
    id: 2,
    committee: "FR",
    tasks: []
  },
  {
    id: 3,
    committee: "PR",
    tasks: []
  }
];

router.get("/", (req, res) => {
  res.send(leaders);
});

router.get("/:id", (req, res) => {
  const leader = leaders.find(c => c.id === parseInt(req.params.id));
  if (!leader) return res.status(404).send("there is no vounteer with such id");
  res.send(leader);
});

router.post("/", (req, res) => {
  const { error } = validateleader(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const leader = {
    id: leaders.length + 1,
    committee: req.body.committee,
    tasks: req.body.tasks
  };
  leaders.push(leader);
  res.send(leader);
});

router.delete("/:id", (req, res) => {
  const leader = leaders.find(c => c.id === parseInt(req.params.id));
  if (!leader) return res.status(404).send("there is no vounteer with such id");
  //console.log(volunteers);
  const index = leaders.indexOf(leader);
  leaders.splice(index, 1);

  // res.send(volunteer);
  res.send(leaders);
});

router.put("/:id", (req, res) => {
  const leader = leaders.find(c => c.id === parseInt(req.params.id));
  if (!leader) return res.status(404).send("there is no vounteer with such id");
  //console.log(volunteers);
  startupDebugger("put method is used ... ");
  leader.committee = req.body.committee;
  leader.tasks = req.body.tasks;

  res.send(leader);
});

function validateleader(leader) {
  const schema = {
    committee: Joi.allow(),
    tasks: Joi.allow()
  };
  return Joi.validate(leader, schema);
}

module.exports = router;
