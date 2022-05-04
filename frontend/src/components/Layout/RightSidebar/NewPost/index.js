import styles from "./index.module.scss";
import Image from "next/image";

const NewPost = () => {
  return (
    <div className={styles.wrapper}>
      {/* New Mat Input */}
      <textarea
        type="text"
        className={styles.input}
        placeholder="What's on your mind...?"
      />

      <hr />

      {/* Buttons */}
      <div className={styles.buttons}>
        {/* Image Button */}
        <button
          className={[styles.button, styles.imageBtn, "btn primary"].join(" ")}
        >
          <Image src="/assets/icons/filled/Image.svg" height={24} width={24} />
          <span>Image</span>
        </button>

        {/* Video Button */}
        <button
          className={[styles.button, styles.videoBtn, "btn primary"].join(" ")}
        >
          <Image src="/assets/icons/filled/Video.svg" height={24} width={24} />
          <span>Video</span>
        </button>
      </div>
    </div>
  );
};

export default NewPost;
