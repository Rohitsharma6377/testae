import multer from 'multer';
import fs from 'fs-extra';
import { join } from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
// import { MediaModel } from '@/config/Models/MediaModel';



const upload = multer({ dest: 'uploads/' });

export const config = {
    api: {
        bodyParser: false
    }
}


export default async function media(req, res) {

    // if (req.method == 'POST') {
    //     upload.single('file')(req, res, async (err) => {


    //         try {
    //             if (err) {
    //                 console.error(err);
    //                 return res.status(500).json({ error: 'Error uploading file' });
    //             }

    //             const tempPath = req.file.path;
    //             const targetPath = join('public/uploads/', req.file.originalname);

    //             const success = await fs.move(tempPath, targetPath, { overwrite: true });
 
    //             const { alt, status } = req.body;
    //             const result = new MediaModel({ alt, status, image: tempPath });
    //             result.save()

    //             res.status(200).json({ message: 'File uploaded successfully', path: targetPath });




    //         } catch (error) {
    //             // console.log(error)
    //             res.status(404).send('error')
    //         }

    //     }

    //     )
    // }
    if(req.method=='GET'){
    //     const result = await MediaModel.find({});
    //     res.status(200).send(result)
     }

}