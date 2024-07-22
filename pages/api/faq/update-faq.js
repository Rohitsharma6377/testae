
import query from '@/lib/db';


export default async function handler(req, res) {

    if (req.method === 'PUT') {
        const { id, model, model_id, status, display_order, question, answer } = req.body;
        
        try {
            const sql = 'UPDATE faqs SET model = ?, model_id = ?, status = ?, display_order = ?, question = ?, answer = ? WHERE id = ?';
            const results = await query(sql, [model, model_id, status, display_order, question, answer, id]);
            res.status(200).json({ message: 'Entry updated', data: req.body });

        } catch (error) {
            res.status(500).json({ message: 'Error updating data', error: error.message });
        }
    } else {
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }  
}