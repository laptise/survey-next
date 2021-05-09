import { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../db";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const result = await excuteQuery({
      query: "SELECT * FROM users WHERE id = ?",
      values: id,
    });
    if (!Array.isArray(result)) {
      throw new Error("Cannot find user data");
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
