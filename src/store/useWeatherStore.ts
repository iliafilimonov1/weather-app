import { create } from "zustand";

interface WeatherState {
  /* Данные о погоде */
  weatherData: any | null;
  /* Состояние загрузки данных */
  loading: boolean;
  /* Сообщение об ошибке */
  error: string | null;
  /* Функция получения данных о погоде */
  fetchWeatherData: (lat: number, lon: number) => Promise<void>;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  weatherData: null,
  loading: false,
  error: null,

  fetchWeatherData: async (lat: number, lon: number) => {
    set({ loading: true, error: null });

    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      set({ weatherData: data, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({
          error: error.message || "Не удалось получить данные о погоде",
          loading: false,
        });
      } else {
        set({
          error: "Произошла неизвестная ошибка",
          loading: false,
        });
      }
    }
  },
}));
