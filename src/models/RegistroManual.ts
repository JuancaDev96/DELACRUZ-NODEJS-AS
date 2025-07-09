// src/models/RegistroManual.ts
export interface RegistroManualRequest {
  nombre: string;
  comentario: string;
  planetaFavorito?: string;
}

export interface RegistroManual extends RegistroManualRequest {
  id: string;
  timestamp: string;
  esLibre: boolean;
}
