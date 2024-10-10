import Hexo__default from 'hexo';

interface HexoLocalsData {
    [key: string]: any;
    page: {
        [key: string]: any;
        path: string;
    };
    path: string;
    url: string;
    config: Hexo__default['config'];
    theme: Record<string, any>;
    layout: string;
    env: any;
    view_dir: string;
    site: Record<string, any>;
    cache?: boolean;
    /** absolute path source post markdown */
    full_source?: string;
}
interface HexoRenderData {
    text?: string;
    path?: string;
}

export type { HexoLocalsData, HexoRenderData };
