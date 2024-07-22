

import query from '@/lib/db';

export default async function handler(req, res) {
  
  //get
  if (req.method === 'GET') {
    try {
      const results = await query('SELECT * FROM metatags');
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  } 
  

  //post
  else if (req.method === 'POST') {
    const { url, title, description, media_id } = req.body;

    try {
      const sql = 'INSERT INTO metatags (url, title, description, media_id) VALUES (?, ?, ?, ?)';
      const results = await query(sql, [url, title, description, media_id]);
      res.status(201).json({ message: 'Entry added', data: { ...req.body, id: results.insertId } });
    } catch (error) {
      res.status(500).json({ message: 'Error inserting data', error: error.message });
    }
  } 
  
  
  //update
  else if (req.method === 'PUT') {
    const { id, url, title, description, media_id } = req.body;

    try {
      // // console.log( req.body)
      const sql = 'UPDATE metatags SET url = ?, title = ?, description = ?, media_id = ? WHERE id = ?';
      const results = await query(sql, [url, title, description, media_id, id]);
      res.status(200).json({ message: 'Entry updated', data: req.body });
    } catch (error) {
      res.status(500).json({ message: 'Error updating data', error: error.message });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
