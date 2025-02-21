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
	var packages_select = "--packages-select";
	
	let build_dedicated = vscode.commands.registerCommand('ros.build_dedicated', async function () {

		const term = await getTerminal("build");

		term.show();
		
		term.sendText(cd_into_ws + and + build_ws, true);

		console.log("running: build");

		vscode.window.showInformationMessage('Building!');
	});
	//============================================================================

	let build_dedicated_ps = vscode.commands.registerCommand('ros.build_dedicated_ps', async function () {

		const response = await vscode.window.showInputBox({
			placeHolder: "Type Package(s)"
		});

		const term = await getTerminal("build");

		term.show();
		
		term.sendText(cd_into_ws + and + build_ws + " " + packages_select + " " + response, true);

		console.log("running: build");

		vscode.window.showInformationMessage('Building!');
	});
	//============================================================================

	let source_dedicated = vscode.commands.registerCommand('ros.source_dedicated', async function(){

		const term = await getTerminal("build");

		term.show();
		
		term.sendText(cd_into_ws + and + source_ws, true);

		console.log("running: build");

		vscode.window.showInformationMessage('Sourcing!');
	});

	//==============================================================================

	let build_current = vscode.commands.registerCommand('ros.build_current', async function () {

		const term = await getActiveTerminal();

		term.show();
		
		term.sendText(cd_into_ws + and + build_ws, true);

		console.log("running: build");

		vscode.window.showInformationMessage('Building!');
	});
	//============================================================================

	let build_current_ps = vscode.commands.registerCommand('ros.build_current_ps', async function () {

		const response = await vscode.window.showInputBox({
			placeHolder: "Type Package(s)"
		});

		const term = await getActiveTerminal();

		term.show();
		
		term.sendText(cd_into_ws + and + build_ws + " " + packages_select + " " + response, true);

		console.log("running: build");

		vscode.window.showInformationMessage('Building!');
	});
	//============================================================================

	let source_current = vscode.commands.registerCommand('ros.source_current', async function(){

		const term = await getActiveTerminal();

		term.show();
		
		term.sendText(cd_into_ws + and + source_ws, true);

		console.log("running: source current");

		vscode.window.showInformationMessage('Sourcing!');
	});
	//==============================================================================

	let cd_project_root = vscode.commands.registerCommand('ros.cd_project_root', async function(){

		const term = await getActiveTerminal();

		term.show();
		
		term.sendText(cd_into_ws, true);

		console.log("running: cd root");

		vscode.window.showInformationMessage('Home!');
	});
	//============================================================

	let launch_joystick = vscode.commands.registerCommand('ros.launch_joystick', async function(){

		const config = vscode.workspace.getConfiguration('roshelper');
  		const default_package = config.get('joystick_pkg'); // Fetch the setting
		const default_launch = config.get('joystick_launch'); // Fetch the setting
		
		const package = await vscode.window.showInputBox({
			placeHolder: "Type Package",
			value: default_package
		});

		const launch = await vscode.window.showInputBox({
			placeHolder: "Type Launch File",
			value: default_launch
		});

		if(package == null || package.length == 0 || launch == null || launch.length == 0)
			return;

		if(package != null) //redudant null check
			config.update('joystick_pkg', package, vscode.ConfigurationTarget.Global);

		if(launch != null) //redundant null check
			config.update('joystick_launch', launch, vscode.ConfigurationTarget.Global);

		const term = await getTerminal("joystick");

		term.show();

		term.sendText(cd_into_ws + and + source_ws + and + "ros2 launch " + package + " " + launch);

		vscode.window.showInformationMessage('Launched!');
	});

	let launch_main = vscode.commands.registerCommand('ros.launch_main', async function(){

		const config = vscode.workspace.getConfiguration('roshelper');
  		const default_package = config.get('main_pkg'); // Fetch the setting
		const default_launch = config.get('main_launch'); // Fetch the setting
		
		const package = await vscode.window.showInputBox({
			placeHolder: "Type Package",
			value: default_package
		});

		const launch = await vscode.window.showInputBox({
			placeHolder: "Type Launch File",
			value: default_launch
		});

		if(package == null || package.length == 0 || launch == null || launch.length == 0)
			return;

		if(package != null) //redudant null check
			config.update('main_pkg', package, vscode.ConfigurationTarget.Global);

		if(launch != null) //redundant null check
			config.update('main_launch', launch, vscode.ConfigurationTarget.Global);

		const term = await getTerminal("main");

		term.show();

		term.sendText(cd_into_ws + and + source_ws + and +"ros2 launch " + package + " " + launch);

		vscode.window.showInformationMessage('Launched!');
	});

	let launch_alternate = vscode.commands.registerCommand('ros.launch_alternate', async function(){

		const config = vscode.workspace.getConfiguration('roshelper');
  		const default_package = config.get('alt_pkg'); // Fetch the setting
		const default_launch = config.get('alt_launch'); // Fetch the setting
		
		const package = await vscode.window.showInputBox({
			placeHolder: "Type Package",
			value: default_package
		});

		const launch = await vscode.window.showInputBox({
			placeHolder: "Type Launch File",
			value: default_launch
		});

		if(package == null || package.length == 0 || launch == null || launch.length == 0)
			return;

		if(package != null) //redudant null check
			config.update('alt_pkg', package, vscode.ConfigurationTarget.Global);

		if(launch != null) //redundant null check
			config.update('alt_launch', launch, vscode.ConfigurationTarget.Global);

		const term = await getTerminal("alternate");

		term.show();

		term.sendText(cd_into_ws + and + source_ws + and + "ros2 launch " + package + " " + launch);

		vscode.window.showInformationMessage('Launched!');
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


// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
