import serverless from "serverless-http";
import * as dotenv from 'dotenv';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import express, { NextFunction, Request, Response ,RequestHandler } from "express";
import { ImageProcessingController } from "./constroller";
dotenv.config();
const app = express();
const upload = multer();
const s3Client = new S3Client()

interface AuthenticatedRequest extends Request {
  userId?: "string";
}
const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const apiKey: string | undefined = req.headers["authorization"];
  if (!apiKey) {
    res.status(401).json({ message: "api key is missing" });
    return;
  }
  if (apiKey != process.env.APIKEY) {
    res.status(403).json({ message: "Invalid api key" });
    return;
  }
  next();
};

app.use(authMiddleware);
app.get("/imageProcessing/get", (req: Request, res: Response): void => {
  // return res.status(200).json({
  //   message: "Hello from root!",
  // });
  res.send("Hello from root!");
//  const bucketName_= process.env.BUCKETNAME;
//  const request={
//   bucketName:bucketName_||'',
//   key:req.body.key||'user'
//  }
//   const result = new ImageProcessingController().getImage(request);
//   res.send(result);
});

app.get("/imageProcessing/get:userID", (req: Request, res: Response, next) => {
  // return res.status(200).json({
  //   message: "Hello from path!",
  // });
  res.send("Hello from path!");
  // const res = this.imageProcessingController.getImage(request);
  //   return res;
  //return this.imageProcessingController.uploadImage(request);`
});

// app.post("/imageProcessing/upload", (req: Request, res: Response, next) => {
//   // return res.status(200).json({
//   //   message: "Hello from path!",
//   // });
//   //res.send("Hello from path!");
//   const bucketName_= process.env.BUCKETNAME;
//   const request={
//    bucketName:bucketName_||'',
//    key:req.body.key||'user'
//   }
  
//    new ImageProcessingController().uploadImage(request);

//   res.send('successfully saved data')
// });


// Define the handler with explicit RequestHandler type
const uploadImageHandler: RequestHandler = async (req, res) => {
  try {
    const bucketName = process.env.BUCKETNAME || 'image-processing3244f';

    if (!bucketName) {
      res.status(500).json({ error: 'Bucket name is not configured.' });
      return; // Explicitly return after sending response
    }
console.log('req.file===',req)
    if (!req.file) {
      res.status(400).json({ error: 'No file was uploaded.' });
      return; // Explicitly return after sending response
    }

    const fileKey = `${req.body.key || 'user'}-${uuid()}`;
    const params = {
      Bucket: bucketName,
      Key: fileKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
console.log('param in upload api',params)
    // Perform the S3 upload
    await s3Client.send(new PutObjectCommand(params));

    // Send success response
    res.status(200).json({ message: 'File uploaded successfully', fileKey });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Error uploading file to S3' });
  }
};

// Use the explicitly typed handler
app.post('/imageProcessing/upload', upload.single('file'), uploadImageHandler);




app.delete(
  "/imageProcessing/delete:userID",
  (req: Request, res: Response, next) => {
    // return res.status(200).json({
    //   message: "Hello from root!",
    // });
    res.send("Hello from root!");
    //return this.imageProcessingController.deleteImage(request);
  }
);

module.exports.handler = serverless(app);
