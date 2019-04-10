import { RECEIVE_HOMEPAGE_IMAGES } from "../actions/images";

export default function images(state = [], action) {
    switch(action.type) {
        case RECEIVE_HOMEPAGE_IMAGES:
            return state.concat(action.images);
        default:
            return state;
    }
}