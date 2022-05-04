import styles from "./index.module.scss";

// Components
import TabSelector from "../TabSelector";
import FeedItem from "./FeedItem";

const Feed = () => {
  const handleClick = ({ value }) => {
    console.log("Clicked", value);
  };

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className="text-large">Your Feed</h3>
        {/* Tabs */}
        <TabSelector
          tabs={[
            { value: "all", text: "All", onClick: handleClick },
            {
              value: "following",
              text: "From Following",
              onClick: handleClick,
            },
            { value: "latest", text: "Latest", onClick: handleClick },
            { value: "oldest", text: "Oldest", onClick: handleClick },
          ]}
          defaultValue="latest"
        />
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Feed item */}
        {data.map((feedItem) => (
          <FeedItem key={Math.random()} {...feedItem} />
        ))}
      </div>
    </div>
  );
};

const data = [...Array(5)].map((_) => ({
  user: {
    name: "Mohit Yadav",
    username: "mohit_yadav",
    avatarUri: "https://avatars3.githubusercontent.com/u/17098981?s=460&v=4",
  },
  post: {
    imageUri: "/assets/images/sample_ui.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nesciunt debitis rerum eos assumenda possimus iusto recusandae a, harum deserunt. Nisi est saepe debitis sit ea, praesentium nobis unde sed eaque, perspiciatis illo numquam tempora vero earum! Corporis maxime aliquid iste enim modi veritatis quas corrupti similique ipsa aspernatur? Illum repellat maiores animi eum eligendi temporibus accusantium iusto et iure exercitationem vel blanditiis quas nesciunt nobis enim mollitia magnam, nemo, dicta magni eaque unde? Commodi qui facere quibusdam autem enim magni consequuntur ratione repudiandae, aliquam impedit sit nihil. Natus at necessitatibus id architecto saepe. Ipsa ab illo porro repudiandae modi?",
  },
  stats: {
    likes: 42434,
    comments: 12,
    remats: 1353,
  },
}));

export default Feed;
