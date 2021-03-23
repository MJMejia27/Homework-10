const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const teamArray = [];


const managerQuestions = [

    {
        type: 'input',
        name: 'managerName',
        message: 'What is the name of the manager'
    },

    {
        type: 'input',
        name: 'managerID',
        message: 'What is the id address for the manager'
    },

    {
        type: 'input',
        name: 'managerEmail',
        message: 'What is the email address for the manager'
    },


]

const engineerQuestions = [

    {
        type: 'input',
        name: 'engineerName',
        message: 'Enter engineer'
    },

    {
        type: 'input',
        name: 'engineerID',
        message: 'd'
    },

    {
        type: 'input',
        name: 'engineerEmail',
        message: 'Enter email address for engineer'
    },

    {
        type: 'input',
        name: 'github',
        message: 'Enter GitHub username for engineer'
]

const internQuestions = [

    {
        type: 'input',
        name: 'internName',
        message: 'Intern name'
    },

    {
        type: 'input',
        name: 'internID',
        message: 'Intern ID',
    },

    {
        type: 'input',
        name: 'internEmail',
        message: 'Intern email address'
    },

    {
        type: 'input',
        name: 'school',
        message: 'Enter school attended',
    },
]

const anotherOne = [
    {
        type: 'list',
        name: 'nextEmployee',
        message: 'Add Team Member',
        choices: ['Engineer', 'Intern', 'Done']
    }
]


function init() {
    managerPromt();
}


function next() {
    inquirer.prompt(anotherOne).then((response) => {

        console.log(response);
        switch (response.nextEmployee) {
            case 'Engineer':
                engineerPromt();
                break;
            case 'Intern':
                internPromt();
                break;
            case 'Done':
                console.log('Team!')
                makeTeam();
        }
    })
}

function managerPromt() {
    inquirer.prompt(managerQuestions).then((response) => {

        let name = response.managerName;
        let id = response.managerID;
        let email = response.managerEmail;
        const manager = new Manager(name, id, email, office);

        teamArray.push(manager);

        next();
    })
}
function engineerPromt() {
    inquirer.prompt(engineerQuestions).then((response) => {

        let name = response.engineerName;
        let id = response.engineerID;
        let email = response.engineerEmail;
        let github = response.github;
        const engineer = new Engineer(name, id, email, github);

        teamArray.push(engineer);
        console.log(teamArray);
        next();
    })
}

function internPromt() {
    inquirer.prompt(internQuestions).then((response) => {

        let name = response.internName;
        let id = response.internID;
        let email = response.internEmail;
        let school = response.school;

        const intern = new Intern(name, id, email, school);

        teamArray.push(intern);
        console.log(teamArray);

        next();
    })
}

function makeTeam() {
    fs.writeFile(outputPath, render(teamArray), function (err) {
        if (err) {
            return console.log(err)
        }
    })

}

init();
