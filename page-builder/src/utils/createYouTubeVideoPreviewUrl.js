import {getVideoIdFromUrl} from './getVideoIdFromUrl';

type Quality = 'default' | 'high' | 'medium' | 'standard' | 'max';

const QUALITY_TYPES = {
    default: 'default',
    high: 'hqdefault',
    medium: 'mqdefault',
    standard: 'sddefault',
    max: 'maxresdefault'
};

export const createYouTubeVideoPreviewUrl = (url: string, type: Quality = 'max') => {
    const videoId = getVideoIdFromUrl(url);
    const quality = QUALITY_TYPES[type];

    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};
