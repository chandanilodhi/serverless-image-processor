"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamodbConfig = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
class DynamodbConfig {
    // private dynamodbClient: AWS.DynamoDB.DocumentClient;
    constructor() {
        this.dynamoDbClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
        aws_sdk_1.default.config.update({
            region: "us-east-1",
            accessKeyId: "andnn",
            secretAccessKey: "sjakks",
        });
    }
    async getData(userID) {
        try {
            const param = {
                TableName: process.env.dynamodbTable || 'Image_Store_Table',
                Key: { userID: userID },
            };
            //const { data }
            const data = await this.dynamoDbClient.get(param);
            //const { artistName, codyRight, imageDescription } = data;
            console.log("item retrive from db ", data);
            //return { artistName, codyRight, imageDescription };
            return data;
        }
        catch (e) {
            const error = e;
            console.log("error in getitem method", error.message);
            //throw new error(error.message);
        }
    }
    async putData(request) {
        try {
            const param = {
                TableName: process.env.dynamodbTable || 'Image_Store_Table',
                Item: {
                    artistName: request.body.artistName,
                    codyRight: request.body.copyRight,
                    imageDescription: request.body.imageDescription,
                },
            };
            this.dynamoDbClient.put(param);
        }
        catch (e) {
            const error = e;
            console.log("error in putdata dynamodb", error.message);
            //throw new Error(error.message);
        }
    }
    async getAllData() {
        const param = {
            TableName: process.env.dynamodbTable || 'Image_Store_Table'
        };
        try {
            const data = this.dynamoDbClient.scan(param);
            return data;
        }
        catch (e) {
            const error = e;
            console.log("error in getAlldata in dynamodb", error.message);
            // throw new Error(error.message);
        }
    }
    async deleteData(userID) {
        const param = {
            TableName: process.env.dynamodbTable || 'Image_Store_Table',
            Key: { userID },
        };
        try {
            await this.dynamoDbClient.delete(param);
        }
        catch (e) {
            const error = e;
            console.log("error in delete data in dynamodb", error.message);
            throw new Error('error');
        }
    }
}
exports.DynamodbConfig = DynamodbConfig;
