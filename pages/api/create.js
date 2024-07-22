
import query from '@/lib/db';


import express from 'express';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';


export default async function handler(req, res) {

    if(req.method === 'GET'){
        // const {username, password} = req.body;

        try {
        // const sql = 'INSERT INTO users (name, email, phone, password, profile_photo_path) VALUES (?, ?, ?, ?, ?)';
        const results = await query('SELECT * FROM users');
        res.status(200).json(results);
        } catch (error) {
        res.status(500).json({ message: 'Error accessing the database', error: error.message });
        }
    } 

    else if(req.method === 'POST'){
        const {username, password} = req.body;

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                // console.log(hash);

                try {
                    const sql = 'INSERT INTO users (name, password) VALUES (?, ?)';
                    const results = await query(sql, [username, hash]);
                    // res.status(201).json({ message: 'Entry added', data: req.body });

                    if(results){
                        let token = jwt.sign({username}, 'secret-key');
                        res.cookie('token', token);
                        res.send(results)
                    }

                } catch (error) {
                    res.status(500).json({ message: 'Error accessing the database', error: error.message });
                }
            })
        })

    } 
}