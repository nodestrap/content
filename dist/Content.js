// react:
import { default as React, } from 'react'; // base technology of our nodestrap components
// cssfn:
import { 
// compositions:
composition, mainComposition, imports, 
// layouts:
layout, children, nextSiblings, 
// rules:
variants, rule, } from '@cssfn/cssfn'; // cssfn core
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
    return composition([
        imports([
            // borders:
            usesBorderAsContainer({ itemsSelector: mediaSelector }), // make a nicely rounded corners
        ]),
        layout({
            // children:
            ...children(mediaSelector, [
                layout({
                    // sizes:
                    // span to maximum width including parent's paddings:
                    boxSizing: 'border-box',
                    inlineSize: 'fill-available',
                    fallbacks: {
                        inlineSize: `calc(100% + (${positivePaddingInline} * 2))`,
                    },
                    // spacings:
                    marginInline: negativePaddingInline,
                    marginBlockEnd: positivePaddingBlock,
                    // children:
                    // make sibling <media> closer (cancel out prev sibling's spacing):
                    ...nextSiblings(mediaSelector, [
                        layout({
                            // spacings:
                            marginBlockStart: negativePaddingBlock, // cancel out prev sibling's spacing with negative margin
                        }),
                    ]),
                }),
                variants([
                    rule(':where(:first-child)', [
                        layout({
                            // spacings:
                            marginBlockStart: negativePaddingBlock, // cancel out parent's padding with negative margin
                        }),
                    ]),
                    rule(':where(:last-child)', [
                        layout({
                            // spacings:
                            marginBlockEnd: negativePaddingBlock, // cancel out parent's padding with negative margin
                        }),
                    ]),
                ]),
            ]),
        }),
    ]);
};
export const usesContentChildrenMedia = (options = {}) => {
    // options:
    const { mediaSelector = mediaElm, } = options;
    const allMediaSelector = ([mediaSelector]
        .flat(Infinity)
        .filter((m) => !!m));
    const figureSelector = allMediaSelector.some((m) => (m === 'figure')) && 'figure';
    const nonFigureSelector = allMediaSelector.filter((m) => !!m && (m !== 'figure'));
    // dependencies:
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius();
    return composition([
        layout({
            // children:
            // first: reset top_level <figure>
            ...children(figureSelector, [
                imports([
                    stripoutFigure(), // clear browser's default styling on figure
                ]),
                layout({
                    // layouts:
                    display: 'block', // fills the entire parent's width
                }),
            ]),
            // then: styling top_level <figure>, top_level <media> & nested <media>:
            ...children([
                nonFigureSelector,
                nonFigureSelector.map((m) => `figure>${m}`),
            ], [
                imports([
                    stripoutImage(), // clear browser's default styling on image
                ]),
                layout({
                    // layouts:
                    display: 'block',
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'media')), // apply general cssProps starting with img***
                }),
            ]),
            // finally: styling top_level <figure> & top_level <media> as separator:
            ...children(allMediaSelector, [
                layout({
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
                imports([
                    // borders:
                    usesBorderAsSeparatorBlock({ itemsSelector: allMediaSelector }), // must be placed at the last
                ]),
            ]),
        }),
    ]);
};
export const usesContentChildrenLinks = (options = {}) => {
    // options:
    const { linkSelector = linksElm, } = options;
    return composition([
        layout({
            // children:
            ...children(linkSelector, [
                layout({
                    // children:
                    // make a gap to sibling <a>:
                    ...nextSiblings(linkSelector, [
                        layout({
                            // spacings:
                            // add a space between links:
                            marginInlineStart: cssProps.linkSpacing,
                        }),
                    ]),
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'link')), // apply general cssProps starting with link***
                }),
            ]),
        }),
    ]);
};
export const usesContentChildren = (options = {}) => {
    return composition([
        imports([
            // media:
            usesContentChildrenMedia(options),
            // links:
            usesContentChildrenLinks(options),
            // spacings:
            usesContentChildrenFill(options), // must be placed at the last
        ]),
    ]);
};
export const usesContentBasicLayout = () => {
    return composition([
        layout({
            // customize:
            ...usesGeneralProps(cssProps),
            // spacings:
            ...expandPadding(cssProps), // expand padding css vars
        }),
    ]);
};
export const usesContentLayout = () => {
    return composition([
        imports([
            // layouts:
            usesBasicLayout(),
            usesContentBasicLayout(),
        ]),
    ]);
};
export const usesContentBasicVariants = () => {
    // dependencies:
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    return composition([
        imports([
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesContentVariants = () => {
    return composition([
        imports([
            // variants:
            usesBasicVariants(),
            // layouts:
            usesContentBasicVariants(),
        ]),
    ]);
};
export const useContentSheet = createUseSheet(() => [
    mainComposition([
        imports([
            // layouts:
            usesContentLayout(),
            // variants:
            usesContentVariants(),
            // children:
            usesContentChildren(),
        ]),
    ]),
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
