import { APIGatewayProxyHandler } from 'aws-lambda';
import { getItemById, scanFusionados, saveFusion } from '../db/dynamoClient';
import * as dotenv from 'dotenv';

dotenv.config();

export const get: APIGatewayProxyHandler = async () => {
  try {
    const ttlMinutes = parseInt(process.env.CACHE_TTL_MINUTES || '30');
    const now = Math.floor(Date.now() / 1000); 

    const cacheItem = await getItemById('HISTORIAL_CACHE');

    if (cacheItem && cacheItem.ttl && cacheItem.ttl > now) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          fromCache: true,
          data: cacheItem.data,
        }),
      };
    }

    const items = await scanFusionados();

    const cacheItemNuevo = {
      id: 'HISTORIAL_CACHE',
      data: items,
      ttl: now + ttlMinutes * 60,
    };

    await saveFusion(cacheItemNuevo);

    return {
      statusCode: 200,
      body: JSON.stringify({
        fromCache: false,
        data: items,
      }),
    };
  } catch (error) {
    console.error('Error en GET /historial', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al obtener historial' }),
    };
  }
};
