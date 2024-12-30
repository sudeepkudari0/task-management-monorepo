import { Request, Response } from "express";
import client from "../db/database";

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as { id: string };

  try {
    const query = "SELECT * FROM users WHERE id = $1";
    const values = [id];

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const user = result.rows[0];

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
