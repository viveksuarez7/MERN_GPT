import app from "./app.js";
import { connectToDatabase } from "./src/db/connection.js";

connectToDatabase()
  .then(() => {
    app.listen(9000, () => console.log("Server Open & Connected to Port 👍"));
  })
  .catch((err) => console.log(err));
