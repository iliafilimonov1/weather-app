
import React from "react";

const Weather: React.FC = () => {
    return (
        <section className="weather">
            <div className="max-w-7xl mx-auto px-2">
                <h2 className="mb-4 text-4xl font-bold text-zinc-800">
                    Weather Page
                </h2>

            </div>
        </section>
    );
};

Weather.displayName = 'Weather';

export default Weather;
