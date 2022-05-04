import { appwrite, Server } from "../../store/global";

const todos = async (req, res) => {
  const { jwt } = req.headers;
  const payload = JSON.parse(req.body || null);

  if (!jwt) {
    return;
  }

  appwrite.setJWT(jwt.toString());

  try {
    switch (req.method.toUpperCase()) {
      case "GET":
        res
          .status(200)
          .json(await appwrite.database.listDocuments(Server.collectionID));
        break;

      case "POST":
        res
          .status(200)
          .json(
            await appwrite.database.createDocument(
              Server.collectionID,
              payload.todo,
              [`user:${payload.user}`],
              [`user:${payload.user}`]
            )
          );
        break;

      case "PATCH":
        res
          .status(200)
          .json(
            await appwrite.database.updateDocument(
              Server.collectionID,
              payload.todo.$id,
              payload.todo,
              [`user:${payload.user}`],
              [`user:${payload.user}`]
            )
          );
        break;

      case "DELETE":
        res
          .status(200)
          .json(
            await appwrite.database.deleteDocument(
              Server.collectionID,
              payload.todo.$id
            )
          );
        break;

      default:
        res.send(true);
        break;
    }
  } catch (error) {
    const e = error;
    console.log(e.message);
    res.status(401).json(e);
  }
};

export default todos;
