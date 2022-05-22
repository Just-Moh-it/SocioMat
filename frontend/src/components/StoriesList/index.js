import styles from "./index.module.scss";
import StoryItem from "./StoryItem";
import { motion } from "framer-motion";

const StoriesList = () => {
  return (
    <ul className={styles.wrapper}>
      {data?.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut", delay: idx * 0.05 }}
        >
          <StoryItem key={item?.id} {...item} />
        </motion.div>
      ))}
    </ul>
  );
};

// TODO: Remove dummy data
const data = [
  {
    id: 1,
    username: "elon_musk",
    avatar: "https://avatars3.githubusercontent.com/u/1234?s=460&v=4",
    seen: false,
  },
  {
    id: 2,
    username: "mohit2004",
    avatar: "https://images.unsplash.com/photo-1640951613773-54706e06851d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2680&q=80",
    seen: true,
  },
  {
    id: 2,
    username: "your_moma",
    avatar: "https://images.unsplash.com/photo-1628890920690-9e29d0019b9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    seen: true,
  },
  {
    id: 2,
    username: "noobie420",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=922&q=80",
    seen: true,
  },
  {
    id: 2,
    username: "mohit2004",
    avatar: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
    seen: true,
  },
  {
    id: 2,
    username: "mohit2004",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    seen: true,
  },
  {
    id: 2,
    username: "mohit2004",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    seen: true,
  },
  {
    id: 2,
    username: "mohit2004",
    avatar: "https://avatars3.githubusercontent.com/u/12345?s=460&v=4",
    seen: true,
  },
  {
    id: 2,
    username: "mohit2004",
    avatar: "https://avatars3.githubusercontent.com/u/12345?s=460&v=4",
    seen: true,
  },
];

export default StoriesList;
