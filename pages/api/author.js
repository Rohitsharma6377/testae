// pages/api/blog/blogs.js

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
  
  //get author
  if (req.method === 'GET') {
    try {
      const results = await query('SELECT * FROM author');
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  } 


  //post author
  else if (req.method === 'POST') {
    
    const form = new formidable.IncomingForm();
    
    // // console.log('form', form);
    form.parse (req, async function (err, fields, files) {
      // console.log('fields', files);

      let image_path = '';
      
      const uploadFile = () => {
        let oldPath = files.image[0].filepath;
      
        // // console.log('oldpath', oldPath);
        let newPath = path.join(__dirname, 'uploads/authors') + '/' + files.image[0].originalFilename;
        let rawData = fs.readFileSync(oldPath)
        image_path = newPath;
        
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
        const sql = 'INSERT INTO author (title, slug, category, author, meta_title, meta_desc, content, excerpt, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const results = await query(sql, [title, slug, category, author, meta_title, meta_desc, content, excerpt, image_path]);
        res.status(201).json({ message: 'Entry added', data: req.body });
      } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
      }
    }) 
  } 
}
