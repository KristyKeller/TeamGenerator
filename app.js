const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Use inquirer to gather information about the development team members, and to create objects for each team member using classes

const employees = [];

managerPrompt()
function managerPrompt() {

    // Inquirer Prompt #1
    console.log("Please build your team")
    inquirer.prompt([

        // Questions about the manager 

        {
            type: "input",
            message: " \n \n What is your manager's name? \n \n ",
            name: "name",
            default: "Manager's Name"
        },
        {
            type: "input",
            message: " \n \n What is your manager's id? \n \n ",
            name: "id",
            default: "Manager's ID Number"
        },
        {
            type: "input",
            message: " \n \n What is your manager's email? \n \n ",
            name: "email",
            default: "manager@email.com"
        },
        {
            type: "input",
            message: " \n \n What is your manager's office number? \n \n ",
            name: "officeNumber",
            default: "Manager's Office Number"
        }

    ])

        .then(function (managerAnswers) {
            const manager = new Manager(managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.officeNumber);
            employees.push(manager);

            teamPrompt()
            // Inquirer Prompt #2
            function teamPrompt() {
                inquirer.prompt([
                    // Select your team member 
                    {
                        type: "list",
                        message: " \n \n Which type of team member would you like to add? \n \n ",
                        name: "employee",
                        choices: [
                            "Engineer",
                            "Intern",
                            "No more team members"
                        ]
                    }])

                    .then(function (typeAnswers) {
                        if (typeAnswers.employee === "Engineer") {


                            // Inquirer Prompt #3
                            engineerPrompt()
                            // Questions about the engineer 
                            function engineerPrompt() {
                                inquirer.prompt([
                                    {
                                        type: "input",
                                        message: " \n \n What is your engineer's name? \n \n ",
                                        name: "name",
                                        default: "Engineer's Name"
                                    },
                                    {
                                        type: "input",
                                        message: " \n \n What is your engineer's id? \n \n ",
                                        name: "id",
                                        default: "Manager's ID Number"
                                    },
                                    {
                                        type: "input",
                                        message: " \n \n What is your engineer's email? \n \n ",
                                        name: "email",
                                        default: "engineer@email.com"
                                    },
                                    {
                                        type: "input",
                                        message: " \n \n What is your engineer's Github? \n \n ",
                                        name: "github",
                                        default: "Engineer's GitHub username"
                                    }])

                                    .then(function (engineerAnswers) {
                                        const engineer = new Engineer(engineerAnswers.name, engineerAnswers.id, engineerAnswers.email, engineerAnswers.github);
                                        employees.push(engineer);
                                    })
                            }
                        } else if (typeAnswers.employee === "Intern") {

                            internPrompt()
                            // Inquirer Prompt #4
                            function internPrompt() {
                                inquirer.prompt([


                                    // Questions about the intern
                                    {
                                        type: "input",
                                        message: " \n \n What is your intern's name? \n \n ",
                                        name: "name",
                                        default: "Intern's Name"
                                    },
                                    {
                                        type: "input",
                                        message: " \n \n What is your intern's id? \n \n ",
                                        name: "id",
                                        default: "Intern's ID Number"
                                    },
                                    {
                                        type: "input",
                                        message: " \n \n What is your intern's email? \n \n ",
                                        name: "email",
                                        default: "intern@email.com"
                                    },
                                    {
                                        type: "input",
                                        message: " \n \n What is your intern's Github? \n \n ",
                                        name: "school",
                                        default: "Intern's School"
                                    }])

                                    .then(function (internAnswers) {
                                        const intern = new Intern(internAnswers.name, internAnswers.id, internAnswers.email, internAnswers.officeSchool);
                                    })
                            }
                        } else {
                            //Exit the inquirer
                            const html = render(employees);

                            fs.writeFile(outputPath, html, function (err) {
                                if (err) {
                                    return console.log(err);
                                };

                            });

                            console.log("Team successfully created!");


                        }
                    })
            }
        })

}


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

