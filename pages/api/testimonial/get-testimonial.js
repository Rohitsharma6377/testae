
import query from '@/lib/db';


export default async function handler(req, res) {
  
  //get
  if (req.method === 'GET') {
    const { page = 1, itemsPerPage = 5 } = req.query;
    const offset = (page - 1) * itemsPerPage;

    try {
      const testimonials = await query(`SELECT testimonials.id, testimonials.model, testimonials.model_id, pages.name AS page_name, pages.url AS page_url, testimonials.client_id, clients.name AS client_name, clients.role AS client_role, clients.status AS client_status, testimonials.status AS testimonial_status, testimonials.display_order, testimonials.testimonial, testimonials.created_at, testimonials.updated_at FROM testimonials INNER JOIN pages ON testimonials.model_id = pages.id INNER JOIN clients ON testimonials.client_id = clients.id LIMIT ${parseInt(itemsPerPage)} OFFSET ${parseInt(offset)}`);

      const clients = await query(`SELECT * FROM clients`);

      const totalRows = await query('SELECT COUNT(id) AS count FROM testimonials');
      const totalPages = Math.ceil(totalRows[0].count / itemsPerPage);

      res.status(200).json({ testimonials, clients, totalPages });
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  }

  //get faq for specific model
  else if (req.method === 'POST') {

    if (Object.keys(req.body).includes('page')) {
      const { page = 1, itemsPerPage = 10, modelData } = req.body;
      const offset = (page - 1) * itemsPerPage;
  
        try {
          const testimonials = await query(`SELECT testimonials.id, testimonials.model, testimonials.model_id, pages.name AS page_name, pages.url AS page_url, testimonials.client_id, clients.media_id, media.path AS media_path, clients.name AS client_name, clients.role AS client_role, clients.status AS client_status, testimonials.status AS testimonial_status, testimonials.display_order, testimonials.testimonial, testimonials.created_at, testimonials.updated_at FROM testimonials INNER JOIN pages ON testimonials.model_id = pages.id INNER JOIN clients ON testimonials.client_id = clients.id INNER JOIN media ON clients.media_id = media.id WHERE testimonials.model = ? AND testimonials.model_id = ? LIMIT ${parseInt(itemsPerPage)} OFFSET ${parseInt(offset)}`, [modelData.model, modelData.model_id]);
  
          const clients = await query(`SELECT * FROM clients`);
  
          const totalRows = await query('SELECT COUNT(id) AS count FROM testimonials');
          const totalPages = Math.ceil(totalRows[0].count / itemsPerPage);
          
          res.status(200).json({testimonials, clients, totalPages});
        } catch (error) {
          res.status(500).json({ message: 'Error accessing the database', error: error.message });
        }
    }

    else {
      const { model, model_id } = req.body;

      try {
        const testimonials = await query('SELECT testimonials.id, testimonials.model, testimonials.model_id, pages.name AS page_name, pages.url AS page_url, testimonials.client_id, clients.media_id, media.path AS media_path, clients.name AS client_name, clients.role AS client_role, clients.status AS client_status, testimonials.status AS testimonial_status, testimonials.display_order, testimonials.testimonial, testimonials.created_at, testimonials.updated_at FROM testimonials INNER JOIN pages ON testimonials.model_id = pages.id INNER JOIN clients ON testimonials.client_id = clients.id INNER JOIN media ON clients.media_id = media.id WHERE testimonials.model = ? AND testimonials.model_id = ?', [model, model_id]);

        const clients = await query(`SELECT * FROM clients`);
        
        res.status(200).json({testimonials, clients});
      } catch (error) {
        res.status(500).json({ message: 'Error accessing the database', error: error.message });
      }
    }
  }
}