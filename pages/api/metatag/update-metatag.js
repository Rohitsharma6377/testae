
import query from '@/lib/db';

export default async function handler(req, res) {
    
  //update
  if (req.method === 'PUT') {
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
