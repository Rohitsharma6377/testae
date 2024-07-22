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

    try {
      const results = await query('SELECT * FROM teams');
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  }


  //add
  else if (req.method === 'POST') {
    
    const form = new formidable.IncomingForm();
    
    // // console.log('form', form);
    form.parse (req, async function (err, fields, files) {

      //// console.log('files', fields);
      let savedPath = {}

      const uploadImage = () => {

        const oldPath = files.image[0].filepath;
        const newPath = path.join(process.cwd(), 'public/uploads/blogs') + '/' + files.image[0].originalFilename;
        const rawData = fs.readFileSync(oldPath);

        savedPath.image = 'uploads/blogs/' + files.image[0].originalFilename;
        
        const uploadDir = path.join(process.cwd(), 'public/uploads/blogs');

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

      
      // saveToDB
      const { name: [name], designation: [designation], status: [status], text: [text] } = fields;

      const params = [name, designation, savedPath.image, status, text];
      
      // // console.log(name);
      // console.log('fields', fields);
  
      try {
        const sql = 'INSERT INTO `teams`(`name`, `designation`, `media_id`, `status`, `text`) VALUES  (?, ?, ?, ?, ?)'
        const results = await query(sql, params);
        res.status(201).json({ message: 'Entry added', data: {
            ...fields, 'media_id': savedPath.image
        } });
      } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
        // console.log(error.message);
      }
    }) 
  }



  //update
  else if (req.method === 'PUT') {
    
    const form = new formidable.IncomingForm();
    
    // // console.log('form', form);
    form.parse (req, async function (err, fields, files) {

      //// console.log('files', fields);
      let savedPath = {}

      const uploadImage = () => {

        const oldPath = files.image[0].filepath;
        const newPath = path.join(process.cwd(), 'public/uploads/blogs') + '/' + files.image[0].originalFilename;
        const rawData = fs.readFileSync(oldPath);

        savedPath.image = 'uploads/blogs/' + files.image[0].originalFilename;
        
        const uploadDir = path.join(process.cwd(), 'public/uploads/blogs');

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

      
      // saveToDB
      const { id: [id], name: [name], designation: [designation], status: [status], text: [text] } = fields;

      let image_path = ''
      
      if(fields.image){
        image_path = fields.image[0];
      }

      const params = [name, designation, savedPath.image ? savedPath.image : image_path, status, text, id];
      
      // // console.log(name);
      // console.log('fields', fields);
  
      try {
        const sql = 'UPDATE `teams` SET `name`=?,`designation`=?,`media_id`=?,`status`=?,`text`=? WHERE `id`=?'
        const results = await query(sql, params);
        res.status(201).json({ message: 'Entry added', data: {
            ...fields, 'media_id': savedPath.image ? savedPath.image : image_path
        } });
      } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
        // console.log(error.message);
      }
    }) 
  }  
}