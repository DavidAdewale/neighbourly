import { createGlobalStyle } from 'styled-components';
// $breakpoint argument choices:
// -phone - 600px = 37.5em
// -tab-port - 900px = 56.25em
// -tab-land - 1200px = 75em
// -big-desk - 1800px = 112.5em

const GlobalStyles = createGlobalStyle`
:root {
    &, &.light-mode{
        --color-main: #4F9746;
        --color-main-hover: #55A34B;
        --color-bg: #FCFCFC;
        --color-text: #1E1E1E;
        --color-danger:#E36052;
        --color-danger-hover:#FC6B5B;
        --color-tertiary: #BF7FE3;
        --color-btn-text: #fcfcfc;
        --color-btn-selection: #1e1e1e;
        --color-btn-secondary: transparent;
        --color-btn-secondary-hover: rgba(243, 245, 242, 1);
        --color-light-accent:#DADADA;
        --color-after-border: linear-gradient(
            to right,
            transparent,
            rgba(30, 30, 30, 0.4),
            transparent
            );
        --color-overlay: rgba(30, 30, 30, .15);
        --color-hero-bg: linear-gradient(rgba(243, 245, 242, 0.1), rgba(243, 245, 242, 0.2)),
    url('/gradient.webp');
        }

    &.dark-mode{
        --color-main: #55A34B;
        --color-main-hover: #4F9746;
        --color-bg: #1E1E1E;
        --color-text: #FCFCFC;
        --color-danger:#FC6B5B;
        --color-danger-hover:#E36052;
        --color-tertiary: #D48DFC;
        --color-btn-text: #fcfcfc;
        --color-btn-selection: #1e1e1e;
        --color-btn-secondary: transparent;
        --color-btn-secondary-hover: rgba(252, 252, 252, .2);
        --color-light-accent: #515151;
        --color-after-border: linear-gradient(
            to right,
            transparent,
            rgba(252, 252, 252, 0.5),
            transparent
            );
        --color-overlay: rgba(252, 252, 252, .10);
        --color-hero-bg: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/gradient.webp');
        }

        --heading-one: 4.8rem;
    }

    *,
    *::before,
    *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    }

    html {
    font-size: 62.5%;
        }

    body {
    font-family: 'Rubik', sans-serif;
    color: var(--color-text);
    background-color: var(--color-bg);
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1.4rem;
    transition: color .2s, background-color .3s;
    }

    ::selection{
        background-color: #72DB65;
        color:var(---color-btn-selection);
    }
    h1{
        font-size: var(--heading-one);
        font-weight: 400;
        line-height: 1.2;

        @media only screen and (max-width: 75em){
            font-size: 2.4rem;
        }
    }
`;

export default GlobalStyles;
