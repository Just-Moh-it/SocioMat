import styles from "./index.module.scss";
import Image from "next/image";

const Avatar = ({
  avatarUri,
  height = "42px",
  width = "42px",
  hasUnseenStory = false,
  outlineWidth = "3px",
  outlineOffset = "3px",
}) => {
  return (
    <div
      className={[
        styles.wrapper,
        hasUnseenStory ? styles.hasUnseenStory : "",
      ].join(" ")}
      style={{
        height,
        width,
        outlineWidth,
        borderWidth: outlineOffset,
      }}
    >
      <Image alt="Avatar" src={avatarUri} layout="fill" objectFit="cover" />
    </div>
  );
};

export default Avatar;
