import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styles from "./index.module.scss";
import { motion } from "framer-motion";
import { getShortInt } from "../../utils/functions";
import Avatar from "../../components/Avatar";
import { useRouter } from "next/router";
import Feed from "../../components/Feed";
import Link from "next/link";
import { appwrite, userState } from "../../store/global";
import { Query } from "appwrite";
import Loader from "../../components/Loader";
import { useRecoilState } from "recoil";
import { amIFollowingUser } from "../../lib/appwrite/users";

import Image from "next/image";
import { toast } from "react-toastify";
import { Server } from "../../utils/constants";

const {
  collections: { users: usersCollectionId },
} = Server;

const ProfilePage = () => {
  const router = useRouter();
  const [user] = useRecoilState(userState);
  const [profileInfo, setProfileInfo] = useState({ state: "loading" });

  const { username } = router.query;

  const isSelfProfile = username === user.$id;

  console.log(
    "Am I following user",
    amIFollowingUser({ username: "john_wick" })
  );

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const queryData = (
          await appwrite.database.listDocuments(usersCollectionId, [
            Query.equal("username", username),
          ])
        ).documents[0];
        console.log("Res", queryData);

        // Get user info
        if (queryData) {
          setProfileInfo({
            ...shapeData({ userData: queryData }),
            state: "success",
          });
        } else {
          setProfileInfo({ state: "not-found" });
        }
      } catch (error) {
        toast.error(`Unable to fetch user profile: ${error?.message}`);
      }
    };

    getUserInfo();
  }, [username]);

  if (profileInfo.state === "loading") {
    return <Loader />;
  } else if (profileInfo.state === "not-found") {
    return <Loader showBack={true}>Not Found</Loader>;
  } else if (profileInfo.state === "success")
    return (
      <Layout title="Profile" showProfileCard={false}>
        {/* Header */}
        <motion.div
          className={[styles.header, styles.hero].join(" ")}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ProfileCard data={profileInfo} isSelfProfile={isSelfProfile} />
        </motion.div>

        {/* Feed */}
        <div className={styles.feed}></div>
      </Layout>
    );
};

const ProfileCard = ({ data, isSelfProfile }) => {
  return (
    <div className={styles.wrapper}>
      {/* Cover Image */}
      <div className={styles.cover}>
        <Image
          alt="image"
          src={data.coverUri}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.top}>
        {/* Avatar */}
        <div className={styles.avatar}>
          <Avatar
            avatarUri={data?.avatarUri}
            hasUnseenStory={data?.hasUnseenStory}
            height="160px"
            width="160px"
            outlineWidth="4px"
            outlineOffset="8px"
          />
        </div>
        {/* User Info */}
        <section className={styles.userInfo}>
          {/* Name */}
          <span>
            <span className={styles.name}>{data.name}</span>
            {data?.isVerified && (
              <Image
                alt="image"
                height={15}
                width={15}
                src="/assets/icons/filled/verify-badge.svg"
              />
            )}
          </span>
          {/* Username */}
          <h4 className={styles.username}>@{data.username}</h4>
        </section>

        {/* CTA Buttons */}
        <div className={styles.buttons}>
          <button className={["btn primary"].join(" ")}>Follow</button>
          <button className={["btn outline"].join(" ")}>Follow</button>
        </div>
      </div>

      <p className={styles.bio}>{data?.bio}</p>

      <section className={styles.accountInfoRow}>
        {/* Stats */}
        <section className={styles.stats}>
          {Object.keys(data.stats).map((stat) => (
            <section key={stat} className={styles.stat}>
              <h4 className={styles.statValue}>
                {getShortInt(data.stats[stat])}
              </h4>
              <p className={styles.statKey}>{stat}</p>
            </section>
          ))}
        </section>
        {/* Info Items */}
        <section className={styles.infoItems}>
          {data.infoItems.map(
            ({ value, key, icon }) =>
              value &&
              key && (
                <section key={key} className={styles.infoItem}>
                  <span className={styles.infoIcon}>{icon}</span>
                  <h4 className={styles.infoValue}>{getShortInt(value)}</h4>
                </section>
              )
          )}
        </section>
      </section>

      <Feed heading="Previous Mats" />
    </div>
  );
};

const shapeData = ({ userData }) => ({
  coverUri: userData?.cover || "/assets/images/not-found-placeholder.png",
  hasUnseenStory: true,
  name: userData?.name,
  username: userData?.username,
  avatarUri: userData?.dp || "/assets/images/not-found-placeholder.png",
  isVerified: false,
  stats: {
    mats: 40,
    followers: 4506,
    following: 1375,
  },
  following: true,
  infoItems: [
    {
      value: userData?.location,
      icon: (
        <Image
          src="/assets/icons/outline/Location.svg"
          width="24"
          alt="location"
          height="24"
        />
      ),
      key: "location",
    },
    {
      value: (
        <Link href={userData?.website || "/"}>
          {userData?.website || "null"}
        </Link>
      ),
      icon: (
        <Image
          src="/assets/icons/outline/Link.svg"
          width="24"
          alt="location"
          height="24"
        />
      ),
      key: "website",
    },
    {
      value: userData?.dob,
      icon: (
        <Image
          src="/assets/icons/outline/Calendar.svg"
          width="24"
          alt="dob"
          height="24"
        />
      ),
      key: "dob",
    },
  ],
  bio: userData?.bio || "404 Bio not found :(",
});

// const data = {
//   coverUri:
//     "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
//   hasUnseenStory: true,
//   name: "Mohit Yadav",
//   username: "mohit_yadav",
//   avatarUri:
//     "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
//   isVerified: true,
//   stats: {
//     mats: 40,
//     followers: 4506,
//     following: 1375,
//   },
//   following: true,
//   infoItems: [
//     {
//       value: "13, Hogwarts Pavement, London",
//       icon: (
//         <Image
//           src="/assets/icons/outline/Location.svg"
//           width="24"
//           alt="location"
//           height="24"
//         />
//       ),
//       key: "location",
//     },
//     {
//       value: (
//         <Link href="https://mohityadav.codes">https://mohityadav.codes</Link>
//       ),
//       icon: (
//         <Image
//           src="/assets/icons/outline/Link.svg"
//           width="24"
//           alt="location"
//           height="24"
//         />
//       ),
//       key: "website",
//     },
//     {
//       value: "13/09/2004",
//       icon: (
//         <Image
//           src="/assets/icons/outline/Calendar.svg"
//           width="24"
//           alt="location"
//           height="24"
//         />
//       ),
//       key: "dob",
//     },
//   ],
//   bio: "Student by the day, hobbyist by the night 😎 | Web App lover, Makeshift UI designer 🎨, emoji swain | 🎰 Hobbies → Habits | 💬 DMs appreciated",
// };

export default ProfilePage;
