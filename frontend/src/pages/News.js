import React, { useEffect, useState } from "react";

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
        console.log("Fetched Data:", data);

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
      <div className="market-news-title">Market News</div>
      {loading && <p>Loading news...</p>}
      {!loading && articles.length === 0 && <p>No news available.</p>}
      <div className="news-grid">
        {articles.map((article, index) => (
          <div key={index} className="news-card">
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} className="news-image" />
            )}
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="read-more-link"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              Read More
              <span 
                className="underline" 
                style={{
                  width: hoveredIndex === index ? "100%" : "0%"
                }}
              ></span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

// Internal CSS inside the file
const styles = `
  body {
    background-color: #345c66;
    color: #fef4af;
  }

  .news-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    font-family: Montserrat, sans-serif;
    color: #fef4af;
    position: relative;
  }

  .market-news-title {
    grid-column: 1 / span 3;
    font-size: 3rem;
    font-weight: 600; /* Lighter than cards but still bold */
    color: #fef4af;
    text-align: left;
    margin-bottom: 10px;
    padding-left: 10px;
    width: 70%;
  }

  .news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .news-card {
    background-color: #4a7b85;
    border: 1px solid #4a7b85;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s, box-shadow 0.3s;
    color: #fef4af;
  }

  .news-card:hover {
    transform: translateY(-5px);
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.5);
  }

  .news-image {
    width: 100%;
    border-radius: 5px;
    margin-bottom: 10px;
    max-height: 200px;
    object-fit: cover;
  }

  h3 {
    color: #fef4af;
    font-size: 1.2rem;
    font-weight: 500; /* Slightly lighter */
    margin-bottom: 10px;
  }

  p {
    color: #fef4af;
    font-size: 0.9rem;
    font-weight: 400; /* Even lighter */
  }

  .read-more-link {
    text-decoration: none;
    color: #fef4af;
    font-weight: 600; /* Same as title */
    display: inline-block;
    position: relative;
    padding-bottom: 5px;
    overflow: hidden;
    transition: color 0.3s;
  }

  .read-more-link:hover {
    color: #f3e5ab;
  }
  h3 {
  color: #fef4af;
  font-size: 1.2rem;
  font-weight: 550; /* Fully bold */
  margin-bottom: 10px;
}

p {
  color: #fef4af;
  font-size: 0.9rem;
  font-weight: 400; /* Not bold */
}
  .underline {
    display: block;
    height: 2px;
    background-color: #fef4af;
    transition: width 0.3s ease;
    position: absolute;
    bottom: 0;
    left: 0;
  }

`;

// Injecting CSS into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default News;
