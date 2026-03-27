const vscode = require('vscode');
const terminal_helper = require('./terminal_helper');
const command_helper = require('./command_helper');

async function sendLaunchCommand(package_config, launch_config, termName, extension='roshelper'){
    var path = vscode.workspace.workspaceFolders[0].uri.path;
    var cd_into_ws = "cd " + path;
	var and = " ; ";
    var source_ws = ". install/setup.bash";
	var ros2_launch = "ros2 launch";

    const config = vscode.workspace.getConfiguration(extension);
    const default_package = config.get(package_config); // Fetch the setting
    const default_launch = config.get(launch_config); // Fetch the setting

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
        config.update(package_config, package, vscode.ConfigurationTarget.Global);
    
    if(launch != null) //redundant null check
        config.update(launch_config, launch, vscode.ConfigurationTarget.Global);

    command_helper.sendCommandInDedicated(cd_into_ws + and + source_ws + and + ros2_launch + " " + package + " " + launch, termName);
}

module.exports = {sendLaunchCommand};