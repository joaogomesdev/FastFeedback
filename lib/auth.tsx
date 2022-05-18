import React from "react";
import Cookies from "js-cookie";

import { supabaseClient } from "./supabase-client";
import { createUser, getUser } from "./supabase-db";

type AuthContextData = {
  user: any;
  token: string;
  signInWithGithub(): Promise<void>;
  signOut: () => Promise<void>;
};

export interface IAuthContext {
  user: any;
  token: string;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
}

const authContext = React.createContext<AuthContextData>({} as IAuthContext);

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return React.useContext(authContext);
};

function useAuthProvider() {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  const handleUser = async (rawUser: any) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const existingUser = await getUser(user.uid);

      if (existingUser.user.length == 0) {
        await createUser(user);
      }
      setUser(user);

      return user;
    } else {
      setUser(false);
      Cookies.remove("fast-feedback-auth");
      return false;
    }
  };

  const signInWithGithub = async () => {
    await supabaseClient.auth.signIn({
      provider: "github",
    });
  };

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    handleUser(false);
  };

  React.useEffect(() => {
    const supabaseSession = supabaseClient.auth.session();

    if (supabaseSession?.user?.id) {
      handleUser(supabaseSession?.user);
      setToken(supabaseSession.access_token);
      Cookies.set("fast-feedback-auth", String(true), {
        expires: 1,
      });
    }
    setLoading(false);
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.id) {
        handleUser(supabaseSession?.user);
        setToken(session.access_token);
        Cookies.set("fast-feedback-auth", String(true), {
          expires: 1,
        });
      }
      setLoading(false);
    });
  }, []);

  return {
    user,
    token,
    signInWithGithub,
    signOut,
  };
}

const formatUser = (user: any) => {
  const userData = user.user_metadata;
  const provider = user.identities[0].provider;

  return {
    uid: user.id,
    email: userData.email,
    name: userData.full_name,
    provider: provider,
    avatar_url: userData.avatar_url,
  };
};
