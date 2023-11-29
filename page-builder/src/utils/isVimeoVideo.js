export const isVimeoVideo = (url: string) => {
    const vimeoRegExp = new RegExp(
        'https?://(?:www\\.|player\\.)?vimeo.com/(?:channels/(?:\\w+/)?|groups/([^/]*)/videos/|album/(\\d+)/video/|video/|)(\\d+)(?:$|/|\\?)'
    );

    return vimeoRegExp.test(url);
};
