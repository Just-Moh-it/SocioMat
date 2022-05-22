import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { appwrite, userState } from "../../store/global";
import { motion } from "framer-motion";
import styles from "./index.module.scss";

// components
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Loader from "../Loader";

const Layout = ({
  isProtected = true,
  title,
  children,
  heading,
  noSidebar,
  showProfileCard,
}) => {
  const router = useRouter();
  const [user] = useRecoilState(userState);

  if (user.state === "loading") {
    return <Loader />;
  } else if (user.state === "authenticated" && !user.prefs?.initialized) {
    router.push("/onboarding");
    return <Loader />;
  } else if (user.state === "unauthenticated" && isProtected) {
    router.push("/login");
    return <Loader />;
  }

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
        <div className={styles.left}>
          <LeftSidebar />
        </div>
        <main className={styles.middle}>
          {heading && (
            <header>
              <motion.h1
                initial={{ y: 10, opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
              >
                {heading}
              </motion.h1>
              <hr />
            </header>
          )}
          {children}
        </main>
        {!noSidebar && (
          <div className={styles.right}>
            <RightSidebar showProfileCard={showProfileCard} />
          </div>
        )}
      </section>
    </>
  );
};

export default Layout;
