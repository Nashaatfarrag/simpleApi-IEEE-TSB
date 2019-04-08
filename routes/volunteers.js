const express = require('express');
const Joi = require('joi');
const router = express.Router();
const startupDebugger = require('debug')('app:startup');
const time = require('./myGetDateModule');

const volunteers = [{
        id: 1,
        firstName: "Mohamed",
        lastName: "Nashaat",
        age: 23,
        joinDate : "August2015",
        skills : ["honst","modest"],
        position : {
            role: "volunteer", //if leader roleid must be a valid leader id
            roldId : 0
        },
        committee : "Media"
    },
    {
        id: 2,
        firstName: "Mohamed",
        lastName: "Kassim",
        age: 22,
        joinDate: "May2015",
        skills: ["honst", "modest"],
        position: {
           role : "Secretary",
           roldId : 22 
        },
        committee: "None"
    },
    {
        id: 2,
        firstName: "Ibrahim",
        lastName: "Mohamed",
        age: 23,
        joinDate: "October2015",
        skills: ["honst", "modest"],
        position: {
            role: "Media",
            roldId: 0
        },
        committee: "None"
    },
    {
        id: 2,
        firstName: "Khalid",
        lastName: "amer",
        age: 23,
        joinDate: "October2017",
        skills: ["honst", "modest"],
        position: {
            role: "Media",
            roldId: 0
        },
        committee: "None"
    }
]

router.get('/', (req, res) => {
    /*res.render('index', {
        title: "All volunteers",
        massage: "hello world"
    });*/
    //console.log(volunteers);
    //console.log(req.query.sortBy);
    const sortBy = req.query.sortBy ;
    if(sortBy == "asc"){  volunteers.sort((a, b) => { return a.firstName > b.firstName; }); }
    else{   volunteers.sort((a, b) => { return a.firstName <= b.firstName;}); }
    res.send(volunteers);
});

router.get('/:id', (req, res) => {
    const volunteer = volunteers.find(c => c.id === parseInt(req.params.id));
    if (!volunteer) return res.status(404).send("there is no vounteer with such id");
    //console.log(volunteers);
    //res.send(volunteers[parseInt(req.params.id) - 1]);
    res.send(volunteer);
});

router.post('/', (req, res) => {
    const { error } = validateVolunteer(req.body);
    //console.log(volunteers);
    if (error) return res.status(400).send(error.details[0].message);
    if (!req.body.joinDate){
        req.body.joinDate = time;
    }
    const vounteer = {
        id: volunteers.length + 1,
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        age: req.body.age,
        joinDate: req.body.joinDate,
        position: req.body.position,
        skills : req.body.skills,
        committee: req.body.committee
    }
    volunteers.push(vounteer);
    res.send(vounteer);
});

router.delete('/:id', (req, res) => {
    const volunteer = volunteers.find(c => c.id === parseInt(req.params.id));
    if (!volunteer) return res.status(404).send("there is no vounteer with such id");
    //console.log(volunteers);
    const index = volunteers.indexOf(volunteer);
    volunteers.splice(index, 1);

    res.send(volunteer);
    res.send(volunteers);
});

router.put('/:id', (req, res) => {
    const volunteer = volunteers.find(c => c.id === parseInt(req.params.id));
    if (!volunteer) return res.status(404).send("there is no vounteer with such id");
    //console.log(volunteers);
     startupDebugger('put method is used ... ');
    let vounteeredited = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        joinDate: req.body.joinDate,
        position: req.body.position,
        skills: req.body.skills,
        committee: req.body.committee
    }
    volunteer.lastName = vounteeredited.lastName;

    res.send(volunteer);
});

function validateVolunteer(volunteer) {
    const schema = {
        firstName: Joi.string().min(3).max(10).required(),
        lastName: Joi.string().min(3).max(10).required(),
        age: Joi.allow(),
        joinDate: Joi.allow(),
        position: Joi.allow(),
        skills:Joi.allow(),
        committee: Joi.allow()
    }
    return Joi.validate(volunteer, schema);
}

module.exports = router ;