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

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'Error parsing form', error: err.message });
      }

      const {
        id: [id],
        name: [name],
        url: [url],
        model: [model],
        sitemap: [sitemap],
        schema: [schema],
        status: [status],
        meta_title: [meta_title],
        meta_description: [meta_description],
        faq_title: [faq_title],
        faq_description: [faq_description],
        testimonial_title: [testimonial_title],
        testimonial_description: [testimonial_description],
        content: [content],
        media_id: [media_id],
        cover_id: [cover_id],
      } = fields;

      let savedPath = {
        image: null,
        cover: null,
      };

      let fileName = {
        image: null,
        cover: null,
      };

      const uploadFile = (file, type) => {
        const oldPath = file[0].filepath;
        fileName[type] = slugify(`${type} ${name}.${file[0].originalFilename.split('.')[1]}`, { lower: true });
        const newPath = path.join(process.cwd(), 'public/uploads/pages', fileName[type]);
        const rawData = fs.readFileSync(oldPath);
        savedPath[type] = `uploads/pages/${fileName[type]}`;

        const uploadDir = path.join(process.cwd(), 'public/uploads/pages');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFileSync(newPath, rawData);
      };

      if (files.image) {
        if (fields.image_path) {
          const filePath = path.join(process.cwd(), 'public', fields.image_path[0]);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
        uploadFile(files.image, 'image');
      }

      if (files.cover) {
        if (fields.cover_path) {
          const filePath = path.join(process.cwd(), 'public', fields.cover_path[0]);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
        uploadFile(files.cover, 'cover');
      }

      try {
        if (savedPath.image) {
          await query('UPDATE media SET media = ?, alt = ?, path = ? WHERE id = ?', [fileName.image, `page ${name}`, savedPath.image, media_id]);
        }

        if (savedPath.cover) {
          await query('UPDATE media SET media = ?, alt = ?, path = ? WHERE id = ?', [fileName.cover, `cover ${name}`, savedPath.cover, cover_id]);
        }

        const results1 = await query('SELECT p.*, m.id AS meta_id, m.url AS meta_url FROM PAGES p LEFT JOIN METATAGS m ON p.url = m.url WHERE p.id=?', [id]);
        const meta_id = results1[0].meta_id;

        await query('UPDATE `pages` SET `name`=?, `url`=?, `model`=?, `sitemap`=?, `schema`=?, `status`=?, `content`=? WHERE id=?', [name, url, model, sitemap, schema, status, content, id]);
        await query('UPDATE `page_details` SET `faq_title`=?, `faq_description`=?, `testimonial_title`=?, `testimonial_description`=? WHERE page_id=?', [faq_title, faq_description, testimonial_title, testimonial_description, id]);
        await query('UPDATE `metatags` SET `url`=?, `meta_title`=?, `meta_description`=? WHERE id=?', [url, meta_title, meta_description, meta_id]);

        res.status(200).json({ message: 'Page updated successfully', data: req.body });
      } catch (error) {
        res.status(500).json({ message: 'Error updating data', error: error.message });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}