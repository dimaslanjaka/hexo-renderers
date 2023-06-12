/** get category names */
export const categorieName = (inCategories: any) => {
  if (!inCategories) return [] as string[];
  let catName = '';
  for (let r = 0; r < inCategories.data.length; r++) {
    if (catName != '') catName += ' > ';
    catName += inCategories.data[r].name;
  }
  return catName;
};
/** get tag names */
export const tagName = (inTags: any) => {
  if (!inTags) return [] as string[];
  const retTags = [] as string[];
  if (Array.isArray(inTags.data)) {
    inTags.data.forEach((item: any) => {
      retTags.push(item.name);
    });
  }
  return retTags;
};

/** turn all type as partial recursively */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
