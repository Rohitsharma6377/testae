
import query from '@/lib/db';

export default async function handler(req, res) {
  
    //get
    if (req.method === 'GET' ) {
        const { page = 1, itemsPerPage = 10 } = req.query;
        const offset = (page - 1) * itemsPerPage;

        try {
        const faqs = await query(`SELECT faqs.id, faqs.model, faqs.model_id, pages.name AS page_name, pages.url AS page_url, faqs.status, faqs.display_order, faqs.question, faqs.answer, faqs.created_at, faqs.updated_at FROM faqs INNER JOIN pages ON faqs.model_id = pages.id LIMIT ${parseInt(itemsPerPage)} OFFSET ${parseInt(offset)}`);

        const totalRows = await query('SELECT COUNT(id) AS count FROM faqs');
        const totalPages = Math.ceil(totalRows[0].count / itemsPerPage);

        res.status(200).json({ faqs, totalPages });
        } catch (error) {
        res.status(500).json({ message: 'Error accessing the database', error: error.message });
        }
    }

    //post
    else if (req.method === 'POST') {

        if(Object.keys(req.body).includes('page')){
            const { page = 1, itemsPerPage = 10, modelData } = req.body;
            const offset = (page - 1) * itemsPerPage;
    
            try {
            const faqs = await query(`SELECT faqs.id, faqs.model, faqs.model_id, pages.name AS page_name, pages.url AS page_url, faqs.status, faqs.display_order, faqs.question, faqs.answer, faqs.created_at, faqs.updated_at FROM faqs INNER JOIN pages ON faqs.model_id = pages.id WHERE faqs.model = ? AND faqs.model_id = ? LIMIT ${parseInt(itemsPerPage)} OFFSET ${parseInt(offset)}`, [modelData.model, modelData.model_id]);
    
            const totalRows = await query('SELECT COUNT(id) AS count FROM faqs WHERE model = ? AND model_id = ?', [modelData.model, modelData.model_id]);
            
            const totalPages = Math.ceil(totalRows[0].count / itemsPerPage);
    
            res.status(200).json({ faqs, totalPages });
            } catch (error) {
            res.status(500).json({ message: 'Error accessing the database', error: error.message });
            }
        } 
        
        else {
            const { model, model_id } = req.body;

            try {
            const faqs = await query('SELECT faqs.id, faqs.model, faqs.model_id, pages.name AS page_name, pages.url AS page_url, faqs.status, faqs.display_order, faqs.question, faqs.answer, faqs.created_at, faqs.updated_at FROM faqs INNER JOIN pages ON faqs.model_id = pages.id WHERE faqs.model = ? AND faqs.model_id = ?', [model, model_id]);
            
            res.status(200).json(faqs);
        
            } catch (error) {
            res.status(500).json({ message: 'Error accessing the database', error: error.message });
            }
        }
    }
}