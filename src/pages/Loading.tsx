import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Loading = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const itemData = {
                    item: "apple",
                    pH: 3.5,
                    Water: 85.0,
                    Gas_Concentration: 5.0
                };

                // Store input data in local storage *before* the API call
                localStorage.setItem('inputData', JSON.stringify(itemData));

                const response = await fetch('http://127.0.0.1:5000/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(itemData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorData?.error || response.statusText}`);
                }

                const data = await response.json();
                console.log("API Response:", data);

                localStorage.setItem('predictionData', JSON.stringify(data));

                // Simulate a delay
                setTimeout(() => {
                    setLoading(false);
                }, 2000);

            } catch (error) {
                console.error("Error calling API:", error);
                alert("Error getting prediction data. Please try again later.");
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!loading) {
            navigate('/main');
        }
    }, [loading, navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 animate-fade-in">
            <div className="mb-12">
                <img src="src/assets/logo.png" alt="logo" width={200} height={200} />
            </div>
            <div className="relative w-32 h-32">
                <div className="absolute inset-0">
                    <div className="w-full h-full border-4 border-cyan-500 rounded-full animate-spin border-t-transparent" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 border-4 border-blue-500 rounded-full animate-pulse opacity-50" />
                </div>
            </div>
            <div className="mt-8 text-center">
                <p className="text-cyan-500 text-xl font-semibold animate-pulse">In Progress...</p>
                <p className="text-gray-500 mt-2 animate-fade-in">Please Wait</p>
            </div>
        </div>
    );
};

export default Loading;
