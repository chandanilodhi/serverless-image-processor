import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
//import 'dotenv/config'
import { IgetImage, IuploadImage } from "../interface/interface";

export class S3ConfigClass {
  constructor() {}
  //new S3Client({ region: 'us-east-1', credentials: {...} })`
  //for now local configu

  s3Client = new S3Client({
    region: process.env.region,
    //accessKey: process.env.accessKey,
    //secretKey: process.env.secretKey
  });

  async putObject(params: IuploadImage) {
    try {
      return await this.s3Client.send(
        new PutObjectCommand({
          Bucket: params.bucketName,
          Key: params.key,
          Body: params.body,
        })
      );
    } catch (e) {
      const error= e as Error;
      console.log("error message in getobject", error.message);
    }
  }

  async getObject(params: IgetImage) {
    try {
      const item = { buketName: params.bucketName };
      //const {Body}
      const Body = this.s3Client.send(
        new GetObjectCommand({
          Bucket: "",
          Key: "abc",
        })
      );
      return Body;
    } catch (e) {
      const error= e as Error;
      console.log("error message in getobject", error.message);
    }
  }

  async deleteObject(params: any) {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({ Bucket: "bucketName", Key: "object.Key" })
      );
    } catch (e) {
      const error= e as Error;
      console.log("error message in deleteObject", error.message);
    }
  }
}
