import React, { useEffect, useState } from "react";
import { fetchNewsByCategory } from "../api/api";
import "./../styles/NewsList.css";

const categories = ["Business", "Entertainment", "Technology", "Sports", "Health", "Science", "Politics"];

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("business");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchNewsByCategory([selectedCategory]);
        setNews(data);
      } catch (error) {
        console.error("Error loading news", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <div className={`news-container ${darkMode ? "dark" : ""}`}>
      <header className="header">
        {/* Category Selection */}
        <div className="category-selection">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`category-button ${
                selectedCategory === category.toLowerCase() ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category.toLowerCase())}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Theme Toggle */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? " Dark Mode" : "☀️ Light Mode"}
        </button>
      </header>

      {/* News Content */}
      <main>
        <h1 className="news-title">Top News in {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h1>

        {loading ? (
          <div className="loader">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="news-grid">
            {news.map((article, index) => (
              <div className="news-card" key={index}>
                <img
                  src={article.urlToImage || "placeholder.jpg"}
                  alt={article.title}
                  className="news-image"
                />
                <div className="news-content">
                  <h2 className="news-heading">{article.title}</h2>
                  <p className="news-description">{article.description}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="news-link"
                  >
                    Read More
                  </a>
                </div>
              </div>
            
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Pankaj Kumar Jha. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default NewsList;