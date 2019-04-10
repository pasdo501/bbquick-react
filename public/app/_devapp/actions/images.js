export const RECEIVE_HOMEPAGE_IMAGES = 'RECEIVE_HOMEPAGE_IMAGES';

export function receiveHomepageImages(images) {
    return {
        type: RECEIVE_HOMEPAGE_IMAGES,
        images
    }
}