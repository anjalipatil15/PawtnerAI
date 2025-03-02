import React, { useState } from "react";
import IdeaForm from "../components/IdeaForm";
import AnalysisResult from "../components/AnalysisResult";
import LoadingOverlay from "../components/LoadingOverlay";

const IdeaValidation = () => {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateIdea = async (ideaData) => {
    setIsLoading(true);
    setAnalysis(null);

    try {
      const response = await fetch("http://localhost:5000/validate-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ideaData),
      });

      const data = await response.json();
      setAnalysis(data.analysis || null);
    } catch (error) {
      console.error("Error:", error);
      setAnalysis({ error: "Error analyzing idea. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <IdeaForm onSubmit={validateIdea} />
      <LoadingOverlay isLoading={isLoading} />
      {analysis && !analysis.error && <AnalysisResult analysis={analysis} />}
      {analysis?.error && <p className="text-red-500">{analysis.error}</p>}
    </div>
  );
};

export default IdeaValidation;
