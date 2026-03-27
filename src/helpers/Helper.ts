
/**
 * Helper class with broad helper functions
 */
export class Helper
{
    constructor(){}


    /**
     * Gets if a string is valid or not
     * @param value `string` The string to check
     * @returns `boolean` True if not null, undefined, nor length 0
     */
    public static isStringValid(value : string | undefined) : value is string
    {
        return value !== null && value !== undefined && value.length > 0;

    } // end of "isStringValid(string)"
    
    
} // class CommandManager