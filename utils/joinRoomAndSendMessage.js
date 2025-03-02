import inquirer from "inquirer";
import { kafkaInit } from "../KafkaInit.js";
import chalk from 'chalk';

const producer = kafkaInit.producer();
const admin = kafkaInit.admin();

const sendMessage = async (room, username) => {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'message',
        message: 'Enter your message:',
      },
    ]);

    const message = answers.message.trim();

    if (!message) {
      console.log(chalk.yellow("Message cannot be empty. Please provide a valid message."));
      return;
    }

    await producer.send({
      topic: room,
      messages: [
        {
          value: JSON.stringify({ username, message }),
        },
      ],
    });

    console.log(chalk.green(`Message sent successfully to ${room}`));

  } catch (error) {
    console.error(chalk.red('Error in sending message:', error));
  }
};

const joinRoomAndSendMessage = async () => {
  try {
    await producer.connect();

    const rooms = await admin.listTopics();
    if (rooms.length === 0) {
      console.log(chalk.yellow("No rooms (topics) available."));
      return;
    }

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'roomName',
        message: 'Select a Room to Join:',
        choices: rooms,
      },
    ]);

    const roomName = answers.roomName;

    const usernameAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'username',
        message: 'Enter your Name:',
      },
    ]);

    const username = usernameAnswer.username.trim();

    if (!username) {
      console.log(chalk.yellow("Username cannot be empty. Please provide a valid name."));
      return;
    }

    while (true) {
      await sendMessage(roomName, username);

      const exitAnswer = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'exit',
          message: 'Do you want to send another message?',
          default: false,
        },
      ]);

      if (!exitAnswer.exit) {
        console.log(chalk.blue("Exiting the room..."));
        break;
      }
    }

    await producer.disconnect();

  } catch (error) {
    console.error(chalk.red('Error in join room and send message:', error));
  }
};

export default joinRoomAndSendMessage;
