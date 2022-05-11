import Link from "next/link";
import styles from "./index.module.scss";
import Image from "next/image";
import { useState } from "react";
// import Alert from "../../components/alert";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
// import { appwrite, userState } from "../store/global";
import { useRecoilState } from "recoil";
import AuthLayout from "../../components/Authlayout";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // await appwrite.account.create(email, password, name);
      router.push("/todos");
    } catch (error) {
      setAlert(error.message);
    }
  };

  return (
    <AuthLayout
      title="Signup"
      heading={
        <p>
          Create new account<span className="text-accent">.</span>
        </p>
      }
      subheading="LET’S GET YOU STARTED ✌️"
      byLine={
        <p>
          Already A Member?{" "}
          <Link href="/login" passHref>
            <a className="link text-accent">Log In</a>
          </Link>
        </p>
      }
    >
      <div className={styles.wrapper}>
        {/* Signup Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={"form-group"}>
            <div className="input-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="firstName"
                placeholder="John"
                required={true}
                {...register("firstName", {
                  required: true,
                  maxLength: 160,
                  minLength: 3,
                })}
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="lastName"
                placeholder="Doe"
                required={true}
                {...register("lastName", {
                  required: true,
                  maxLength: 160,
                  minLength: 3,
                })}
              />
            </div>
            {errors?.firstName ||
              (errors?.lastName && (
                <p className="form-error">C'mon, enter a valid email</p>
              ))}
          </div>
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
              <p className="form-error">C'mon, enter a valid email</p>
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
              <p className="form-error">Oof... Password can't be blank</p>
            )}
          </div>
          <div className="form-group">
            <button type="submit" className="primary">
              Sign me up
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
