import React from 'react';
import './Article.css';
import Skeleton from 'react-loading-skeleton';
import ReactPlayer from "react-player";
import Paragraph from './Paragraph';

const Article = ({ loadNews, authState, newsLoad, editorLoad, currentNews, removeNews }) => {

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
            {(currentNews && currentNews !== undefined) ? (
                <>
                    <div className="myRow pt-2">
                        <div className="myRow_">
                            {currentNews && currentNews !== null ? (
                                (currentNews.images) !== null && currentNews.images.length > 0
                                    ? <img className="imageHead" src={currentNews.images[0]} alt="context" /> : null
                            ) : <Skeleton circle={true} height={100} width={100} />}
                            <h3 className="title fs">{currentNews.title || <Skeleton amount={10} />}</h3>
                        </div>
                        <small className="pt-1 fp">{currentNews.by || <Skeleton amount={10} />}</small>
                    </div>
                    <div className="myRow pt-1 trailer">
                        <ReactPlayer url={currentNews.trailer} />
                    </div>
                    <div>
                        <h5 className="myRow pt-1 fs subtitle">{currentNews.subtitle || <Skeleton amount={10} />}</h5>
                    </div>
                    <div className="content">
                        {currentNews.body && currentNews.body.map((nb, i) => {
                            return (
                                <Paragraph key={i} content={nb} />
                            )
                        })}
                    </div>
                    <div className="myRow mt-20">
                        <button className="center" onClick={goBack}>{'BACK' || <Skeleton amount={10} />}</button>
                        {(authState && authState !== null) ?
                            <button className="center mt-2" onClick={add}>{'ADD' || <Skeleton amount={10} />}</button>
                            :
                            <p></p>
                        }
                        {(currentNews && currentNews.userId === authState._id) ?
                            <button className="center mr-2" onClick={(e) => remove(e, currentNews._id)}>{'REMOVE' || <Skeleton amount={10} />}</button>
                            :
                            <p></p>
                        }
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default Article;