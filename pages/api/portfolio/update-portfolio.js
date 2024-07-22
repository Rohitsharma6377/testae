
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
  if (req.method === 'PUT') {
    const form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {
      const { id: [id], media_id: [media_id], media_path: [media_path], name: [name], url: [url], description: [description], display_order: [display_order], status: [status] } = fields;

      let image_path = '';
      let fileName = null;

      const uploadFile = () => {
        let oldPath = files.image[0].filepath;
        fileName = slugify(`portfolio ${name}`) + '.' + files.image[0].originalFilename.split('.')[1];

        let newPath = path.join(process.cwd(), 'public/uploads/portfolio') + '/' + fileName;
        let rawData = fs.readFileSync(oldPath);
        image_path = 'uploads/portfolio/' + fileName;

        const uploadDir = path.join(process.cwd(), 'public/uploads/portfolio');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFile(newPath, rawData, function (err) {
          if (err) console.log(err);
          return newPath;
        });
      };

      if (Object.keys(files).length > 0) {
        const filePath = path.join(process.cwd() + '/public/' + media_path);

        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          }
        });

        uploadFile();
      } else {
        image_path = media_path;
      }

      try {
        await query('UPDATE media SET media = ?, alt = ?, path = ? WHERE id = ?', [fileName ? fileName : image_path.split('uploads/portfolio/')[1], `Portfolio ${name}`, image_path, media_id]);

        let sql = 'UPDATE portfolio SET name = ?, url = ?, description = ?, display_order = ?, status = ?, media_id = ? WHERE id = ?';
        let params = [name, url, description, display_order, status, media_id, id];
        const results = await query(sql, params);

        res.status(200).json({ 
          message: 'Entry updated', 
          data: { 
            ...fields, 
            'media_path': image_path, 
            'status': 1 
          } 
        });
      } catch (error) {
        res.status(500).json({ message: 'Error accessing the database', error: error.message });
      }
    });
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}