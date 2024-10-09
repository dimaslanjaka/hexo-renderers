---
title: nunjucks in markdown
date: 2023-10-04T09:26:26+07:00
---

## pretext

inline codeblock `build-${{ hashFiles('package-lock.json') }}`

```js
const varx = `build-${{ hashFiles('package-lock.json') }}`
```

```ts
const xvar = `build-${{ hashFiles('package-lock.json') }}`
```

```
const var = `build-${{ hashFiles('package-lock.json') }}`
```

## meta info

- published: {{ page.date }}
- modified: {{ page.updated }}

## Curly bracket inside hyperlink

- [This should escaped <x> <y>](https://stackoverflow.com/questions/43900035/ts4023-exported-variable-x-has-or-is-using-name-y-from-external-module-but)

- [This should <b>valid</b>](https://stackoverflow.com/questions/43900035/ts4023-exported-variable-x-has-or-is-using-name-y-from-external-module-but)

- [This should **valid**](https://stackoverflow.com/questions/43900035/ts4023-exported-variable-x-has-or-is-using-name-y-from-external-module-but)