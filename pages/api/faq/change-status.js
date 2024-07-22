
import query from '@/lib/db';


export default async function handler(req, res) {

    if (req.method === 'PUT') {
        const { id, status } = req.body;
        
        try {
            const sql = 'UPDATE faqs SET status = ? WHERE id = ?';
            const results = await query(sql, [status, id]);
            res.status(200).json({ message: 'Entry updated', data: req.body });

        } catch (error) {
            res.status(500).json({ message: 'Error updating data', error: error.message });
        }
    } else {
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }  
}