import { NextApiRequest, NextApiResponse } from 'next';
import { getGoogleUserInfo } from '../../../../utils/googleAuth';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ message: 'Authorization code is required' });
    }

    try {
      const userInfo = await getGoogleUserInfo(code as string);
      
      // Create a JWT token for the user
      const token = jwt.sign(
        {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
        },
        process.env.NEXTAUTH_SECRET!,
        { expiresIn: '7d' }
      );

      // Set HTTP-only cookie
      res.setHeader('Set-Cookie', `auth-token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax; Secure`);
      
      // Redirect to home page
      res.redirect('/');
    } catch (error) {
      console.error('Google OAuth error:', error);
      res.status(500).json({ message: 'Authentication failed' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
