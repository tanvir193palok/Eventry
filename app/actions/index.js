"use server";

import { revalidatePath } from "next/cache";

const {
  createUser,
  findUserByCredentials,
  updateInterest,
} = require("@/db/queries");
const { redirect } = require("next/navigation");

async function registerUser(formData) {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  redirect("/login");
}

async function performLogin(formData) {
  try {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");
    const found = await findUserByCredentials(credential);

    return found;
  } catch (err) {
    throw err;
  }
}

async function addInterestedEvent(eventId, authId) {
  try {
    await updateInterest(eventId, authId);
    revalidatePath("/"); //cleared chache and new data are loaded in UI from backend
  } catch (err) {
    throw err;
  }
}

export { registerUser, performLogin, addInterestedEvent };
