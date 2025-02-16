const LoadingOverlay = ({ isLoading }) => {
    if (!isLoading) return null;
  
    return (
      <div id="loadingOverlay" className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex flex-col justify-center items-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-400 border-opacity-50 mb-4"></div>
        <p className="text-white text-2xl font-semibold mb-2">Analyzing your business...</p>
        <p className="text-gray-400 text-sm">Generating comprehensive strategic advice</p>
      </div>
    );
  };
  
  export default LoadingOverlay;
  