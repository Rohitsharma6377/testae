// pages/api/technologies.js

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
  
  // get all services
  if (req.method === 'GET') {
    try {
      const results = await query(
        `SELECT t.id, t.name, t.url, t.media_id, t.status, t.display_order, m.path AS media_path
         FROM technologies t
         JOIN media m ON t.media_id = m.id
        `);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  }


  // add service
  else if(req.method === 'POST'){
    const form = new formidable.IncomingForm();
    
    // // console.log('form', form);
    form.parse (req, async function (err, fields, files) {
      // // console.log('fields', files);

      let image_path = null;
      let image_filename = null;
      
      const uploadFile = () => {
        let oldPath = files.image[0].filepath;
      
        let newPath = path.join(process.cwd(), 'public/uploads/blogs') + '/' + files.image[0].originalFilename;
        let rawData = fs.readFileSync(oldPath)
        image_path = 'uploads/blogs/' + files.image[0].originalFilename;
        image_filename = files.image[0].originalFilename;

        
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
    
    
    const { name: [name], url: [url], display_order: [display_order], status: [status] } = fields;


    let media_id = null;

    try {
        const sql = 'INSERT INTO media (media, alt, path) VALUES (?, ?, ?)';
        const params = [image_filename, `Service ${name}`, image_path];

        const results = await query(sql, params);

        if(results) {
            media_id = results.insertId;
        }
        
        // res.status(201).json({ message: 'Entry added', data: results});
    } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
    }


    
    // console.log("fields", fields);
    // console.log("image_path", image_path);
    
    // saveToDB
      try {
        const sql = 'INSERT INTO technologies (name, url, display_order, status, media_id) VALUES (?, ?, ?, ?, ?)';
        const results = await query(sql, [name, url, display_order, status, media_id]);
        res.status(201).json({ message: 'Entry added', data: {
          ...fields, 'id': results.insertId, 'media_path': image_path
        } });
      } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
      }
    }) 
  }



  // update service
  else if(req.method === 'PUT'){
    const form = new formidable.IncomingForm();
    
    // // console.log('form', form);
    form.parse (req, async function (err, fields, files) {
      // // console.log('fields', fields);
      // // console.log('files', files);

      let image_path = null;
      let image_filename = null;
      
      const uploadFile = () => {
        let oldPath = files.image[0].filepath;
      
        let newPath = path.join(process.cwd(), 'public/uploads/blogs') + '/' + files.image[0].originalFilename;
        let rawData = fs.readFileSync(oldPath)
        image_path = 'uploads/blogs/' + files.image[0].originalFilename;
        image_filename = files.image[0].originalFilename;

        
        const uploadDir = path.join(process.cwd(), 'public/uploads/blogs');

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFile(newPath, rawData, function (err) {
          if (err) console.log(err)
          return newPath;
        })
    }
    
    
    const { id: [id], name: [name], url: [url], display_order: [display_order], status: [status], media_id: [media_id], media_path: [media_path] } = fields;
    


    let new_id = null;
    // let media_id = null;
    
    if(Object.keys(files).includes('image')){
        uploadFile();
    
        try {
            const sql = 'INSERT INTO media (media, alt, path) VALUES (?, ?, ?)';
            const params = [image_filename, `Service ${name}`, image_path];
    
            const results = await query(sql, params);
    
            if(results) {
              new_id = results.insertId;
            }
            
            // res.status(201).json({ message: 'Entry added', data: results});
        } catch (error) {
            res.status(500).json({ message: 'Error inserting data', error: error.message });
        }
    }
    
    // console.log("fields", fields);
    // console.log("image_path", image_path);


    // if(fields.media_id){
    //     image_path = fields.media_id[0];
    // }
    
    // saveToDB
      try {
        const sql = 'UPDATE technologies SET name = ?, url = ?, display_order = ?, status = ?, media_id = ? WHERE id = ?';
        const results = await query(sql, [name, url, display_order, status, new_id ? new_id : media_id, id]);
        res.status(201).json({ message: 'Entry added', data: {
          ...fields, 'media_path': image_path ? image_path : media_path
        } });
      } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
      }
    }) 
  }
}