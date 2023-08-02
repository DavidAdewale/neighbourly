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
        --color-card-bg: rgba(0, 0, 0, 0.005);
        --color-text: #1E1E1E;
        --color-danger:#E36052;
        --color-danger-hover:#FC6B5B;
        --color-btn-reset:rgba(183, 35, 19, 0.70);
        --color-btn-reset-hover:rgba(183, 35, 19, 0.90);
        --color-btn-reset-border: rgba(183, 35, 19, 0.70);
        --color-tertiary: #BF7FE3;
        --color-btn-text: #fcfcfc;
        --color-btn-text-faded: #9A9A9A;
        --color-btn-selection: #1e1e1e;
        --color-btn-secondary: transparent;
        --color-btn-secondary-hover: rgba(0, 0, 0, .09);
        --color-btn-nav-bg: rgba(243, 245, 242, .38);
        --color-light-accent:#CCCBCB;
        --color-form-btn: #F6F6F6;
        --color-form-input: #F9F9F9;
        --color-form-input-focus: rgba(0, 0, 0, .1);
        --color-after-border: linear-gradient(
            to right,
            transparent,
            rgba(30, 30, 30, 0.4),
            transparent
            );
        --color-overlay: rgba(30, 30, 30, .15);
        --color-hero-bg: linear-gradient(rgba(243, 245, 242, 0.1), rgba(243, 245, 242, 0.2)),
    url('/gradient.webp');

        --box-shadow: 0px 4px 19px 0px rgba(0, 0, 0, 0.1);

        --color-occupied: rgba(79, 151, 70, 0.50);
        --color-partially-occupied: rgba(163, 130, 67, 0.50);
;


        }

    &.dark-mode{
        --color-main: #55A34B;
        --color-main-hover: #4F9746;
        --color-bg: #070707;
        --color-card-bg: rgba(252, 252, 252, .05);
        --color-text: #FCFCFC;
        --color-danger:#FC6B5B;
        --color-danger-hover:#E36052;
        --color-btn-reset:rgba(183, 35, 19, 0.70);
        --color-btn-reset-hover:rgba(183, 35, 19, 0.90);
        --color-btn-reset-border: #FF3924;
        --color-tertiary: #D48DFC;
        --color-btn-text: #fcfcfc;
        --color-btn-text-faded: #747373;
        --color-btn-selection: #1e1e1e;
        --color-btn-secondary: transparent;
        --color-btn-secondary-hover: rgba(252, 252, 252, .2);
        --color-btn-nav-bg: rgba(0, 0, 0, .4);
        --color-light-accent: #515151;
        --color-form-btn: #282828;
        --color-form-input: #282828;
        --color-form-input-focus: rgba(252, 252, 252, .18);
        --color-after-border: linear-gradient(
            to right,
            transparent,
            rgba(252, 252, 252, 0.5),
            transparent
            );
        --color-overlay: rgba(0, 0, 0, .3);
        --color-hero-bg: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/gradient.webp');
        --color-occupied: rgba(79, 151, 70, 0.50);
        --color-partially-occupied: rgba(163, 130, 67, 0.50);

        --box-shadow: 0px 5px 19px 3px rgba(252, 252, 252, 0.07);

        }

        --heading-one: 4.8rem;
        --heading-two: 3.6rem;
        --heading-three: 2.8rem;
        --heading-four: 1.8rem;
        --heading-five: 2rem;
        --heading-six: 1.8rem;

        --border-radius: .8rem;

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
        color:var(--color-btn-selection);
    }
    h1{
        font-size: var(--heading-one);
        font-weight: 400;
        line-height: 1.2;

        @media only screen and (max-width: 75em){
            font-size: 2.4rem;
        }
    }

    h2{
        font-size: var(--heading-two);
        font-weight: 400;
        line-height: 1.2;

        @media only screen and (max-width: 75em){
            font-size: 1.8rem;
        }
    }

    h3{
        font-size: var(--heading-three);
        font-weight: 400;
        line-height: 1.2;

        @media only screen and (max-width: 75em){
            font-size: 2rem;
        }
    }

    h4{
        font-size: var(--heading-four);
        font-weight: 400;
        line-height: 1.2;

        @media only screen and (max-width: 75em){
            font-size: 1.8rem;
        }
    }

    h5{
        font-size: var(--heading-five);
        font-weight: 400;
        line-height: 1.2;

        @media only screen and (max-width: 75em){
            font-size: 1rem;
        }
    }

    h6{
        font-size: var(--heading-six);
        font-weight: 400;
        line-height: 1.2;

        @media only screen and (max-width: 75em){
            font-size: .6rem;
        }
    }
`;

export default GlobalStyles;
