/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
import React, {useMemo} from 'react';
import {Helmet} from 'react-helmet';

type Props = {
    /**
     * FAQ CMS page content
     */
    content: string,
    /**
     * Maximum amount of items (question + answer = 1 item)
     */
    itemsLimit?: number
};

// Literally anything inside <h4> (question) and it's sibling <div> (answer)
const REG_EXP = /<h4 class="cms-accordion-action".*?>([\s\S]*?)<\/h4><div.*?>([\s\S]*?)<\/div>/g;
const DEFAULT_ITEMS_LIMIT = 3;

const parseHtml = (html: string) => html
    // Remove linebreaks
    .replace(/\n/g, ' ').replace(/\r/g, '')
    // Remove HTML tags
    .replace(/<.+?>/g, '')
    // Escape double quotes (due to JSON syntax)
    .replace(/"/g, '\\"')
    .trim();

export function FaqDataMarkupComponent({content, itemsLimit = DEFAULT_ITEMS_LIMIT}: Props) {
    const parsedItems = useMemo(() => {
        if (!content) return [];

        const items = [];

        // Find questions and answers through direct CMS page content parsing
        for (const match of content.matchAll(REG_EXP)) {
            const [, question, answer] = match || [];

            if (items.length === itemsLimit) break;
            if (!question || !answer) continue;

            items.push(`
                {
                    "@type": "Question",
                    "name": "${parseHtml(question)}",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "${parseHtml(answer)}"
                    }
                }
            `);
        }

        return items;
    }, [content, itemsLimit]);

    return !!parsedItems.length && (
        <Helmet>
            <script type="application/ld+json">
                {`
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [${parsedItems.join(', ')}]
                    }
                `}
            </script>
        </Helmet>
    );
}
