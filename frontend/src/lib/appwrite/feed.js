import { toast } from "react-toastify";
import { Server } from "../../utils/constants";
import { appwrite } from "../../store/global";
import { Query } from "appwrite";
import { getUserIdFromUsername } from "./users";

const {
  collections: { users: usersCollectionId },
} = Server;

export const getMatsByUsername = async (
  username,
  extras = {
    sort: {
      field: "createdAt",
      order: "desc",
    },
  }
) => {
  try {
    const userId = await getUserIdFromUsername(username);

    // Get all mats
    const matsData = await appwrite.database.listDocuments(
      "mats",
      [Query.equal("userId", userId)],
      { ...extras }
    );
    
    return matsData;
  } catch (error) {
    return toast.error(error?.message);
  }
};
