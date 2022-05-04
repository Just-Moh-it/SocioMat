import { Appwrite } from "appwrite";
import { atom } from "recoil";

// “In a software project team of ten, there are probably three people who produce enough defects to make them net-negative producers.”
export const Server = {
  endpoint: process.env.NEXT_PUBLIC_ENDPOINT,
  project: process.env.NEXT_PUBLIC_PROJECT,
  collectionID: process.env.NEXT_PUBLIC_COLLECTION_ID,
};

export const appwrite = new Appwrite()
  .setEndpoint(Server.endpoint)
  .setProject(Server.project);

export const todoState = atom({
  key: "todos",
  default: [],
});

export const userState = atom({
  key: "user",
  default: null,
});
