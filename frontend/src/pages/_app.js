import { useEffect } from "react";
import { RecoilRoot, useRecoilState, useRecoilSnapshot } from "recoil";
import { appwrite, userState } from "../store/global";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { Server } from "../utils/constants";

import "../styles/globals.scss";
import "../styles/markdown.scss";
import "react-toastify/dist/ReactToastify.css";

const {
  collections: { users: usersCollectionId },
} = Server;

const App = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <UserStateWrapper>
        <Component {...pageProps} />
        <ToastContainer />
      </UserStateWrapper>
    </RecoilRoot>
  );
};

const UserStateWrapper = ({ children }) => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  const getUserInfo = async () => {
    if (user.$id) {
      const account = await appwrite.database.getDocument(
        usersCollectionId,
        user.$id
      );
      console.log("Account info", account);
    }
  };

  useEffect(() => {
    appwrite.account.get().then(
      (response) => {
        setUser({ status: "authenticated", ...response });
        getUserInfo();
      },
      () => {
        console.log("Not logged in");
        setUser({ status: "unauthenticated" });
        router.push("/login");
      }
    );
  }, []);

  return (
    <>
      <Debugger>{children}</Debugger>
    </>
  );
};

const Debugger = ({ children }) => {
  // Debugging
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug("The following atoms were modified:");
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return children;
};

export default App;
