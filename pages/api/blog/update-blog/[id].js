// pages/api/updateBlog.js

import query from '@/lib/db';

const fs = require('fs');
const path = require('path');
const formidable = require('formidable');


export const config = {
  api: {
    bodyParser: false,
  },
};


export default async function handler(req, res) {
  
  //get 
  if (req.method === 'GET') {

    const {id} = req.query;

    // // console.log(req);
    try {
      const results = await query('SELECT * FROM blogs where id = ?', [id]);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  }


  //put 
  else if (req.method === 'PUT') {

    const {id} = req.query;

    const form = new formidable.IncomingForm();
    
    // // console.log('form', form);
    form.parse (req, async function (err, fields, files) {

      // console.log('fields11111111111111', files, fields);

      let image_path = '';
      
      const uploadFile = () => {
        let oldPath = files.image[0].filepath;

        // console.log(oldPath);
      
        let newPath = path.join(process.cwd(), 'public/uploads/blogs') + '/' + files.image[0].originalFilename;
        let rawData = fs.readFileSync(oldPath)
        image_path = 'uploads/blogs/' + files.image[0].originalFilename;

        
        const uploadDir = path.join(process.cwd(), 'public/uploads/blogs');

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFile(newPath, rawData, function (err) {
          if (err) console.log(err)
          return newPath;
        })
      }


      if(Object.keys(files).includes('image')){
        uploadFile();

        // console.log(files);
      }


      // saveToDB
      const { title: [title], slug: [slug], category: [category], author: [author], meta_title: [meta_title], meta_desc: [meta_desc], content: [content], excerpt: [excerpt] } = fields;

      if(fields.image){
        image_path = fields.image[0];
      }
      // // console.log(title);
  
      try {
        let sql = 'UPDATE blogs SET title = ?, slug = ?, category = ?, author = ?, meta_title = ?, meta_desc = ?, content = ?, excerpt = ?, image_path = ? WHERE id = ?';
        let params = [title, slug, category, author, meta_title, meta_desc, content, excerpt, image_path ? image_path : image, id];

        const results = await query(sql, params);
        
        res.status(200).json(results);
      } catch (error) {
        res.status(500).json({ message: 'Error accessing the database', error: error.message });
      }
    })
  }
  
  
  // post single blog
  else if(req.method === 'POST'){
    const form = new formidable.IncomingForm();
    
    // // console.log('form', form);
    form.parse (req, async function (err, fields, files) {
      // console.log('fields11111111111111', files, fields);

      let image_path = '';
      
      const uploadFile = () => {
        let oldPath = files.image[0].filepath;
      
        let newPath = path.join(process.cwd(), 'public/uploads/blogs') + '/' + files.image[0].originalFilename;
        let rawData = fs.readFileSync(oldPath)
        image_path = 'uploads/blogs/' + files.image[0].originalFilename;

        
        const uploadDir = path.join(process.cwd(), 'public/uploads/blogs');

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFile(newPath, rawData, function (err) {
          if (err) console.log(err)
          return newPath;
        })
      }
      
      uploadFile();


      // saveToDB
      const { title: [title], slug: [slug], category: [category], author: [author], meta_title: [meta_title], meta_desc: [meta_desc], content: [content], excerpt: [excerpt] } = fields;
      // // console.log(title);
  
      try {
        const sql = 'INSERT INTO blogs (title, slug, category, author, meta_title, meta_desc, content, excerpt, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const results = await query(sql, [title, slug, category, author, meta_title, meta_desc, content, excerpt, image_path]);
        res.status(201).json({ message: 'Entry added', data: req.body, image_path: image_path });
      } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
      }
    }) 
  }
}