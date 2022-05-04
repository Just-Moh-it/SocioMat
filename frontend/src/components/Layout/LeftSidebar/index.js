import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";

const LeftSidebar = () => {
  return (
    <div className={styles.wrapper}>
      {/* Logo */}
      <Link href="/" passHref>
        <a>
          <Image height={25} width={129} src="/assets/images/logo.svg" />
        </a>
      </Link>

      {/* Navigation */}
      <div className={[styles.navWrapper, styles.noMargin].join(" ")}>
        <h3 className={["text-large", styles.heading].join(" ")}>Menu</h3>
        <nav className={styles.nav}>
          <NavItem iconRelSrc="filled/Home.svg" href="/home" isActive>
            Home
          </NavItem>
          <NavItem iconRelSrc="filled/Chat.svg" href="/chat">
            Messages
          </NavItem>
          <NavItem iconRelSrc="filled/Profile.svg" href="/profile">
            Profile
          </NavItem>
          <NavItem iconRelSrc="filled/Bookmark.svg" href="/saved">
            Saved Mats
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
          <Image src="/assets/images/banner.png" layout="fill" />
        </a>
      </Link>
    </div>
  );
};

const NavItem = ({ href, iconRelSrc, children, isActive }) => (
  <Link href={href || "/"} passHref>
    <a className={[styles.navLink, isActive ? styles.active : ""].join(" ")}>
      <span className={styles.icon}>
        <Image src={"/assets/icons/" + iconRelSrc} height={22} width={22} />
      </span>
      {children}
    </a>
  </Link>
);

export default LeftSidebar;
