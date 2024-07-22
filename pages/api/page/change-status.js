
import query from '@/lib/db';


export default async function handler(req, res) {

  //update status
  if (req.method === 'PUT') {
    const { status, id } = req.body;

    try {
        const results = await query('UPDATE pages SET status=? WHERE id=?', [status, id]);
        res.status(201).json({ message: 'Entry added', data: req.body });
    }
    catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
    }
  }
}
