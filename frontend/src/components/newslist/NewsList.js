import React from 'react';
import './NewsList.css';

import News from '../news/News';

const NewsList = (props) => {
    const newslist = props.newslist;
    const newsLoad = props.newsLoad;
    let loadNews = props.loadNews;
    let loadEditor = props.loadEditor;

    if(loadNews && !loadEditor)
        loadNews = 'block'
    else 
        loadNews = 'none'

    return (
        <div style={{display: loadNews}}>
            {newslist.map(news => {
                return (
                    <News key={news._id} news={news} loadNews={loadNews} newsLoad={newsLoad} />
                )
            })}
        </div>
    )
}

export default NewsList;