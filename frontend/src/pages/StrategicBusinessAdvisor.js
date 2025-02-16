import React, { useState } from "react";
import StrategyForm from "../components/StrategyForm";
import StrategyResult from "../components/StrategyResult";
import LoadingOverlay from "../components/LoadingOverlay";
import { getStrategy } from "../api";

const StrategicBusinessAdvisor = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Submitting form data:", formData); // Log the form data
      const data = await getStrategy(formData);
      console.log("Received response data:", data); // Log the response data
      setResult(data);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setError("Failed to generate strategy. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto p-6 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2"></h1>
          <p className="text-gray-400"></p>
        </header>

        {/* Form for submitting data */}
        <StrategyForm onSubmit={handleSubmit} />

        {/* Display error message if there's an error */}
        {error && (
          <div className="bg-red-900/50 p-4 rounded-lg mt-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Display the result if available */}
        {result && <StrategyResult data={result} />}

        {/* Show loading overlay while processing */}
        <LoadingOverlay isLoading={isLoading} />
      </div>
    </div>
  );
};

export default StrategicBusinessAdvisor;