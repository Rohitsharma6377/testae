// api/add-client.js

import query from "@/lib/db";
import { slugify } from "@/utils/helper";
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

export const config = {
    api: {
        bodyParser: false
    }
};

export default async function handler(req, res) {
    if (req.method === "POST") {
        const form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
            if (err) {
                return res.status(500).json({ message: "Form parsing error", error: err.message });
            }

            const { brand, name, role, status, display_order } = fields;
            let image_path = "";
            let fileName = "";

            const uploadFile = () => {
                if (!files.image || !files.image[0]) {
                    return;
                }
                const oldPath = files.image[0].filepath;
                fileName = slugify(`client ${brand}`) + "." + files.image[0].originalFilename.split(".").pop();
                const newPath = path.join(process.cwd(), "public/uploads/clients", fileName);
                image_path = "uploads/clients/" + fileName;

                const uploadDir = path.join(process.cwd(), "public/uploads/clients");
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }

                const rawData = fs.readFileSync(oldPath);
                fs.writeFileSync(newPath, rawData);
                
                // Set file permissions to read and write for the owner, and read for others
                fs.chmodSync(newPath, 0o644);
            };

            uploadFile();

            try {
                const response = await query("INSERT INTO `media`(`media`, `alt`, `path`) VALUES (?, ?, ?)", [
                    fileName,
                    `client ${brand}`,
                    image_path
                ]);
                const mediaInsertedId = response.insertId;

                const sql = "INSERT INTO clients (brand, name, role, status, display_order, media_id) VALUES (?, ?, ?, ?, ?, ?)";
                const results = await query(sql, [brand, name, role, status, display_order, mediaInsertedId]);

                res.status(201).json({
                    message: "Entry added",
                    data: { id: results.insertId, brand, name, role, status, display_order, image: image_path }
                });
            } catch (error) {
                res.status(500).json({ message: "Error inserting data", error: error.message });
            }
        });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}