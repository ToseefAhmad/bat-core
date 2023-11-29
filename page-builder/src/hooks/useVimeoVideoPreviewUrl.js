import {useState, useEffect} from 'react';
import {stringify} from 'query-string';

import {useResolutions} from '@luft/common';

import {isVimeoVideo, getVideoIdFromUrl} from '../utils';

const LARGE_VIDEO_SIZE = {
    width: 1280,
    height: 720
};

export const useVimeoVideoPreviewUrl = (url?: string) => {
    const [previewUrl, setPreviewUrl] = useState();
    const {isSMdown} = useResolutions();

    useEffect(() => {
        if (!url || !isVimeoVideo(url)) return;

        (async () => {
            try {
                const videoId = getVideoIdFromUrl(url);
                const videoSize = isSMdown ? {} : LARGE_VIDEO_SIZE;
                const queryParams = stringify({
                    url: `https://vimeo.com/${videoId}`,
                    ...videoSize
                });

                const response = await fetch(`https://vimeo.com/api/oembed.json?${queryParams}`);
                const {thumbnail_url} = await response.json();

                setPreviewUrl(thumbnail_url);
            } catch {}
        })();
    }, [url, isSMdown]);

    return previewUrl;
};
