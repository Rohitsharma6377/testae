

import query from '@/lib/db';

export default async function handler(req, res) {
  
  //get blogmeta
  if (req.method === 'GET') {
    try {
      const results = await query('SELECT * FROM blogmeta');
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  } 
  

  //post blogmeta
  else if (req.method === 'POST') {
    const { type, name, url } = req.body;
    try {
      const sql = 'INSERT INTO blogmeta (type, name, url) VALUES (?, ?, ?)';
      const results = await query(sql, [type, name, url]);
      res.status(201).json({ message: 'Entry added', data: req.body });
    } catch (error) {
      res.status(500).json({ message: 'Error inserting data', error: error.message });
    }
  } 
  
  
  //update blogmeta
  else if (req.method === 'PUT') {
    const { id, type, name, url } = req.body;
    try {
      // // console.log( req.body)
      const sql = 'UPDATE blogmeta SET type = ?, name = ?, url = ? WHERE id = ?';
      const results = await query(sql, [type, name, url, id]);
      res.status(200).json({ message: 'Entry updated', data: req.body });
    } catch (error) {
      res.status(500).json({ message: 'Error updating data', error: error.message });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
