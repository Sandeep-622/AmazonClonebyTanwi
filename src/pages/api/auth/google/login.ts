import { NextApiRequest, NextApiResponse } from 'next';
import { getGoogleAuthUrl } from '../../../../utils/googleAuth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const url = getGoogleAuthUrl();
    console.log('Generated Google Auth URL:', url);
    console.log('Redirect URI being used:', process.env.NEXTAUTH_URL);
    res.redirect(url);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
