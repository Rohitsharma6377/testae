// pages/api/updateBlog.js

import query from '@/lib/db';


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const ui_portfolio = await query(`SELECT ui_portfolio.*, clients.name AS client_name, websites.url AS website_url, websites.media_id, media.* FROM ui_portfolio LEFT JOIN websites ON ui_portfolio.website_id = websites.id LEFT JOIN media ON websites.media_id = media.id LEFT JOIN clients ON websites.client_id = clients.id`
      );

      const websites = await query('SELECT websites.*, media.* FROM websites LEFT JOIN media ON websites.media_id = media.id')

      res.status(200).json({
        ui_portfolio, websites
      });
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  }


  // add web-portfolio
  else if(req.method === 'POST'){
    const { website_id, website_url, text, status, display_order, path } = req.body;
    
    // saveToDB
      try {
        const sql = 'INSERT INTO ui_portfolio (website_id, text, status, display_order) VALUES (?, ?, ?, ?)';
        const results = await query(sql, [website_id, text, status, display_order]);
        res.status(201).json({ message: 'Entry added', data: {
          ...req.body, 'id': results.insertId
        }});

      } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
      }
    }



  // update web-portfolio
  else if(req.method === 'PUT'){
    const { id, website_id, website_url, text, status, display_order, path } = req.body;
    
    // saveToDB
    try {
      const sql = 'UPDATE ui_portfolio SET website_id=?, text=?, status=?, display_order=? WHERE id=?';
      const results = await query(sql, [website_id, text, status, display_order, id]);
      res.status(201).json({ message: 'Entry added', data: req.body });

    } catch (error) {
      res.status(500).json({ message: 'Error inserting data', error: error.message });
    }
  }
}