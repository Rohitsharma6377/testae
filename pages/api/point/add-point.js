
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
          const { model: [model], model_id: [model_id], status: [status], name: [name], para: [para], text: [text] } = fields;

          let image_path = '';
          let fileName = null;
          
          const uploadFile = () => {
              let oldPath = files.image[0].filepath;
              fileName = slugify(`point ${para}`) + '.' + files.image[0].originalFilename.split('.')[1];
          
              let newPath = path.join(process.cwd(), 'public/uploads/points') + '/' + fileName;
              let rawData = fs.readFileSync(oldPath)
              image_path = 'uploads/points/' + fileName;


              const uploadDir = path.join(process.cwd(), 'public/uploads/points');

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
              const response = await query('INSERT INTO `media`(`media`, `alt`, `path`) VALUES (?, ?, ?)', [fileName, `point ${para}`, image_path]);
              mediaInsertedId = response.insertId;
              
              const sql = 'INSERT INTO points (model, model_id, status, name, para, text, media_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
              const results = await query(sql, [model, model_id, status, name, para, text, mediaInsertedId]);
              res.status(201).json({ message: 'Entry added', data: { ...fields, 'model': model, 'model_id': model_id, 'name': name, 'para': para, 'text': text, 'media_id': mediaInsertedId, 'media_path': image_path, 'id': results.insertId } });
          } catch (error) {
              res.status(500).json({ message: 'Error inserting data', error: error.message });
          }
    })
  }
}