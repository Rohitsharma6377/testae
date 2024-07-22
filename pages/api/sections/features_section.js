import query from '@/lib/db';

export default async function handler(req, res) {
  
  const { currentPageUrl } = req.query;

  //get
  if (req.method === 'GET' && currentPageUrl) {
    try {
      const results = await query('SELECT * FROM features_section WHERE url = ?', [currentPageUrl]);
      res.status(200).json(results);

    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  } 

  //get data
  if (req.method === 'GET') {
    try {
      const results = await query('SELECT * FROM features_section');
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  }
}