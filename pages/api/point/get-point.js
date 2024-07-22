
import query from '@/lib/db';


export default async function handler(req, res) {
  
  //get 
  if (req.method === 'GET') {
    
    const { page = 1, itemsPerPage = 10 } = req.query;
    const offset = (page - 1) * itemsPerPage;

    try {
      const points = await query(`SELECT points.*, pages.name AS page_name, pages.url AS page_url, media.path AS media_path, media.alt AS media_alt FROM points LEFT JOIN pages ON points.model_id = pages.id LEFT JOIN media ON points.media_id = media.id LIMIT ${parseInt(itemsPerPage)} OFFSET ${parseInt(offset)}`);

      const totalPoints = await query('SELECT COUNT(*) AS count FROM points');
      const totalPages = Math.ceil(totalPoints[0].count / itemsPerPage);

      const pages = await query('SELECT * FROM pages');

      res.status(200).json({ points, pages, totalPages });
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  }


  //post
  else if (req.method === 'POST') {

    if (Object.keys(req.body).includes('page')) {
      const { page = 1, itemsPerPage = 10, modelData } = req.body;
      const offset = (page - 1) * itemsPerPage;

      try {
        const points = await query(`SELECT points.*, pages.name AS page_name, pages.url AS page_url, media.path AS media_path, media.alt AS media_alt FROM points LEFT JOIN pages ON points.model_id = pages.id LEFT JOIN media ON points.media_id = media.id WHERE points.model = ? AND points.model_id = ? LIMIT ${parseInt(itemsPerPage)} OFFSET ${parseInt(offset)}`, [modelData.model, modelData.model_id]);
  
        const totalPoints = await query('SELECT COUNT(*) AS count FROM points WHERE points.model = ? AND points.model_id = ?', [modelData.model, modelData.model_id]);
        const totalPages = Math.ceil(totalPoints[0].count / itemsPerPage);
  
        const pages = await query('SELECT * FROM pages');
        res.status(200).json({ points, pages, totalPages });
      } catch (error) {
        res.status(500).json({ message: 'Error accessing the database', error: error.message });
      }
    }
    
    else {
      const {model, model_id } = req.body;
  
      try {
        const points = await query('SELECT points.*, pages.name AS page_name, pages.url AS page_url, media.path AS media_path, media.alt AS media_alt FROM points LEFT JOIN pages ON points.model_id = pages.id LEFT JOIN media ON points.media_id = media.id WHERE points.model = ? AND points.model_id = ?', [model, model_id]);
  
        const pages = await query('SELECT * FROM pages');
        res.status(200).json({points, pages});
      } catch (error) {
        res.status(500).json({ message: 'Error accessing the database', error: error.message });
      }
    }
  }
}