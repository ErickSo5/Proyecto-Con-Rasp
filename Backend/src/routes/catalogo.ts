import { Router } from "express";
import type { RowDataPacket } from "mysql2/promise";
import { pool } from "../db";

const router = Router();

router.get("/catalogo", async (req, res) => {
  try {
    const category =
      typeof req.query.category === "string" ? req.query.category : null;
    const search =
      typeof req.query.search === "string" ? req.query.search : null;
    const featured = req.query.featured === "true";

    const where: string[] = [];
    const params: (string | number)[] = [];

    if (category && category !== "todos") {
      where.push("category = ?");
      params.push(category);
    }

    if (search) {
      where.push("(name LIKE ? OR description LIKE ?)");
      const like = `%${search}%`;
      params.push(like, like);
    }

    if (featured) {
      where.push("featured = 1");
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT id, slug, name, description, long_description, category, price, duration,
              rating, reviews, image_url, featured, in_stock
       FROM catalog_items
       ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
       ORDER BY featured DESC, name ASC`,
      params
    );

    const data = rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
      description: row.description,
      longDescription: row.long_description,
      category: row.category,
      price: row.price,
      duration: row.duration,
      rating: Number(row.rating),
      reviews: row.reviews,
      image: row.image_url,
      featured: Boolean(row.featured),
      inStock: row.in_stock === null ? null : Boolean(row.in_stock),
    }));

    return res.json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

router.get("/catalogo/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;

    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT id, slug, name, description, long_description, category, price, duration,
              rating, reviews, image_url, featured, in_stock
       FROM catalog_items
       WHERE slug = ?
       LIMIT 1`,
      [slug]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Item no encontrado." });
    }

    const row = rows[0];
    return res.json({
      data: {
        id: row.id,
        slug: row.slug,
        name: row.name,
        description: row.description,
        longDescription: row.long_description,
        category: row.category,
        price: row.price,
        duration: row.duration,
        rating: Number(row.rating),
        reviews: row.reviews,
        image: row.image_url,
        featured: Boolean(row.featured),
        inStock: row.in_stock === null ? null : Boolean(row.in_stock),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

export default router;
