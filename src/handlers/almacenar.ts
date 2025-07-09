import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { saveFusion } from '../db/dynamoClient';
import { RegistroManual, RegistroManualRequest } from '../models/RegistroManual';
import { validateRegistroManual } from '../utils/Validate';
import { badRequest, created, internalError } from '../utils/Response';

export const post: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.body) {
      return badRequest('No se recibió ningún cuerpo en la petición');
    }

    const body: unknown = JSON.parse(event.body);

    if (!validateRegistroManual(body)) {
      return badRequest('Faltan campos requeridos: nombre, comentario');
    }

    const registro: RegistroManual = {
      id: uuidv4(),
      nombre: body.nombre,
      comentario: body.comentario,
      planetaFavorito: body.planetaFavorito || 'Desconocido',
      timestamp: new Date().toISOString(),
      esLibre: true,
    };

    await saveFusion(registro);

    return created({ message: 'Guardado correctamente', registro });
  } catch (error) {
    console.error('Error en POST /almacenar', error);
    return internalError('Error al guardar el registro');
  }
};
