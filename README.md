# &lt;Content&gt;&lt;/Content&gt;
A content friendly element for displaying common contents such as paragraphs, images, videos, etc.

Combined with [`@nodestrap/typos`](https://www.npmjs.com/package/@nodestrap/typos) you can create a nicely content (article).  
A common media such as `<img>`, `<figure>`, `<svg>` & `<video>` are formatted to span the maximum Content's width.

## Preview

```jsx
<Content tag='article' theme='primary' size='lg'>
    <img src='https://picsum.photos/800/400' alt='an image' />
    <img src='https://picsum.photos/800/400' alt='an image' />
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum harum ab illum nisi est distinctio delectus dolores</p>
    <img src='https://picsum.photos/800/400' alt='an image' />
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum harum ab illum nisi est distinctio delectus dolores</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum harum ab illum nisi est distinctio delectus dolores</p>
</Content>
```
Rendered to:
```html
<article class="c1 thPrimary szLg">
    <img src="https://picsum.photos/800/400" alt="an image" />
    <img src="https://picsum.photos/800/400" alt="an image" />
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum harum ab illum nisi est distinctio delectus dolores</p>
    <img src="https://picsum.photos/800/400" alt="an image" />
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum harum ab illum nisi est distinctio delectus dolores</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum harum ab illum nisi est distinctio delectus dolores</p>
</article>
```

## Features
* Includes all features in [`<Basic />`](https://www.npmjs.com/package/@nodestrap/basic).
* Common media such as `<img>`, `<figure>`, `<svg>`, `<video>` & `class="media"` are formatted nicely.
* A separator between media.
* A spacer between media and text (paragraphs, headings, etc).
* Customizable via [`@nodestrap/css-config`](https://www.npmjs.com/package/@nodestrap/css-config).

## Installation

Using npm:
```
npm i @nodestrap/content
```

## Support Us

If you feel our lib is useful for your projects,  
please make a donation to avoid our project from extinction.

We always maintain our projects as long as we're still alive.

[[Make a donation](https://ko-fi.com/heymarco)]
