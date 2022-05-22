import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Components
import ProfileCard from "./ProfileCard";
import NewPost from "./NewPost";
import Suggestions from "./Suggestions";
import Footer from "./Footer";

const RightSidebar = ({ showProfileCard = true }) => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <section className={styles.header}>
        {/* Search */}
        <div
          className={[styles.search, styles.rounded, styles.outline].join(" ")}
        >
          {/* Icon */}
          <Image
            alt="image"
            src="/assets/icons/outline/search.svg"
            width={24}
            height={24}
          />
          {/* Input */}
          <input type="text" placeholder="Search..." />
        </div>

        {/* Notifications */}
        <Link href="/notifications" passHref>
          <a
            className={[styles.outline, styles.rounded, styles.button].join(
              " "
            )}
          >
            <Image
              alt="image"
              src="/assets/icons/filled/Notification.svg"
              height={24}
              width={24}
            />
          </a>
        </Link>

        {/* Upload */}
        <div
          role="button"
          onClick={() => router.push("/create")}
          className={[styles.accentButton, styles.rounded, styles.button].join(
            " "
          )}
        >
          <Image
            alt="image"
            src="/assets/icons/filled/Upload.svg"
            height={24}
            width={24}
          />
        </div>
      </section>

      {/* Profile Card */}
      {showProfileCard && (
        <section className={styles.profileCard}>
          <ProfileCard />
          <NewPost />
        </section>
      )}

      {/* Suggestions */}
      <section className={styles.suggestions}>
        <Suggestions />
      </section>

      {/* Footer */}
      <section className={styles.footer}>
        <Footer />
      </section>
    </div>
  );
};

export default RightSidebar;
