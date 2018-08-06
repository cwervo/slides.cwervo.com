# slides.cwervo.com

This is a little collection of my slides using [Reveal.js](https://github.com/hakimel/reveal.js)

Download all the dependencies by running:
```
yarn install
```

All you should need is a local server.

The main page, though, is generated using [showdown](https://github.com/AndresCuervo/slides.cwervo.com) from `a talks.json`, and is compiled using this command:

```bash
yarn fp # stands for "front page"
```

---

Note: some of these newer slides use [`mdx-deck`](https://github.com/jxnblk/mdx-deck), in which case you'll need a _global_ install of `mdx-deck`:

```bash
yarn global add mdx-deck
```

Then you can run individual slides like

```
mdx-deck gray-area-slides/peer-critique-1/index.mdx
```

To build a given slide navigate to the directory it's in & run:

```
mdx-deck build index.mdx --out-dir .
```

This is so that we can have subdirectories for everything instead of having to recompile all the slides each time or manage a large build script system. Realistically each slide deck will only be developed/worked on once (before presenting) anyway.
