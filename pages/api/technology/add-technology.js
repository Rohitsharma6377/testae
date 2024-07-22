
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
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    
    form.parse(req, async function (err, fields, files) {
      const { name: [name], url: [url], description: [description], display_order: [display_order], status: [status] } = fields;

      let image_path = '';
      let fileName = null;

      const uploadFile = () => {
        let oldPath = files.image[0].filepath;
        fileName = slugify(`technology ${name}`) + '.' + files.image[0].originalFilename.split('.')[1];

        let newPath = path.join(process.cwd(), 'public/uploads/technology') + '/' + fileName;
        let rawData = fs.readFileSync(oldPath);
        image_path = 'uploads/technology/' + fileName;

        const uploadDir = path.join(process.cwd(), 'public/uploads/technology');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFile(newPath, rawData, function (err) {
          if (err) console.log(err);
          return newPath;
        });
      };

      uploadFile();

      try {
        let mediaInsertedId = null;
        const mediaResponse = await query('INSERT INTO `media`(`media`, `alt`, `path`) VALUES (?, ?, ?)', [fileName, `technology ${name}`, image_path]);
        mediaInsertedId = mediaResponse.insertId;

        const sql = 'INSERT INTO technology (name, url, description, display_order, status, media_id) VALUES (?, ?, ?, ?, ?, ?)';
        const results = await query(sql, [name, url, description, display_order, status, mediaInsertedId]);

        res.status(201).json({ 
          message: 'Entry added', 
          data: { 
            ...fields, 
            'id': results.insertId, 
            'media_id': mediaInsertedId, 
            'media_path': image_path 
          } 
        });
      } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}