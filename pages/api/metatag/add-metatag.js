
import query from '@/lib/db';

export default async function handler(req, res) {
  
  //post
  if (req.method === 'POST') {
    const { url, title, description, media_id } = req.body;

    try {
      const sql = 'INSERT INTO metatags (url, title, description, media_id) VALUES (?, ?, ?, ?)';
      const results = await query(sql, [url, title, description, media_id]);
      res.status(201).json({ message: 'Entry added', data: { ...req.body, id: results.insertId } });
    } catch (error) {
      res.status(500).json({ message: 'Error inserting data', error: error.message });
    }
  }
}