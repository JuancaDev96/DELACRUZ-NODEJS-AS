import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { saveFusion } from '../db/dynamoClient';
import { FusionResponse } from '../models/FusionResponse';

const STAR_WARS_API = 'https://www.swapi.tech/api/people/1';
const TATOOINE_WEATHER_API = 'https://api.open-meteo.com/v1/forecast?latitude=34.05&longitude=-118.24&current_weather=true';

export const getFusionData = async (): Promise<FusionResponse> => {
  try {
    const personaje = await getPersonajeSWAPI();
    const clima = await getClima();

    const fusion: FusionResponse = {
      id: uuidv4(),
      characterName: personaje.name,
      planet: 'Tatooine',
      height: personaje.height,
      mass: personaje.mass,
      gender: personaje.gender,
      eye_color: personaje.eye_color,
      weather: {
        temperature: clima.temperature,
        windSpeed: clima.windspeed,
      },
      timestamp: new Date().toISOString(),
    };

    console.log('Fusionado:', fusion);
    await saveFusion(fusion);

    return fusion;
  } catch (error) {
    console.error('Error en getFusionData:', error);
    throw new Error('No se pudo obtener y fusionar los datos');
  }
};

const getPersonajeSWAPI = async () => {
  const { data } = await axios.get(STAR_WARS_API);
  return data.result.properties;
};

const getClima = async () => {
  const { data } = await axios.get(TATOOINE_WEATHER_API);
  return data.current_weather;
};
