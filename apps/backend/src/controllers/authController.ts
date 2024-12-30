import { Request, Response, NextFunction } from "express";
import client from "../db/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { first_name, last_name, email, password } = req.body as User;

    if (!(first_name && last_name && email && password)) {
      return res.status(400).send("All input is required");
    }

    const existingUser = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user: User = {
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    };

    const query = `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [user.first_name, user.last_name, user.email, user.password];

    const newUser = await client.query(query, values);

    if (newUser.rows.length > 0) {
      const token = jwt.sign(
        { id: newUser.rows[0].id, email },
        process.env.SECRET_KEY as string,
        { expiresIn: "2h" }
      );

      return res.status(201).json({ token });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const signin = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    const user = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (
      user.rows.length > 0 &&
      (await bcrypt.compare(password, user.rows[0].password))
    ) {
      const token = jwt.sign(
        { id: user.rows[0].id, email },
        process.env.SECRET_KEY as string,
        { expiresIn: "2h" }
      );

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res.status(201).cookie("token", token, options).json({
        user: user.rows[0],
        token: token,
        success: true,
      });
    }

    return res.status(401).send("Invalid Credentials");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
