import React, { useEffect, useRef } from 'react';
import { Chart, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables);

interface WeatherChartProps {
    /* Тип графика */
    chartType: 'line' | 'bar';
    /* Температура */
    temperatureData: number[];
    /* Влажность */
    humidityData: number[];
    /* Функция для очистки графика */
    onChartDestroy: () => void;
}

const WeatherChart: React.FC<WeatherChartProps> = ({ chartType, temperatureData, humidityData, onChartDestroy }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!chartRef?.current) return;

        // Очищаем предыдущий график
        const chartInstance = Chart?.getChart(chartRef?.current);
        if (chartInstance) {
            chartInstance?.destroy();
        }

        // Настройка нового графика
        const newChart = new Chart(chartRef?.current, {
            type: chartType,
            data: {
                labels: ['Current'],
                datasets: [
                    {
                        label: 'Temperature (°C)',
                        data: temperatureData,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        yAxisID: 'y',
                        tension: 0.1,
                    },
                    {
                        label: 'Humidity (%)',
                        data: humidityData,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        backgroundColor: 'rgba(153, 102, 255, 0.5)',
                        yAxisID: 'y1',
                        tension: 0.1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        type: 'linear',
                        position: 'left',
                    },
                    y1: {
                        type: 'linear',
                        position: 'right',
                        grid: {
                            drawOnChartArea: false,
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `${context.dataset.label}: ${context.raw}`;
                            },
                        },
                    },
                    title: {
                        display: true,
                        text: 'Current Weather Data',
                    },
                },
            } as ChartOptions,
        });

        return () => {
            if (newChart) {
                newChart?.destroy();
                onChartDestroy();
            }
        };
    }, [chartType, temperatureData, humidityData, onChartDestroy]);

    return <canvas ref={chartRef} />;
};

export default WeatherChart;
