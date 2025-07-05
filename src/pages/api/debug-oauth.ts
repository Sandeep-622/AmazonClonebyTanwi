import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const redirectUri = 'https://localhost:3000/api/auth/callback/google';
  
  res.status(200).json({
    message: 'Debug info for Google OAuth',
    redirectUri: redirectUri,
    clientId: process.env.GOOGLE_CLIENT_ID,
    instructions: [
      'Go to Google Cloud Console',
      'Navigate to APIs & Services > Credentials',
      'Click on your OAuth 2.0 Client ID',
      'Make sure "Authorized redirect URIs" contains exactly:',
      redirectUri,
      'Make sure "Authorized JavaScript origins" contains exactly:',
      'https://localhost:3000',
      'Save the settings and wait 2-3 minutes'
    ]
  });
}
