import Layout from "../../components/Layout";

import { useState } from "react";
import { modalState } from "../../store/global";
import { useForm } from "react-hook-form";
import { appwrite } from "../../store/global";
import { useRecoilState } from "recoil";
import { userState } from "../../store/global";

// Components
import StoriesList from "../../components/StoriesList";
import Feed from "../../components/Feed";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Server } from "../../utils/constants";
import { toast } from "react-toastify";

const {
  collections: { mats: matsCollectionId },
} = Server;

const Landing = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const router = useRouter();

  useEffect(() => {
    const toggleModal = () =>
      setModal({
        isOpen: !modal.isOpen,
        content: <ModalContent />,
        props: { title: "Post a mat", onClose: () => router.push("/") },
      });

    toggleModal();
  }, [modal.isOpen, router, setModal]);

  return (
    <>
      {/* Hero */}
      <Layout title="Feed">
        <StoriesList />
        <hr />
        <Feed />
      </Layout>
    </>
  );
};

const ModalContent = () => {
  const { register, handleSubmit } = useForm();
  const [user] = useRecoilState(userState);
  const router = useRouter();
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  const onSubmit = async ({ content }) => {
    try {
      const res = await appwrite.database.createDocument(
        matsCollectionId,
        "unique()",
        {
          userId: user.$id,
          content,
        }
      );

      if (res?.$id) {
        toast.success(`Successfully posted the mat! (id: ${res?.$id})`);
        router.push("/");
      } else {
        toast.error(
          `There was a problem with posting the mat: The server sent a blank response.`
        );
      }
    } catch (error) {
      toast.error(`Unable to post the mat: ${error?.message}`);
    }
  };

  const uploadFile = ({ file }) => {
    console.log(file);
    // const formData = new FormData();
    // formData.append("file", file);

    // setIsUploadingFile(true);

    // appwrite.storage.uploadFile(formData).then(
    //   (response) => {
    //     console.log("File uploaded successfully", response);
    //     setIsUploadingFile(false);
    //   },
    //   (error) => {
    //     console.error("Unable to upload file", error);
    //     setIsUploadingFile(false);
    //   }
    // );
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <div className="input-group">
            <textarea
              {...register("content")}
              className="form-input"
              name="content"
              id="new-mat-content"
              cols="70"
              rows="5"
              placeholder="What's on your mind...?"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="image"></label>
          </div>
        </div>
        <div className={["form-group"].join(" ")}>
          <button className="btn primary no-margin">Post</button>
        </div>
      </form>
    </>
  );
};

export default Landing;
