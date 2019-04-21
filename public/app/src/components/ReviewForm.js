import React, { Component } from "react";

import { postReview } from "../util/api";

import "./ReviewForm.css";

class ReviewForm extends Component {
    state = {
        rating: "",
        highlightTo: "",
        author: "",
        email: "",
        comment: "",
    };

    changeRating = (rating) => {
        if (this.state.rating === rating) {
            this.setState({
                rating: "",
            });
        } else {
            this.setState({
                rating,
            });
        }
    };

    highlightStars = (star) => {
        this.setState({
            highlightTo: star,
        });
    };

    clearHighlight = () => {
        this.setState({
            highlightTo: "",
        });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    submitReview = async (e) => {
        e.preventDefault();
        const { author, email, rating, comment } = this.state;
        const { commentId, replyingTo } = this.props;
        if (author === "" || email === "" || comment === "") {
            return;
        }

        const response = await postReview({
            author,
            email,
            rating,
            comment,
            comment_post_ID: commentId,
            comment_parent: replyingTo && replyingTo.id ? replyingTo.id : 0
        });

        console.log(response);
    };

    render() {
        const { replyingTo, cancelReply } = this.props;
        const { rating, highlightTo, author, email, comment } = this.state;
        const maxStars = 5;
        const stars = [];
        for (let i = 1; i <= maxStars; i++) {
            stars.push(i);
        }

        return (
            <div className="uk-form tm-comment-form-wrap">
                <div className="comment-respond">
                    <h3 className="comment-reply-title">
                        {replyingTo && replyingTo.author
                            ? `Leave Reply to ${replyingTo.author}`
                            : `Please Leave a review`}
                    </h3>
                    {replyingTo && replyingTo.author ? (
                        <small>
                            <button
                                className="cancel-reply uk-button-small uk-button-danger uk-margin-small-right"
                                onClick={cancelReply}
                            >
                                Cancel reply
                            </button>
                        </small>
                    ) : null}
                    <form
                        id="commentform"
                        className="comment-form"
                        onSubmit={this.submitReview}
                    >
                        <p className="comment-notes">
                            <span id="email-notes">
                                Your email address will not be published.
                            </span>{" "}
                            Required fields are marked{" "}
                            <span className="required">*</span>
                        </p>
                        <fieldset className="uk-margin-top">
                            <legend>Comment *</legend>
                            <textarea
                                className="uk-width-1-1"
                                id="comment"
                                name="comment"
                                required="required"
                                rows="8"
                                value={comment}
                                onChange={this.handleChange}
                            />
                        </fieldset>
                        <label htmlFor="rating">Rating</label>
                        <div className="element-select">
                            <span />
                            <p
                                className={`stars ${
                                    rating !== "" ? "selected" : ""
                                }`}
                            >
                                {stars.map((star) => (
                                    <span
                                        className={`star-${star} ${
                                            rating === star ? "active" : ""
                                        } ${
                                            star <= rating ||
                                            star <= highlightTo
                                                ? "highlight"
                                                : ""
                                        }`}
                                        key={star}
                                        onClick={() => {
                                            this.changeRating(star);
                                        }}
                                        onMouseEnter={() => {
                                            this.highlightStars(star);
                                        }}
                                        onMouseLeave={this.clearHighlight}
                                    >
                                        {star}
                                    </span>
                                ))}
                            </p>
                            <select
                                id="rating"
                                name="rating"
                                style={{ display: `none` }}
                                value={rating}
                                readOnly={true}
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
                                    <input
                                        id="author"
                                        className="uk-width-1-1"
                                        type="text"
                                        value={author}
                                        name="author"
                                        required="required"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="uk-width-medium-1-2">
                                    <legend>Email *</legend>
                                    <input
                                        id="email"
                                        className="uk-width-1-1"
                                        type="email"
                                        value={email}
                                        name="email"
                                        required="required"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="form-submit">
                            <button
                                className="uk-button uk-button-primary"
                                type="submit"
                            >
                                Post Review
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default ReviewForm;
