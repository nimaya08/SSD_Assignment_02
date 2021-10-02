import React from 'react';
import './News.css';
import Skeleton from 'react-loading-skeleton';

const News = (props) => {
    let news = props.news;
    let loadNews = props.loadNews;
    const newsLoad = props.newsLoad;

    const loadArticle = (id) => {
        newsLoad(loadNews,id);
    }
    
    return (
        <div className="row news">
            <div className="two columns">
                <div className="pt-1 mr-1 newsImg">{<Skeleton circle={true} height={100} width={100} />}</div>
            </div>
            <div className="ten columns">
                <div className="newsRow">
                    <h5>{news.title || <Skeleton amount={10} />}</h5>
                    <h4 className="rating fs">{news.rating || <Skeleton amount={5} />}</h4>
                </div>
                <div className="newsRow">
                    <h6 className="newsSubTitle">{news.subtitle || <Skeleton amount={5} />}</h6>
                    <h6 className="newsTagLine fs">{news.tagline || <Skeleton amount={5} />}</h6>
                </div>
                <div className="newsRow">
                    <button onClick={() => loadArticle(news._id)}>Read</button>
                    <small className="pt-2 fs">{news.by+" on "+new Date(news.posted).toDateString() || <Skeleton amount={3} />}</small>
                </div>
            </div>
        </div>
    )
}
export default News;