import * as vscode from "vscode";
import { TerminalManager, DEFAULT_TERMINAL_NAME } from "./TerminalManager";
import { COMMAND_PREFIX } from "../extension";
import { ConfigurationManager } from "./ConfigurationManager";
import { Helper } from "./Helper";
// import * as Commands from "./Commands";

/**
 * Helper class for sending commands to the terminal
 */
export class CommandManager
{
    constructor(){}


    public static async sendLaunchCommand(terminal : vscode.Terminal, packageConfigEntry : string, launchConfigEntry : string) : Promise<void>
    {
        var path : string = "";

        if(vscode.workspace.workspaceFolders !== undefined)
        {
            path = vscode.workspace.workspaceFolders[0].uri.path;
        }

        const cd_into_ws = "cd " + path;
        const and : string = " ; ";
        const source_ws : string = ". install/setup.bash";
        const build_ws : string = "colcon build --symlink-install";
        const ros2_launch : string = "ros2 launch";
        const packages_select : string = "--packages-select";
        const colcon_test : string = "colcon test --event-handlers console_direct+";

        const defaultPackage = ConfigurationManager.getEntry(packageConfigEntry);
        const defaultLaunch = ConfigurationManager.getEntry(launchConfigEntry);

        const usersPackage = await ConfigurationManager.promptUser("Type Package", defaultPackage);
        const usersLaunch = await ConfigurationManager.promptUser("Type Launch File", defaultLaunch);

        if(Helper.isStringValid(usersPackage) || Helper.isStringValid(usersLaunch))
        {
            return;
        }

        if(Helper.isStringValid(usersPackage))
        {
            ConfigurationManager.updateEntry(packageConfigEntry, usersPackage);
        }

        if(Helper.isStringValid(usersLaunch))
        {
            ConfigurationManager.updateEntry(launchConfigEntry, usersLaunch);
        }
        
        TerminalManager.sendCommandInTerminal(terminal, 
            cd_into_ws + and + source_ws + 
            ros2_launch + " " + usersPackage + " " + usersLaunch,
            "Running ROS Launch Script...",
            "Running ROS Launch Script..."
        );
    }


    public static getCommands() : Array<vscode.Disposable>
    {
        var path : string = "";

        if(vscode.workspace.workspaceFolders !== undefined)
        {
            path = vscode.workspace.workspaceFolders[0].uri.path;
        }

        const cd_into_ws = "cd " + path;
        const and : string = " ; ";
        const source_ws : string = ". install/setup.bash";
        const build_ws : string = "colcon build --symlink-install";
        const packages_select : string = "--packages-select";
        const colcon_test : string = "colcon test --event-handlers console_direct+";

        var commands : Array<vscode.Disposable> = new Array<vscode.Disposable>;

        // Simple Commands
        let build_simple = vscode.commands.registerCommand(COMMAND_PREFIX + '.build_simple', async function () {
            await TerminalManager.sendCommandInActiveTerminal(build_ws);
        });

        let source_simple = vscode.commands.registerCommand(COMMAND_PREFIX + '.source_simple', async function () {
            await TerminalManager.sendCommandInActiveTerminal(source_ws);
        });

        //Base Dedicated
        let build_dedicated = vscode.commands.registerCommand(COMMAND_PREFIX + '.build_dedicated', async function () {
            await TerminalManager.sendCommandInDedicatedTerminal(cd_into_ws + and + build_ws);
        });

        let build_dedicated_ps = vscode.commands.registerCommand(COMMAND_PREFIX + '.build_dedicated_ps', async function () {
            const response = await vscode.window.showInputBox({placeHolder: "Type Package(s)"});
            await TerminalManager.sendCommandInDedicatedTerminal(cd_into_ws + and + build_ws + " " + packages_select + " " + response);
        });

        let source_dedicated = vscode.commands.registerCommand(COMMAND_PREFIX + '.source_dedicated', async function(){
            await TerminalManager.sendCommandInDedicatedTerminal(cd_into_ws + and + source_ws);
        });

        //Base Current
        let build_current = vscode.commands.registerCommand(COMMAND_PREFIX + '.build_current', async function () {
            await TerminalManager.sendCommandInActiveTerminal(cd_into_ws + and + build_ws);
        });

        let build_current_ps = vscode.commands.registerCommand(COMMAND_PREFIX + '.build_current_ps', async function () {
            const response = await vscode.window.showInputBox({placeHolder: "Type Package(s)"});
            await TerminalManager.sendCommandInActiveTerminal(cd_into_ws + and + build_ws + " " + packages_select + " " + response);
        });

        let source_current = vscode.commands.registerCommand(COMMAND_PREFIX + '.source_current', async function(){
            await TerminalManager.sendCommandInActiveTerminal(cd_into_ws + and + source_ws);
        });

        //Helper
        let cd_project_root = vscode.commands.registerCommand(COMMAND_PREFIX + '.cd_project_root', async function(){
            await TerminalManager.sendCommandInActiveTerminal(cd_into_ws);
        });

        //Launch Suite
        let launch_joystick = vscode.commands.registerCommand(COMMAND_PREFIX + '.launch_joystick', async function(){
            const terminal = TerminalManager.getTerminal("joystick");
            await CommandManager.sendLaunchCommand(terminal, 'joystick_pkg', 'joystick_launch');
        });

        let launch_main = vscode.commands.registerCommand(COMMAND_PREFIX + '.launch_main', async function(){
            const terminal = TerminalManager.getTerminal("main");
            await CommandManager.sendLaunchCommand(terminal, 'main_pkg', 'main_launch');
        });

        let launch_alternate = vscode.commands.registerCommand(COMMAND_PREFIX + '.launch_alternate', async function(){
            const terminal = TerminalManager.getTerminal("alternative");
            await CommandManager.sendLaunchCommand(terminal, 'alt_pkg', 'alt_launch');
        });

        //Testing Suite
        let test_dedicated_ps = vscode.commands.registerCommand(COMMAND_PREFIX + '.test_dedicated_ps', async function () {
            const response = await vscode.window.showInputBox({placeHolder: "Type Package(s)"});
            await TerminalManager.sendCommandInDedicatedTerminal(cd_into_ws + and + colcon_test + " " + packages_select + " " + response, "testing");
        });

        let test_dedicated_all = vscode.commands.registerCommand(COMMAND_PREFIX + '.test_dedicated_all', async function () {
            await TerminalManager.sendCommandInActiveTerminal(cd_into_ws + and + colcon_test, "testing");
        });

        let test_current_ps = vscode.commands.registerCommand(COMMAND_PREFIX + '.test_current_ps', async function () {
            const response = await vscode.window.showInputBox({placeHolder: "Type Package(s)"});
            await TerminalManager.sendCommandInActiveTerminal(cd_into_ws + and + colcon_test + " " + packages_select + " " + response);
        });

        let test_current_all = vscode.commands.registerCommand(COMMAND_PREFIX + '.test_current_all', async function () {
            await TerminalManager.sendCommandInActiveTerminal(cd_into_ws + and + colcon_test);
        });

        let show_test_results = vscode.commands.registerCommand(COMMAND_PREFIX + '.test_results_all', async function () {
            await TerminalManager.sendCommandInActiveTerminal(cd_into_ws + and + "colcon test-result --all");
        });
            
        commands.push(
            build_simple,
            source_simple,

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
            launch_alternate,

            //testing
            test_dedicated_all,
            test_dedicated_ps,
            test_current_all,
            test_current_ps,
            show_test_results
        );

        return commands;
    }
    
    
} // class CommandManager