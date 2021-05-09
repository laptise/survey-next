import { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../db";
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await excuteQuery({
      query: "SELECT * FROM users",
      values: [new Date().valueOf()],
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
