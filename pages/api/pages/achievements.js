// pages/api/achievements.js

import query from '@/lib/db'; // Adjust the import path based on your project structure.


export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            await getAchievements(req, res);
            break;
        case 'POST':
            await addAchievement(req, res);
            break;
        case 'PUT':
            await updateAchievement(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function getAchievements(req, res) {
    try {
        const results = await query('SELECT * FROM achievements');
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
}

async function addAchievement(req, res) {
    const { number, description } = req.body;
    try {
        const sql = 'INSERT INTO achievements (number, description) VALUES (?, ?)';
        const results = await query(sql, [number, description]);

        // console.log('body', req.body);
        // console.log('results', results);

        res.status(201).json({ message: 'Achievement added', data: {...req.body, id: results.insertId} });
    } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
    }
}

async function updateAchievement(req, res) {
    const { id, number, description } = req.body;
    try {
        const sql = 'UPDATE achievements SET number = ?, description = ? WHERE id = ?';
        const results = await query(sql, [number, description, id]);
        if (results.affectedRows > 0) {
            res.status(200).json({ message: 'Achievement updated', data: req.body });
        } else {
            res.status(404).json({ message: 'Achievement not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating data', error: error.message });
    }
}
