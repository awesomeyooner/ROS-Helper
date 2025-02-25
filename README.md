# ROS Helper

## Intro
Hello! This is an extension made to save typing commands like sourcing, building, and launching! :D

> **NOTE**  
 When using this extension, please make sure to open the workspace folder you are planning to work in as your main folder. Example: `/ros2_ws` 

## Commands

> **NOTE**
    These are just the commands I've implemented so far, if you'd like to see some added please [reach out!](#contact)

> **PREFACE** Pretty much all commands `cd` into your workspace directory (the one that you opened). So if I opened `/ros2_ws`, every command will cd into `/ros2/ws`. Also, **Dedicated Terminal** refers to a terminal with the name `build`. If it doesn't exist yet, it will create that terminal, and if it does exist then the extension will use that terminal. **Current Terminal** will run the commands in the active terminal.

- **Go to Project Root**
    this just `cd`'s into the folder you opened

- **Build Workspace in Dedicated Terminal** 
    this runs `colcon build --symlink-install` in its own terminal

- **Build Specified Packages in Dedicated Terminal** 
    this will prompt you for packages and then runs `colcon build --symlink-install --packages-select` in its own terminal with what you typed. If you want to do multiple packages, enter `my_package_1 my_package_2`

- **Source Workspace in Dedicated Terminal** 
    this runs `. install/setup.bash` in its own terminal

- **Build Workspace in Current Terminal** 
    this runs `colcon build --symlink-install` in the current terminal

- **Build Specified Packages in Dedicated Terminal** 
    this will prompt you for packages and then runs `colcon build --symlink-install --packages-select` in the current terminal with what you typed. If you want to do multiple packages, enter `my_package_1 my_package_2`

- **Source Workspace in Current Terminal** 
    this runs `. install/setup.bash` in the current terminal

- **Launch Main, Launch Alternate, Launch Joystick** 
    All three of these are pretty much the same just with different names. It run `ros2 launch` and ask you for the package and executable to use all in their own terminals. It will also which packages you specify in the settings so that you can quickly launch packages without having to type out the whole command. 

- **Test Specified Packages in Dedicated Terminal** 
    Runs `colcon test --packages select` with the prompted packages in it's own terminal

- **Test All in Dedicated Terminal** 
    Runs `colcon test` in it's own terminal

- **Test Specified Packages in Current Terminal** 
    Runs `colcon test --packages select` with the prompted packages in the active terminal

- **Test All in Current Terminal** 
    Runs `colcon test` in the active terminal

- **Show All Test Results** 
    Runs `colcon test-results --all`

## Contact

- **Issues** [Write an issue!](https://github.com/awesomeyooner/ROS-Helper/issues) 

- **Email** `awesomeyooner@gmail.com`
