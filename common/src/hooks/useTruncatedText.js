import {useState} from 'react';

import {useResolutions} from '@luft/common';

const STRING_HEIGHT = 21;
const MAX_TEXT_LENGTH_FOR_DKT_AND_TAB = 300;
const MAX_TEXT_LENGTH_FOR_MOB = 120;

export const useTruncatedText = ({
    description,
    descriptionMaxLength,
    shortDescriptionWords,
    input,
    numberOfStrings
}) => {
    const [isMore, setIsMore] = useState(false);
    const [text, setText] = useState('');
    const {isXS} = useResolutions();

    const setInitialText = () => {
        if (!description) return;

        if (descriptionMaxLength) {
            if (description.length > descriptionMaxLength) {
                const shortDescription = description.split(' ', shortDescriptionWords).join(' ');
                setText(shortDescription);
                setIsMore(true);
            } else {
                setText(description);
            }
        } else {
            const boxHeight = !!input && STRING_HEIGHT * numberOfStrings;
            if (input && input.offsetHeight > boxHeight) {
                setIsMore(true);
            }
            setText(description);
        }
    };

    const onSetFullText = () => {
        setIsMore(false);
        setText(description);
        if (input) {
            input.removeAttribute('style');
        }
    };

    const getDetailText = (txt, txtFlag) => {
        const numberOfCharecters = isXS ? MAX_TEXT_LENGTH_FOR_MOB : MAX_TEXT_LENGTH_FOR_DKT_AND_TAB;

        if (txtFlag) return txt.slice(0, numberOfCharecters);

        return txt;
    };

    return {
        isMore,
        text,
        setInitialText,
        onSetFullText,
        getDetailText
    };
};
