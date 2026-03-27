import * as vscode from "vscode";


// The max numebr of terminals a window can have
export const MAX_NUM_TERMINALS : number = 10;

// The default name when creating terminals
export const DEFAULT_TERMINAL_NAME : string = "build";

/**
 * Helper class for managing vscode terminals
 */
export class TerminalManager
{

    constructor(){}

    /**
     * Gets the terminal with the given name. If it doesn't exist, then
     * this method will create a new one.
     * @param name `string` The name of the terminal to get or create
     * @returns `vscode.Terminal` The wanted terminal.
     */
    public static getTerminal(name : string) : vscode.Terminal
    {
        // Flag for whether or not the dedicated terminal is active
        var isDedicatedTerminalActive : boolean = false;

        // The index of the dedicated terminal within the terminals array
        var dedicatedTerminalIndex : number = 0;

        // For every terminal, check if the wanted name exists.
        // If it does, return it
        // If it doesn't, then make it
        for(var i = 0; i < vscode.window.terminals.length; i++)
        {
            // The current terminal in the iteration
            const current : vscode.Terminal = vscode.window.terminals[i];
            
            // If this iteration matches the wanted terminal
            // Then say we found it and save the index
            if(current.name === name)
            {
                // Say we found the terminal
                isDedicatedTerminalActive = true;

                // Save the index
                dedicatedTerminalIndex = i;
            }
        }

        // If the dedicated terminal is active
        // Then return it
        if(isDedicatedTerminalActive)
        {
            return vscode.window.terminals[dedicatedTerminalIndex];
        }
        // If not
        // Then make a new terminal with the wanted name
        else
        {
            return vscode.window.createTerminal(name);
        }

    } // end of "getTerminal(string)"


    /**
     * Gets the active terminal that the user is using. If none exists
     * Then this method will create a new one
     * @returns `vscode.Terminal` The active (or new) terminal
     */
    public static getActiveTerminal() : vscode.Terminal
    {
        // If there's no active terminals
        // Then make a new one
        if(vscode.window.activeTerminal === undefined)
        {
            return this.getTerminal(DEFAULT_TERMINAL_NAME);
        }
        // If there is one
        // Then return it
        else
        {
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
    public static sendCommandInTerminal(
        terminal : vscode.Terminal,
        command : string,
        infoMessage : string = "Command!",
        logMessage : string = "Running command...") : void
    {
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
    public static async sendCommandInDedicatedTerminal(
        command : string, 
        terminalName : string = DEFAULT_TERMINAL_NAME,
        infoMessage : string = "Command!") : Promise<void>
    {
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
    public static async sendCommandInActiveTerminal(
        command : string,
        infoMessage : string = "Command!") : Promise<void>
    {
        // Get the active terminal
        const terminal = await TerminalManager.getActiveTerminal();

        // Send the command
        this.sendCommandInTerminal(terminal, command, infoMessage);
        
    } // end of "sendCommandInActiveTerminal(string, string=)"

    
} // class TerminalManager