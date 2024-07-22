

import query from '@/lib/db';

export default async function handler(req, res) {
  
  //get comments
  if (req.method === 'GET') {
    try {
      const results = await query('SELECT * FROM comments');
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  }

  
  // //blog page comments
  // if (req.method === 'GET') {
  //   try {
  //     const results = await query('SELECT * FROM comments WHERE status = ?', ['show']);
  //     res.status(200).json(results);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error accessing the database', error: error.message });
  //   }
  // } 
  

  //post comment
  else if (req.method === 'POST') {
    const { page, user, comment } = req.body;
    try {
        // console.log( req.body)
      const sql = 'INSERT INTO comments (page, user, comment, date, status) VALUES (?, ?, ?, ?, ?)';
      const results = await query(sql, [page, user, comment, '2024-04-24T18:30:00.000Z', 'show']);
      res.status(201).json({ message: 'Entry added', data: req.body });
    } catch (error) {
      res.status(500).json({ message: 'Error inserting data', error: error.message });
    }
  }

  
  //update comment
  else if (req.method === 'PUT') {
    const { id, page, user, comment, date, status } = req.body;
    try {
    //   // console.log( req.body)
      const sql = 'UPDATE comments SET status = ? WHERE id = ?';
      const results = await query(sql, [status, id]);
      res.status(200).json({ message: 'Entry updated', data: req.body });
    } catch (error) {
      res.status(500).json({ message: 'Error updating data', error: error.message });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
