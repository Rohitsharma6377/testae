
import query from '@/lib/db';


export default async function handler(req, res) {

  //put 
  if (req.method === 'PUT') {
    const { id, status } = req.body;
  
    try {
        const results = await query('UPDATE clients SET status = ? WHERE id = ?', [status, id]);
        res.status(200).json({ message: 'Entry updated', data: req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  }
}