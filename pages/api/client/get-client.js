
import query from '@/lib/db';


export default async function handler(req, res) {
  
  //get 
  if (req.method === 'GET') {
    try {
      const results = await query('SELECT clients.*, media.path AS image, media.alt AS image_alt FROM clients LEFT JOIN media ON clients.media_id = media.id');
      
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  }
}