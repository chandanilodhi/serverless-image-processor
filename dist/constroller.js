"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProcessingController = void 0;
const uuid_1 = require("uuid");
const dynamodb_config_1 = require("./config/dynamodb.config");
const s3_config_1 = require("./config/s3.config");
class ImageProcessingController {
    constructor() {
        this.s3ConfigClass = new s3_config_1.S3ConfigClass();
        this.dynamodbConfig = new dynamodb_config_1.DynamodbConfig();
    }
    uploadImage(request) {
        const key = `${request.key}-${(0, uuid_1.v4)()}`;
        const params = {
            bucketName: request.bucket,
            key: key,
            body: request.body, //
        };
        this.s3ConfigClass.putObject(params);
        //  this.dynamodbConfig.putData(request)
    }
    getImage(request) {
        throw new Error("Method not implemented.");
    }
    deleteImage(request) {
        throw new Error("Method not implemented.");
    }
}
exports.ImageProcessingController = ImageProcessingController;
