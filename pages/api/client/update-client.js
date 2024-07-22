
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
      const { id, brand, name, role, status, display_order, media_id } = fields;

      let image_path = '';
      let fileName = null;

      if (Object.keys(files).length > 0) {
        const filePath = path.join(process.cwd(), 'public', fields.media_path[0]);
        deleteImage(filePath);

        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          }
        });

        image_path = uploadImage(files.image[0], 'clients', brand);
      }
      
      if (fields.image) {
        image_path = fields.image[0];
      }

      try {
        const altText = `clients ${name}`;
        if (fileName) {
          await updateMediaEntry(fileName, altText, image_path, media_id);
        }
        
        const sql = 'UPDATE clients SET brand = ?, name = ?, role = ?, status = ?, display_order = ?, media_id = ? WHERE id = ?';
        const params = [brand, name, role, status, display_order, media_id, id];
        await query(sql, params);
        
        res.status(200).json({ message: 'Entry updated', data: { ...fields, image: image_path } });
      } catch (error) {
        res.status(500).json({ message: 'Error accessing the database', error: error.message });
      }
    });
  }
}

const uploadImage = (file, prefix, suffix) => {
  const oldPath = file.filepath;
  const fileName = slugify(`${prefix} ${suffix}`) + '.' + file.originalFilename.split('.')[1];

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

const insertMediaEntry = async (fileName, altText, imagePath) => {
  const response = await query('INSERT INTO `media`(`media`, `alt`, `path`) VALUES (?, ?, ?)', [fileName, altText, imagePath]);
  return response.insertId;
};



















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
//       const { id: [id], brand: [brand], name: [name], role: [role], status: [status], display_order: [display_order], media_id : [media_id] } = fields;

//       let image_path = '';
//       let fileName = null;
      
//       const uploadFile = () => {
//         let oldPath = files.image[0].filepath;
//         fileName = slugify(`client ${brand}`) + '.' + files.image[0].originalFilename.split('.')[1];
      
//         let newPath = path.join(process.cwd(), 'public/uploads/clients') + '/' + fileName;
//         let rawData = fs.readFileSync(oldPath)
//         image_path = 'uploads/clients/' + fileName;
        
//         const uploadDir = path.join(process.cwd(), 'public/uploads/clients');

//         if (!fs.existsSync(uploadDir)) {
//           fs.mkdirSync(uploadDir, { recursive: true });
//         }

//         fs.writeFile(newPath, rawData, function (err) {
//           if (err) console.log(err)
//           return newPath;
//         })
//       }

      
//       if(Object.keys(files).length > 0){
//         const filePath = path.join(process.cwd() + '/public/' + fields.media_path[0]);
//         deleteImage(filePath);

//         fs.unlink(filePath, (err) => {
//           if (err) {
//             console.error('Error deleting file:', err);
//           }
//         });
        
//         // image_path = uploadImage(files.image[0], 'clients', brand);
//         uploadFile();
//       }


//       if (fields.image) {
//         image_path = fields.image[0];
//       }
  
//       try {
//         await query('UPDATE media SET media = ?, alt = ?, path = ? WHERE id = ?', [fileName ? fileName : image_path.split('uploads/clients/')[1], `client ${name}`, image_path, media_id]);
//         // let mediaInsertedId = null;
//         // insertMediaEntry(fileName, `client ${brand}`, image_path)
//         // const response = await query('INSERT INTO `media`(`media`, `alt`, `path`) VALUES (?, ?, ?)', [fileName, `client ${brand}`, image_path]);
//         // mediaInsertedId = response.insertId;
//         // mediaInsertedId = insertMediaEntry(fileName, `clients ${brand}`, image_path);

//         let sql = 'UPDATE clients SET brand = ?, name = ?, role = ?, status = ?, display_order =?, media_id = ? WHERE id = ?';
//         // let params = [brand, name, role, status, display_order, mediaInsertedId, id];
//         let params = [brand, name, role, status, display_order, media_id, id];
//         const results = await query(sql, params);
        
//         res.status(200).json({ message: 'Entry updated', data: { ...fields, 'image': image_path } });
//       } catch (error) {
//         res.status(500).json({ message: 'Error accessing the database', error: error.message });
//       }
//     })
//   }
// }




// const uploadImage = (file, prefix, suffix) => {
//   const oldPath = file.filepath;
//   const fileName = slugify(`${prefix} ${suffix}`) + '.' + file.originalFilename.split('.')[1];

//   const newPath = path.join(process.cwd(), 'public/uploads/', prefix) + '/' + fileName;
//   const rawData = fs.readFileSync(oldPath);
//   const imagePath = 'uploads/' + prefix + '/' + fileName;

//   const uploadDir = path.join(process.cwd(), 'public/uploads/', prefix);
//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//   }

//   fs.writeFileSync(newPath, rawData);

//   return imagePath;
// };

// const deleteImage = (imagePath) => {
//   const filePath = path.join(process.cwd(), 'public/', imagePath);
//   if (fs.existsSync(filePath)) {
//     fs.unlinkSync(filePath);
//   }
// };

// const updateMediaEntry = async (fileName, altText, imagePath, mediaId) => {
//   const response = await query('UPDATE media SET media = ?, alt = ?, path = ? WHERE id = ?', [fileName, altText, imagePath, mediaId]);
//   return response;
// };

// const insertMediaEntry = async (fileName, altText, imagePath) => {
//   const response = await query('INSERT INTO `media`(`media`, `alt`, `path`) VALUES (?, ?, ?)', [fileName, altText, imagePath]);
//   return response.insertId;
// };