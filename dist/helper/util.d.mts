/** get category names */
declare const categorieName: (inCategories: any) => string | string[];
/** get tag names */
declare const tagName: (inTags: any) => string[];
/** turn all type as partial recursively */
type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
declare const logname: string;

export { type DeepPartial, categorieName, logname, tagName };
