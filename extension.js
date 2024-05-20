// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
//testing the update

function activate(context) {
	var path = vscode.workspace.workspaceFolders[0].uri.path;

	var cd_into_ws = "cd " + path;
	var and = " ; ";
	var source_ws = ". install/setup.bash";
	var build_ws = "colcon build --symlink-install";
	
	let build = vscode.commands.registerCommand('ros.build', async function () {

		const term = await getTerminal("build");

		term.show();
		
		term.sendText(cd_into_ws + and + build_ws, true);

		console.log("running: build");

		vscode.window.showInformationMessage('Building!');
	});
	//============================================================================

	let source = vscode.commands.registerCommand('ros.source', async function(){

		const term = await getTerminal("build");

		term.show();
		
		term.sendText(cd_into_ws + and + source_ws, true);

		console.log("running: build");

		vscode.window.showInformationMessage('Building!');
	});
	//==============================================================================

	let run = vscode.commands.registerCommand('ros.run', async function(){

		const response = await vscode.window.showInputBox({
			placeHolder: "Type Package"
		});

		const term = await getTerminal("build");

		term.show();

		term.sendText(cd_into_ws + and + "ros2 launch " + response + " launch.yaml");
		

		vscode.window.showInformationMessage('Launched!');
	});

	context.subscriptions.push(build, source, run);
}

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


// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
