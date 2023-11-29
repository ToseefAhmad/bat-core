export const isYouTubeVideo = (url: string) => {
    const youtubeRegExp = new RegExp(
        '^(?:https?://|//)?(?:www\\.|m\\.)?(?:youtu\\.be/|youtube\\.com/(?:embed/|v/|watch\\?v=|watch\\?.+&v=))([\\w-]{11})(?![\\w-])'
    );

    return youtubeRegExp.test(url);
};
