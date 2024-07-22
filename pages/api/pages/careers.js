
import query from '@/lib/db';


export default async function handler(req, res) {
  
  //get 
  if (req.method === 'GET') {
    try {
      const results = await query('SELECT * FROM careers');
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  }


//   // post
//   else if(req.method === 'POST'){
//     const form = new formidable.IncomingForm();
    
//     // // console.log('form', form);
//     form.parse (req, async function (err, fields, files) {
//       // // console.log('fields', files);

//       let image_path = '';
      
//       const uploadFile = () => {
//         let oldPath = files.image[0].filepath;
      
//         let newPath = path.join(process.cwd(), 'public/uploads/blogs') + '/' + files.image[0].originalFilename;
//         let rawData = fs.readFileSync(oldPath)
//         image_path = 'uploads/blogs/' + files.image[0].originalFilename;

        
//         const uploadDir = path.join(process.cwd(), 'public/uploads/blogs');

//         if (!fs.existsSync(uploadDir)) {
//           fs.mkdirSync(uploadDir, { recursive: true });
//         }

//         fs.writeFile(newPath, rawData, function (err) {
//           if (err) console.log(err)
//           return newPath;
//         })
//       }
      
//       uploadFile();


//       // saveToDB
//       const { name: [name], role: [role], status: [status] } = fields;
//       // // console.log(title);
  
//       try {
//         const sql = 'INSERT INTO clients (name, role, status, image) VALUES (?, ?, ?, ?)';
//         const results = await query(sql, [name, role, status, image_path]);
//         res.status(201).json({ message: 'Entry added', data: {
//           ...fields, 'image': image_path
//         } });
//       } catch (error) {
//         res.status(500).json({ message: 'Error inserting data', error: error.message });
//       }
//     }) 
//   }


  //put 
  else if (req.method === 'PUT') {

    // console.log(req.body);
    const { id, user_id, name, email, phone, resume, cover, subject, message, admin_remarks, status } = req.body;

    try {
        let sql = 'UPDATE careers SET user_id = ?, name = ?, email = ?, phone = ?, resume = ?, cover = ?, subject = ?, message = ?, admin_remarks = ?, status = ? WHERE id = ?';
        let params = [user_id, name, email, phone, resume, cover, subject, message, admin_remarks, status, id];
        const results = await query(sql, params);
        res.status(200).json({ message: 'Entry updated', data: req.body });
    } 
    catch (error) {
        res.status(500).json({ message: 'Error accessing the database', error: error.message });
    }
  }
}