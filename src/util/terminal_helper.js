const vscode = require('vscode');

function getTerminal(name){
    var build_active = false;
    var build_index;

    for(var i = 0; i < vscode.window.terminals.length; i++){
        const current = vscode.window.terminals[i];
        
        if(current.name == name){
            build_active = true;
            build_index = i;
        }
    }

    if(build_active)
        return vscode.window.terminals[build_index];
    else
        return vscode.window.createTerminal(name);
}

function createNewTerminal(prefix){

    for(var i = 0; i < 500; i++){
        const current = vscode.window.terminals[i];

        var name = prefix + " " + String(i);
        
        if(current.name != name){
            return vscode.window.createTerminal(name);
        }
    }

    return getTerminal(prefix);
}

function getActiveTerminal(){
    if(vscode.window.activeTerminal == null)
        return getTerminal("build");
    else
        return vscode.window.activeTerminal;
}

module.exports = {getTerminal, createNewTerminal, getActiveTerminal};