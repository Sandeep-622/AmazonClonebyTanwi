import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const token = req.cookies['auth-token'];

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as {
        id: string;
        email: string;
        name: string;
        picture: string;
      };
      res.status(200).json({
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        image: decoded.picture,
      });
    } catch {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
