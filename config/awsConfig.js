require('dotenv').config(); // Ensure dotenv is required to load environment variables

const { S3Client } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID); // Check if environment variable is loaded

module.exports = {
    s3Client,
    bucketName: process.env.AWS_S3_BUCKET,
};
