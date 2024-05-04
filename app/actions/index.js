"use server";

import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const {
  createUser,
  findUserByCredentials,
  updateInterest,
  updateGoing,
  getEventById,
} = require("@/db/queries");
const { redirect } = require("next/navigation");
import EmailTemplate from "@/components/payments/EmailTemplate";

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

async function addGoingEvent(eventId, user) {
  try {
    await updateGoing(eventId, user?.id);
    await sendEmail(eventId, user);
  } catch (err) {
    throw err;
  }

  revalidatePath("/");
  redirect("/");
}

async function sendEmail(eventId, user) {
  try {
    console.log(eventId, user, process.env.RESEND_API_KEY);
    const event = await getEventById(eventId);
    const resend = new Resend(process.env.RESEND_API_KEY);
    const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;
    const sent = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "tanvirahamedx2z@gmail.com",
      subject: "Successfully Registered for the event!",
      react: EmailTemplate({ message }),
    });
  } catch (error) {
    throw error;
  }
}

export {
  registerUser,
  performLogin,
  addInterestedEvent,
  addGoingEvent,
  sendEmail,
};
