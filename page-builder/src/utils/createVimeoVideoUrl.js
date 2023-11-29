import {stringify, parse} from 'query-string';

export const createVimeoVideoUrl = (url: string) => {
    const [baseUrl, search] = url.split('?');
    const queryParams = stringify({...parse(search), autoplay: 1});

    return `${baseUrl}?${queryParams}`;
};
