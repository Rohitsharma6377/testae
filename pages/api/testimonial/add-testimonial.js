
import query from '@/lib/db';


export default async function handler(req, res) {
  
  //post
  if (req.method === 'POST') { {
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
}
