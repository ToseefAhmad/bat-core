import {
    getBorder,
    getCssClasses,
    getIsHidden,
    getMargin,
    getPadding,
    getTextAlign
} from '@magento/pagebuilder/lib/utils';

const isLink = (node) => node.nodeName === 'A';
const isPicture = (node) => node.nodeName === 'PICTURE';

export default node => {
    if (!node.childNodes[0]) {
        return {};
    }

    const imageNode = isLink(node.childNodes[0]) ? node.childNodes[0].childNodes : node.childNodes;
    const hasDoublePicture = imageNode.length === 2 && [...imageNode].every(isPicture);

    const getImg = (imgNode) => {
        if (hasDoublePicture) {
            return [
                imgNode.children[0].getAttribute('srcset'), // desired image
                imgNode.children[1].getAttribute('src') // fallback image
            ];
        }
        return imgNode.getAttribute('src');
    };

    const getAlt = (imgNode) => {
        if (hasDoublePicture) {
            return imgNode.children[1].getAttribute('alt');
        }
        return imgNode.getAttribute('alt');
    };

    const getTitle = (imgNode) => {
        if (hasDoublePicture) {
            return imgNode.children[1].getAttribute('title');
        }
        return imgNode.getAttribute('title');
    };

    const getImgBorder = (imgNode) => {
        if (hasDoublePicture) {
            return getBorder(imgNode.children[1]);
        }
        return getBorder(imgNode);
    };

    const props = {
        hasDoublePicture,
        desktopImage: imageNode[0] ? getImg(imageNode[0]) : null,
        mobileImage: imageNode[1] ? getImg(imageNode[1]) : null,
        altText: imageNode[0] ? getAlt(imageNode[0]) : null,
        title: imageNode[0] ? getTitle(imageNode[0]) : null,
        openInNewTab: node.childNodes[0].getAttribute('target') === '_blank',
        ...getPadding(node),
        ...getMargin(node),
        ...(imageNode[0] ? getImgBorder(imageNode[0]) : []),
        ...getCssClasses(node),
        ...getTextAlign(node),
        ...getIsHidden(node)
    };

    if (props.desktopImage === props.mobileImage) {
        props.mobileImage = null;
    }

    if (isLink(node.childNodes[0])) {
        props.link = node.childNodes[0].getAttribute('href');
        props.linkType = node.childNodes[0].getAttribute('data-link-type');
    }

    const captionElement = node.querySelector('figcaption');

    if (captionElement) {
        props.caption = captionElement.textContent;
    }

    return props;
};
