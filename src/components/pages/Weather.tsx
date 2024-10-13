import React from 'react';
import WeatherCharts from '../weather/WeatherCharts';

const Weather: React.FC = () => {
    return (
        <section className="weather">
            <div className="max-w-7xl mx-auto px-2">
                <h2 className="mb-4 text-4xl font-bold text-zinc-800">
                    Weather Dashboard
                </h2>
                <WeatherCharts />
            </div>
        </section>
    );
};

Weather.displayName = 'Weather';

export default Weather;
