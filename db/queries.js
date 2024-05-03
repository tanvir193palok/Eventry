import { eventModel } from "@/models/event-models";
import { userModel } from "@/models/user-models";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

async function getAllEvents() {
  const allEvents = await eventModel.find().lean(); //lean() method removes extra metedata info from objects
  return replaceMongoIdInArray(allEvents);
}

async function getEventById(eventId) {
  const event = await eventModel.findById(eventId).lean();

  return replaceMongoIdInObject(event);
}

async function createUser(user) {
  return await userModel.create(user);
}

async function findUserByCredentials(credentials) {
  const user = await userModel.findOne(credentials).lean();
  return user;
}

export { getAllEvents, getEventById, createUser, findUserByCredentials };
