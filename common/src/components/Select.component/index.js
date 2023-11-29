import loadable from '@loadable/component';

export const SelectComponentLoadable = loadable(() => import('./Select.component'), {
    resolveComponent: module => module.SelectComponent
});

export {SelectComponent} from './Select.component';
