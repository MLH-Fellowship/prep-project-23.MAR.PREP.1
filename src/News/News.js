import React, { useState, useEffect } from "react";
import "./News.css";
import axios from "axios";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    let isComponentMounted = true;
    const fetchNews = async () => {
      try{
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_APIKEY}`
        )
        if(isComponentMounted){
          setArticles(response.data.articles);
        }
      }catch(error){
        setError(error.response.data.message);
        console.error(error);
      }
    };
    fetchNews();

    return () => {
      isComponentMounted = false;
    }
  }, []);

  return (
      articles.length > 0 && !error ? (
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
      ) : (
        error && <div className="error-box"><h1 className="error-text">{error}</h1></div> 
      )
  );
};

export default News;