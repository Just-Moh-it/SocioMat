import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { publicUserInfoState } from "../../../store/global";

const LeftSidebar = () => {
  const [publicUserInfo, setPublicUserInfo] =
    useRecoilState(publicUserInfoState);

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Get device theme from browser
  useEffect(() => {
    if (document.querySelector("html").style.colorScheme === "dark") {
      // dark mode
      setIsDarkMode(true);
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* Logo */}
      <motion.section layoutId="logo">
        <Link href="/" passHref>
          <a>
            <Image
              alt="image"
              height={25}
              width={129}
              src={
                isDarkMode
                  ? "/assets/images/logo-light.svg"
                  : "/assets/images/logo.svg"
              }
            />
          </a>
        </Link>
      </motion.section>

      {/* Navigation */}
      <div className={[styles.navWrapper, styles.noMargin].join(" ")}>
        <h3 className={["text-large", styles.heading].join(" ")}>Menu</h3>
        <nav className={styles.nav}>
          <NavItem iconRelSrc="filled/Home.svg" href="/">
            Home
          </NavItem>
          <NavItem
            iconRelSrc="filled/Profile.svg"
            href={`/${publicUserInfo.username}` || "/"}
          >
            Profile
          </NavItem>
          <NavItem iconRelSrc="filled/Bookmark.svg" href="/saved">
            Saved Mats
          </NavItem>
          <NavItem iconRelSrc="filled/Chat.svg" href="/help">
            Help
          </NavItem>
          <NavItem iconRelSrc="filled/Setting.svg" href="/settings">
            Settings
          </NavItem>
        </nav>
        {/* Create Link */}
        <Link href="/" passHref>
          <a className={[styles.cta, "btn accent"].join(" ")}>Create a Mat</a>
        </Link>
      </div>

      {/* Banner */}
      <Link href="https://github.com/Just-Moh-it/SocioMat" passHref>
        <a className={styles.banner}>
          <Image alt="image" src="/assets/images/banner.png" layout="fill" />
        </a>
      </Link>
    </div>
  );
};

const NavItem = ({ href, iconRelSrc, children }) => {
  const {
    router: { pathname, query },
  } = { router: useRouter() };
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname.includes("]")
      ? Object.values(query).some(
          (x) => `/${x}`.startsWith(href) || `/${x}`.startsWith(href)
        )
      : pathname.startsWith(href);

  if (query) {
    console.log("Query", query, "Pathname", pathname, "href", href);
  }

  return (
    <Link href={href || "/"} passHref>
      <a className={[styles.navLink, isActive ? styles.active : ""].join(" ")}>
        {isActive && (
          <motion.span
            className={styles.shadow}
            layoutId="shadow"
          ></motion.span>
        )}
        <span className={styles.icon}>
          <Image
            alt="image"
            src={"/assets/icons/" + iconRelSrc}
            height={22}
            width={22}
          />
        </span>
        {children}
      </a>
    </Link>
  );
};

export default LeftSidebar;
