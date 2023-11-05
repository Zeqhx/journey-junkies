import express from "express";
import cors from "cors";
import pool from "./DB/index.js";
import apiRouter from "./API/index.js";
import { createClerkClient, clerkClient } from "@clerk/clerk-sdk-node";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/", apiRouter);
const port = 8081;

app.get("/", async (_, res) => {
  try {
    const data = await pool.query('SELECT * FROM "User"');
    res.json({ message: `Hello from ${data.rows[0].firtsName} the backend!` });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, async () => {
  console.log(`Server is running on port: ${port}`);
  //const ClrekClientT = createClerkClient(process.env.CLERK_API_KEY)
});
