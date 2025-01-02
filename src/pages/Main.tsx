import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@/components/CircularProgress';
import { FreshnessBar } from '@/components/FreshnessBar';
import { Logo } from '@/components/Logo';

const Main = () => {
    const navigate = useNavigate();
    const [predictionData, setPredictionData] = React.useState(null);
    const [inputData, setInputData] = React.useState(null); // State for input data

    React.useEffect(() => {
        const storedPredictionData = localStorage.getItem('predictionData');
        const storedInputData = localStorage.getItem('inputData'); // Retrieve input data

        if (storedPredictionData && storedInputData) {
            try {
                const parsedPredictionData = JSON.parse(storedPredictionData);
                const parsedInputData = JSON.parse(storedInputData); // Parse input data
                setPredictionData(parsedPredictionData);
                setInputData(parsedInputData); // Set input data state
            } catch (error) {
                console.error("Error parsing data from local storage:", error);
                localStorage.removeItem('predictionData');
                localStorage.removeItem('inputData');
                navigate('/waiting');
            }
        } else {
            navigate('/waiting');
        }
    }, [navigate]);

    if (!predictionData || !inputData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 animate-fade-in">
                <p>Loading...</p>
            </div>
        );
    }

    const { freshness, message } = predictionData;
    const { pH, Water, Gas_Concentration } = inputData; // Access values from inputData

    const parsedPH = parseFloat(pH);
    const parsedWater = parseFloat(Water);
    const parsedGas = parseFloat(Gas_Concentration);

    if (isNaN(parsedPH) || isNaN(parsedWater) || isNaN(parsedGas)) {
        console.error("Invalid data received:", inputData); // Log inputData
        return <p>Error: Invalid input data.</p>; // More specific error message
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 animate-fade-in">
            <div className="hover:scale-105 transition-transform duration-300">
                <img src="src/assets/logo.png" alt="logo" width={200} height={200}/>
            </div>

            <div className="w-full max-w-md mt-8 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <FreshnessBar percentage={parseInt(freshness)} />
                <p className="mt-4 text-center">{message}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="transform hover:scale-105 transition-all duration-300 p-6 bg-white rounded-2xl shadow-lg">
                    <CircularProgress value={parsedPH} max={14} label="PH" color="primary" />
                </div>
                <div className="transform hover:scale-105 transition-all duration-300 p-6 bg-white rounded-2xl shadow-lg">
                    <CircularProgress value={parsedGas / 100} max={1} label="METHANE (PPM)" color="secondary" />
                </div>
                <div className="transform hover:scale-105 transition-all duration-300 p-6 bg-white rounded-2xl shadow-lg">
                    <CircularProgress value={parsedWater} max={100} label="HUMIDITY" color="primary" />
                </div>
            </div>

            <div className="flex space-x-4 mt-12">
                <button
                    onClick={() => navigate('/waiting')}
                    className="px-8 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                    Retake
                </button>
                <button
                    onClick={() => navigate('/history')}
                    className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                    History
                </button>
            </div>
        </div>
    );
};

export default Main;