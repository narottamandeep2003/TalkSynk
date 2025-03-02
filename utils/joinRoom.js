import inquirer from "inquirer";
import { kafkaInit } from "../KafkaInit.js";
import chalk from 'chalk';

const admin = kafkaInit.admin();

const consumeMessages = async (consumer, topic) => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: topic });
    
    console.log(chalk.green(`Subscribed to topic: ${topic}`));

    await consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat, commitOffsets }) => {
        try {
          const parsedMessage = JSON.parse(message.value.toString());
          const username = parsedMessage.username;
          const userMessage = parsedMessage.message;
          
          console.log(chalk.cyan(`User: ${username}`) + chalk.blue(` - Message: ${userMessage}`));

          await consumer.commitOffsets([
            {
              topic,
              partition,
              offset: (parseInt(message.offset) + 1).toString(),
            },
          ]);
        } catch (error) {
          console.error(chalk.red('Error processing message:', error));
        }
      },
    });
  } catch (error) {
    console.error(chalk.red('Error in consuming messages:', error));
  }
};

const JoinRooms = async () => {
  try {
    await admin.connect();
    const rooms = await admin.listTopics();

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

    const consumer = kafkaInit.consumer({ groupId: username });
    consumeMessages(consumer, roomName);

  } catch (error) {
    console.error(chalk.red('Error in joining the room:', error));
  } finally {
    await admin.disconnect();
  }
};

export default JoinRooms;
