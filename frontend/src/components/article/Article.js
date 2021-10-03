import React from 'react';
import './Article.css';
import Skeleton from 'react-loading-skeleton';
import ReactPlayer from "react-player";

import Paragraph from './Paragraph';

const Article = (props) => {
    let loadNews = props.loadNews;
    const authState = props.authState;
    const newsLoad = props.newsLoad;
    const editorLoad = props.editorLoad;
    const currentNews = props.currentNews;
    const removeNews = props.removeNews;
    const newsDate = currentNews.by;
    const newsBody = currentNews.body;

    if (loadNews)
        loadNews = 'block'
    else
        loadNews = 'none'

    let goBack = () => {
        newsLoad(!loadNews, currentNews._id);
    }

    let add = () => {
        editorLoad(!loadNews, currentNews._id);
    }

    let remove = (e, id) => {
        newsLoad(!loadNews, currentNews._id);
        removeNews(id);
    }

    return (
        <div style={{ display: loadNews }} className="article">
            {currentNews && currentNews !== null} ? (
            <div className="myRow pt-2">
                <h3 className="title fs">{currentNews.title || <Skeleton amount={10} />}</h3>
                <small className="pt-1 fp">{newsDate || <Skeleton amount={10} />}</small>
            </div>
            <div className="myRow pt-1 trailer">
                <ReactPlayer url={currentNews.trailer} />
            </div>
            <div>
                <h5 className="myRow pt-1 fs subtitle">{currentNews.subtitle || <Skeleton amount={10} />}</h5>
            </div>
            <div className="content">
                {newsBody.map((nb, i) => {
                    return (
                        <Paragraph key={i} content={nb} />
                    )
                })}
            </div>
            <div className="myRow mt-20">
                <button className="center" onClick={goBack}>{'BACK' || <Skeleton amount={10} />}</button>
                {(authState) ?
                    <button className="center mt-2" onClick={add}>{'ADD' || <Skeleton amount={10} />}</button>
                    :
                    <p></p>
                }
                {(currentNews.userId === authState._id) ?
                    <button className="center mr-2" onClick={(e) => remove(e, currentNews._id)}>{'REMOVE' || <Skeleton amount={10} />}</button>
                    :
                    <p></p>
                }
            </div>
            ) : (
            <div>No Articles</div>
            )
        </div>
    )
}

export default Article;