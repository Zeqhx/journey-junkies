import express from "express";
import pool from "../DB/index.js";

const posts = express.Router();

// Helper function to build the WHERE clause of the query
const buildWhereClause = (conditions, queryParams) => {
  if (conditions.length) {
    return " WHERE " + conditions.join(" AND ");
  }
  return "";
};

// ========= Get All posts (this is the search functionality) ========= //
posts.get("/", async (req, res) => {
  const { rating, date, username } = req.query;
  const minRating = parseInt(rating, 10) || null;

  let query = "SELECT * FROM post";
  let queryParams = [];
  let conditions = [];

  if (minRating) {
    conditions.push("rating >= $1");
    queryParams.push(minRating);
  }

  if (date) {
    conditions.push("date >= $" + (queryParams.length + 1));
    queryParams.push(date);
  }

  if (username) {
    conditions.push("username = $" + (queryParams.length + 1));
    queryParams.push(username);
  }

  query += buildWhereClause(conditions, queryParams);
  query += " ORDER BY date DESC";

  try {
    const { rows } = await pool.query(query, queryParams);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching the posts.");
  }
});

// ========= CREATE posts ========= //
posts.post("/", async (req, res) => {
  const { author, title, content, image, description } = req.body;

  if (!author || !title || !content || !image || !description) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const result = await pool.query(
      'INSERT INTO "post" (author, title, content, image, description) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [author, title, content, image, description]
    );
    res.json(result.rows[0].id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// ========= DELETE posts ========= //
posts.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM "posts" WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// ========= UPDATE posts ========= //
posts.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { author, title, content, banner } = req.body;

  if (!author || !title || !content || !banner) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const result = await pool.query(
      'UPDATE "posts" SET author = $1, title = $2, content = $3, banner = $4 WHERE id = $5',
      [author, title, content, banner, id]
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// ========= GET Post BY ID ========= //
posts.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM "post" WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "post not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

export default posts;
