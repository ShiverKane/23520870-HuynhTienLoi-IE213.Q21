import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import MoviesDAO from "./dao/moviesDAO.js";

dotenv.config();

const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;
let mongoClient;

async function initDb() {
  const dbUri = process.env.MOVIEREVIEWS_DB_URI;
  if (!dbUri || dbUri.includes("<") || dbUri.includes(">")) {
    console.error("Missing MOVIEREVIEWS_DB_URI. Set it in environment or Lab02/.env");
    return;
  }

  mongoClient = new MongoClient(dbUri);
  try {
    await mongoClient.connect();
    await MoviesDAO.injectDB(mongoClient);
  } catch (e) {
    console.error(e);
  }
}

app.listen(port, () => {
  console.log("Server running on port: " + port);
});

initDb();
