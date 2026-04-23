import { Router } from "express";
import type { RowDataPacket } from "mysql2/promise";
import { pool } from "../db";

const router = Router();

router.get("/blog", async (req, res) => {
  try {
    const category =
      typeof req.query.category === "string" ? req.query.category : null;
    const search =
      typeof req.query.search === "string" ? req.query.search : null;
    const featured = req.query.featured === "true";

    const where: string[] = [];
    const params: (string | number)[] = [];

    if (category && category !== "all") {
      where.push("category = ?");
      params.push(category);
    }

    if (search) {
      where.push(
        "(title LIKE ? OR excerpt LIKE ? OR author LIKE ? OR author_role LIKE ?)"
      );
      const like = `%${search}%`;
      params.push(like, like, like, like);
    }

    if (featured) {
      where.push("featured = 1");
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT id, slug, title, excerpt, content, image_url, category, author,
              author_role, author_image, published_at, read_time, featured
       FROM blog_posts
       ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
       ORDER BY published_at DESC`,
      params
    );

    const data = rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      image: row.image_url,
      category: row.category,
      author: row.author,
      authorRole: row.author_role,
      authorImage: row.author_image,
      date: row.published_at
        ? new Date(row.published_at).toISOString().split("T")[0]
        : null,
      readTime: row.read_time,
      featured: Boolean(row.featured),
    }));

    return res.json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

router.get("/blog/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;

    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT id, slug, title, excerpt, content, image_url, category, author,
              author_role, author_image, published_at, read_time, featured
       FROM blog_posts
       WHERE slug = ?
       LIMIT 1`,
      [slug]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Articulo no encontrado." });
    }

    const row = rows[0];
    return res.json({
      data: {
        id: row.id,
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt,
        content: row.content,
        image: row.image_url,
        category: row.category,
        author: row.author,
        authorRole: row.author_role,
        authorImage: row.author_image,
        date: row.published_at
          ? new Date(row.published_at).toISOString().split("T")[0]
          : null,
        readTime: row.read_time,
        featured: Boolean(row.featured),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

export default router;
