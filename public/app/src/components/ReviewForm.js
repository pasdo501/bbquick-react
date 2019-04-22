import React, { Component } from "react";

import { postReview } from "../util/api";
import { validateText, validateEmail } from "../util/helpers";

import "./ReviewForm.css";

class ReviewForm extends Component {
    state = {
        rating: "",
        highlightTo: "",
        author: "",
        email: "",
        comment: "",
        errors: {},
        submitting: false,
    };

    changeRating = (rating) => {
        const { errors } = this.state;
        if (errors["rating"]) {
            delete errors["rating"];
        }
        if (this.state.rating === rating) {
            this.setState({
                rating: "",
                errors,
            });
        } else {
            this.setState({
                rating,
                errors,
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
        const { errors } = this.state;
        if (errors[e.target.id]) {
            delete errors[e.target.id];
        }
        this.setState({
            [e.target.id]: e.target.value,
            errors,
        });
    };

    validateReview = () => {
        const { logged_in } = window.bbq_react_data.user_info;

        if (logged_in) {
            if (!validateText(this.state.comment)) {
                this.setState({
                    errors: {
                        comment: "empty",
                    },
                });
                return false;
            } else {
                return true;
            }
        } else {
            const inputKeys = ["comment", "author", "email", "rating"];
            const errors = inputKeys.reduce((acc, curr) => {
                if (!validateText(this.state[curr])) {
                    acc[curr] = "empty";
                } else if (
                    curr === "email" &&
                    !validateEmail(this.state[curr])
                ) {
                    acc[curr] = "invalid";
                }
                return acc;
            }, {});

            this.setState({
                errors,
            });
            return Object.keys(errors).length === 0;
        }
    };

    submitReview = async (e) => {
        e.preventDefault();
        if (this.state.submitting) {
            return;
        }

        this.setState({
            submitting: true,
        });

        if (!this.validateReview()) {
            this.submitting = false;
            return;
        }

        const { author, email, rating, comment } = this.state;
        const { commentId, replyingTo } = this.props;

        const response = await postReview({
            author,
            email,
            rating,
            comment,
            comment_post_ID: commentId,
            comment_parent: replyingTo && replyingTo.id ? replyingTo.id : 0,
            akismet_comment_nonce: this.props.akismetNonce,
        });

        if (response.success) {
            this.setState({
                author: "",
                email: "",
                comment: "",
                rating: "",
                submitting: false,
            });
            const { moderationHash, unapprovedId } = response;
            if (moderationHash !== undefined && unapprovedId !== undefined) {
                this.props.triggerUpdate({ moderationHash, unapprovedId });
                window.UIkit.notify(
                    `Review successfully posted. Thank you for reviewing this product! Your review will be held for moderation and will not be visible once you leave this page.`
                );
            } else {
                this.props.triggerUpdate({});
                window.UIkit.notify(
                    "Review successfully posted. Thank you for reviewing this product!"
                );
            }
        } else {
            window.UIkit.notify(
                "Your review could not be posted at this time. Please refresh and try again, or try again later."
            );
            this.setState({
                submitting: false,
            });
        }
    };

    render() {
        const { replyingTo, cancelReply } = this.props;
        const {
            rating,
            highlightTo,
            author,
            email,
            comment,
            errors,
            submitting,
        } = this.state;
        const maxStars = 5;
        const stars = [];
        for (let i = 1; i <= maxStars; i++) {
            stars.push(i);
        }

        const {
            logged_in,
            user_name,
            logout_url,
        } = window.bbq_react_data.user_info;

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
                        {logged_in ? (
                            <p className="logged-in-as">
                                <a
                                    href={`${
                                        window.bbq_react_data.wp_url
                                    }/wp-admin/profile.php`}
                                    aira-label={`Logged in as ${user_name}. Edit your profile.`}
                                >
                                    Logged in as {user_name}
                                </a>
                                .{" "}
                                <a
                                    href={`${logout_url}&redirect_to=${encodeURIComponent(
                                        window.location.origin +
                                            window.location.pathname
                                    )}`}
                                >
                                    Log out?
                                </a>
                            </p>
                        ) : (
                            <p className="comment-notes">
                                <span id="email-notes">
                                    Your email address will not be published.
                                </span>{" "}
                                Required fields are marked{" "}
                                <span className="required">*</span>
                            </p>
                        )}
                        <fieldset className="uk-margin-top">
                            <legend
                                className={
                                    errors["comment"] ? "uk-text-danger" : ""
                                }
                            >
                                Comment *
                            </legend>
                            <textarea
                                className={`uk-width-1-1 ${
                                    errors["comment"] ? "uk-form-danger" : ""
                                }`}
                                id="comment"
                                name="comment"
                                required="required"
                                rows="8"
                                value={comment}
                                onChange={this.handleChange}
                            />
                            {errors["comment"] ? (
                                <p className="uk-form-help-block uk-text-danger uk-text-small">
                                    Please write a comment.
                                </p>
                            ) : null}
                        </fieldset>
                        <label
                            htmlFor="rating"
                            className={errors["rating"] ? "uk-text-danger" : ""}
                        >
                            Rating
                        </label>
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
                            {errors["rating"] ? (
                                <p className="uk-form-help-block uk-text-danger uk-text-small uk-margin-small-bottom">
                                    Please rate the product.
                                </p>
                            ) : null}
                        </div>
                        <div className="uk-width-medium-1-1">
                            {logged_in || (
                                <div className="uk-grid uk-grid-small">
                                    <div className="uk-width-medium-1-2">
                                        <legend
                                            className={
                                                errors["author"]
                                                    ? "uk-text-danger"
                                                    : ""
                                            }
                                        >
                                            Name *
                                        </legend>
                                        <input
                                            id="author"
                                            className={`uk-width-1-1 ${
                                                errors["author"]
                                                    ? "uk-form-danger"
                                                    : ""
                                            }`}
                                            type="text"
                                            value={author}
                                            name="author"
                                            required="required"
                                            onChange={this.handleChange}
                                        />
                                        {errors["author"] ? (
                                            <p className="uk-form-help-block uk-text-danger uk-text-small">
                                                Please enter your name.
                                            </p>
                                        ) : null}
                                    </div>
                                    <div className="uk-width-medium-1-2">
                                        <legend
                                            className={
                                                errors["email"]
                                                    ? "uk-text-danger"
                                                    : ""
                                            }
                                        >
                                            Email *
                                        </legend>
                                        <input
                                            id="email"
                                            className={`uk-width-1-1 ${
                                                errors["email"]
                                                    ? "uk-form-danger"
                                                    : ""
                                            }`}
                                            type="email"
                                            value={email}
                                            name="email"
                                            required="required"
                                            onChange={this.handleChange}
                                        />
                                        {errors["email"] ? (
                                            <p className="uk-form-help-block uk-text-danger uk-text-small">
                                                Please enter{" "}
                                                {errors["email"] === "invalid"
                                                    ? "a valid"
                                                    : "your"}{" "}
                                                email address.
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            )}
                        </div>
                        <p className="form-submit">
                            <button
                                className="uk-button uk-button-primary"
                                type="submit"
                                disabled={
                                    Object.keys(errors).length || submitting
                                }
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
