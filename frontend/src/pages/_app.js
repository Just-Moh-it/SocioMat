import { useEffect } from "react";
import { RecoilRoot, useRecoilState, useRecoilSnapshot } from "recoil";
import {
  appwrite,
  publicUserInfoState,
  userState,
  modalState,
} from "../store/global";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { Server } from "../utils/constants";
import { getUserInfoById } from "../lib/appwrite/users";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import Alert from "../components/Modal";

import "../styles/globals.scss";
import "../styles/markdown.scss";
import "react-toastify/dist/ReactToastify.css";

const {
  collections: { users: usersCollectionId },
} = Server;

const App = ({ Component, pageProps }) => {
  return (
    <AnimatePresence>
      <ThemeProvider attribute="class">
        <RecoilRoot>
          <UserStateWrapper>
            <Component {...pageProps} />
            <ToastContainer />
            <ModalHandler />
          </UserStateWrapper>
        </RecoilRoot>
      </ThemeProvider>
    </AnimatePresence>
  );
};

const UserStateWrapper = ({ children }) => {
  const [user, setUser] = useRecoilState(userState);
  const [publicUserInfo, setPublicUserInfo] =
    useRecoilState(publicUserInfoState);
  const router = useRouter();

  useEffect(() => {
    appwrite.account.get().then(
      async (response) => {
        setUser({ state: "authenticated", ...response });
        if (response?.$id) {
          const pUserInfo = await getUserInfoById(response?.$id);

          if (pUserInfo.username) {
            setPublicUserInfo(pUserInfo);
          }
        }
      },
      () => {
        console.log("Not logged in");
        setUser({ state: "unauthenticated" });
        router.push("/login");
      }
    );
  }, [router, setUser, setPublicUserInfo]);

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

const ModalHandler = () => {
  const [modal, setModal] = useRecoilState(modalState);

  if (modal.isOpen) return <Alert content={modal?.content} />;
};

export default App;
