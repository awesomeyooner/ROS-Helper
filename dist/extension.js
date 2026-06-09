/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.COMMAND_PREFIX = exports.EXTENSION_NAME = void 0;
exports.activate = activate;
exports.deactivate = deactivate;
const CommandManager_1 = __webpack_require__(1);
// The name of this extension, used for configurations
exports.EXTENSION_NAME = "roshelper";
// The prefix for each command. ie "ros.<command>"
exports.COMMAND_PREFIX = "ros";
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Initializing ' + exports.EXTENSION_NAME);
    context.subscriptions.concat(CommandManager_1.CommandManager.getCommands());
}
// This method is called when your extension is deactivated
function deactivate() { }


/***/ }),
/* 1 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommandManager = void 0;
const vscode = __importStar(__webpack_require__(2));
const TerminalManager_1 = __webpack_require__(3);
const extension_1 = __webpack_require__(0);
const ConfigurationManager_1 = __webpack_require__(4);
const Helper_1 = __webpack_require__(5);
// import * as Commands from "./Commands";
/**
 * Helper class for sending commands to the terminal
 */
class CommandManager {
    constructor() { }
    static async sendLaunchCommand(terminal, packageConfigEntry, launchConfigEntry) {
        var path = "";
        if (vscode.workspace.workspaceFolders !== undefined) {
            path = vscode.workspace.workspaceFolders[0].uri.path;
        }
        const cd_into_ws = "cd " + path;
        const and = " ; ";
        const source_ws = ". install/setup.bash";
        const build_ws = "colcon build --symlink-install";
        const ros2_launch = "ros2 launch";
        const packages_select = "--packages-select";
        const colcon_test = "colcon test --event-handlers console_direct+";
        const defaultPackage = ConfigurationManager_1.ConfigurationManager.getEntry(packageConfigEntry);
        const defaultLaunch = ConfigurationManager_1.ConfigurationManager.getEntry(launchConfigEntry);
        const usersPackage = await ConfigurationManager_1.ConfigurationManager.promptUser("Type Package", defaultPackage);
        const usersLaunch = await ConfigurationManager_1.ConfigurationManager.promptUser("Type Launch File", defaultLaunch);
        if (Helper_1.Helper.isStringValid(usersPackage) || Helper_1.Helper.isStringValid(usersLaunch)) {
            return;
        }
        if (Helper_1.Helper.isStringValid(usersPackage)) {
            ConfigurationManager_1.ConfigurationManager.updateEntry(packageConfigEntry, usersPackage);
        }
        if (Helper_1.Helper.isStringValid(usersLaunch)) {
            ConfigurationManager_1.ConfigurationManager.updateEntry(launchConfigEntry, usersLaunch);
        }
        TerminalManager_1.TerminalManager.sendCommandInTerminal(terminal, cd_into_ws + and + source_ws +
            ros2_launch + " " + usersPackage + " " + usersLaunch, "Running ROS Launch Script...", "Running ROS Launch Script...");
    }
    static getCommands() {
        var path = "";
        if (vscode.workspace.workspaceFolders !== undefined) {
            path = vscode.workspace.workspaceFolders[0].uri.path;
        }
        const cd_into_ws = "cd " + path;
        const and = " ; ";
        const source_ws = ". install/setup.bash";
        const build_ws = "colcon build --symlink-install";
        const packages_select = "--packages-select";
        const colcon_test = "colcon test --event-handlers console_direct+";
        var commands = new Array;
        // Simple Commands
        let build_simple = vscode.commands.registerCommand(extension_1.COMMAND_PREFIX + '.build_simple', async function () {
            await TerminalManager_1.TerminalManager.sendCommandInActiveTerminal(build_ws);
        });
        let source_simple = vscode.commands.registerCommand(extension_1.COMMAND_PREFIX + '.source_simple', async function () {
            await TerminalManager_1.TerminalManager.sendCommandInActiveTerminal(source_ws);
        });
        //Base Dedicated
        let build_dedicated = vscode.commands.registerCommand(extension_1.COMMAND_PREFIX + '.build_dedicated', async function () {
            await TerminalManager_1.TerminalManager.sendCommandInDedicatedTerminal(cd_into_ws + and + build_ws);
        });
        let build_dedicated_ps = vscode.commands.registerCommand(extension_1.COMMAND_PREFIX + '.build_dedicated_ps', async function () {
            const response = await vscode.window.showInputBox({ placeHolder: "Type Package(s)" });
            await TerminalManager_1.TerminalManager.sendCommandInDedicatedTerminal(cd_into_ws + and + build_ws + " " + packages_select + " " + response);
        });
        let source_dedicated = vscode.commands.registerCommand(extension_1.COMMAND_PREFIX + '.source_dedicated', async function () {
            await TerminalManager_1.TerminalManager.sendCommandInDedicatedTerminal(cd_into_ws + and + source_ws);
        });
        //Base Current
        let build_current = vscode.commands.registerCommand(extension_1.COMMAND_PREFIX + '.build_current', async function () {
            await TerminalManager_1.TerminalManager.sendCommandInActiveTerminal(cd_into_ws + and + build_ws);
        });
        let build_current_ps = vscode.commands.registerCommand(extension_1.COMMAND_PREFIX + '.build_current_ps', async function () {
            const response = await vscode.window.showInputBox({ placeHolder: "Type Package(s)" });
            await TerminalManager_1.TerminalManager.sendCommandInActiveTerminal(cd_into_ws + and + build_ws + " " + packages_select + " " + response);
        });
        let source_current = vscode.commands.registerCommand(extension_1.COMMAND_PREFIX + '.source_current', async function () {
            await TerminalManager_1.TerminalManager.sendCommandInActiveTerminal(cd_into_ws + and + source_ws);
        });
        //Helper
        let cd_project_root = vscode.commands.registerCommand(extension_1.COMMAND_PREFIX + '.cd_project_root', async function () {
            await TerminalManager_1.TerminalManager.sendCommandInActiveTerminal(cd_into_ws);
        });
        //Launch Suite
        let launch_joystick = vscode.commands.registerCommand(extension_1.COMMAND_PREFIX + '.launch_joystick', async function () {
            const terminal = TerminalManager_1.TerminalManager.getTerminal("joystick");
            await CommandManager.sendLaunchCommand(terminal, 'joystick_pkg', 'joystick_launch');
        });
        let launch_main = vscode.commands.registerCommand(extension_1.COMMAND_PREFIX + '.launch_main', async function () {
            const terminal = TerminalManager_1.TerminalManager.getTerminal("main");
            await CommandManager.sendLaunchCommand(terminal, 'main_pkg', 'main_launch');
        });
        let launch_alternate = vscode.commands.registerCommand(extension_1.COMMAND_PREFIX + '.launch_alternate', async function () {
            const terminal = TerminalManager_1.TerminalManager.getTerminal("alternative");
            await CommandManager.sendLaunchCommand(terminal, 'alt_pkg', 'alt_launch');
        });
        //Testing Suite
        let test_dedicated_ps = vscode.commands.registerCommand(extension_1.COMMAND_PREFIX + '.test_dedicated_ps', async function () {
            const response = await vscode.window.showInputBox({ placeHolder: "Type Package(s)" });
            await TerminalManager_1.TerminalManager.sendCommandInDedicatedTerminal(cd_into_ws + and + colcon_test + " " + packages_select + " " + response, "testing");
        });
        let test_dedicated_all = vscode.commands.registerCommand(extension_1.COMMAND_PREFIX + '.test_dedicated_all', async function () {
            await TerminalManager_1.TerminalManager.sendCommandInActiveTerminal(cd_into_ws + and + colcon_test, "testing");
        });
        let test_current_ps = vscode.commands.registerCommand(extension_1.COMMAND_PREFIX + '.test_current_ps', async function () {
            const response = await vscode.window.showInputBox({ placeHolder: "Type Package(s)" });
            await TerminalManager_1.TerminalManager.sendCommandInActiveTerminal(cd_into_ws + and + colcon_test + " " + packages_select + " " + response);
        });
        let test_current_all = vscode.commands.registerCommand(extension_1.COMMAND_PREFIX + '.test_current_all', async function () {
            await TerminalManager_1.TerminalManager.sendCommandInActiveTerminal(cd_into_ws + and + colcon_test);
        });
        let show_test_results = vscode.commands.registerCommand(extension_1.COMMAND_PREFIX + '.test_results_all', async function () {
            await TerminalManager_1.TerminalManager.sendCommandInActiveTerminal(cd_into_ws + and + "colcon test-result --all");
        });
        commands.push(build_simple, source_simple, 
        //dedicated terminal
        build_dedicated, build_dedicated_ps, source_dedicated, 
        //active terminal
        build_current, build_current_ps, source_current, 
        ///helpers
        cd_project_root, launch_joystick, launch_main, launch_alternate, 
        //testing
        test_dedicated_all, test_dedicated_ps, test_current_all, test_current_ps, show_test_results);
        return commands;
    }
} // class CommandManager
exports.CommandManager = CommandManager;


