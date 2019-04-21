import React from "react";

import { Link } from "react-router-dom";

import "./Review.css";

const Review = ({ review, handleReply }) => {
    const { id, rating, author, date_8601, date_string, content } = review;
    return (
        <li id={`comment-${id}`} className="review even thread-even depth-1">
            <article
                className="uk-comment"
                itemProp="comment"
                itemScope="itemscope"
                itemType="https://schema.org/Comment"
            >
                {rating && (
                    <div className="star-rating">
                        <span style={{ width: `${(rating / 5) * 100}%` }}>
                            Rated <strong className="rating">{rating}</strong>{" "}
                            out of 5 based on <span className="rating">1</span>{" "}
                            customer rating
                        </span>
                    </div>
                )}
                <header className="uk-comment-header">
                    <div
                        className="uk-comment-title"
                        itemProp="author"
                        itemScope="itemscope"
                        itemType="https://schema.org/Person"
                    >
                        {author}
                    </div>
                    <div className="uk-comment-meta">
                        <time dateTime={date_8601} itemProp="datePublished">
                            {date_string}
                        </time>
                    </div>
                </header>
                <div className="uk-comment-body" itemProp="text">
                    <p dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                <ul className="tm-comment-links uk-subnav uk-subnav-line">
                    <li>
                        <span
                            className="comment-reply-link"
                            aria-label={`Reply to ${author}`}
                            onClick={() => handleReply({ id, author })}
                        >
                            Reply
                        </span>
                    </li>
                    <li>
                        <Link to={`#comment-${id}`}>Link</Link>
                    </li>
                </ul>
            </article>
        </li>
    );
};

export default Review;
