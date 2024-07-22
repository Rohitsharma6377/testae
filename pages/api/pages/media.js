
import query from '@/lib/db';


export default async function handler(req, res) {
  
  //get 
  if (req.method === 'GET') {
    try {
      const results = await query('SELECT * FROM media');
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  }
}