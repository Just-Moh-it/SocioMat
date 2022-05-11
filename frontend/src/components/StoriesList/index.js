import styles from "./index.module.scss";
import StoryItem from "./StoryItem";
import { motion } from "framer-motion";

const StoriesList = () => {
  return (
    <ul className={styles.wrapper}>
      {data?.map((item, idx) => (
        <>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeInOut", delay: idx * 0.05 }}
          >
            <StoryItem key={item?.id} {...item} />
          </motion.div>
        </>
      ))}
    </ul>
  );
};

// TODO: Remove dummy data
const data = [
  {
    id: 1,
    username: "osadavc",
    avatar: "https://avatars3.githubusercontent.com/u/1234?s=460&v=4",
    seen: false,
  },
  {
    id: 2,
    username: "mohit2004",
    avatar: "https://avatars3.githubusercontent.com/u/12345?s=460&v=4",
    seen: true,
  },
  ...[...Array(100)].map((_) => ({
    id: 4,
    username: "mohit2004",
    avatar: "https://avatars3.githubusercontent.com/u/12345?s=460&v=4",
    seen: true,
  })),
];

export default StoriesList;
