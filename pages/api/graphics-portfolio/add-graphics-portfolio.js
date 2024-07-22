
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
    
    form.parse (req, async function (err, fields, files) {
          const { text: [text], status: [status], display_order: [display_order] } = fields;

          let image_path = '';
          let fileName = '';
          
          const uploadFile = () => {
            let oldPath = files.image[0].filepath;
            fileName = slugify(`graphic ${text}`) + '.' + files.image[0].originalFilename.split('.')[1];
          
            let newPath = path.join(process.cwd(), 'public/uploads/graphics') + '/' + fileName;
            let rawData = fs.readFileSync(oldPath)
            image_path = 'uploads/graphics/' + fileName;

            const uploadDir = path.join(process.cwd(), 'public/uploads/graphics');

            if (!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir, { recursive: true });
            }

            fs.writeFile(newPath, rawData, function (err) {
              if (err) console.log(err)
              return newPath;
            })
          }
        
          uploadFile();

      
          try {
              let mediaInsertedId = null;
              const response = await query('INSERT INTO `media`(`media`, `alt`, `path`) VALUES (?, ?, ?)', [fileName, `graphic ${text}`, image_path]);
              mediaInsertedId = response.insertId;
              
              const sql = 'INSERT INTO graphics_portfolio (text, status, display_order, media_id) VALUES (?, ?, ?, ?)';
              const results = await query(sql, [text, status, display_order, mediaInsertedId]);
              res.status(201).json({ message: 'Entry added', data: { ...fields, 'image': image_path, 'id': results.insertId } });
          } catch (error) {
              res.status(500).json({ message: 'Error inserting data', error: error.message });
          }
    })
  }
}