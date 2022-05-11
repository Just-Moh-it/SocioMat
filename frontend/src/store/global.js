import { Appwrite } from "appwrite";
import { atom } from "recoil";
import { Server } from "../utils/constants";

export const appwrite = new Appwrite()
  .setEndpoint(Server.endpoint)
  .setProject(Server.project);

export const userState = atom({
  key: "user",
  default: { status: "loading" },
});

export const publicUserInfoState = atom({
  key: "publicUserInfo",
  default: {},
});
