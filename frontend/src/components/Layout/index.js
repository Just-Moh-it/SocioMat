import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { appwrite, userState } from "../../store/global";
import styles from "./index.module.scss";

// components
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

const Layout = ({ isProtected, title, children }) => {
  const setUser = useRecoilState(userState)[1];
  const router = useRouter();

  // useEffect(() => {
  //   if (isProtected) {
  //     appwrite.account.get().then(
  //       (response) => {
  //         setUser(response);
  //         router.replace("/feed");
  //       },
  //       () => {
  //         console.log("no session found");
  //         router.replace("/login");
  //       }
  //     );
  //   }
  // }, [isProtected, setUser, router]);

  return (
    // Head
    <>
      <Head>
        <title>{String(title)} | 🕊 SocioMat</title>
      </Head>

      <section className={styles.wrapper}>
        <LeftSidebar />
        <main className={styles.main}>{children}</main>
        <RightSidebar />
      </section>
    </>
  );
};

export default Layout;
