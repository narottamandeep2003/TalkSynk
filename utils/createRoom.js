import inquirer from "inquirer";
import { kafkaInit } from "../KafkaInit.js";
import chalk from 'chalk';

const admin = kafkaInit.admin();

const CreateRooms = async () => {
  try {
    const { roomName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'roomName',
        message: 'Enter Room Name:',
      },
    ]);

    const topicName = roomName.trim();

    if (!topicName) {
      console.log(chalk.yellow("Room name cannot be empty. Please provide a valid name."));
      return;
    }

    console.log(chalk.blue(`Creating topic: ${topicName}`));

    await admin.connect();

    await admin.createTopics({
      topics: [
        {
          topic: topicName
        },
      ],
    });

    console.log(chalk.green(`Topic "${topicName}" created successfully.`));

  } catch (error) {
    console.error(chalk.red('Error occurred during the topic creation:', error));
  } finally {
    await admin.disconnect();
  }
};

export default CreateRooms;
