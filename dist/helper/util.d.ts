/** get category names */
export declare const categorieName: (inCategories: any) => string | string[];
/** get tag names */
export declare const tagName: (inTags: any) => string[];
/** turn all type as partial recursively */
export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
