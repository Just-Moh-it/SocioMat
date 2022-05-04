import styles from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";

const Suggestions = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={["text-large", styles.heading].join(" ")}>
          Suggestions for you
        </h3>
        <Link passHref href="/suggestions">
          <a className={["text-secondary text-large", styles.cta].join(" ")}>
            See all
          </a>
        </Link>
      </div>
      <ul className={styles.list}>
        {data.map((i) => (
          <SuggestionItem key={i.id} {...i} />
        ))}
      </ul>
    </div>
  );
};

const SuggestionItem = ({
  username,
  avatarUri,
  name,
  isVerified,
  hasUnseenStory,
}) => (
  <li role="link" className={styles.item}>
    <Link passHref href={`/${username}`}>
      <a className={styles.link}>
        {/* Avatar */}
        <div className={[styles.avatar, styles.left].join(" ")}>
          <Image alt="image" src={avatarUri} layout="fill" objectFit="cover" />
        </div>
        {/* Name and Username */}
        <div className={(styles.middle, styles.userInfo)}>
          <h3 className={[styles.name, "text-large"].join(" ")}>{name}</h3>
          <h5 className={[styles.username].join(" ")}>@{username}</h5>
        </div>
      </a>
    </Link>

    <div className={[styles.right, styles.followWrapper].join(" ")}>
      {/* Follow Button */}
      <button className={[styles.button, "btn primary"].join(" ")}>
        Follow
      </button>
    </div>
  </li>
);

const data = [
  {
    username: "mohit2004",
    avatarUri:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    name: "Mohit Yadav",
    isVerified: true,
    hasUnseenStory: true,
  },
  {
    username: "janvi2004",
    avatarUri:
      "https://images.unsplash.com/photo-1628890920690-9e29d0019b9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    name: "Janvi Yadav",
    isVerified: true,
    hasUnseenStory: true,
  },
];

export default Suggestions;
