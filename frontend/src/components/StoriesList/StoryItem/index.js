import styles from "./index.module.scss";
import Image from "next/image";

const StoryItem = ({ id, username, avatar, seen }) => {
  return (
    <div className={styles.wrapper}>
      {/* Avatar */}
      <div className={[styles.avatar, seen ? styles.seen : ""].join(" ")}>
        <Image src={avatar} layout="fill" />
      </div>

      {/* Username */}
      <p className={[styles.username].join(" ")}>{username}</p>
    </div>
  );
};

const data = {};

export default StoryItem;
