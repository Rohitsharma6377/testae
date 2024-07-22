
import query from '@/lib/db';


export default async function handler(req, res) {

  //put
  if (req.method === 'PUT') {
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
