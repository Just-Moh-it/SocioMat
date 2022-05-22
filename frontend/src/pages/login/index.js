import Link from "next/link";
import styles from "./index.module.scss";
import Image from "next/image";
import { useState } from "react";
// import Alert from "../../components/alert";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
// import { appwrite, userState } from "../store/global";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { appwrite, userState } from "../../store/global";
import AuthLayout from "../../components/Authlayout";
import { useTheme } from "next-themes";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  const onSubmit = async ({ email, password }) => {
    try {
      setUser(await appwrite.account.createSession(email, password));
      router.push("/onboarding");
    } catch (error) {
      toast.error(`Error occured while logging in: ${error?.message}`);
    }
  };

  const OAuthLogin = async (provider) => {
    try {
      const res = await appwrite.account.createOAuth2Session(
        provider,
        "http://localhost:3000/onboarding",
        "http://localhost:3000/login"
      );
    } catch (error) {
      toast.error(`Error occured while logging in: ${error?.message}`);
    }
  };

  return (
    <AuthLayout
      title="Login"
      heading={
        <p>
          Login to your account<span className="text-accent">.</span>
        </p>
      }
      subheading="WELOCOME BACK 🙏"
      byLine={
        <p>
          New here?{" "}
          <Link href="/signup" passHref>
            <a className="link text-accent">Sign Up</a>
          </Link>
        </p>
      }
    >
      <div className={styles.wrapper}>
        {/* OAuth2 Login */}
        <section className={[styles.oauth, "form-group"].join(" ")}>
          <button
            onClick={() => OAuthLogin("google")}
            className={["input-group", styles.item].join(" ")}
          >
            <div className={styles.image}>
              <Image
                alt="Google Login"
                layout="fill"
                src="/assets/icons/utils/oauth/google.svg"
              />
            </div>
          </button>
          <button
            onClick={() => OAuthLogin("facebook")}
            className={["input-group", styles.item].join(" ")}
          >
            <div className={styles.image}>
              <Image
                alt="Facebook Login"
                layout="fill"
                src="/assets/icons/utils/oauth/facebook.svg"
              />
            </div>
          </button>
          <button
            onClick={() => OAuthLogin("github")}
            className={["input-group", styles.item].join(" ")}
          >
            <div className={styles.image}>
              <Image
                alt="GitHub Login"
                layout="fill"
                src="/assets/icons/utils/oauth/github.svg"
              />
            </div>
          </button>
        </section>
        <div className={["form-group", styles.separator].join(" ")}>
          <span className={styles.text}>Or Continue with</span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={"form-group"}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="abc@xyz.com"
                required={true}
                {...register("email", {
                  required: true,
                  maxLength: 160,
                  minLength: 3,
                })}
              />
            </div>
            {errors?.email && (
              <p className="form-error">C&apos;mon, enter a valid email</p>
            )}
          </div>
          <div className={"form-group"}>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••••••"
                required={true}
                {...register("password", { required: true })}
              />
            </div>
            {errors?.password && (
              <p className="form-error">Oof... Password can&apos;t be blank</p>
            )}
          </div>
          <div className="form-group">
            <button type="submit" className="primary">
              Log Me In
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
