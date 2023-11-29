export const getEngravingOptions = (opts = []) => {
    if (!opts) return [];

    return opts.map(opt => ({
        psn_is_personalisable: Boolean(opt.image || opt.text),
        psn_back_text_font_family_id: opt.font?.id,
        psn_back_text_font_family: opt.font?.name,
        psn_back_text_direction: opt.direction,
        psn_back_text: opt.text,
        ...(opt.image?.pattern_image) && {
            psn_front_pattern_id: opt.image?.id,
            psn_front_pattern: opt.image?.name
        },
        ...(opt.image?.icon_image) && {
            psn_front_icon_id: opt.image?.id,
            psn_front_icon: opt.image?.name
        }
    }));
};
