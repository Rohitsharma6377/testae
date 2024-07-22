

import query from '@/lib/db';

export default async function handler(req, res) {
  
  //get reply
  if (req.method === 'GET') {

    try {
      const sql = 'SELECT * FROM comments WHERE c_order = ?';
      const results = await query(sql, [1]);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  } 

  //post reply
  else if (req.method === 'POST') {
    const { name, email, comment, comment_id } = req.body;
    try {
        // console.log( req.body)
      const sql = 'INSERT INTO comments (page, c_order, comment_id, name, user, comment, date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const results = await query(sql, ['hello', 1, comment_id, 'Hunny', email, comment, '2024-04-24T18:30:00.000Z', 'show']);
      res.status(201).json({ message: 'Entry added', data: req.body });
    } catch (error) {
      res.status(500).json({ message: 'Error inserting data', error: error.message });
    }
  } 
  
}
