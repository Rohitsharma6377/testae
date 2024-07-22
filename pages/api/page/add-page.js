
import query from '@/lib/db';
import { image } from '@nextui-org/react';
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

  //post pages
  if (req.method === 'POST') {
    
    const form = new formidable.IncomingForm();
    
    form.parse (req, async function (err, fields, files) {
      const { name: [name], url: [url], model: [model], sitemap: [sitemap], schema: [schema], status: [status], meta_title: [meta_title], meta_description: [meta_description], faq_title: [faq_title], faq_description: [faq_description], testimonial_title: [testimonial_title], testimonial_description: [testimonial_description], content: [content] } = fields;
      

      let savedPath = {
        image: null,
        cover: null
      }

      let fileName = {
        image: null,
        cover: null
      }

      const uploadImage = () => {
        const oldPath = files.image[0].filepath;
        fileName.image = slugify(`page ${name}`) + '.' + files.image[0].originalFilename.split('.')[1];

        const newPath = path.join(process.cwd(), 'public/uploads/pages') + '/' + fileName.image;
        const rawData = fs.readFileSync(oldPath);

        savedPath.image = 'uploads/pages/' + fileName.image;
        
        const uploadDir = path.join(process.cwd(), 'public/uploads/pages');

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFile(newPath, rawData, function (err) {
          if (err) console.log(err)
        })
      }


      const uploadCover = () => {
        const oldPath = files.cover[0].filepath;
        fileName.cover = slugify(`cover ${name}`) + '.' + files.cover[0].originalFilename.split('.')[1];

        const newPath = path.join(process.cwd(), 'public/uploads/pages') + '/' + fileName.cover;
        const rawData = fs.readFileSync(oldPath);

        savedPath.cover = 'uploads/pages/' + fileName.cover;
        
        const uploadDir = path.join(process.cwd(), 'public/uploads/pages');

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFile(newPath, rawData, function (err) {
          if (err) console.log(err)
        })
      }

      if(Object.keys(files).includes('image')){
        uploadImage();
      }
      
      if(Object.keys(files).includes('cover')){
        uploadCover();
      }


      try {

        const mediaInsertedId = {
          image: null,
          cover: null
        }

        if(savedPath.image) {
          const response = await query('INSERT INTO `media`(`media`, `alt`, `path`) VALUES (?, ?, ?)', [savedPath.image.split('uploads/pages/')[1], `page ${name}`, savedPath.image]);
          mediaInsertedId.image = response.insertId;
        }
        if(savedPath.cover) {
          const response = await query('INSERT INTO `media`(`media`, `alt`, `path`) VALUES (?, ?, ?)', [savedPath.cover.split('uploads/pages/')[1], `cover ${name}`, savedPath.cover]);
          mediaInsertedId.cover = response.insertId;
        }

        const sql1 = 'INSERT INTO `pages`(`name`, `url`, `model`, `sitemap`, `schema`, `status`, `media_id`, `cover_id`, `content`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        const results1 = await query(sql1, [name, url, model, sitemap, schema, status, savedPath.image ? mediaInsertedId.image : null, savedPath.cover ? mediaInsertedId.cover : null, content]);
        const page_id = results1.insertId;


        const sql2 = 'INSERT INTO `page_details`(`page_id`, `faq_title`, `faq_description`, `testimonial_title`, `testimonial_description`) VALUES (?, ?, ?, ?, ?)'
        const results2 = await query(sql2, [page_id, faq_title, faq_description, testimonial_title, testimonial_description]);


        const sql3 = 'INSERT INTO `metatags`(`url`, `meta_title`, `meta_description`,`media_id`) VALUES (?, ?, ?, ?)'
        const results3 = await query(sql3, [url, meta_title, meta_description, null]);

        res.status(201).json({ message: 'Entry added', data: { ...fields, id: results1.insertId }});

      } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
        console.log(error.message);
      }
    })
  }


  //update page
  else if (req.method === 'PUT') {

    const form = new formidable.IncomingForm();
    
    form.parse (req, async function (err, fields, files) {

      let savedPath = {}

      const uploadImage = () => {

        const oldPath = files.image[0].filepath;
        const newPath = path.join(process.cwd(), 'public/uploads/pages') + '/' + files.image[0].originalFilename;
        const rawData = fs.readFileSync(oldPath);

        savedPath.image = 'uploads/pages/' + files.image[0].originalFilename;
        
        const uploadDir = path.join(process.cwd(), 'public/uploads/pages');

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFile(newPath, rawData, function (err) {
          if (err) console.log(err)
        })
      }
      
      if(Object.keys(files).includes('image')){
        uploadImage();
      }
      

      const uploadCover = () => {

        const oldPath = files.cover[0].filepath;
        const newPath = path.join(process.cwd(), 'public/uploads/pages') + '/' + files.cover[0].originalFilename;
        const rawData = fs.readFileSync(oldPath);

        savedPath.cover = 'uploads/pages/' + files.cover[0].originalFilename;
        
        const uploadDir = path.join(process.cwd(), 'public/uploads/pages');

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFile(newPath, rawData, function (err) {
          if (err) console.log(err)
        })
      }
      
      if(Object.keys(files).includes('cover')){
        uploadCover();
      }


      // console.log('fields', fields);
      // saveToDB
      const { id: [id], name: [name], url: [url], model: [model], sitemap: [sitemap], schema: [schema], status: [status], meta_title: [meta_title], meta_description: [meta_description], faq_title: [faq_title], faq_description: [faq_description], testimonial_title: [testimonial_title], testimonial_description: [testimonial_description], content: [content] } = fields;

      let image_path = ''
      let cover_path = ''

      if(fields.image){
        image_path = fields.image[0];
      }

      if(fields.cover){
        cover_path = fields.cover[0];
      }

      try {

        const results1 = await query('SELECT p.*, m.id AS meta_id, m.url AS meta_url FROM PAGES p LEFT JOIN METATAGS m ON p.url = m.url WHERE p.id=?', [id]);

        const meta_id = results1[0].meta_id;

        const results2 = await query('UPDATE `pages` SET `name`=?, `url`=?, `model`=?, `sitemap`=?, `schema`=?, `status`=?, `media_id`=?, `cover_id`=?, `content`=? WHERE id=?', [name, url, model, sitemap, schema, 1, 1, 1, content, id]);

        const results3 = await query('UPDATE `page_details` SET `page_id`=?, `faq_title`=?, `faq_description`=?, `testimonial_title`=?, `testimonial_description`=? WHERE page_id=?', [id, faq_title, faq_description, testimonial_title, testimonial_description, id]);

        const results4 = await query('Update `metatags` SET `url`=?, `meta_title`=?, `meta_description`=?,`media_id`=? WHERE id=?', [url, meta_title, meta_description, 1, meta_id]);
        
        res.status(201).json({ message: 'Entry added', data: req.body });
      } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
      }
    }) 
  }
}