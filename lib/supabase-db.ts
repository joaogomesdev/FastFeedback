import { supabaseClient } from "./supabase-client";

export const createSite = async (site) => {
  try {
    await supabaseClient.from("sites").insert(site);
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

export const getUser = async (id) => {
  try {
    const { data } = await supabaseClient.from("users").select().eq("uid", id);
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
