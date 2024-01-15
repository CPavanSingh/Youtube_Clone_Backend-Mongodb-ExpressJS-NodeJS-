import fs from 'fs';
import AWS from 'aws-sdk';


// Configure AWS credentials
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION
});

async function uploadToS3(filepath, image = false) {
    
 try {
    // Create an instance of the S3 service
    const s3 = new AWS.S3();

    // Read the file stream
    const fileStream = fs.createReadStream(filepath);

    // Define the parameters for the upload
    if(image){
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `images/${fileStream.name}`,
            Body: fileStream
        };
    }else{
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `videos/${fileStream.name}`,
            Body: fileStream
        };
    }
   

    // Upload the object to the S3 bucket
    s3.upload(params, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Object uploaded successfully:', data.Location);
            fs.unlinkSync(filepath);
            return data;
        }
    });
} catch (error) {
    fs.unlinkSync(filepath);
    return null;
}
}

export default uploadToS3;