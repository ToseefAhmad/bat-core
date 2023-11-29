import {initBlockContentTypeConfig as initBlock} from './BlockContentType';
import {initImageContentTypeConfig as initImage} from './ImageContentType';
import {initProductsContentTypeConfig as initProducts} from './ProductsContentType';
import {initSliderContentTypeConfig as initSlider} from './SliderContentType';
import {initVideoContentTypeConfig as initVideo} from './VideoContentType';
import {initButtonsContentTypeConfig as initButtons} from './ButtonsContentType';
import {initRegistrationFormContentTypeConfig as initRegistrationForm} from './RegistrationFormContentType';
import {initFormBuilderContentTypeConfig as initFormBuilder} from './FormBuilderContentType';

import type {Sizes} from '../hooks';

type Options = {
    slider: Sizes
};

// A facade for a more convenient usage
export const initContentTypeConfigs = (options: Options = {}) => {
    const {slider} = options;

    // TODO: Remove this line after upgrading @magento/pagebuilder version to v7.3.0 or higher
    initBlock();
    initImage();
    initProducts();
    initSlider(slider);
    initVideo();
    initButtons();
    initRegistrationForm();
    initFormBuilder();
};
