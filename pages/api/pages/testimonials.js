

import query from '@/lib/db';


export default async function handler(req, res) {
  
  //get
  if (req.method === 'GET') {
    try {
      const testimonials = await query(
        `SELECT testimonials.id, testimonials.model, testimonials.model_id, pages.url AS page_url, testimonials.client_id, clients.name AS client_name, clients.role AS client_role, clients.status AS client_status, testimonials.status AS testimonial_status, testimonials.display_order, testimonials.testimonial, testimonials.created_at, testimonials.updated_at FROM testimonials INNER JOIN pages ON testimonials.model_id = pages.id INNER JOIN clients ON testimonials.client_id = clients.id`);

      const clients = await query(`SELECT * FROM clients`);
  
      res.status(200).json({testimonials, clients});
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  }

  
  //post
  else if (req.method === 'POST') {

    if(!Object.keys(req.body).includes('testimonial_status')) {
      const { model, model_id } = req.body;
      try {
        const testimonials = await query(
          'SELECT testimonials.id, testimonials.model, testimonials.model_id, pages.url AS page_url, testimonials.client_id, clients.name AS client_name, clients.role AS client_role, clients.status AS client_status, testimonials.status AS testimonial_status, testimonials.display_order, testimonials.testimonial, testimonials.created_at, testimonials.updated_at FROM testimonials INNER JOIN pages ON testimonials.model_id = pages.id INNER JOIN clients ON testimonials.client_id = clients.id WHERE testimonials.model = ? AND testimonials.model_id = ?', [model, model_id]);
          
        const clients = await query(`SELECT * FROM clients`);
          
        res.status(200).json({testimonials, clients});
      } catch (error) {
        res.status(500).json({ message: 'Error accessing the database', error: error.message });
      }
    }

    else {
      const { model, model_id, client_id, testimonial_status, display_order, testimonial } = req.body;
      try {
        const sql = 'INSERT INTO testimonials (model, model_id, client_id, status, display_order, testimonial) VALUES (?, ?, ?, ?, ?, ?)';
        const results = await query(sql, [model, model_id, client_id, testimonial_status, display_order, testimonial]);
        res.status(201).json({ message: 'Entry added', data: {...req.body, id: results.insertId} });
      } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
      }
    }
  }

  // //get
  // if (req.method === 'POST' && model && model_id) {
  // }

  // const { currentPageUrl } = req.query;
  // //get
  // if (req.method === 'GET' && currentPageUrl) {
  //   try {
  //     const results = await query('SELECT * FROM testimonials WHERE url = ?', [currentPageUrl]);
  //     res.status(200).json(results);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error accessing the database', error: error.message });
  //   }
  // }


  // else if (req.method === 'POST') {
    
  // }
  

  // //add testimonial
  // else if (req.method === 'POST') {

  // } 

  
  //update
  else if (req.method === 'PUT') {
    const { id, model, model_id, page_url, client_id, client_name, client_role, client_status, testimonial_status, display_order, testimonial, created_at } = req.body;

    try {
      const sql = 'UPDATE testimonials SET model = ?, model_id = ?, client_id = ?, status = ?, display_order = ?, testimonial = ? WHERE id = ?';
      const results = await query(sql, [model, model_id, client_id, testimonial_status, display_order, testimonial, id]);
      res.status(200).json({ message: 'Entry updated', data: req.body });
    } catch (error) {
      res.status(500).json({ message: 'Error updating data', error: error.message });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
