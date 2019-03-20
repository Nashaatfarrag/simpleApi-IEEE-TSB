const express = require('express');
const Joi = require('joi');
const router = express.Router();
const startupDebugger = require('debug')('app:startup');

const boardMembers = [{
        id: 20,
        role : "chaiman",
        tasks : []
    },
    {
        id: 21,
        role: "Vicecharman",
        tasks: []
    },
    {
        id: 22,
        role: "secretary",
        tasks: []
    }
]


router.get('/', (req, res) => { res.send(boardMembers);});

router.get('/:id', (req, res) => {
    const boardPerson = boardMembers.find(c => c.id === parseInt(req.params.id));
    if (!boardPerson) return res.status(404).send("there is no vounteer with such id");
    res.send(boardPerson);
});

router.post('/', (req, res) => {
    const { error } = validateBoard(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const boardPerson = {
        id: boardMembers.length + 1,
        role: req.body.role,
        tasks : req.body.tasks 
    }
    boardMembers.push(boardPerson);
    res.send(boardPerson);
});

router.delete('/:id', (req, res) => {
    const boardPerson = boardMembers.find(c => c.id === parseInt(req.params.id));
    if (!boardPerson) return res.status(404).send("there is no vounteer with such id");
    //console.log(volunteers);
    const index = boardMembers.indexOf(boardPerson);
    boardMembers.splice(index, 1);

   // res.send(volunteer);
    res.send(boardMembers);
});

router.put('/:id', (req, res) => {
    const boardPerson = boardMembers.find(c => c.id === parseInt(req.params.id));
    if (!boardPerson) return res.status(404).send("there is no vounteer with such id");
    //console.log(volunteers);
     startupDebugger('put method is used ... ');
    boardPerson.role = req.body.role ;
    boardPerson.tasks = req.body.tasks ;

    res.send(boardPerson);
});

function validateBoard(leader) {
    const schema = {
        role: Joi.allow(),
        tasks: Joi.allow()
    }
    return Joi.validate(leader, schema);
}

module.exports = router ;