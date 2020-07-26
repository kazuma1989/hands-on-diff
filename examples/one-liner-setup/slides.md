# How to use Hands-on Diff

[@kazuma1989](https://github.com/kazuma1989/)

=

## Import a script from CDN

In your index.html:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/gh/kazuma1989/hands-on-diff/src/render.js"
></script>
```

=

## Write the `diff-list.json`

```json
[
  {
    "title": "index.html",
    "original": {
      "src": "./part_1/index.html",
      "lang": "html",
      "preview": "./part_1/"
    },
    "modified": {
      "src": "./part_2/index.html",
      "lang": "html",
      "preview": "./part_2/"
    }
  }
]
```

=

## Write the `slides.md`

[Reveal.js](https://revealjs.com) converts the markdown into slides.

---

## That's it

Horizontal page navigates code diffs.
