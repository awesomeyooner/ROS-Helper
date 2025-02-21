const vscode = require('vscode');
const terminal_helper = require('./terminal_helper');

async function sendCommandInDedicated(command, termName = "build", message = "Command!"){
    const term = await terminal_helper.getTerminal(termName);
    
    term.show();
    
    term.sendText(command, true);

    // console.log("running: build");

    vscode.window.showInformationMessage(message);
}

async function sendCommandInActive(command, message = "Command!"){
    const term = await terminal_helper.getActiveTerminal();
    
    term.show();
    
    term.sendText(command, true);

    // console.log("running: build");

    vscode.window.showInformationMessage(message);
}

module.exports = {sendCommandInActive, sendCommandInDedicated};