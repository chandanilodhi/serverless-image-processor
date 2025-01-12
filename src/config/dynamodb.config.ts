import AWS from "aws-sdk";
import { request } from "express";

export class DynamodbConfig {
 // private dynamodbClient: AWS.DynamoDB.DocumentClient;
  constructor() {
    AWS.config.update({
      region: "us-east-1",
      accessKeyId: "andnn",
      secretAccessKey: "sjakks",
    });
  }

  dynamoDbClient = new AWS.DynamoDB.DocumentClient();

  async getData(userID: string) {
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
    } catch (e) {
      const error= e as Error;
      console.log("error in getitem method", error.message);
      //throw new error(error.message);
    }
  }

  async putData(request:any) {
    try {
      const param = {
        TableName: process.env.dynamodbTable ||'Image_Store_Table',
        Item: {
          artistName: request.body.artistName,
          codyRight: request.body.copyRight,
          imageDescription: request.body.imageDescription,
        },
      };
      this.dynamoDbClient.put(param);
    } catch (e) {
      const error= e as Error;
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
    } catch (e) {
      const error= e as Error;
      console.log("error in getAlldata in dynamodb", error.message);
     // throw new Error(error.message);
    }
  }

  async deleteData(userID: string) {
    const param = {
      TableName: process.env.dynamodbTable || 'Image_Store_Table',
      Key: { userID },
    };
    try {
      await this.dynamoDbClient.delete(param);
    } catch (e) {
      const error= e as Error;
      console.log("error in delete data in dynamodb", error.message);
      throw new Error('error');
    }
  }
}
