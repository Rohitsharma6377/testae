
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
  
  //put
  if (req.method === 'PUT') {
    const form = new formidable.IncomingForm();
    
    form.parse (req, async function (err, fields, files) {
      const { id: [id], text: [text], status: [status], display_order: [display_order], media_id : [media_id] } = fields;

      let image_path = '';
      let fileName = null;
      
      const uploadFile = () => {
        let oldPath = files.image[0].filepath;
        fileName = slugify(`graphic ${text}`) + '.' + files.image[0].originalFilename.split('.')[1];
      
        let newPath = path.join(process.cwd(), 'public/uploads/graphics_portfolio') + '/' + fileName;
        let rawData = fs.readFileSync(oldPath)
        image_path = 'uploads/graphics_portfolio/' + fileName;

        
        const uploadDir = path.join(process.cwd(), 'public/uploads/graphics_portfolio');

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFile(newPath, rawData, function (err) {
          if (err) console.log(err)
          return newPath;
        })
      }

      
      if(Object.keys(files).length > 0){
        const filePath = path.join(process.cwd() + '/public/' + fields.media_path[0]);

        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          }
        });

        uploadFile();
      }

      if (fields.image) {
        image_path = fields.image[0];
      }
  
      try {
        await query('UPDATE media SET media = ?, alt = ?, path = ? WHERE id = ?', [fileName ? fileName : image_path.split('uploads/graphics_portfolio/')[1], `graphic ${text}`, image_path, media_id]);

        let sql = 'UPDATE graphics_portfolio SET text = ?, status = ?, display_order = ?, media_id = ? WHERE id = ?';
        let params = [text, status, display_order, media_id, id];
        const results = await query(sql, params);
        
        res.status(200).json({ message: 'Entry updated', data: { ...fields, 'image': image_path } });
      } catch (error) {
        res.status(500).json({ message: 'Error accessing the database', error: error.message });
      }
    })
  }
}