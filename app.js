import inquirer from 'inquirer';
import chalk from 'chalk';
import ListRooms from './utils/roomsList.js';
import CreateRoom from './utils/createRoom.js';
import JoinRoom from './utils/joinRoom.js';
import ListUsers from './utils/UsersList.js';
import sendMessage from './utils/joinRoomAndSendMessage.js';

// Function to display the main menu and handle user actions
const displayMainMenu = async () => {
    try {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Please choose an action:',
                choices: [
                    'Create Room',
                    'Join Room',
                    'Send Message',
                    'List Rooms',
                    'List Users',
                    'Exit',
                ],
            },
        ]);

        // Map user action to respective functions
        const actions = {
            'Create Room': createRoom,
            'Join Room': joinRoom,
            'Send Message': sendMessageAction,
            'List Rooms': listRooms,
            'List Users': listUsers,
            'Exit': exitApplication,
        };

        // Execute the corresponding action
        if (actions[action]) {
            await actions[action]();
        } else {
            console.log(chalk.red('Invalid selection, please try again.'));
        }

        // Show the main menu again after the action is performed
        displayMainMenu();

    } catch (error) {
        console.error(chalk.red("An error occurred:"), error);
        process.exit(1); // Exit with an error code
    }
};

// Action functions
const createRoom = async () => {
    console.log(chalk.blue("Creating a new room..."));
    await CreateRoom(); // Create room logic
};


const joinRoom = async () => {
    console.log(chalk.blue("Joining a room..."));
    await JoinRoom(); // Join room logic
};

const sendMessageAction = async () => {
    console.log(chalk.blue("Sending a message..."));
    await sendMessage(); // Send message logic
};

const listRooms = async () => {
    console.log(chalk.blue("Listing all rooms..."));
    await ListRooms(); // List rooms logic
};

const listUsers = async () => {
    console.log(chalk.blue("Listing all users..."));
    await ListUsers(); // List users logic
};

const exitApplication = () => {
    console.log(chalk.yellow("Goodbye!"));
    process.exit(0); // Exit the application
};

// Application entry point
console.clear();
console.log(chalk.bold.cyan("Welcome to TalkSynk"));
displayMainMenu();
