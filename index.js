#!/usr/bin/env node
'use strict'

import chalk from 'chalk'
import boxen from 'boxen'
import clear from 'clear'
import inquirer from 'inquirer'
import Enquirer from 'enquirer'
//import open from 'open' - issue with it 
import terminalImage from 'terminal-image';
import got from 'got';


// clear the terminal before showing the npx card ==========================================================================

clear()

// =========================================================================================================================

const resume = await got("https://github.com/memit0/npx-profile/blob/main/assets/ronaldinho.jpg?raw=true").buffer();

// =========================================================================================================================

const data = {
    name: chalk.bold.purple('Mehmet Battal'),
    github: chalk.bold.white('https://github.com/memit0'),
    instagram: chalk.white('https://www.instagram.com/zabattl/'),
    email: chalk.white('mebattll@gmail.com'),

    instagramLabel: chalk.hex('#9E9E9E').bold("ig:"),
    emailLabel: chalk.hex('#9E9E9E').bold("eml:"),
    githubLabel: chalk.hex('#9E9E9E').bold('git:'),
}

const card = boxen(
    [
        `${data.name}`,
        ``,
        `${data.instagramLabel} ${data.instagram}`,
        `${data.emailLabel} ${data.email}`,
        `${data.githubLabel} ${data.github}`,
        ``,
        `${chalk('CS @ Boston University')}`,
        `${chalk.italic("I'll put something here later.")}`,    
    ].join("\n"),
    {
        margin: 0,
        padding: { top: 1, bottom: 1, right: 2, left: 2},
        borderStyle: 'double',
        borderColor: 'white',
    }
)

console.log(card);
console.log()

// =========================================================================================================================

const options = {
    type:'list',
    name: 'actions',
    message: 'select',
    choices: [
        {
            name: `| inspo`,
            value: async () => {
                //await open('https://www.youtube.com/watch?v=mLutvM8TMEM');
                console.log("under construction ")
                console.log("Focused up!");
            }
        },
        {
            name: `| image`,
            value: async () => {
                try {
                    /* console.log(await terminalImage.file(resume,{width: 40})); */
                    console.log(await terminalImage.buffer(ronaldinho));
                } catch (err) {
                    console.log(err)
                }
            }

        },
        '- exit'
    ]
}


function main() {
    inquirer.prompt(options).then(async answer => {
        if (answer.actions == "- exit") {
            return;
        } 
        else {
            console.log('-'.repeat(40))
            await answer.actions();
            console.log('-'.repeat(40))

            Enquirer.prompt({
                type: "toggle",
                name: "again",
                message: "exit?",
                default: false
            }).then(answer => {
                if (answer.again == false) {
                    main();
                }
            });
        }
    });
}

main();


