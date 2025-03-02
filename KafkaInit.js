import { Kafka } from "kafkajs";

export const kafkaInit = new Kafka({
    clientId: 'talksynk',
    brokers: ['localhost:9092'], 
});
