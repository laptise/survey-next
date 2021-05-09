import { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../db";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await excuteQuery({
      query: "INSERT INTO test (text) VALUES(?)",
      values: [new Date().valueOf()],
    });
    res.status(200).send("DADA");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
