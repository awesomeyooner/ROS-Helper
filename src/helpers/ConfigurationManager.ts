import * as vscode from "vscode";
import { TerminalManager, DEFAULT_TERMINAL_NAME } from "./TerminalManager";
import { EXTENSION_NAME } from "../extension";
import { Helper } from "./Helper";

/**
 * Helper class for grabbing user-defined extension configs
 */
export class ConfigurationManager
{
    constructor(){}


    /**
     * Gets the extension configuration
     * @returns `vscode.WorkspaceConfiguration` The extension configuration
     */
    public static getConfiguration() : vscode.WorkspaceConfiguration
    {
        return vscode.workspace.getConfiguration(EXTENSION_NAME);

    } // end of "getConfiguration"


    /**
     * Get the value of an entry
     * @param entryName `string` The entry's name
     * @returns `string` The value at the entry. Could be `undefined` if not set
     */
    public static getEntry(entryName : string) : string | undefined
    {
        return this.getConfiguration().get(entryName);

    } // end of "getEntry(string)"


    /**
     * Updates the value at the given entry
     * @param entryName `string` The entry name
     * @param newValue `string` The new value to update
     * @param target `number` The configuration target, defaults to global
     */
    public static updateEntry(
        entryName : string, 
        newValue : string, 
        target : number = vscode.ConfigurationTarget.Global) : void
    {
        // If the new value is valid
        // Then actually update it
        if(Helper.isStringValid(newValue))
        {
            this.getConfiguration().update(entryName, newValue, target);
        }

    } // end of "updateEntry(string, string, number)"


    /**
     * Prompt the user for an input
     * @param placeHolder `string` The text to display when nothings typed in
     * @param defaultValue `string` The default value
     * @returns `Promise<string | undefined` The user's input
     */
    public static async promptUser(placeHolder : string, defaultValue : string = "") : Promise<string | undefined>
    {
        var options;

        if(defaultValue === "")
        {
            options = {placeHolder: placeHolder};
        }
        else
        {
            options = 
            {
                placeHolder: placeHolder,
                value: defaultValue
            };
        }

        return await vscode.window.showInputBox(options);

    } // end of "promptUser(string, string=)"
    
    
} // class ConfigurationManager