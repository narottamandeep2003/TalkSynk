import inquirer from "inquirer";
import { kafkaInit } from "../KafkaInit.js";
import chalk from 'chalk';

const admin = kafkaInit.admin();

const ListUser = async () => {
  try {
    await admin.connect();
    const consumerGroups = await admin.listGroups();
    let groupFound = false;

    consumerGroups.groups.filter(group => !group.groupId.startsWith("__")).forEach(group => {
      console.log(chalk.cyan("Group ID: ") + chalk.green(`${group.groupId}`));
      groupFound = true;
    });

    if (!groupFound) {
      console.log(chalk.yellow('No consumer groups found.'));
    }
  } catch (error) {
    console.error(chalk.red('Error occurred while listing consumer groups:', error));
  } finally {
    await admin.disconnect();
  }
};

export default ListUser;
