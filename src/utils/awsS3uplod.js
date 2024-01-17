import fs from 'fs';
import AWS from 'aws-sdk';


// Configure AWS credentials
AWS.config.update({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION
    
});

async function uploadToS3(filepath, filename, image = false) {
    
 try {

    
    // Create an instance of the S3 service
    const s3 = new AWS.S3();


    // Read the file stream
    const fileStream = fs.createReadStream(filepath);
    let params = null;

    // Define the parameters for the upload
    if(image){
        params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `images/${filename}`,
            Body: fileStream
        };
    }else{
        params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `videos/${filename}`,
            Body: fileStream
        };
    }
   
    //console.log("params : ",params);
    // Upload the object to the S3 bucket
    const data = await s3.upload(params).promise();
    fs.unlinkSync(filepath);
    //console.log("data : ",data);
    return data;
} catch (error) {
    fs.unlinkSync(filepath);
    console.log("upload error : ",error);
    return null;
}
}

export default uploadToS3;