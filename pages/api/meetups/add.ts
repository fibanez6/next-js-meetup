// POST /api/meetups/add
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body;

    // const { title, image, address, description } = data;
    
    const client = await clientPromise;
    const db = client.db();

    const meetupCollection = db.collection('meetups');
    const result = await meetupCollection.insertOne(data);

    console.log(result);

    res.status(201).json({ message: 'success' })
  }
}

export default handler;