import {FaSearch} from 'react-icons/fa';
import React, { useState, useEffect } from "react";
import { ResultCard } from "./ResultCard";

const SearchBox = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [showPopularMovies, setShowPopularMovies] = useState(true); // 控制是否显示热门电影

    useEffect(() => {
      // 获取热门电影数据
      fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=f0a8b943b9b76a3e3ce5440889f18343&language=en-US&page=1`
      )
          .then((res) => res.json())
          .then((data) => {
              if (!data.errors) {
                  setPopularMovies(data.results);
              } else {
                  console.error("Error fetching popular movies:", data.errors);
              }
          })
          .catch((error) => {
              console.error("Error fetching popular movies:", error);
          });
  }, []);
    
    const onChange = (e) => {
        e.preventDefault();

        setQuery(e.target.value);

        if (e.target.value) {
          fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=f0a8b943b9b76a3e3ce5440889f18343&language=en-US&page=1&include_adult=false&query=${e.target.value}`
          )
            .then((res) => res.json())
            .then((data) => {
            if (!data.errors) {
              setResults(data.results);
              setShowPopularMovies(false); // 隐藏热门电影
            }else {
              setResults([]);
            }
            })
            .catch((error) => {
            console.error("Error fetching data:", error);
            setResults([]);
            });
        } else {
        setResults([]);
        setShowPopularMovies(true); // 显示热门电影
        }
    };
    return (
      <div className="add-page">
          <div className="container">
              <div className="add-content">
                  <div className='search-box-container'>
                      <div className="search-box-input">
                          <FaSearch className="search-icon" />
                          <input
                              className='form-control search-box'
                              value={query}
                              onChange={onChange}
                              placeholder='Type to search...'
                          />
                      </div>
                  </div>

                  {results.length > 0 && (
                      <ul className="results">
                          {results.map((movie) => (
                              <li key={movie.id}>
                                  <ResultCard movie={movie} />
                              </li>
                          ))}
                      </ul>
                  )}

                  {showPopularMovies && ( // 条件渲染，如果显示热门电影则渲染
                        <div className="popular-movies">
                            <h2 className='show'>Popular Movies</h2>
                            <div className="popular-movies-grid">
                                {popularMovies.map((movie) => (
                                    <div key={movie.id} className="popular-movie">
                                        <ResultCard movie={movie} /> {/* 使用 ResultCard 组件显示热门电影 */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
              </div>
          </div>
      </div>
  );
};

export default SearchBox;