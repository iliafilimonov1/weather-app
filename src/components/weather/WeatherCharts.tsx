import React, { useEffect, useState } from 'react';
import { useWeatherStore } from '../../store/useWeatherStore';
import WeatherChart from './WeatherChart';

const WeatherCharts: React.FC = () => {
    // Получение данных о погоде из стора
    const { weatherData, fetchWeatherData, loading, error } = useWeatherStore();

    // Тип графика
    const [chartType, setChartType] = useState<'line' | 'bar'>('line');

    // Диапазон времени (в днях)
    const [timeRange, setTimeRange] = useState<number>(7);

    useEffect(() => {
        fetchWeatherData(48.8566, 2.3522);
    }, [fetchWeatherData]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!weatherData) return <p>No weather data available</p>;

    const temperatureData: number[] = [weatherData?.main?.temp]; // Текущая температура
    const humidityData: number[] = [weatherData?.main?.humidity]; // Текущая влажность

    return (
        <section className="weather-charts p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex flex-col items-start gap-2">
                    <label htmlFor="chartType" className="font-medium text-gray-700">Chart type:</label>
                    <select
                        id="chartType"
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value as 'line' | 'bar')}
                        className="h-10 w-40 border px-4 rounded bg-gray-50"
                    >
                        <option value="line">Line Chart</option>
                        <option value="bar">Bar Chart</option>
                    </select>
                </div>

                <div className="flex flex-col items-start gap-2">
                    <label htmlFor="timeRange" className="font-medium text-gray-700">Time range:</label>
                    <input
                        type="number"
                        id="timeRange"
                        value={timeRange}
                        onChange={(e) => setTimeRange(Number(e.target.value))}
                        min="1"
                        max="30"
                        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-16 text-center"
                    />
                </div>
            </div>
            <WeatherChart
                chartType={chartType}
                temperatureData={temperatureData}
                humidityData={humidityData}
                onChartDestroy={() => console.log('Chart destroyed')}
            />
        </section>
    );
};

export default WeatherCharts;
