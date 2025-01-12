import {v4 as uuid} from "uuid";
import { DynamodbConfig } from "./config/dynamodb.config";
import { S3ConfigClass } from "./config/s3.config";
import { IgetImage } from "./interface/interface";

export class ImageProcessingController {
  private s3ConfigClass: S3ConfigClass;
  private dynamodbConfig:DynamodbConfig;
  constructor() {
    this.s3ConfigClass = new S3ConfigClass();
    this.dynamodbConfig= new DynamodbConfig()
  }

  uploadImage(request: any) {
    const key = `${request.key}-${uuid()}`;
    const params = {
      bucketName: request.bucket,
      key: key,
      body: request.body,  //
    };
     this.s3ConfigClass.putObject(params);
    //  this.dynamodbConfig.putData(request)

  }

  getImage(request: IgetImage) {
    throw new Error("Method not implemented.");
  }
  deleteImage(request: any) {
    throw new Error("Method not implemented.");
  }
}
