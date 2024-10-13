import express from "express";
import mainRouter from "./routing/main.routing";
import mongo from "./dal/mongo.dal"
import {errorHandler} from "./middleware/error.middleware"
// import authmiddleware from "./middleware/auth.middleware"
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import swaggerSetup  from "./utils/swagger";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
swaggerSetup(app);



app.use(express.json());
app.use(cookieParser());

mongo();


app.use("/api", mainRouter);

// app.get('/', (req, res) => {
//   res.json({ message: "Welcome to Express Zero" });
// });

app.use(errorHandler) // Add error handler middleware after defining all other middleware

app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});



