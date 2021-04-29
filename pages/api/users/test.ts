import { NextApiRequest, NextApiResponse } from "next";
import { existingIds } from "../../../utils/sample-data";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    // if (req.headers["serial"] !== "success") throw new Error("bad request");
    if (!Array.isArray(existingIds)) {
      throw new Error("Cannot find user data");
    }

    res.status(200).json(existingIds);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
