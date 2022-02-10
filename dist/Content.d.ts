import { default as React } from 'react';
import { SelectorCollection } from '@cssfn/cssfn';
import { BasicProps } from '@nodestrap/basic';
export interface ContentChildrenOptions {
    mediaSelector?: SelectorCollection;
    notMediaSelector?: SelectorCollection;
}
export declare const usesContentChildrenOptions: (options?: ContentChildrenOptions) => {
    mediaSelectorWithExcept: SelectorCollection;
    mediaSelectorWithExceptZero: SelectorCollection;
    mediaSelector: import("@cssfn/css-selector").SelectorList | null;
    notNotMediaSelector: import("@cssfn/css-selector").PseudoClassSelector | null;
};
export declare const usesContentChildrenFill: (options?: ContentChildrenOptions) => import("@cssfn/cssfn").Rule;
export declare const usesContentChildrenMedia: (options?: ContentChildrenOptions) => import("@cssfn/cssfn").Rule;
export interface ContentChildrenLinksOptions {
    linkSelector?: SelectorCollection;
    notLinkSelector?: SelectorCollection;
}
export declare const usesContentChildrenLinksOptions: (options?: ContentChildrenLinksOptions) => {
    linkSelectorWithExcept: SelectorCollection;
    linkSelectorWithExceptZero: SelectorCollection;
    linkSelector: import("@cssfn/css-selector").SelectorList | null;
    notNotLinkSelector: import("@cssfn/css-selector").PseudoClassSelector | null;
};
export declare const usesContentChildrenLinks: (options?: ContentChildrenLinksOptions) => import("@cssfn/cssfn").Rule;
export declare const usesContentChildren: (options?: (ContentChildrenOptions & ContentChildrenLinksOptions)) => import("@cssfn/cssfn").Rule;
export declare const usesContentBasicLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesContentLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesContentBasicVariants: () => import("@cssfn/cssfn").Rule;
export declare const usesContentVariants: () => import("@cssfn/cssfn").Rule;
export declare const useContentSheet: import("@cssfn/types").Factory<import("jss").Classes<"main">>;
export declare const cssProps: import("@cssfn/css-config").Refs<{
    paddingInline: import("@cssfn/css-types").Cust.Ref;
    paddingBlock: import("@cssfn/css-types").Cust.Ref;
    paddingInlineSm: import("@cssfn/css-types").Cust.Ref;
    paddingBlockSm: import("@cssfn/css-types").Cust.Ref;
    paddingInlineLg: import("@cssfn/css-types").Cust.Ref;
    paddingBlockLg: import("@cssfn/css-types").Cust.Ref;
    linkSpacing: import("@cssfn/css-types").Cust.Ref;
}>, cssDecls: import("@cssfn/css-config").Decls<{
    paddingInline: import("@cssfn/css-types").Cust.Ref;
    paddingBlock: import("@cssfn/css-types").Cust.Ref;
    paddingInlineSm: import("@cssfn/css-types").Cust.Ref;
    paddingBlockSm: import("@cssfn/css-types").Cust.Ref;
    paddingInlineLg: import("@cssfn/css-types").Cust.Ref;
    paddingBlockLg: import("@cssfn/css-types").Cust.Ref;
    linkSpacing: import("@cssfn/css-types").Cust.Ref;
}>, cssVals: import("@cssfn/css-config").Vals<{
    paddingInline: import("@cssfn/css-types").Cust.Ref;
    paddingBlock: import("@cssfn/css-types").Cust.Ref;
    paddingInlineSm: import("@cssfn/css-types").Cust.Ref;
    paddingBlockSm: import("@cssfn/css-types").Cust.Ref;
    paddingInlineLg: import("@cssfn/css-types").Cust.Ref;
    paddingBlockLg: import("@cssfn/css-types").Cust.Ref;
    linkSpacing: import("@cssfn/css-types").Cust.Ref;
}>, cssConfig: import("@cssfn/css-config").CssConfigSettings;
export interface ContentProps<TElement extends HTMLElement = HTMLElement> extends BasicProps<TElement> {
    children?: React.ReactNode;
}
export declare function Content<TElement extends HTMLElement = HTMLElement>(props: ContentProps<TElement>): JSX.Element;
export { Content as default };
export declare function Article(props: ContentProps): JSX.Element;
export declare namespace Article {
    var prototype: any;
}
export declare function Section(props: ContentProps): JSX.Element;
export declare namespace Section {
    var prototype: any;
}
export declare function Aside(props: ContentProps): JSX.Element;
export declare namespace Aside {
    var prototype: any;
}
