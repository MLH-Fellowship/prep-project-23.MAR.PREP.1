import React, { useState, useEffect } from "react";
import "./News.css";
import axios from "axios";

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=332b16b9fc294c70a8b09a13a2b8d736"
      );
      setArticles(response.data.articles);
    };
    fetchNews();
  }, []);

  return (
      articles.length > 0 &&
    <div className="container">
      <h1 className="text-center my-5">Top Headlines</h1>
      {articles.map((article, index) => (
        <div className="card mb-3" key={index}>
          <div className="card-body">
            <h5 className="card-title">{article.title}</h5>
            <p className="card-text">{article.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;