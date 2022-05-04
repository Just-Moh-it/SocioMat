import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import Alert from "../components/alert";
import { appwrite } from "../store/global";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const router = useRouter();

  const signup = async (e) => {
    e.preventDefault();
    try {
      await appwrite.account.create(email, password, name);
      router.push("/todos");
    } catch (error) {
      setAlert(error.message);
    }
  };

  return (
    <>
      {/* {alert && <Alert message={alert} />} */}
      <section className="container h-screen mx-auto flex">
        <div className="flex-grow flex flex-col max-w-xl justify-center p-6">
          <h1 className="text-6xl font-bold">Sign Up</h1>
          <p className="mt-4">
            Already have an account?{" "}
            <Link href="/login">
              <a className="cursor-pointer underline">Login</a>
            </Link>
          </p>
          <form onSubmit={signup}>
            <label className="block mt-6"> Name</label>
            <input
              className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />

            <label className="block mt-6"> Email</label>
            {/* “Don’t worry if it doesn’t work right. If everything did, you’d be out of a job.”  */}
            <input
              className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block mt-6"> Password</label>
            <input
              className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="mt-6">
              <button
                type="submit"
                disabled={!name || !email || !password}
                className="mx-auto mt-4 py-4 px-16 font-semibold rounded-lg shadow-md bg-gray-900 text-white border hover:border-gray-900 hover:text-gray-900 hover:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
