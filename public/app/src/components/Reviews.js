import React, { Component, Fragment } from "react";

import Review from "./Review";
import ReviewForm from "./ReviewForm";

import { getReviews } from "../util/api";

class Reviews extends Component {
    state = {
        loaded: false,
        reviews: [],
        nonce: "",
        replyingTo: {},
    };

    async componentDidMount() {
        const { reviews_data: reviews, nonce } = await getReviews(
            this.props.id
        );
        if (reviews !== 404) {
            this.setState({
                reviews,
                nonce,
                loaded: true,
            });
        } else {
            this.setState({
                nonce,
                loaded: true,
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

    handleUpdate = async ({ moderationHash = null, unapprovedId = null }) => {
        const { reviews_data: reviews, nonce } = await getReviews(
            this.props.id,
            moderationHash,
            unapprovedId
        );

        if (reviews !== 404) {
            this.setState({
                reviews,
                nonce,
            });
        }
    };

    render() {
        const { reviews, replyingTo, loaded, nonce } = this.state;
        // Getting this as a prop rather than the reviews length because
        // otherwise comments with no ratings (e.g. moderator replies)
        // also count as customer reviews
        const { reviewCount } = this.props;
        return (
            <div id="reviews" className="tm-comments uk-panel-box">
                {loaded ? (
                    <Fragment>
                        {reviewCount ? (
                            <Fragment>
                                <h2>{`${reviewCount} Review${
                                    reviewCount > 1 ? "s" : ""
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
                            </Fragment>
                        ) : (
                            <p className="uk-text-muted">
                                No one has reviewed yet
                            </p>
                        )}
                        <hr className="uk-article-divider" />
                        <ReviewForm
                            replyingTo={replyingTo}
                            cancelReply={this.cancelReply}
                            commentId={this.props.id}
                            akismetNonce={nonce}
                            triggerUpdate={this.handleUpdate}
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
