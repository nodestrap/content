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
import { 
// parses:
parseSelectors, 
// creates & tests:
createPseudoClassSelector, isElementSelectorOf, createSelector, createSelectorList, isNotEmptySelectors, 
// renders:
selectorToString, 
// transforms:
groupSelectors, groupSelector, } from '@cssfn/css-selector';
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
import Button from '@nodestrap/button';
// styles:
const mediaElm = ['figure', 'img', 'svg', 'video', 'picture', 'embed', 'object', '.media'];
const notMediaElm = '.not-media';
const linksElm = ['a', '.link'];
const notLinksElm = '.not-link';
export const usesContentChildrenOptions = (options = {}) => {
    // options:
    const { mediaSelector: mediaSelectorStr = mediaElm, notMediaSelector: notMediaSelectorStr = notMediaElm, } = options;
    const mediaSelector = parseSelectors(mediaSelectorStr);
    const notMediaSelector = parseSelectors(notMediaSelectorStr);
    const notNotMediaSelector = notMediaSelector && createPseudoClassSelector(// create pseudo_class `:not()`
    'not', groupSelectors(notMediaSelector, { selectorName: 'where' }));
    const mediaSelectorWithExcept = mediaSelector && (groupSelectors(mediaSelector, { selectorName: 'where' }) // group multiple selectors with `:where()`, to suppress the specificity weight
        .map((mediaSelectorGroup) => createSelector(...mediaSelectorGroup, notNotMediaSelector))
        .map((selector) => selectorToString(selector)));
    return {
        mediaSelectorWithExcept,
        mediaSelector,
        notNotMediaSelector,
    };
};
export const usesContentChildrenFill = (options = {}) => {
    // options:
    const { mediaSelectorWithExcept } = usesContentChildrenOptions(options);
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
            usesBorderAsContainer({ itemsSelector: mediaSelectorWithExcept }), // make a nicely rounded corners
        ]),
        ...style({
            // children:
            ...children(mediaSelectorWithExcept, {
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
                ...nextSiblings(mediaSelectorWithExcept, {
                    // spacings:
                    marginBlockStart: negativePaddingBlock, // cancel out prev sibling's spacing with negative margin
                }),
            }),
        }),
    });
};
export const usesContentChildrenMedia = (options = {}) => {
    // options:
    const { mediaSelectorWithExcept, mediaSelector, notNotMediaSelector } = usesContentChildrenOptions(options);
    const figureSelector = mediaSelector && mediaSelector.find((m) => m && m.some((e) => isElementSelectorOf(e, 'figure')));
    const nonFigureSelector = mediaSelector && mediaSelector.filter((m) => !m || m.every((e) => !isElementSelectorOf(e, 'figure')));
    const figureSelectorWithExceptMod = figureSelector && (groupSelector(figureSelector, { selectorName: 'where' }) // group multiple selectors with `:where()`, to suppress the specificity weight
        .map((figureSelectorGroup) => createSelector(...figureSelectorGroup, notNotMediaSelector)));
    const figureSelectorWithExcept = figureSelectorWithExceptMod && (figureSelectorWithExceptMod
        .map((selector) => selectorToString(selector)));
    const figureSelectorWithCombinator = figureSelectorWithExceptMod && (figureSelectorWithExceptMod
        .map((figureSelectorGroup) => createSelector(...figureSelectorGroup, '>')));
    const nonFigureSelectorWithExcept = nonFigureSelector && (groupSelectors(nonFigureSelector, { selectorName: 'where' }) // group multiple selectors with `:where()`, to suppress the specificity weight
        .flatMap((nonFigureSelectorGroup) => {
        const nonFigureSelectorWithExcept = createSelector(...nonFigureSelectorGroup, notNotMediaSelector);
        return createSelectorList(nonFigureSelectorWithExcept, ...(!isNotEmptySelectors(figureSelectorWithCombinator) ? [] : figureSelectorWithCombinator.map((selectorCombi) => createSelector(...selectorCombi, ...nonFigureSelectorWithExcept))));
    })
        .map((selector) => selectorToString(selector)));
    // dependencies:
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius();
    return style({
        // children:
        // first: reset top_level <figure>
        ...children(figureSelectorWithExcept, {
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
        ...children(nonFigureSelectorWithExcept, {
            // layouts:
            ...rule(':not(.media)', {
                ...imports([
                    stripoutImage(), // clear browser's default styling on image
                ]),
                ...style({
                    display: 'block', // fills the entire parent's width
                }),
            }),
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'media')), // apply general cssProps starting with img***
        }),
        // finally: styling top_level <figure> & top_level <media> as separator:
        ...children(mediaSelectorWithExcept, {
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
                usesBorderAsSeparatorBlock({ itemsSelector: mediaSelectorWithExcept }), // must be placed at the last
            ]),
        }),
    });
};
export const usesContentChildrenLinksOptions = (options = {}) => {
    // options:
    const { linkSelector: linkSelectorStr = linksElm, notLinkSelector: notLinkSelectorStr = notLinksElm, } = options;
    const linkSelector = parseSelectors(linkSelectorStr);
    const notLinkSelector = parseSelectors(notLinkSelectorStr);
    const notNotLinkSelector = notLinkSelector && createPseudoClassSelector(// create pseudo_class `:not()`
    'not', groupSelectors(notLinkSelector, { selectorName: 'where' }));
    const linkSelectorWithExcept = linkSelector && (groupSelectors(linkSelector, { selectorName: 'where' }) // group multiple selectors with `:where()`, to suppress the specificity weight
        .map((linkSelectorGroup) => createSelector(...linkSelectorGroup, notNotLinkSelector))
        .map((selector) => selectorToString(selector)));
    return {
        linkSelectorWithExcept,
        linkSelector,
        notNotLinkSelector,
    };
};
export const usesContentChildrenLinks = (options = {}) => {
    // options:
    const { linkSelectorWithExcept } = usesContentChildrenLinksOptions(options);
    return style({
        // children:
        ...children(linkSelectorWithExcept, {
            // children:
            // make a gap to sibling <a>:
            ...nextSiblings(linkSelectorWithExcept, {
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
    // rest props:
    const { 
    // children:
    children, ...restProps } = props;
    // jsx:
    return (React.createElement(Basic, { ...restProps, 
        // variants:
        mild: props.mild ?? true, 
        // classes:
        mainClass: props.mainClass ?? sheet.main }, React.Children.map(children, (child) => {
        // link:
        if (React.isValidElement(child)
            &&
                (child.type === 'a')
            &&
                !(child.props.className ?? '').split(' ').some((className) => (className === 'not-link'))) {
            // rest props:
            const { type, // discard
            ...btnProps } = child.props;
            return (React.createElement(Button
            // variants:
            , { 
                // variants:
                btnStyle: 'link', ...btnProps }));
        } // if
        // other component:
        return child;
    })));
}
export { Content as default };
export function Article(props) { return React.createElement(Content, { ...props, semanticTag: 'article', semanticRole: 'article' }); }
export function Section(props) { return React.createElement(Content, { ...props, semanticTag: 'section', semanticRole: 'region' }); }
export function Aside(props) { return React.createElement(Content, { ...props, semanticTag: 'aside', semanticRole: 'complementary' }); }
// mark as Content compatible:
Article.prototype = Content.prototype;
Section.prototype = Content.prototype;
Aside.prototype = Content.prototype;
