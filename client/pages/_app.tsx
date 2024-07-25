import { useUser, userUserLoaded } from "@/hooks/user";
import { getLoggedInUser } from "@/lib/api-client";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useUser();
  const [loaded, setLoaded] = userUserLoaded();
  // Get logged in user data from token
  useEffect(() => {
    getLoggedInUser()
      .then((res) => {
        setUser(res);
      }).catch((err) => {
        console.log(err);
      }).finally(() => setLoaded(true));
  }, [])
  
  return (
    <Component {...pageProps} />
  )
}
