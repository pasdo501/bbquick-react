import React, { Component, Fragment } from "react";

import Review from "./Review";
import ReviewForm from "./ReviewForm";

import { getReviews } from "../util/api";

class Reviews extends Component {
    state = {
        reviews: [],
        replyingTo: {},
    };

    async componentDidMount() {
        const reviews = await getReviews(this.props.id);
        if (reviews !== 404) {
            this.setState({
                reviews,
            });
        }
    }

    handleReply = ({ id, author }) => {
        this.setState({
            replyingTo: {
                id,
                author,
            },
        });
    };

    cancelReply = () => {
        this.setState({
            replyingTo: {},
        });
    };

    render() {
        console.log(this.state.reviews);
        const { reviews, replyingTo } = this.state;
        return (
            <div id="reviews" className="tm-comments uk-panel-box">
                {reviews.length ? (
                    <Fragment>
                        <h2>{`${reviews.length} Review${
                            reviews.length > 1 ? "s" : ""
                        }`}</h2>
                        <ol className="uk-comment-list">
                            {reviews.map((review) => (
                                <Review
                                    key={review.id}
                                    review={review}
                                    handleReply={this.handleReply}
                                />
                            ))}
                        </ol>
                        <hr className="uk-article-divider" />
                        <ReviewForm
                            replyingTo={replyingTo}
                            cancelReply={this.cancelReply}
                            commentId={this.props.id}
                        />
                    </Fragment>
                ) : (
                    <div>Reviews loading ...</div>
                )}
            </div>
        );
    }
}

export default Reviews;
