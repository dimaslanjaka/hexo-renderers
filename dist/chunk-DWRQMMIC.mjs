import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  __esm
} from "./chunk-QAIXVEL3.mjs";

// src/helper/partial.ts
import { dirname, join } from "upath";
function partialWithLayout(ctx) {
  return function partialWithLayout2(name, locals, options = {}) {
    if (typeof name !== "string") throw new TypeError("argument name must be a string!");
    const { cache } = options;
    const self = this;
    const viewDir = self.view_dir;
    const currentView = self.filename.substring(viewDir.length);
    const path = join(dirname(currentView), name);
    const view = ctx.theme.getView(path) || ctx.theme.getView(name);
    const viewLocals = { layout: false };
    if (!view) {
      throw new Error(`Partial ${name} does not exist. (in ${currentView})`);
    }
    if (options.only) {
      Object.assign(viewLocals, locals);
    } else {
      Object.assign(viewLocals, this, locals);
    }
    if (cache) {
      const cacheId = typeof cache === "string" ? cache : view.path;
      return this.fragment_cache(cacheId, () => view.renderSync(viewLocals));
    }
    return view.renderSync(viewLocals);
  };
}
var init_partial = __esm({
  "src/helper/partial.ts"() {
  }
});

export {
  partialWithLayout,
  init_partial
};
