// src/app/api/auth/_log.js

import { NextApiRequest, NextApiResponse } from 'next';

// Example handler function for logging
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Process the log data
    const logData = req.body;

    // Here you can implement your logging logic
    // For example, saving logs to a database or file

    res.status(200).json({ message: 'Log received', data: logData });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
