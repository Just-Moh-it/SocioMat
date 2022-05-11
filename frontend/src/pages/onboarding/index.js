import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { appwrite, userState } from "../../store/global";
import AuthLayout from "../../components/Authlayout";
import { checkDuplicateUsername } from "../../lib/appwrite/users";
import Image from "next/image";
import { Server } from "../../utils/constants";
import Loader from "../../components/Loader";

const {
  collections: { users: usersCollectionId },
} = Server;

const Onboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const [isUsernameUnique, setIsUsernameUnique] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        if (user?.prefs?.initialized) {
          // Get info
          await appwrite.database.getDocument(usersCollectionId, user.$id);
          router.push("/");
        }
      } catch (error) {
        toast.error(`Unable to fetch user profile: ${error?.message}`);
      }
    };

    initialize();
  }, [user]);

  const onSubmit = async ({ username, name }) => {
    try {
      // router.push("/");
      if (updatePrefs({ username, name }))
        setUser(await appwrite.account.updatePrefs({ initialized: true }));
    } catch (error) {
      toast.error(`Error occured while updating username: ${error?.message}`);
    }
  };

  const updatePrefs = async ({ username, name }) => {
    try {
      const payload = {
        username,
        name,
        dp: (await appwrite.avatars.getInitials()).href,
      };

      const updatedUserData = await appwrite.database.createDocument(
        usersCollectionId,
        user.$id,
        payload
      );

      setUser(updatedUserData);
      toast.success("Info updated successfully");
      router.push("/");
    } catch (error) {
      toast.error(`Error updating user info: ${error?.message}`);
    }
  };

  if (!user.hasOwnProperty("prefs")) {
    return <Loader />;
  }

  return (
    <AuthLayout
      isProtected={false}
      title="Set username"
      heading={
        <p>
          Initialize your account<span className="text-accent">.</span>
        </p>
      }
      subheading="LET'S GET STARTED 🏁"
    >
      <div className={styles.wrapper}>
        {/* Onboard Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={"form-group"}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <span>@</span>
              <input
                id="username"
                type="username"
                placeholder="john_doe"
                required={true}
                {...register("username", {
                  // required: true,
                  maxLength: 160,
                  minLength: 3,
                  onChange: async (e) => {
                    const username = e.target.value;
                    const allowed =
                      username.length > 3 &&
                      /^[a-zA-Z0-9_]{1,15}$/.test(username) &&
                      !(await checkDuplicateUsername(username));
                    setIsUsernameUnique(allowed);
                  },
                })}
              />
              {isUsernameUnique ? (
                <span style={{ color: "red" }}>
                  <Image
                    src="/assets/icons/outline/check-circle.svg"
                    width="25"
                    height="25"
                    alt="Not allowed"
                  />
                </span>
              ) : (
                <Image
                  src="/assets/icons/outline/x-circle.svg"
                  width="25"
                  height="25"
                  alt="Not allowed"
                />
              )}
            </div>
            {errors?.username && (
              <p className="form-error">C'mon, enter a valid username</p>
            )}
          </div>
          <div className={"form-group"}>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="name"
                placeholder="John Doe"
                required={true}
                {...register("name", {
                  required: true,
                  maxLength: 160,
                  minLength: 3,
                })}
              />
            </div>
            {errors?.name && (
              <p className="form-error">C'mon, enter a valid name</p>
            )}
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="primary"
              disabled={!isUsernameUnique}
              title={isUsernameUnique && "Enter correct username"}
            >
              Let's go
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Onboard;
