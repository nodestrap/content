// react:
import { default as React, } from 'react'; // base technology of our nodestrap components
// cssfn:
import { 
// compositions:
mainComposition, 
// styles:
style, imports, 
// rules:
rule, fallbacks, 
//combinators:
children, nextSiblings, } from '@cssfn/cssfn'; // cssfn core
import { 
// hooks:
createUseSheet, } from '@cssfn/react-cssfn'; // cssfn for react
import { createCssConfig, 
// utilities:
usesGeneralProps, usesPrefixedProps, usesSuffixedProps, overwriteProps, } from '@cssfn/css-config'; // Stores & retrieves configuration using *css custom properties* (css variables)
// nodestrap utilities:
import spacers from '@nodestrap/spacers'; // configurable spaces defs
import { stripoutFigure, stripoutImage, } from '@nodestrap/stripouts';
// nodestrap components:
import { 
// hooks:
usesSizeVariant, expandBorderStroke, usesBorderRadius, expandBorderRadius, expandPadding, 
// styles:
usesBasicLayout, usesBasicVariants, Basic, } from '@nodestrap/basic';
import { 
// selectors:
selectorIsFirstVisibleChild, selectorIsLastVisibleChild, 
// hooks:
usesContainer, usesBorderAsContainer, usesBorderAsSeparatorBlock, } from '@nodestrap/container';
// styles:
const mediaElm = ['figure', 'img', 'svg', 'video', '.media'];
const linksElm = ['a', '.link'];
export const usesContentChildrenFill = (options = {}) => {
    // options:
    const { mediaSelector = mediaElm, } = options;
    // dependencies:
    // spacings:
    const [, containerRefs] = usesContainer();
    const positivePaddingInline = containerRefs.paddingInline;
    const positivePaddingBlock = containerRefs.paddingBlock;
    const negativePaddingInline = `calc(0px - ${positivePaddingInline})`;
    const negativePaddingBlock = `calc(0px - ${positivePaddingBlock})`;
    return style({
        ...imports([
            // borders:
            usesBorderAsContainer({ itemsSelector: mediaSelector }), // make a nicely rounded corners
        ]),
        ...style({
            // children:
            ...children(mediaSelector, {
                // sizes:
                // span to maximum width including parent's paddings:
                boxSizing: 'border-box',
                inlineSize: 'fill-available',
                ...fallbacks({
                    inlineSize: `calc(100% + (${positivePaddingInline} * 2))`,
                }),
                // spacings:
                marginInline: negativePaddingInline,
                marginBlockEnd: positivePaddingBlock,
                ...rule(selectorIsFirstVisibleChild, {
                    marginBlockStart: negativePaddingBlock, // cancel out parent's padding with negative margin
                }),
                ...rule(selectorIsLastVisibleChild, {
                    marginBlockEnd: negativePaddingBlock, // cancel out parent's padding with negative margin
                }),
                // children:
                // make sibling <media> closer (cancel out prev sibling's spacing):
                ...nextSiblings(mediaSelector, {
                    // spacings:
                    marginBlockStart: negativePaddingBlock, // cancel out prev sibling's spacing with negative margin
                }),
            }),
        }),
    });
};
export const usesContentChildrenMedia = (options = {}) => {
    // options:
    const { mediaSelector = mediaElm, } = options;
    const allMediaSelector = ([mediaSelector]
        .flat(Infinity)
        .filter((m) => !!m) // filter out undefined|null|false|''
    );
    const figureSelector = allMediaSelector.some((m) => (m === 'figure')) && 'figure';
    const nonFigureSelector = allMediaSelector.filter((m) => (m !== 'figure'));
    // dependencies:
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius();
    return style({
        // children:
        // first: reset top_level <figure>
        ...children(figureSelector, {
            ...imports([
                stripoutFigure(),
                // borders:
                usesBorderAsContainer(), // make a nicely rounded corners
            ]),
            ...style({
                // layouts:
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'stretch',
                flexWrap: 'nowrap',
                // children:
                ...children('*', {
                    ...expandBorderRadius(), // expand borderRadius css vars
                }),
            }),
        }),
        // then: styling top_level <figure>, top_level <media> & nested <media>:
        ...children([
            nonFigureSelector,
            nonFigureSelector.map((m) => `figure>${m}`),
        ], {
            ...imports([
                stripoutImage(), // clear browser's default styling on image
            ]),
            ...style({
                // layouts:
                display: 'block',
                // customize:
                ...usesGeneralProps(usesPrefixedProps(cssProps, 'media')), // apply general cssProps starting with img***
            }),
        }),
        // finally: styling top_level <figure> & top_level <media> as separator:
        ...children(allMediaSelector, {
            ...style({
                // borders:
                // let's Nodestrap system to manage borderStroke & borderRadius:
                ...expandBorderStroke(),
                ...expandBorderRadius(),
                // remove rounded corners on top:
                [borderRadiusDecls.borderStartStartRadius]: '0px',
                [borderRadiusDecls.borderStartEndRadius]: '0px',
                // remove rounded corners on bottom:
                [borderRadiusDecls.borderEndStartRadius]: '0px',
                [borderRadiusDecls.borderEndEndRadius]: '0px',
            }),
            ...imports([
                // borders:
                usesBorderAsSeparatorBlock({ itemsSelector: allMediaSelector }), // must be placed at the last
            ]),
        }),
    });
};
export const usesContentChildrenLinks = (options = {}) => {
    // options:
    const { linkSelector = linksElm, } = options;
    return style({
        // children:
        ...children(linkSelector, {
            // children:
            // make a gap to sibling <a>:
            ...nextSiblings(linkSelector, {
                // spacings:
                // add a space between links:
                marginInlineStart: cssProps.linkSpacing,
            }),
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'link')), // apply general cssProps starting with link***
        }),
    });
};
export const usesContentChildren = (options = {}) => {
    return style({
        ...imports([
            // media:
            usesContentChildrenMedia(options),
            // links:
            usesContentChildrenLinks(options),
            // spacings:
            usesContentChildrenFill(options), // must be placed at the last
        ]),
    });
};
export const usesContentBasicLayout = () => {
    return style({
        // customize:
        ...usesGeneralProps(cssProps),
        // spacings:
        ...expandPadding(cssProps), // expand padding css vars
    });
};
export const usesContentLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesBasicLayout(),
            usesContentBasicLayout(),
        ]),
    });
};
export const usesContentBasicVariants = () => {
    // dependencies:
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    return style({
        ...imports([
            // layouts:
            sizes(),
        ]),
    });
};
export const usesContentVariants = () => {
    return style({
        ...imports([
            // variants:
            usesBasicVariants(),
            usesContentBasicVariants(),
        ]),
    });
};
export const useContentSheet = createUseSheet(() => [
    mainComposition(imports([
        // layouts:
        usesContentLayout(),
        // variants:
        usesContentVariants(),
        // children:
        usesContentChildren(),
    ])),
], /*sheetId :*/ '2h0i4lc78z'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names
// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region spacings
        paddingInline: spacers.default,
        paddingBlock: spacers.default,
        paddingInlineSm: spacers.sm,
        paddingBlockSm: spacers.sm,
        paddingInlineLg: spacers.lg,
        paddingBlockLg: spacers.lg,
        //#endregion spacings
        // links:
        linkSpacing: spacers.sm,
    };
}, { prefix: 'ct' });
export function Content(props) {
    // styles:
    const sheet = useContentSheet();
    // jsx:
    return (React.createElement(Basic, { ...props, 
        // variants:
        mild: props.mild ?? true, 
        // classes:
        mainClass: props.mainClass ?? sheet.main }));
}
export { Content as default };
export function Article(props) { return React.createElement(Content, { ...props, semanticTag: 'article', semanticRole: 'article' }); }
export function Section(props) { return React.createElement(Content, { ...props, semanticTag: 'section', semanticRole: 'region' }); }
export function Aside(props) { return React.createElement(Content, { ...props, semanticTag: 'aside', semanticRole: 'complementary' }); }
// mark as Content compatible:
Article.prototype = Content.prototype;
Section.prototype = Content.prototype;
Aside.prototype = Content.prototype;
