'use strict';

require('chai').should();
const Hexo = require('hexo');

describe('Stylus renderer', () => {
  const hexo = new Hexo(__dirname, { silent: true });
  const defaultCfg = JSON.parse(
    JSON.stringify(
      Object.assign(hexo.config, {
        stylus: {
          compress: false
        }
      })
    )
  );
  const themeCfg = JSON.parse(
    JSON.stringify(
      Object.assign(hexo.theme.config, {
        foo: 1,
        bar: {
          baz: 2
        },
        nil: null,
        obj: {
          arr: [1, 2, 3]
        }
      })
    )
  );

  const r = require('../dist/renderer-stylus').stylusFn.bind(hexo);

  beforeEach(() => {
    hexo.config = JSON.parse(JSON.stringify(defaultCfg));
    hexo.theme.config = JSON.parse(JSON.stringify(themeCfg));
  });

  it('no config', () => {
    const body = ['.foo', '  color: red'].join('\n');

    hexo.config.stylus = {};
    r({ text: body }, {}, (err, result) => {
      if (err) throw err;

      result.should.eql(['.foo {', '  color: #f00;', '}'].join('\n') + '\n');
    });
  });

  it('default', () => {
    const body = ['.foo', '  color: red'].join('\n');

    r({ text: body }, {}, (err, result) => {
      if (err) throw err;

      result.should.eql(['.foo {', '  color: #f00;', '}'].join('\n') + '\n');
    });
  });

  it('compress', () => {
    hexo.config.stylus.compress = true;

    const body = ['.foo', '  color: red'].join('\n');

    r({ text: body }, {}, (err, result) => {
      if (err) throw err;

      result.should.eql('.foo{color:#f00}');
    });
  });

  it('hexo-config', () => {
    const body = [
      // first depth and exist
      '.foo',
      '  content: hexo-config("foo")',
      '',
      // second depth and exist
      '.bar',
      '  content: hexo-config("bar.baz")',
      '',
      // another style for nested attribute
      '.baz',
      '  content: hexo-config("bar[baz]")',
      '',
      // nested attribute does not exist
      '.boo',
      '  content: hexo-config("bar.boo")',
      '',
      // config does not exist
      '.test',
      '  content: hexo-config("boo")',
      '',
      // try to get nested attribute in non-object
      '.app',
      '  content: hexo-config("foo.test")',
      '',
      // nil attribute
      '.nil',
      '  content: hexo-config("nil")',
      '',
      // object attribute
      '.obj',
      '  for i in hexo-config("obj.arr")',
      '    content: i'
    ].join('\n');

    r({ text: body }, {}, (err, result) => {
      if (err) throw err;

      result.should.eql(
        [
          '.foo {',
          '  content: 1;',
          '}',
          '.bar {',
          '  content: 2;',
          '}',
          '.baz {',
          '  content: 2;',
          '}',
          '.boo {',
          "  content: '';",
          '}',
          '.test {',
          "  content: '';",
          '}',
          '.app {',
          "  content: '';",
          '}',
          '.nil {',
          "  content: '';",
          '}',
          '.obj {',
          '  content: 1;',
          '  content: 2;',
          '  content: 3;',
          '}'
        ].join('\n') + '\n'
      );
    });
  });

  describe('exec filter to extend', () => {
    it('should execute filter registered to stylus:renderer', () => {
      const hexo = new Hexo(__dirname, { silent: true });
      Object.assign(hexo, {
        config: {
          stylus: {
            compress: false
          }
        }
      });
      hexo.extend.filter.register('stylus:renderer', (style) => {
        style.define('examples', () => {
          return 'foo';
        });
      });
      const filterRender = require('../dist/renderer-stylus').stylusFn.bind(hexo);
      const body = ['.foo', '  content: examples()', ''].join('\n');
      filterRender({ text: body }, {}, (err, result) => {
        if (err) throw err;
        result.should.eql(['.foo {', "  content: 'foo';", '}'].join('\n') + '\n');
      });
    });

    describe('nunjucks', () => {
      const hexo = new Hexo(__dirname, { silent: true });
      const loremFn = () => {
        return 'ipsum';
      };
      const engine = 'styl';

      before(async () => {
        await hexo.init();
        hexo.extend.tag.register('lorem', loremFn);
        hexo.extend.renderer.register('styl', 'css', require('../dist/renderer-stylus').stylusFn);
      });

      it('default', async () => {
        const result = await hexo.post.render(null, { content: 'foo\n  bar: "{% lorem %}"', engine });
        result.content.should.eql('foo {\n  bar: "{% lorem %}";\n}\n');
      });

      it('disable disabelNunjucks', async () => {
        const renderer = hexo.render.renderer.get('styl');
        renderer.disableNunjucks = false;
        hexo.extend.renderer.register('styl', 'css', renderer);

        const result = await hexo.post.render(null, { content: 'foo\n  bar: "{% lorem %}"', engine });
        result.content.should.eql('foo {\n  bar: "' + loremFn() + '";\n}\n');
      });
    });
  });
});
