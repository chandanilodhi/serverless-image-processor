"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3ConfigClass = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
class S3ConfigClass {
    constructor() {
        //new S3Client({ region: 'us-east-1', credentials: {...} })`
        //for now local configu
        this.s3Client = new client_s3_1.S3Client({
            region: process.env.region,
            //accessKey: process.env.accessKey,
            //secretKey: process.env.secretKey
        });
    }
    async putObject(params) {
        try {
            return await this.s3Client.send(new client_s3_1.PutObjectCommand({
                Bucket: params.bucketName,
                Key: params.key,
                Body: params.body,
            }));
        }
        catch (e) {
            const error = e;
            console.log("error message in getobject", error.message);
        }
    }
    async getObject(params) {
        try {
            const item = { buketName: params.bucketName };
            //const {Body}
            const Body = this.s3Client.send(new client_s3_1.GetObjectCommand({
                Bucket: "",
                Key: "abc",
            }));
            return Body;
        }
        catch (e) {
            const error = e;
            console.log("error message in getobject", error.message);
        }
    }
    async deleteObject(params) {
        try {
            await this.s3Client.send(new client_s3_1.DeleteObjectCommand({ Bucket: "bucketName", Key: "object.Key" }));
        }
        catch (e) {
            const error = e;
            console.log("error message in deleteObject", error.message);
        }
    }
}
exports.S3ConfigClass = S3ConfigClass;
