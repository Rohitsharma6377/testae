
import query from '@/lib/db';


export default async function handler(req, res) {
    
    //get
    if (req.method === 'POST' ) {

      try {
        const { model, model_id, status, display_order, question, answer } = req.body;
        
        const sql = 'INSERT INTO faqs (model, model_id, status, display_order, question, answer) VALUES (?, ?, ?, ?, ?, ?)';
        const results = await query(sql, [model, model_id, status, display_order, question, answer]);
        
        res.status(201).json({ message: 'Entry added', data: {...req.body, id: results.insertId} });
      } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
      }
    }
}