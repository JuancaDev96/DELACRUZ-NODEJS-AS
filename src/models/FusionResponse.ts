export interface FusionResponse {
  id: string;
  characterName: string;
  planet: string;
  height: string;
  mass: string;
  gender: string;
  eye_color: string;
  weather: {
    temperature: number;
    windSpeed: number;
  };
  timestamp: string;
}