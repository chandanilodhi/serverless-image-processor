"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverless_http_1 = __importDefault(require("serverless-http"));
const dotenv = __importStar(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
const express_1 = __importDefault(require("express"));
dotenv.config();
const app = (0, express_1.default)();
const upload = (0, multer_1.default)();
const s3Client = new client_s3_1.S3Client();
const authMiddleware = (req, res, next) => {
    const apiKey = req.headers["authorization"];
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
app.get("/imageProcessing/get", (req, res) => {
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
app.get("/imageProcessing/get:userID", (req, res, next) => {
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
const uploadImageHandler = async (req, res) => {
    try {
        const bucketName = process.env.BUCKETNAME || 'image-processing3244f';
        if (!bucketName) {
            res.status(500).json({ error: 'Bucket name is not configured.' });
            return; // Explicitly return after sending response
        }
        console.log('req.file===', req);
        if (!req.file) {
            res.status(400).json({ error: 'No file was uploaded.' });
            return; // Explicitly return after sending response
        }
        const fileKey = `${req.body.key || 'user'}-${(0, uuid_1.v4)()}`;
        const params = {
            Bucket: bucketName,
            Key: fileKey,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };
        console.log('param in upload api', params);
        // Perform the S3 upload
        await s3Client.send(new client_s3_1.PutObjectCommand(params));
        // Send success response
        res.status(200).json({ message: 'File uploaded successfully', fileKey });
    }
    catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Error uploading file to S3' });
    }
};
// Use the explicitly typed handler
app.post('/imageProcessing/upload', upload.single('file'), uploadImageHandler);
app.delete("/imageProcessing/delete:userID", (req, res, next) => {
    // return res.status(200).json({
    //   message: "Hello from root!",
    // });
    res.send("Hello from root!");
    //return this.imageProcessingController.deleteImage(request);
});
module.exports.handler = (0, serverless_http_1.default)(app);
