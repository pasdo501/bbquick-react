import { getInitialData } from "../util/api";
import { receiveHomepageImages } from "./images";

export function handleInitialData() {
    return (dispatch) => {
        getInitialData()
            .then((images) => {
                dispatch(receiveHomepageImages(images));
            })
            .catch((error) => {
                console.warn(error);
            });
    }
}