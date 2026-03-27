import * as vscode from "vscode";


export const and : string = " ; ";
export const source_ws : string = ". install/setup.bash";
export const build_ws : string = "colcon build --symlink-install";
export const packages_select : string = "--packages-select";
export const colcon_test : string = "colcon test --event-handlers console_direct+";