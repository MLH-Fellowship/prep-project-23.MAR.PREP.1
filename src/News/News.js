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
          `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=puhXmx3sZQZaciMSkqEHwcWOUDJ6dASu`
        )
        if(isComponentMounted){
          setArticles(response.data.results.slice(0,1));
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
        <div>
        <img src={article.multimedia[0].url} alt={article.title} className="card-img-top" />
        </div>
        <div className="card-description">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text">{article.abstract}</p>
          <a className="card-link" href={article.url} target="_blank" rel="noreferrer">Read More</a>
        </div>
        </div>
      </div>
    ))}
    *Data provided by The New York Times
  </div>
    ) : (
      error && <div className="error-box"><h1 className="error-text">{error}</h1></div> 
    )
);
};

export default News;