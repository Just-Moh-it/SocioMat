import { toast } from "react-toastify";
import { Server } from "../../utils/constants";
import { appwrite } from "../../store/global";
import { Query } from "appwrite";

const {
  collections: { users: usersCollectionId },
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
