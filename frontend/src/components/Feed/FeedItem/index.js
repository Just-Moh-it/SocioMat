import styles from "./index.module.scss";
import Avatar from "../../Avatar";
import Link from "next/link";
import Image from "next/image";

import { getShortInt } from "../../../utils/functions";

// Components
import ReadMore from "../../utils/ReadMore";

const FeedItem = ({
  user: { name, username, avatarUri, hasUnseenStory },
  post: { imageUri, description },
  stats: { likes, comments, remats },
}) => {
  return (
    <article className={styles.wrapper}>
      {/* Header - User Info + CTAs */}
      <div className={styles.header}>
        {/* User Info */}
        <Link href={`/${username}`} passHref>
          <a className={styles.userInfo}>
            {/* Avatar */}
            <Avatar
              hasUnseenStory={hasUnseenStory}
              avatarUri={avatarUri}
              height="42px"
              width="42px"
            />
            {/* Info */}
            <section className={styles.info}>
              {/* Name */}
              <h3 className={styles.name}>{name}</h3>
              <h4 className={styles.username}>@{username}</h4>
            </section>
          </a>
        </Link>

        {/* Action Buttons */}
        <div className={[styles.buttons].join(" ")}>
          {/* Save */}
          <HeaderButton
            onClick={() => console.log("Saved!")}
            iconSrc="/assets/icons/filled/Bookmark.svg"
          />
          {/* More Menu */}
          <HeaderButton
            onClick={() => console.log("More!")}
            iconSrc="/assets/icons/filled/More.svg"
          />
        </div>
      </div>

      {/* Content - Post + Description */}
      <div className={styles.content}>
        {/* Image */}
        <div className={styles.image}>
          <Image src={imageUri} layout="fill" objectFit="cover" />
        </div>
        {/* Description */}
        <div className={styles.description}>
          <ReadMore text={description} maxLength={150} />
        </div>
      </div>

      <hr />
      {/* Footer */}
      <div className={styles.footer}>
        {/* Left - User Avatar */}
        <div className={styles.left}>
          <Avatar
            avatarUri={"https://avatars.githubusercontent.com/u/12868"}
            width="34px"
            height="34px"
          />
        </div>

        {/* Middle - Comment Box */}
        <div className={[styles.middle, styles.commentInput].join(" ")}>
          {/* Emoji */}
          <input type="text" placeholder="Add you comment..." />
          <div
            role="button"
            className={styles.emojiSelectorBtn}
            onClick={() => console.log("Adding your comments!")}
          >
            <Image
              src="/assets/icons/filled/happy-face.svg"
              width="20"
              height="20"
            />
          </div>
        </div>

        {/* Right - Stats */}
        <div className={[styles.right, styles.actionBtns].join(" ")}>
          {/* Likes */}
          <ActionButton
            iconSrc="/assets/icons/filled/Heart.svg"
            onClick={() => console.log("Liked")}
          >
            {getShortInt(likes)}
          </ActionButton>

          {/* Comments */}
          <ActionButton
            iconSrc="/assets/icons/filled/Chat.svg"
            onClick={() => console.log("Liked")}
          >
            {getShortInt(comments)}
          </ActionButton>

          {/* Retmats */}
          <ActionButton
            iconSrc="/assets/icons/filled/Swap.svg"
            onClick={() => console.log("Liked")}
          >
            {getShortInt(remats)}
          </ActionButton>
        </div>
      </div>
    </article>
  );
};

const HeaderButton = ({ onClick, iconSrc }) => (
  <button className={styles.headerBtn} onClick={onClick}>
    <Image src={iconSrc} height="24" width="24" />
  </button>
);

const ActionButton = ({ onClick, iconSrc, children }) => (
  <button className={styles.actionBtn} onClick={onClick}>
    <div className={styles.image}>
      <Image src={iconSrc} height="20" width="20" />
    </div>
    <span className={styles.content}>{children}</span>
  </button>
);

export default FeedItem;
