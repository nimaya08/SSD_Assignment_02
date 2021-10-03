import React from 'react';
import ReactDOM from 'react-dom';
import './Editor.css';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';

const Editor = (props) => {
    let loadEditor = props.loadEditor;
    const refreshNewsList = props.refreshNewsList;
    const authState = props.authState;
    const addArrays = props.addArrays;
    const paras = props.paras;
    const imgs = props.imgs;
    const cats = props.cats;
    const plats = props.plats;

    let msgA = 'Article Added';
    let msgB = 'Article Not Added';
    let msg = null;

    if (loadEditor)
        loadEditor = 'block'
    else
        loadEditor = 'none'

    const handleAddClick = (e, cx) => {
        e.preventDefault();
        let ct = '';
        switch (cx) {
            case 'paras':
                ct = document.querySelector('#gBody').value
                break;
            case 'imgs':
                ct = document.querySelector('#gImgs').value
                break;
            case 'cats':
                ct = document.querySelector('#gCats').value
                break;
            case 'plats':
                ct = document.querySelector('#gPlats').value
                break;
            default:
                break;
        }
        addArrays(cx, ct);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let title = document.querySelector('#gTitle').value
        let subtitle = document.querySelector('#gSubTitle').value
        let trailer = document.querySelector('#gTrailer').value
        let by = document.querySelector('#gBy').value
        let userId = authState._id
        let tagline = document.querySelector('#gTagline').value
        let rating = document.querySelector('#gRating').value
        let images = imgs;
        let categories = cats;
        let platforms = plats;
        let body = paras;

        await axios.post('/api/news', { title, subtitle, trailer, by, userId, tagline, rating, images, categories, platforms, body })
            .then(news => {
                msg = React.createElement('p', { className: "warningS" }, msgA);
                ReactDOM.render(
                    msg,
                    document.querySelector('#messageContainer')
                );
                // add to newslist
                refreshNewsList();
            })
            .catch(err => {
                msg = React.createElement('p', { className: "warningF" }, msgB);
                ReactDOM.render(
                    msg,
                    document.querySelector('#messageContainer')
                );
            })
    }

    return (
        <div className="editor">
            {(authState && authState !== null) ? (
                <>
                    <h3 className="pt-2 title fs">{'Editor' || <Skeleton amount={10} />}</h3>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="row pt-2">
                            <div className="gTitle six columns">
                                <label htmlFor="gTitle">Game Title</label>
                                <input className="u-full-width" type="text" placeholder="Enter Title..." id="gTitle" required />
                            </div>
                            <div className="gSubTitle six columns">
                                <label htmlFor="gSubTitle">Add a Subtitle</label>
                                <input className="u-full-width" type="text" placeholder="Enter Subtitle..." id="gSubTitle" required />
                            </div>
                        </div>
                        <div className="row pt-2">
                            <div className="gTrailer six columns">
                                <label htmlFor="gTrailer">Link for trailer</label>
                                <input className="u-full-width" type="text" placeholder="Enter Game Trailer..." id="gTrailer" required />
                            </div>
                            <div className="gBy six columns">
                                <label htmlFor="gBy">Enter your name</label>
                                <input className="u-full-width" type="text" placeholder="Enter Editor..." defaultValue={authState.name} id="gBy"
                                    required />
                            </div>
                        </div>
                        <div className="row pt-2">
                            <div className="gTagline six columns">
                                <label htmlFor="gTagline">Add a Tagline</label>
                                <input className="u-full-width" type="text" placeholder="Enter Tagline..." id="gTagline" required />
                            </div>
                            <div className="gRating six columns">
                                <label htmlFor="gRating">Rate It</label>
                                <select className="u-full-width" id="gRating">
                                    <option value="1">1</option>
                                    <option value="1.5">1.5</option>
                                    <option value="2">2</option>
                                    <option value="2.5">2.5</option>
                                    <option value="3">3</option>
                                    <option value="3.5">3.5</option>
                                    <option value="4">4</option>
                                    <option value="4.5">4.5</option>
                                    <option value="5">5</option>
                                    <option value="5.5">5.5</option>
                                    <option value="6">6</option>
                                    <option value="6.5">6.5</option>
                                    <option value="7">7</option>
                                    <option value="7.5">7.5</option>
                                    <option value="8">8</option>
                                    <option value="8.5">8.5</option>
                                    <option value="9">9</option>
                                    <option value="9.5">9.5</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                        </div>
                        <div className="row pt-2">
                            <div className="gImgs four columns">
                                <label htmlFor="gImgs">Add Images (1x1)</label>
                                <input type="text" className="u-full-width" placeholder="Enter image link and press plus sign..." id="gImgs" />
                                <button type="button" onClick={(e) => handleAddClick(e, 'imgs')} className="u-full-width">
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                            <div className="gCats four columns">
                                <label htmlFor="gCats">Add Categories</label>
                                <input type="text" className="u-full-width" placeholder="Enter category and press plus sign..." id="gCats" />
                                <button type="button" onClick={(e) => handleAddClick(e, 'cats')} className="u-full-width">
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                            <div className="gPlats four columns">
                                <label htmlFor="gPlats">Add Platforms</label>
                                <input type="text" className="u-full-width" placeholder="Enter image link and press plus sign..." id="gPlats" />
                                <button type="button" onClick={(e) => handleAddClick(e, 'plats')} className="u-full-width">
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div className="row pt-2">
                            <div className="gBody twelve columns">
                                <label htmlFor="gBody">Add Content</label>
                                <textarea className="u-full-width" placeholder="Enter paragraph and press plus sign..." id="gBody"></textarea>
                                <button type="button" onClick={(e) => handleAddClick(e, 'paras')} className="u-full-width">
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div className="myRow pt-2">
                            <input type="reset" className="reset" value="Clear" />
                            <div className="messageContainer mt-2" id="messageContainer">
                                {/* <p></p> */}
                            </div>
                            <input type="submit" className="button-primary submit" value="OK" />
                        </div>
                    </form>
                    <div className="details pt-2">
                        <h5>images</h5>
                        {imgs.map((img, i) => {
                            return (
                                <p className="special" key={i}>{img}</p>
                            )
                        })}
                        <h5>categories</h5>
                        {cats.map((cat, i) => {
                            return (
                                <p className="special" key={i}>{cat}</p>
                            )
                        })}
                        <h5>platforms</h5>
                        {plats.map((plat, i) => {
                            return (
                                <p className="special" key={i}>{plat}</p>
                            )
                        })}
                        <h5>paragraphs</h5>
                        {paras.map((para, i) => {
                            return (
                                <p className="special" key={i}>{para}</p>
                            )
                        })}
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default Editor;