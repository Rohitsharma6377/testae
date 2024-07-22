// pages/api/contact.js

import query from '@/lib/db'; // Adjust the import path based on your project structure.


export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await getContact(req, res);
            break;
        case 'POST':
            await addContact(req, res);
            break;
        case 'PUT':
            await updateContact(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function getContact(req, res) {
    try {
        const results = await query('SELECT * FROM contact');
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
}

async function addContact(req, res) {
    const { heading, description } = req.body;
    try {
        const sql = 'INSERT INTO contact (heading, description) VALUES (?, ?)';
        const results = await query(sql, [heading, description]);

        // console.log('body', req.body);
        // console.log('results', results);

        res.status(201).json({ message: 'Contact added', data: {...req.body, id: results.insertId} });
    } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
    }
}

async function updateContact(req, res) {
    const { id, heading, description } = req.body;
    try {
        const sql = 'UPDATE contact SET heading = ?, description = ? WHERE id = ?';
        const results = await query(sql, [heading, description, id]);
        if (results.affectedRows > 0) {
            res.status(200).json({ message: 'Contact updated', data: req.body });
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating data', error: error.message });
    }
}
