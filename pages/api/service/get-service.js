
import query from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const results = await query(`SELECT services.*, media.path AS media_path, media.alt AS media_alt FROM services JOIN media ON services.media_id = media.id`
      );
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
