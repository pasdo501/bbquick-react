import { createPortal } from "react-dom";

const Portal = ({ children, portalRoot }) => (
    createPortal(
        children,
        portalRoot
    )
)

export default Portal;