import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';
dotenv.config();


const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const ddb = DynamoDBDocumentClient.from(client);

export const saveFusion = async (item: any) => {
  await ddb.send(
    new PutCommand({
      TableName: 'Fusionados',
      Item: item,
    })
  );
};

export const getItemById = async (id: string) => {
  const response = await ddb.send(
    new GetCommand({
      TableName: 'Fusionados',
      Key: { id },
    })
  );
  return response.Item;
};

export const scanFusionados = async () => {
  const response = await ddb.send(
    new ScanCommand({
      TableName: 'Fusionados',
    })
  );
  return response.Items;
};