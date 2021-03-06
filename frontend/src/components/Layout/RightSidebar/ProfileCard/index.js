import styles from "./index.module.scss";
import Image from "next/image";
import { getShortInt } from "../../../../utils/functions";
import { useRecoilState } from "recoil";
import { publicUserInfoState } from "../../../../store/global";
import Loader from "../../../Loader";

// Components
import Avatar from "../../../Avatar";

const ProfileCard = () => {
  const [publicUserInfo] = useRecoilState(publicUserInfoState);

  if (!publicUserInfo?.$id) return <Loader />;

  return (
    <div className={styles.wrapper}>
      {/* Cover Image */}
      <div className={styles.cover}>
        <Image
          alt="image"
          src={publicUserInfo?.cover}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Avatar */}
      <div className={styles.avatar}>
        <Avatar
          avatarUri={publicUserInfo?.dp}
          hasUnseenStory={true}
          height="70px"
          width="70px"
        />
      </div>

      {/* User Info */}
      <section className={styles.userInfo}>
        {/* Name */}
        <span>
          <span className={styles.name}>{publicUserInfo?.name}</span>
          {publicUserInfo?.isVerified && (
            <Image
              alt="image"
              height={11}
              width={11}
              src="/assets/icons/filled/verify-badge.svg"
            />
          )}
        </span>

        {/* Username */}
        <h4 className={styles.username}>@{publicUserInfo?.username}</h4>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        {Object.keys(dummyData?.stats).map((stat) => (
          <section key={stat} className={styles.stat}>
            <h4 className={styles.statValue}>
              {getShortInt(dummyData?.stats[stat])}
            </h4>
            <p className={styles.statKey}>{stat}</p>
          </section>
        ))}
      </section>
    </div>
  );
};

const dummyData = {
  coverUri:
    "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
  hasUnseenStory: true,
  name: "Mohit Yadav",
  username: "mohit_yadav",
  avatarUri:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
  isVerified: true,
  stats: {
    mats: 40,
    followers: 4506,
    following: 1375,
  },
};

export default ProfileCard;
