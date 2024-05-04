import { eventModel } from "@/models/event-models";
import { userModel } from "@/models/user-models";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";
import mongoose from "mongoose";

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

  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
}

async function updateInterest(eventId, authId) {
  const event = await eventModel.findById(eventId);

  if (event) {
    const foundUsers = event.interested_ids.find(
      (id) => id.toString() === authId
    );

    if (foundUsers) {
      event.interested_ids.pull(new mongoose.Types.ObjectId(authId)); //converting string to Objectid and pulling
    } else {
      event.interested_ids.push(new mongoose.Types.ObjectId(authId));
    }

    event.save();
  }
}

export {
  getAllEvents,
  getEventById,
  createUser,
  findUserByCredentials,
  updateInterest,
};
