import { kafkaInit } from "../KafkaInit.js";
import chalk from 'chalk';

const admin = kafkaInit.admin();

const ListRooms = async () => {
  try {
    await admin.connect();
    const rooms = await admin.listTopics();

    if (rooms.length === 0) {
      console.log(chalk.yellow('No rooms (topics) found.'));
    } else {
      console.log(chalk.blue('Listing available rooms (topics):'));
      rooms.filter(room => !room.startsWith("__")).forEach((room, index) => {
        console.log(chalk.cyan(`${index + 1}. `) + chalk.green(`${room}`));
      });
    }
  } catch (error) {
    console.error(chalk.red('Error occurred while listing rooms:'), error);
  } finally {
    await admin.disconnect();
  }
};

export default ListRooms;
