import { count } from "console";
import { supabaseClient } from "./supabase-client";

export const createSite = async (site) => {
  try {
    const { data } = await supabaseClient.from("sites").insert(site);

    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUser = async (user) => {
  try {
    await supabaseClient.from("users").insert(user);
  } catch (error) {
    throw new Error(error.message);
  }
};

export async function createFeedback(feedback: any) {
  try {
    const { data } = await supabaseClient.from("feedback").insert(feedback);
    return data[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getUser = async (id) => {
  try {
    const { data } = await await supabaseClient
      .from("users")
      .select()
      .eq("uid", id);
    return { user: data };
  } catch (error) {
    return { error };
  }
};

export async function getAllSites() {
  try {
    const { data } = await supabaseClient.from("sites").select();
    return { sites: data };
  } catch (error) {
    return { error };
  }
}

export async function getAllFeedback(siteId) {
  try {
    const { data } = await supabaseClient
      .from("feedback")
      .select()
      .eq("siteId", siteId);

    data.reverse();

    return { feedback: data };
  } catch (error) {
    return { error };
  }
}

export async function getUserSites(id) {
  try {
    const { data } = await supabaseClient
      .from("sites")
      .select()
      .eq("author", id);
    return { sites: data };
  } catch (error) {
    return { error };
  }
}

export async function getUserFeedback(userId) {
  const { data } = await supabaseClient
    .from("feedback")
    .select()
    .eq("authorId", userId);

  return { feedback: data };
}

export async function deleteFeedback(id) {
  try {
    await supabaseClient.from("feedback").delete().match({ id });
  } catch (error) {
    return { error };
  }
}