/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TerminalManager = exports.DEFAULT_TERMINAL_NAME = exports.MAX_NUM_TERMINALS = void 0;
const vscode = __importStar(__webpack_require__(2));
// The max numebr of terminals a window can have
exports.MAX_NUM_TERMINALS = 10;
// The default name when creating terminals
exports.DEFAULT_TERMINAL_NAME = "build";
/**
 * Helper class for managing vscode terminals
 */
class TerminalManager {
    constructor() { }
    /**
     * Gets the terminal with the given name. If it doesn't exist, then
     * this method will create a new one.
     * @param name `string` The name of the terminal to get or create
     * @returns `vscode.Terminal` The wanted terminal.
     */
    static getTerminal(name) {
        // Flag for whether or not the dedicated terminal is active
        var isDedicatedTerminalActive = false;
        // The index of the dedicated terminal within the terminals array
        var dedicatedTerminalIndex = 0;
        // For every terminal, check if the wanted name exists.
        // If it does, return it
        // If it doesn't, then make it
        for (var i = 0; i < vscode.window.terminals.length; i++) {
            // The current terminal in the iteration
            const current = vscode.window.terminals[i];
            // If this iteration matches the wanted terminal
            // Then say we found it and save the index
            if (current.name === name) {
                // Say we found the terminal
                isDedicatedTerminalActive = true;
                // Save the index
                dedicatedTerminalIndex = i;
            }
        }
        // If the dedicated terminal is active
        // Then return it
        if (isDedicatedTerminalActive) {
            return vscode.window.terminals[dedicatedTerminalIndex];
        }
        // If not
        // Then make a new terminal with the wanted name
        else {
            return vscode.window.createTerminal(name);
        }
    } // end of "getTerminal(string)"
    /**
     * Gets the active terminal that the user is using. If none exists
     * Then this method will create a new one
     * @returns `vscode.Terminal` The active (or new) terminal
     */
    static getActiveTerminal() {
        // If there's no active terminals
        // Then make a new one
        if (vscode.window.activeTerminal === undefined) {
            return this.getTerminal(exports.DEFAULT_TERMINAL_NAME);
        }
        // If there is one
        // Then return it
        else {
            return vscode.window.activeTerminal;
        }
    } // end of "getActiveTerminal"
    /**
     * Send a command to the given terminal
     * @param terminal `vscode.Terminal` The terminal to use
     * @param command `string` The command to send
     * @param infoMessage `string = "Command!"` Optional, the info message to popup
     * @param logMessage `string = "Running command..."` Optional, the message to log to console
     */
    static sendCommandInTerminal(terminal, command, infoMessage = "Command!", logMessage = "Running command...") {
        // Make this terminal the active one
        terminal.show();
        // Send the command to the terminal
        terminal.sendText(command);
        // Show the info message
        vscode.window.showInformationMessage(infoMessage);
        // Send the log message to the console
        console.log(logMessage);
    } // end of "sendCommandInTerminal(vscode.Terminal, string, string=, string=")
    /**
     * Send the specified command to the given terminal
     * @param command `string` The command to send
     * @param terminalName `string` The name of the terminal to use
     * @param infoMessage `string` The information message to popup
     */
    static async sendCommandInDedicatedTerminal(command, terminalName = exports.DEFAULT_TERMINAL_NAME, infoMessage = "Command!") {
        // Get the dedicated terminal (or make it if it doesn't exist)
        const terminal = await TerminalManager.getTerminal(terminalName);
        // Send the command to the terminal
        this.sendCommandInTerminal(terminal, command, infoMessage);
    } // end of "sendCommandInDedicatedTerminal(string, string=, string=)"
    /**
     * Send the specified command to the active terminal
     * @param command `string` The command to send
     * @param infoMessage `string` The information message to popup
     */
    static async sendCommandInActiveTerminal(command, infoMessage = "Command!") {
        // Get the active terminal
        const terminal = await TerminalManager.getActiveTerminal();
        // Send the command
        this.sendCommandInTerminal(terminal, command, infoMessage);
    } // end of "sendCommandInActiveTerminal(string, string=)"
} // class TerminalManager
exports.TerminalManager = TerminalManager;


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationManager = void 0;
const vscode = __importStar(__webpack_require__(2));
const extension_1 = __webpack_require__(0);
const Helper_1 = __webpack_require__(5);
/**
 * Helper class for grabbing user-defined extension configs
 */
