// const Contact = require('../models/contact');
// const { s3, bucketName } = require('../config/awsConfig');
// const fs =require('fs')

// const createContact = async (req, res) => {
//     try {
//         const { name, email, phoneNumber, subject, message } = req.body;
//         const newContact = new Contact({
//             name,
//             email,
//             phoneNumber,
//             subject,
//             message
//         });

//         await newContact.save();
//         res.status(201).json({ message: 'Contact information submitted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };

// const imageUpload = async (req, res) => {
//     try {
//         console.log(req.body)
//         const file = req.files.file; // Access the file uploaded by multer

//         // Read the file stream from the temporary file saved by multer
//         const fileStream = fs.createReadStream(file.path);

//         const params = {
//             Bucket: bucketName,
//             Key: Date.now().toString() + '-' + file.originalname, // Use the original file name
//             Body: fileStream,
//             ContentType: file.mimetype,
//             ACL: 'public-read', // Access control list
//         };

//         const command = new PutObjectCommand(params);
//         const response = await s3Client.send(command);

//         // Cleanup the temp file after upload
//         fs.unlinkSync(file.path);

//         res.send({ message: 'File uploaded successfully', fileUrl: `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}` });
//     } catch (err) {
//         console.error('File upload failed:', err);
//         res.status(500).send({ error: "File upload failed", details: err.message });
//     }
// };

// module.exports = { createContact,imageUpload };

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const Busboy = require('busboy');
const { Upload } = require('@aws-sdk/lib-storage');
const { PassThrough } = require('stream');
require('dotenv').config();

// Initialize S3 Client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const bucketName = process.env.AWS_S3_BUCKET;

// Image upload controller
const imageUpload = (req, res) => {
    const busboy = Busboy({ headers: req.headers });

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        // console.log(`Uploading: ${filename}`);
        console.log(`File object received:`, { fieldname, filename, encoding, mimetype });

        // Create a PassThrough stream to pipe the file data to S3

        mimetype=filename.mimeType
        if (filename && filename.filename) {
            filename = filename.filename;
        }
        

        const pass = new PassThrough();
        file.pipe(pass);

        const uploadParams = {
            Bucket: bucketName,
            Key: `profilePic/${Date.now().toString()}-${filename}`,
            Body: pass,
            ContentType: mimetype,
            ACL: 'public-read',
        };
        // console.log(uploadParams,"............../")
        const upload = new Upload({
            client: s3Client,
            params: uploadParams,
        });
        // console.log("upload return",upload)
        upload.done()
            .then(() => {
                const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

                console.log(`Successfully uploaded ${filename}`,fileUrl);
            })
            .catch(err => {
                console.error(`Failed to upload ${filename}:`, err);
                res.status(500).send({ error: "File upload failed", details: err.message });
            });
    });

    busboy.on('finish', () => {
        

                res.send({ message: 'File uploaded successfully'});

    });

    req.pipe(busboy);
};

const createContact = async (req, res) => {
    try {
        const { name, email, phoneNumber, subject, message } = req.body;
        const newContact = new Contact({
            name,
            email,
            phoneNumber,
            subject,
            message
        });

        await newContact.save();
        res.status(201).json({ message: 'Contact information submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { imageUpload ,createContact };
