// pages/api/updateBlog.js

import query from '@/lib/db';
import { slugify } from '@/utils/helper';
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const websites = await query(`
        SELECT
          w.id,
          c.id AS client_id,
          c.name AS client_name,
          w.url,
          m.id AS media_id,
          m.path AS media_path,
          w.design,
          w.status,
          w.display_order
        FROM 
          websites w
        JOIN 
          clients c ON w.client_id = c.id
        JOIN 
          media m ON w.media_id = m.id
      `);

      const clients = await query('SELECT * FROM clients');

      res.status(200).json({
        websites,
        clients,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  } else if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {
      let image_path = null;
      let image_filename = null;

      const uploadFile = () => {
        const oldPath = files.image[0].filepath;
        const newPath = path.join(process.cwd(), 'public/uploads/websites') + '/' + files.image[0].originalFilename;
        const rawData = fs.readFileSync(oldPath);
        image_path = 'uploads/websites/' + files.image[0].originalFilename;
        image_filename = files.image[0].originalFilename;

        const uploadDir = path.join(process.cwd(), 'public/uploads/websites');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFileSync(newPath, rawData);
      };

      uploadFile();

      const { client_id: [client_id], url: [url], design: [design], status: [status], display_order: [display_order] } = fields;

      let media_id = null;

      try {
        const sql = 'INSERT INTO media (media, alt, path) VALUES (?, ?, ?)';
        const params = [image_filename, `Website ${url}`, image_path];
        const results = await query(sql, params);

        if (results) {
          media_id = results.insertId;
        }
      } catch (error) {
        res.status(500).json({ message: 'Error inserting media data', error: error.message });
        return;
      }

      try {
        const sql = 'INSERT INTO websites (client_id, url, media_id, design, status, display_order) VALUES (?, ?, ?, ?, ?, ?)';
        const results = await query(sql, [client_id, url, media_id, design, status, display_order]);
        res.status(201).json({ message: 'Website entry added', data: { ...fields, media_path: image_path, id: results.insertId } });
      } catch (error) {
        res.status(500).json({ message: 'Error inserting website data', error: error.message });
      }
    });

  } 
  
  else if (req.method === 'PUT') {
    const form = new formidable.IncomingForm();
    
    form.parse (req, async function (err, fields, files) {
      const { client_id: [client_id], url: [url], design: [design], status: [status], display_order: [display_order], id: [id], media_id: [media_id], media_path: [media_path] } = fields;

      let image_path = null;
      let fileName = null;
      
      const uploadFile = () => {
        let oldPath = files.image[0].filepath;
        fileName = slugify(`website ${slugify(url)}`) + '.' + files.image[0].originalFilename.split('.')[1];
      
        let newPath = path.join(process.cwd(), 'public/uploads/websites') + '/' + fileName;
        let rawData = fs.readFileSync(oldPath)
        image_path = 'uploads/websites/' + fileName;

        
        const uploadDir = path.join(process.cwd(), 'public/uploads/clients');

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFile(newPath, rawData, function (err) {
          if (err) console.log(err)
          return newPath;
        })
      }

      const deleteOldMedia = async () => {
        try {
          const oldMediaPath = path.join(process.cwd(), 'public', media_path);
          fs.unlinkSync(oldMediaPath);
        } catch (error) {
          console.error('Error deleting old media file:', error);
        }
      };
      
      if(Object.keys(files).length > 0){
        deleteOldMedia();
        uploadFile();
      }


      if (fields.image) {
        image_path = fields.image[0];
      }
  
      try {
        await query('UPDATE media SET media = ?, alt = ?, path = ? WHERE id = ?', [fileName ? fileName : image_path.split('uploads/websites/')[1], `website ${slugify(url)}`, image_path, media_id]);

        let sql = 'UPDATE websites SET client_id=?, url=?, media_id=?, design=?, status=?, display_order=? WHERE id=?';
        let params = [client_id, url, media_id, design, status, display_order, id];
        const results = await query(sql, params);
        
        res.status(200).json({ message: 'Entry updated', data: { ...fields, media_path: image_path ? image_path : media_path } });
      } catch (error) {
        res.status(500).json({ message: 'Error accessing the database', error: error.message });
      }
    })
  }
}