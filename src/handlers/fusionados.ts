import { APIGatewayProxyHandler } from 'aws-lambda';
import { getFusionData } from '../services/fusionService';
import { ok, internalError } from '../utils/Response';
import { FusionResponse } from '../models/FusionResponse';

export const get: APIGatewayProxyHandler = async () => {
  try {
    const data: FusionResponse = await getFusionData();
    return ok(data);
  } catch (error) {
    console.error('Error en GET /fusionados', error);
    return internalError('Error al fusionar datos');
  }
};
