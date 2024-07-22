
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
      const { id: [id], media_id: [media_id], media_path: [media_path], model: [model], model_id: [model_id], status: [status], name: [name], para: [para], text: [text] } = fields;

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


      if(Object.keys(files).length > 0){
        const filePath = path.join(process.cwd() + '/public/' + media_path);
        deleteImage(filePath);
        
        // fs.unlink(filePath, (err) => {
        //   if (err) {
        //     console.error('Error deleting file:', err);
        //   }
        // });
        
        // uploadFile();
        image_path = uploadImage(files.image[0], 'points', para);
      } else {
        image_path = media_path;
      }
        
      try {
        updateMediaEntry(fileName ? fileName : image_path.split('uploads/points/')[1], `points ${para}`, image_path, media_id);
        // await query('UPDATE media SET media = ?, alt = ?, path = ? WHERE id = ?', [fileName ? fileName : image_path.split('uploads/points/')[1], `point ${para}`, image_path, media_id]);

        let sql = 'UPDATE points SET model = ?, model_id = ?, status = ?, name = ?, para = ?, text = ?, media_id = ? WHERE id = ?';
        let params = [model, model_id, status, name, para, text, media_id, id];
        const results = await query(sql, params);
        
        res.status(200).json({ message: 'Entry updated', data: { ...fields, 'model': model, 'model_id': model_id, 'name': name, 'para': para, 'text': text, 'media_path': image_path, status: 1 } });
      } catch (error) {
        res.status(500).json({ message: 'Error accessing the database', error: error.message });
      }
    })
  }
}




// import query from '@/lib/db';
// import { slugify } from '@/utils/helper';


// const fs = require('fs');
// const path = require('path');
// const formidable = require('formidable');


// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };


// export default async function handler(req, res) {
  
//   //put
//   if (req.method === 'PUT') {
//     const form = new formidable.IncomingForm();
    
//     form.parse (req, async function (err, fields, files) {
//       const { id: [id], media_id: [media_id], media_path: [media_path], model: [model], model_id: [model_id], status: [status], name: [name], para: [para], text: [text] } = fields;

//       let image_path = '';
//       let fileName = null;
         
//       // const uploadFile = () => {
//       //   let oldPath = files.image[0].filepath;
//       //   fileName = slugify(`point ${para}`) + '.' + files.image[0].originalFilename.split('.')[1];
        
//       //   let newPath = path.join(process.cwd(), 'public/uploads/points') + '/' + fileName;
//       //   let rawData = fs.readFileSync(oldPath)
//       //   image_path = 'uploads/points/' + fileName;
        
//       //   const uploadDir = path.join(process.cwd(), 'public/uploads/points');
        
//       //   if (!fs.existsSync(uploadDir)) {
//       //     fs.mkdirSync(uploadDir, { recursive: true });
//       //   }

//       //   fs.writeFile(newPath, rawData, function (err) {
//       //     if (err) console.log(err)
//       //       return newPath;
//       //   })
//       // }


//       if(Object.keys(files).length > 0){
//         const filePath = path.join(process.cwd() + '/public/' + media_path);

//         deleteImage(filePath);
        
//         // fs.unlink(filePath, (err) => {
//         //   if (err) {
//         //     console.error('Error deleting file:', err);
//         //   }
//         // });
        
//         // uploadFile();
//         image_path = uploadImage(files.image[0], 'points', para);
//       } else {
//         image_path = media_path;
//       }
        
//       try {
//         updateMediaEntry(fileName ? fileName : image_path.split('uploads/points/')[1], `point ${para}`, image_path, media_id);

//         // await query('UPDATE media SET media = ?, alt = ?, path = ? WHERE id = ?', [fileName ? fileName : image_path.split('uploads/points/')[1], `point ${para}`, image_path, media_id]);

//         let sql = 'UPDATE points SET model = ?, model_id = ?, status = ?, name = ?, para = ?, text = ?, media_id = ? WHERE id = ?';
//         let params = [model, model_id, status, name, para, text, media_id, id];
//         const results = await query(sql, params);
        
//         res.status(200).json({ message: 'Entry updated', data: { ...fields, 'model': model, 'model_id': model_id, 'name': name, 'para': para, 'text': text, 'media_path': image_path, status: 1 } });
//       } catch (error) {
//         res.status(500).json({ message: 'Error accessing the database', error: error.message });
//       }
//     })
//   }
// }



const uploadImage = (file, prefix, suffix) => {
  const oldPath = file.filepath;
  const fileName = slugify(`${prefix} ${suffix}`) + '.' + file.originalFilename.split('.')[1];

  console.log('////////////////', fileName);

  const newPath = path.join(process.cwd(), 'public/uploads/', prefix) + '/' + fileName;
  const rawData = fs.readFileSync(oldPath);
  const imagePath = 'uploads/' + prefix + '/' + fileName;

  const uploadDir = path.join(process.cwd(), 'public/uploads/', prefix);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  fs.writeFileSync(newPath, rawData);
  return imagePath;
};

const deleteImage = (imagePath) => {
  const filePath = path.join(process.cwd(), 'public/', imagePath);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const updateMediaEntry = async (fileName, altText, imagePath, mediaId) => {
  const response = await query('UPDATE media SET media = ?, alt = ?, path = ? WHERE id = ?', [fileName, altText, imagePath, mediaId]);
  return response;
};

const insertImage = async (fileName, altText, imagePath) => {
  const response = await query('INSERT INTO `media`(`media`, `alt`, `path`) VALUES (?, ?, ?)', [fileName, altText, imagePath]);
  return response.insertId;
};