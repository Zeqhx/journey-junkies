import express from "express";
import comments from "./comments.js";
import admin from "./admin.js";
import posts from "./Posts.js";

const apiRouter = express.Router();

apiRouter.use("/comments", comments);
apiRouter.use("/posts", posts);
apiRouter.use("/users", admin);

export default apiRouter;
