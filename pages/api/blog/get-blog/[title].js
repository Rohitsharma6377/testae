// pages/api/getBlog.js

import query from '@/lib/db';

export default async function handler(req, res) {
  
  //get single blog
  if (req.query & req.method === 'GET') {

    const {title} = req.query;

    try {
      const results = await query('SELECT * FROM blogs where title = ?', [title]);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  }


    //get all blogs
  if (req.method === 'GET') {
    
    try {
      const results = await query('SELECT * FROM blogs');
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  } 
  
}