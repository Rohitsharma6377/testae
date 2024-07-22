
import query from '@/lib/db';


export default async function handler(req, res) {
  
  //get 
  if (req.method === 'GET') {
    try {
      const results = await query('SELECT graphics_portfolio.*, media.path AS image, media.alt AS image_alt FROM graphics_portfolio LEFT JOIN media ON graphics_portfolio.media_id = media.id');
      
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  }
}