import { RegistroManualRequest } from '../models/RegistroManual';

export const validateRegistroManual = (body: any): body is RegistroManualRequest => {
  return (
    typeof body === 'object' &&
    typeof body.nombre === 'string' &&
    typeof body.comentario === 'string'
  );
};
