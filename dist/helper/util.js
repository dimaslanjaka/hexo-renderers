import ansiColors from 'ansi-colors';
/** get category names */
export const categorieName = (inCategories) => {
    if (!inCategories)
        return [];
    // return when first array is string
    if (typeof inCategories.data[0] === 'string')
        return inCategories;
    let catName = '';
    for (let r = 0; r < inCategories.data.length; r++) {
        if (catName != '')
            catName += ' > ';
        catName += inCategories.data[r].name;
    }
    return catName;
};
/** get tag names */
export const tagName = (inTags) => {
    if (!inTags || !Array.isArray(inTags.data))
        return [];
    // return when first array is string
    if (typeof inTags.data[0] === 'string')
        return inTags;
    const retTags = [];
    inTags.data.forEach((item) => {
        retTags.push(item.name);
    });
    return retTags;
};
export const logname = ansiColors.magentaBright('hexo-renderers');
