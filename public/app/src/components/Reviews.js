import React, { Component } from "react";

class Reviews extends Component {
    render() {
        return (
            <div id="reviews" className="tm-comments uk-panel-box">
                <h2>1 Review</h2>
                <ol className="uk-comment-list">
                    <li
                        id="comment-id"
                        className="review even thread-even depth-1"
                    >
                        <article
                            id="div-comment-id"
                            className="uk-comment"
                            itemprop="comment"
                            itemscope="itemscope"
                            itemtype="https://schema.org/Comment"
                        >
                            <div class="star-rating">
                                <span style={{ width: "80%" }}>
                                    Rated <strong className="rating">4</strong>{" "}
                                    out of 5 based on{" "}
                                    <span className="rating">1</span> customer
                                    rating
                                </span>
                            </div>
                            <header className="uk-comment-header">
                                <div
                                    className="uk-comment-title"
                                    itemprop="author"
                                    itemscope="itemscope"
                                    itemtype="https://schema.org/Person"
                                >
                                    Kate
                                </div>
                                <div className="uk-comment-meta">
                                    <time
                                        datetime="2018-04-17T18:45:18+12:00"
                                        itemprop="datePublished"
                                    >
                                        April 17, 2018 at 6:45 pm
                                    </time>
                                </div>
                            </header>
                            <div className="uk-comment-body" itemprop="text">
                                <p>Review text</p>
                            </div>
                            <ul className="tm-comment-links uk-subnav uk-subnav-line">
                                <li>
                                    <a
                                        className="comment-reply-link"
                                        rel="nofollow"
                                        href="#s"
                                        aria-label="Reply to [Author]"
                                    >
                                        Reply
                                    </a>
                                </li>
                                <li>
                                    <a href="#b">Link</a>
                                </li>
                            </ul>
                        </article>
                    </li>
                </ol>
                <hr className="uk-article-divider" />
                <div className="uk-form tm-comment-form-wrap">
                    <div id="respond" className="comment-respond">
                        <h3 id="reply-title" className="comment-reply-title">
                            Please Leave a review (Beans comment form title
                            text)
                        </h3>
                        <form
                            id="commentform"
                            className="comment-form"
                            action="/post.php"
                            method="post"
                        >
                            <p className="comment-notes">
                                <span id="email-notes">
                                    Your email address will not be published (is
                                    this changable?)
                                </span>
                                Required fields are marked{" "}
                                <span className="required">*</span>
                            </p>
                            <fieldset className="uk-margin-top">
                                <legend>Comment *</legend>
                                <textarea
                                    className="uk-width-1-1"
                                    name="comment"
                                    required=""
                                    rows="8"
                                />
                            </fieldset>
                            <label htmlFor="rating">Rating</label>
                            <div className="element-select">
                                <span />
                                <p className="stars">
                                    <a className="star-1" href="#">
                                        1
                                    </a>
                                    <a className="star-2" href="#">
                                        2
                                    </a>
                                    <a className="star-3" href="#">
                                        3
                                    </a>
                                    <a className="star-4" href="#">
                                        4
                                    </a>
                                    <a className="star-5" href="#">
                                        5
                                    </a>
                                </p>
                                <select
                                    id="rating"
                                    name="rating"
                                    style={{ display: `none` }}
                                >
                                    <option value="">-</option>
                                    <option value="5">5</option>
                                    <option value="4">4</option>
                                    <option value="3">3</option>
                                    <option value="2">2</option>
                                    <option value="1">1</option>
                                </select>
                            </div>
                            <div className="uk-width-medium-1-1">
                                <div className="uk-grid uk-grid-small">
                                    <div className="uk-width-medium-1-2">
                                        <legend>Name *</legend>
                                        <input id="author" className="uk-width-1-1" type="text" value="" name="author" required="required" />
                                    </div>
                                    <div className="uk-width-medium-1-2">
                                        <legend>Email *</legend>
                                        <input id="author" className="uk-width-1-1" type="email" value="" name="email" required="required" />
                                    </div>
                                </div>
                            </div>
                            <p className="form-submit">
                                <button className="uk-button uk-button-primary" type="submit">
                                    Post Review
                                </button>
                                <input id="comment_post_ID" type="hidden" name="comment_post_ID" value="5333" style={{ display: `none` }}/>
                                <input id="comment_parent" value="0" style={{ display: `none` }}/>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Reviews;
