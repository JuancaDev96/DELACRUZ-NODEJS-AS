import { describe, it } from 'node:test';
import { getFusionData } from '../src/services/fusionService';
import { expect, jest } from '@jest/globals';


jest.mock('axios', () => ({
  get: jest.fn((url: string) => {
    if (url.includes('swapi.tech')) {
      return Promise.resolve({
        data: {
          result: {
            properties: {
              name: 'Luke',
              height: '180',
              mass: '70',
              gender: 'male',
              eye_color: 'blue',
            },
          },
        },
      });
    }

    if (url.includes('open-meteo')) {
      return Promise.resolve({
        data: {
          current_weather: {
            temperature: 28.3,
            windspeed: 11.5,
          },
        },
      });
    }

    return Promise.reject(new Error('Unknown URL'));
  }),
}));

describe('getFusionData', () => {
  it('fusiona datos correctamente', async () => {
    const result = await getFusionData();

    expect(result.characterName).toBe('Luke');
    expect(result.height).toBe('180');
    expect(result.mass).toBe('70');
    expect(result.weather.temperature).toBe(28.3);
    expect(result.weather.windSpeed).toBe(11.5);
  });
});
