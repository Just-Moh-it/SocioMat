import Head from "next/head";
import { motion } from "framer-motion";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../store/global";
import { useRouter } from "next/router";
import Loader from "../Loader";

const AuthLayout = ({
  title,
  children,
  heading,
  subheading,
  byLine,
  isProtected = true,
}) => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  if (user.stats === "loading") {
    return <Loader />;
  } else if (user.stats === "unauthenticated" && isProtected) {
    router.push("/login");
    return <Loader />;
  }

  return (
    // Head
    <>
      <Head>
        <title>{String(title)} | 🕊 SocioMat</title>
      </Head>

      <section className={[styles.wrapper, "auth-form"].join(" ")}>
        <section className={[styles.left, styles.main].join(" ")}>
          {/* Header */}
          <section className={styles.header}>
            {/* Logo */}
            <motion.section layoutId="logo" className={styles.logo}>
              <Image
                src="/assets/images/logo.svg"
                width={139}
                height={25}
                alt="SocioMat"
                loading="lazy"
              />
            </motion.section>

            {/* Nav */}
            <section className={styles.nav}>
              <NavItem to="/">Home</NavItem>
              <NavItem to="/">Create a Mat</NavItem>
            </section>
          </section>

          {/* Content */}
          <div className={styles.contentParentWrapper}>
            <div className={styles.contentChildWrapper}>
              {/* Conten-Header */}
              <section className={styles.contentHeader}>
                {/* Subheading */}
                <h4 className={styles.subheading}>{subheading}</h4>
                {/* Heading */}
                <h1 className={styles.heading}>{heading}</h1>
                {/* By-Line */}
                <h3 className={styles.byLine}>{byLine}</h3>
                {/* Content */}
              </section>
              <div className={styles.content}>{children}</div>
            </div>
          </div>
        </section>
        <section className={styles.right}>
          <Image src="/assets/images/utils/cover-auth.svg" layout="fill" />
        </section>
      </section>
    </>
  );
};

const NavItem = ({ children, to }) => {
  return (
    <Link passHref href={to}>
      <a className={styles.link}>{children}</a>
    </Link>
  );
};

export default AuthLayout;
