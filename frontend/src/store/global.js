import { Appwrite } from "appwrite";
import { atom } from "recoil";
import { Server } from "../utils/constants";

export const appwrite = new Appwrite()
  .setEndpoint(Server.endpoint)
  .setProject(Server.project);

export const userState = atom({
  key: "user",
  default: { state: "loading" },
});

export const publicUserInfoState = atom({
  key: "publicUserInfo",
  default: {},
});

export const modalState = atom({
  key: "modalState",
  default: {
    isOpen: false,
    content: <></>,
  },
});
