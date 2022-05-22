import { toast } from "react-toastify";
import { Server } from "../../utils/constants";
import { appwrite } from "../../store/global";
import { Query } from "appwrite";

const {
  collections: { users: usersCollectionId, follows: followsCollectionId },
} = Server;

export const checkDuplicateUsername = async (username) => {
  try {
    const userData = await appwrite.database.listDocuments(usersCollectionId, [
      Query.equal("username", username),
    ]);

    return userData.total !== 0;
  } catch (error) {
    toast.error(error?.message);
    return false;
  }
};

export const getUserIdFromUsername = async (username) => {
  try {
    const userData = await appwrite.database.listDocuments(usersCollectionId, [
      Query.equal("username", username),
    ]);

    if (userData.documents.length === 0) throw new Error("User does not exist");
    return userData?.documents[0].username;
  } catch (error) {
    toast.error(error?.message);
    return false;
  }
};

export const getUserInfoById = async (id) => {
  try {
    console.log("Getting user info", id);
    if (id) {
      const account = await appwrite.database.getDocument(
        usersCollectionId,
        id
      );
      return account;
    }
  } catch (error) {
    return false;
  }
};

const getSelfUserId = async () => {
  try {
    return (await appwrite.account.get()).$id;
  } catch (error) {
    toast.error(`Unable to fetch your user id: ${error?.message}`);
  }
};

export const amIFollowingUser = async ({ username, userId }) => {
  try {
    const parsedUserId = username
      ? await getUserIdFromUsername(username)
      : userId;

    const res = await appwrite.database.listDocuments(followsCollectionId, [
      Query.equal("followerId", await getSelfUserId()),
      Query.equal("followingId", parsedUserId),
    ]);

    return res.documents && res.documents.length > 0;
  } catch (error) {
    toast.error(
      `An error occured while fetching following status: ${error?.message}`
    );
  }
};

export const getFollowingIds = async ({ followerId, userId }) => {
  try {
    // Get username, else default to logged in account
    const parsedFollowerId = followerId
      ? await getUserIdFromUsername(followerId)
      : await getSelfUserId();

    const res = await appwrite.database.listDocuments(followsCollectionId, [
      Query.equal("followerId", parsedFollowerId),
    ]);

    return res.documents;
  } catch (error) {
    toast.error(
      `An error occured while fetching following status: ${error?.message}`
    );
  }
};
