// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const terminal_helper = require('./util/terminal_helper');
const command_helper = require('./util/command_helper');
const ros_command_helper = require('./util/ros_command_helper');


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
	var packages_select = "--packages-select";
	
	let build_dedicated = vscode.commands.registerCommand('ros.build_dedicated', async function () {
		await command_helper.sendCommandInDedicated(cd_into_ws + and + build_ws);
	});

	let build_dedicated_ps = vscode.commands.registerCommand('ros.build_dedicated_ps', async function () {
		const response = await vscode.window.showInputBox({placeHolder: "Type Package(s)"});
		await command_helper.sendCommandInDedicated(cd_into_ws + and + build_ws + " " + packages_select + " " + response);
	});

	let source_dedicated = vscode.commands.registerCommand('ros.source_dedicated', async function(){
		await command_helper.sendCommandInDedicated(cd_into_ws + and + source_ws);
	});

	let build_current = vscode.commands.registerCommand('ros.build_current', async function () {
		await command_helper.sendCommandInActive(cd_into_ws + and + build_ws);
	});

	let build_current_ps = vscode.commands.registerCommand('ros.build_current_ps', async function () {
		const response = await vscode.window.showInputBox({placeHolder: "Type Package(s)"});
		await command_helper.sendCommandInActive(cd_into_ws + and + build_ws + " " + packages_select + " " + response);
	});

	let source_current = vscode.commands.registerCommand('ros.source_current', async function(){
		await command_helper.sendCommandInActive(cd_into_ws + and + source_ws);
	});

	let cd_project_root = vscode.commands.registerCommand('ros.cd_project_root', async function(){
		await command_helper.sendCommandInActive(cd_into_ws);
	});

	let launch_joystick = vscode.commands.registerCommand('ros.launch_joystick', async function(){
		await ros_command_helper.sendLaunchCommand('joystick_pkg', 'joystick_launch', "joystick");
	});

	let launch_main = vscode.commands.registerCommand('ros.launch_main', async function(){
		await ros_command_helper.sendLaunchCommand('main_pkg', 'main_launch', "main");
	});

	let launch_alternate = vscode.commands.registerCommand('ros.launch_alternate', async function(){
		await ros_command_helper.sendLaunchCommand('alt_pkg', 'alt_launch', "alternative");
	});

	context.subscriptions.push(

		//dedicated terminal
		build_dedicated, 
		build_dedicated_ps,
		source_dedicated, 

		//active terminal
		build_current, 
		build_current_ps,
		source_current, 

		///helpers
		cd_project_root, 
		launch_joystick,
		launch_main,
		launch_alternate
	);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
