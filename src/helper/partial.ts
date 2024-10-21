import Hexo from 'hexo';
import path from 'upath';

// original https://github.com/hexojs/hexo/blob/cb19b2938d1f7882a4cb41a98974a3d673a63b45/lib/plugins/helper/partial.js#L5

export function partialWithLayout(ctx: Hexo) {
  return function partialWithLayout(
    this: Record<string, any>,
    name: string,
    locals: import('hexo')['locals'],
    options: Record<string, any> = {}
  ) {
    if (typeof name !== 'string') throw new TypeError('argument name must be a string!');

    const { cache } = options;
    const self = this;
    const viewDir = self.view_dir;
    const currentView = self.filename.substring(viewDir.length);
    const thePath = path.join(path.dirname(currentView), name);
    const view = ctx.theme.getView(thePath) || ctx.theme.getView(name);
    const viewLocals = { layout: false };

    if (!view) {
      throw new Error(`Partial ${name} does not exist. (in ${currentView})`);
    }

    if (options.only) {
      Object.assign(viewLocals, locals);
    } else {
      Object.assign(viewLocals, this, locals);
    }

    // Partial don't need layout
    // viewLocals.layout = false;

    if (cache) {
      const cacheId = typeof cache === 'string' ? cache : view.path;

      return this.fragment_cache(cacheId, () => view.renderSync(viewLocals));
    }

    return view.renderSync(viewLocals);
  };
}
