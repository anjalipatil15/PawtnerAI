import React, { useEffect, useState } from "react";

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log("Fetching news...");
  
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=4c75ebb10763456dae735e3ecac7c81b`
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Fetched Data:", data);  // 👀 Check if articles exist
  
  
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchNews();
  }, []);
  

  return (
    <div className="news-container">
      <h2>Important Market News</h2>
      {loading && <p>Loading news...</p>}  {/* Ensure this is inside return */}
      {!loading && articles.length === 0 && <p>No news available.</p>}
      <div className="news-grid">
        {articles.map((article, index) => (
          <div key={index} className="news-card">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
}

// Internal CSS inside the file
const styles = `
  .news-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  .news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .news-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }

  .news-card:hover {
    transform: scale(1.02);
  }

  .news-image {
    width: 100%;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  h2 {
    text-align: center;
  }

  a {
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
  }

  a:hover {
    text-decoration: underline;
  }
`;

// Injecting CSS into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default News;
