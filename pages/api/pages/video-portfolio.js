// pages/api/updateBlog.js

import query from '@/lib/db';


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const results = await query(`SELECT * from video_portfolio`);
      res.status(200).json(results);

    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  }


  // add video-portfolio
  else if(req.method === 'POST'){
    const { name, iframe, status, display_order } = req.body;
    
    // saveToDB
      try {
        const sql = 'INSERT INTO video_portfolio (name, iframe, status, display_order) VALUES (?, ?, ?, ?)';
        const results = await query(sql, [name, iframe, status, display_order]);
        res.status(201).json({ message: 'Entry added', data: {
          ...req.body, 'id': results.insertId
        }});

      } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
      }
    }



  // update video-portfolio
  else if(req.method === 'PUT'){
    const { id, name, iframe, status, display_order } = req.body;
    
    // saveToDB
    try {
      const sql = 'UPDATE video_portfolio SET name=?, iframe=?, status=?, display_order=? WHERE id=?';
      const results = await query(sql, [name, iframe, status, display_order, id]);
      res.status(201).json({ message: 'Entry added', data: req.body });

    } catch (error) {
      res.status(500).json({ message: 'Error inserting data', error: error.message });
    }
  }
}