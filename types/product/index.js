export type Icon = {
    /**
     * Icon identifier
     */
    id: number,
    /**
     * Icon thumbnail image
     */
    name: string,
    /**
     * Icon name
     */
    thumbnail_image: string,
    /**
     * Icon image
     */
    icon_image: string
}

export type Pattern = {
    /**
     * Pattern identifier
     */
    id: number,
    /**
     * Pattern name
     */
    name: string,
    /**
     * Pattern thumbnail image
     */
    thumbnail_image: string,
    /**
     * Pattern image
     */
    pattern_image: string,
    /**
     * Pattern category name
     */
    category_name: string
}

export type Font = {
    /**
     * Font identifier
     */
    id: number,
    /**
     * Font name
     */
    name: string,
    /**
     * Font preview text
     */
    preview_text: string,
    /**
     * Font file
     */
    font_file: string,
    /**
     * Font size
     */
    font_size: string
}

export type EngravedOptionsInfo = {
    /**
     * Pattern name
     */
    psn_front_pattern: string,
    /**
     * Icon name
     */
    psn_front_icon: string,
    /**
     * Text font family
     */
    psn_back_text_font_family: string,
    /**
     * Engraving text direction
     */
    psn_back_text_direction: string,
    /**
     * Engraving text
     */
    psn_back_text: string
}