class ConfigurationManager {
    constructor() { }
    /**
     * Gets the extension configuration
     * @returns `vscode.WorkspaceConfiguration` The extension configuration
     */
    static getConfiguration() {
        return vscode.workspace.getConfiguration(extension_1.EXTENSION_NAME);
    } // end of "getConfiguration"
    /**
     * Get the value of an entry
     * @param entryName `string` The entry's name
     * @returns `string` The value at the entry. Could be `undefined` if not set
     */
    static getEntry(entryName) {
        return this.getConfiguration().get(entryName);
    } // end of "getEntry(string)"
    /**
     * Updates the value at the given entry
     * @param entryName `string` The entry name
     * @param newValue `string` The new value to update
     * @param target `number` The configuration target, defaults to global
     */
    static updateEntry(entryName, newValue, target = vscode.ConfigurationTarget.Global) {
        // If the new value is valid
        // Then actually update it
        if (Helper_1.Helper.isStringValid(newValue)) {
            this.getConfiguration().update(entryName, newValue, target);
        }
    } // end of "updateEntry(string, string, number)"
    /**
     * Prompt the user for an input
     * @param placeHolder `string` The text to display when nothings typed in
     * @param defaultValue `string` The default value
     * @returns `Promise<string | undefined` The user's input
     */
    static async promptUser(placeHolder, defaultValue = "") {
        var options;
        if (defaultValue === "") {
            options = { placeHolder: placeHolder };
        }
        else {
            options =
                {
                    placeHolder: placeHolder,
                    value: defaultValue
                };
        }
        return await vscode.window.showInputBox(options);
    } // end of "promptUser(string, string=)"
} // class ConfigurationManager
exports.ConfigurationManager = ConfigurationManager;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Helper = void 0;
/**
 * Helper class with broad helper functions
 */
class Helper {
    constructor() { }
    /**
     * Gets if a string is valid or not
     * @param value `string` The string to check
     * @returns `boolean` True if not null, undefined, nor length 0
     */
    static isStringValid(value) {
        return value !== null && value !== undefined && value.length > 0;
    } // end of "isStringValid(string)"
} // class CommandManager
exports.Helper = Helper;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map