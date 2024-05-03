"use server";

const { createUser, findUserByCredentials } = require("@/db/queries");
const { redirect } = require("next/navigation");

async function registerUser(formData) {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  redirect("/login");
}

async function performLogin(formData) {
  const credential = {};
  credential.email = formData.get("email");
  credential.password = formData.get("password");
  const found = await findUserByCredentials(credential);

  if (found) {
    redirect("/");
  } else {
    throw new Error(`User with email ${formData.get("email")} not found`);
  }
}

export { registerUser, performLogin };
