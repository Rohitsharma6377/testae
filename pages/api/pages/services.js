import query from '@/lib/db';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // get all services
  if (req.method === 'GET') {
    try {
      const results = await query(
        `SELECT s.id, s.name, s.url, s.description, s.media_id, s.status, s.display_order, m.path AS media_path, m.alt AS media_alt
         FROM services s
         JOIN media m ON s.media_id = m.id
        `
      );
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  }

  // add service
  else if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      if (err) {
        res.status(500).json({ message: 'Form parsing error', error: err.message });
        return;
      }

      let image_path = null;
      let image_filename = null;

      if (files.image) {
        const oldPath = files.image[0].filepath;
        const newPath = path.join(process.cwd(), 'public/uploads/services', files.image[0].originalFilename);
        const rawData = fs.readFileSync(oldPath);
        image_path = 'uploads/services/' + files.image[0].originalFilename;
        image_filename = files.image[0].originalFilename;

        const uploadDir = path.join(process.cwd(), 'public/uploads/services');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFileSync(newPath, rawData);
      }

      const { name, url, display_order, status, description } = fields;

      let media_id = null;
      if (image_filename) {
        try {
          const sql = 'INSERT INTO media (media, alt, path) VALUES (?, ?, ?)';
          const params = [image_filename, `Service ${name}`, image_path];
          const results = await query(sql, params);
          if (results) {
            media_id = results.insertId;
          }
        } catch (error) {
          res.status(500).json({ message: 'Error inserting media data', error: error.message });
          return;
        }
      }

      try {
        const sql = 'INSERT INTO services (name, url, description, display_order, status, media_id) VALUES (?, ?, ?, ?, ?, ?)';
        const results = await query(sql, [name, url, description, display_order, status, media_id]);
        res.status(201).json({
          message: 'Entry added',
          data: { ...fields, id: results.insertId, media_path: image_path },
        });
      } catch (error) {
        res.status(500).json({ message: 'Error inserting service data', error: error.message });
      }
    });
  }

  // update service
  else if (req.method === 'PUT') {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      if (err) {
        res.status(500).json({ message: 'Form parsing error', error: err.message });
        return;
      }

      let image_path = null;
      let image_filename = null;
      let new_media_id = null;

      const { id, name, url, description, display_order, status, media_id, media_path } = fields;

      if (files.image) {
        const oldPath = files.image[0].filepath;
        const newPath = path.join(process.cwd(), 'public/uploads/services', files.image[0].originalFilename);
        const rawData = fs.readFileSync(oldPath);
        image_path = 'uploads/services/' + files.image[0].originalFilename;
        image_filename = files.image[0].originalFilename;

        const uploadDir = path.join(process.cwd(), 'public/uploads/services');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFileSync(newPath, rawData);

        try {
          const sql = 'INSERT INTO media (media, alt, path) VALUES (?, ?, ?)';
          const params = [image_filename, `Service ${name}`, image_path];
          const results = await query(sql, params);
          if (results) {
            new_media_id = results.insertId;
          }
        } catch (error) {
          res.status(500).json({ message: 'Error inserting media data', error: error.message });
          return;
        }
      }

      try {
        const sql = 'UPDATE services SET name = ?, url = ?, description = ?, display_order = ?, status = ?, media_id = ? WHERE id = ?';
        await query(sql, [name, url, description, display_order, status, new_media_id ? new_media_id : media_id, id]);
        res.status(200).json({
          message: 'Entry updated',
          data: { ...fields, media_path: image_path ? image_path : media_path },
        });
      } catch (error) {
        res.status(500).json({ message: 'Error updating service data', error: error.message });
      }
    });
  }
}