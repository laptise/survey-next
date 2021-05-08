import { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../db";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await excuteQuery({
      query: "INSERT INTO users (id, createdAt, email, hash, salt) VALUES(?, ?, ?, ?, ?)",
      values: [1, 2, 3, 4, 5],
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
