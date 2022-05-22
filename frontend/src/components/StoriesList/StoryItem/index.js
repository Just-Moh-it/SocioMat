import styles from "./index.module.scss";
import Image from "next/image";
import { modalState } from "../../../store/global";
import { useRecoilState } from "recoil";
import NotImplemented from "../../NotImplemented";

const StoryItem = ({ id, username, avatar, seen, ...props }) => {
  const [modal, setModal] = useRecoilState(modalState);

  const toggleModal = () => {
    console.log("Modal Toggled");
    setModal({
      isOpen: !modal.isOpen,
      content: <ModalContent />,
    });
  };

  return (
    <div
      // role="button"
      onClick={() => {
        console.log("Toggling modal");
        toggleModal();
      }}
      className={styles.wrapper}
    >
      {/* Avatar */}
      <div className={[styles.avatar, seen ? styles.seen : ""].join(" ")}>
        <Image
          alt="image"
          src={avatar}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      {/* Username */}
      <p className={[styles.username].join(" ")}>{username}</p>
    </div>
  );
};

const ModalContent = () => (
  <div>
    <NotImplemented />
  </div>
);

export default StoryItem;
