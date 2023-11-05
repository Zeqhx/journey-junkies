import express from "express";
import pool from "../DB/index.js";

const Comments = express.Router();

// ========= GET ALL COMMENTS FOR A POST ========= //
Comments.get(":postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const comments = await pool.query(
      'SELECT * FROM "comments" WHERE post = $1',
      [postId]
    );
    res.json(comments.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// ========= CREATE COMMENT ========= //
Comments.post("/", async (req, res) => {
  const { post_id, user_id, comment } = req.body;

  if (!post_id || !user_id || !comment) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const uuid = await pool.query(
      'INSERT INTO "comments" (post, author, comment) VALUES ($1, $2, $3) RETURNING id',
      [post_id, user_id, comment]
    );
    res.json(uuid.rows[0].id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// ========= DELETE COMMENT ========= //
Comments.delete(":id", async (req, res) => {
  const id = req.params.id;
  try {
    const uuid = await pool.query('DELETE FROM "comments" WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// ========= EDIT COMMENT ========= //
Comments.put(":id", async (req, res) => {
  const id = req.params.id;
  const { post_id, user_id, comment } = req.body;

  if (!post_id || !user_id || !comment) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const uuid = await pool.query(
      'UPDATE "comments" SET post = $1, author = $2, comment = $3 WHERE id = $4',
      [post_id, user_id, comment, id]
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});
export default Comments;
