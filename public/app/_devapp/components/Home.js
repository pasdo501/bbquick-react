import React, { Component } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";

class Home extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }
    render() {
        const { images } = this.props;
        return (
            <div>
                This is the home component
                {images.map((image) => (
                    <img key={image[0]} src={image[0]} />
                ))}
            </div>
        )
    }
}

function mapStateToProps({ images }) {
    return {
        images
    }
}

export default connect(mapStateToProps)(Home);