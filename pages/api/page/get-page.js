
import query from "@/lib/db";


export default async function handler(req, res) {

    if (req.method === 'GET') {
        try {
            const results = await query('SELECT p.*, m.media_id AS meta_media_id, m.meta_title, m.meta_description, pd.faq_title, pd.faq_description, pd.testimonial_title, pd.testimonial_description, COUNT(faqs.id) AS faqs_count, COUNT(testimonials.id) AS testimonials_count FROM pages p LEFT JOIN metatags m ON p.url = m.url LEFT JOIN page_details pd ON p.id = pd.page_id LEFT JOIN faqs ON p.id = faqs.model_id LEFT JOIN testimonials ON p.id = testimonials.model_id GROUP BY p.id, m.media_id, m.meta_title, m.meta_description, pd.faq_title, pd.faq_description, pd.testimonial_title, pd.testimonial_description');
            res.status(200).json(results);

        } catch (error) {
            res.status(500).json({ message: 'Error accessing the database', error: error.message });
        }
    }

    else if (req.method === 'POST') {

        if (Object.keys(req.body).includes('id')) {
            const { id } = req.body;
    
            try {
                const results = await query('SELECT p.*, m.media_id AS meta_media_id, m.meta_title, m.meta_description, pd.faq_title, pd.faq_description, pd.testimonial_title, pd.testimonial_description FROM pages p LEFT JOIN metatags m ON p.url = m.url LEFT JOIN page_details pd ON p.id = pd.page_id WHERE p.id=?', [id]);
            
                if (results[0].media_id) {
                    const response1 = await query('SELECT path from media WHERE id = ?', [results[0].media_id]);
                    results[0]['image'] = response1[0].path;
                }

                if (results[0].cover_id) {
                    const response2 = await query('SELECT path from media WHERE id = ?', [results[0].cover_id]);
                    results[0]['cover'] = response2[0].path;
                }
    
                res.status(200).json(results);
            } catch (error) {
                res.status(500).json({ message: 'Error accessing the database', error: error.message });
            }
        }

        else if (Object.keys(req.body).includes('currentPageUrl')) {
            const { currentPageUrl } = req.body;
    
            try {
                const results = await query('SELECT p.*, m.media_id AS meta_media_id, m.meta_title, m.meta_description, pd.faq_title, pd.faq_description, pd.testimonial_title, pd.testimonial_description FROM pages p LEFT JOIN metatags m ON p.url = m.url LEFT JOIN page_details pd ON p.id = pd.page_id WHERE p.url=?', [currentPageUrl]);
                
                if (results[0].media_id) {
                    const response1 = await query('SELECT path from media WHERE id = ?', [results[0].media_id]);
                    results[0]['image'] = response1[0].path;
                }
    
                if (results[0].cover_id) {
                    const response2 = await query('SELECT path from media WHERE id = ?', [results[0].cover_id]);
                    results[0]['cover'] = response2[0].path;
                }
    
                res.status(200).json(results);
                
            } catch (error) {
                res.status(500).json({ message: 'Error accessing the database', error: error.message });
            }
        }
    }
}