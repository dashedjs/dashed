import { LitElement, html, property, PropertyValues } from '@polymer/lit-element/lit-element';
import { drawDashedLine } from '../utils/line-dasharray';
import { commonStyles } from '../styles/styles';
import { DashedButton } from '../button/button';
import { DashedLink } from '../link/link';
import { menuIcon, closeIcon, githubIcon } from '../icons/icons';
import { Dash, DashProps } from '../utils/dash';
import { TemplateResult } from 'lit-html';

export type NavItem = { text: string; href: string };

export class DashedHeader extends LitElement implements Dash {
  static get is() {
    return 'dashed-header';
  }

  @property({ type: Array })
  navItems: NavItem[] = [
    { text: 'Getting started', href: '#' },
    { text: 'Components', href: '#' },
    { text: 'Playground', href: '#' }
  ];

  @property({ type: String })
  logo: string = '';

  @property({ type: String })
  iconLeft: string = '';

  @property({ type: String })
  iconRight: string = '';

  @property({ type: Object })
  dashProps: DashProps = { dashWidth: 1, dashLength: 4, dashRatio: 1 };

  _menuButton: any;
  _nav: any;
  _mediaQueryList: any;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open' });
  }

  firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.drawDash();
    this._menuButton = this.renderRoot.querySelector('#menubutton');
    this._nav = this.renderRoot.querySelector('nav');

    this._mediaQueryList = window.matchMedia('screen and (min-width: 600px)');
    this._mediaQueryList.addListener(this._mediaQueryChange.bind(this));
    this._mediaQueryChange(this._mediaQueryList);

    document.addEventListener('click', this._closeMenu.bind(this));
    window.addEventListener('resize', this.drawDash.bind(this));
  }

  disconnectedCallback() {
    this._mediaQueryList.removeListener(this._mediaQueryChange.bind(this));

    document.removeEventListener('click', this._closeMenu.bind(this));
    window.removeEventListener('resize', this.drawDash.bind(this));
  }

  render(): TemplateResult {
    return html`
      ${commonStyles}
      <style>
        :host {
          --dashed-header-height: 56px;
          --dashed-lightgrey: lightgrey;
          --dashed-transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          --dashed-shadow-2:
            0 2px 2px 0 rgba(10, 9, 9, 0.14),
            0 1px 5px 0 rgba(0, 0, 0, 0.12),
            0 3px 1px -2px rgba(0, 0, 0, 0.2);
          --dashed-header-shadow: 0px 2px 2px -2px rgba(0, 0, 0, 0.7);

          display: block;
          position: sticky;
          top: 0;
        }

        header {
          height: var(--dashed-header-height);
          display: grid;
          grid-template-columns: max-content max-content auto max-content;
        }

        button {
          display: inline-block;
          background: none;
          cursor: pointer;
          border: 0;
          outline: 0;
          padding: 8px 16px;
        }

        nav {
          height: 100%;
        }

        /* Mobile navlist */
        nav.sidebar {
          position: fixed;
          top: var(--dashed-header-height);
          left: 0;
          width: 60%;
          height: 100%;
          background: var(--dashed-lightgrey);
          transition: var(--dashed-transition);
          box-shadow: var(--dashed-shadow-2);
          transform: translate3d(-100%, 0, 0);
          will-change: transform;
          z-index: 2;
        }

        nav.sidebar.open {
          transform: translateX(0);
        }

        nav ul {
          list-style: none;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }

        ul li {
          padding: 0 1rem;
        }

        li a:hover,
        li a.active {
          border-bottom-style: solid;
          border-bottom: 2px solid inherit;
        }

        li a.active {
          /* font-weight: bold; */
        }

        a {
          padding-bottom: 4px;
          text-decoration: none;
          /* text-transform: uppercase; */
          display: flex;
          align-items: center;
        }

        a img.logo {
          height: 32px;
          margin: 4px;
        }

        svg.icon {
          width: 24px;
          height: 24px;
          fill: var(--dashed-primary-color);
          stroke: var(--dashed-primary-color);
        }

        svg.github-icon {
          stroke: #000000;
          fill: #000000;
        }

        @media screen and (min-width: 600px) {
          .header {
            grid-template-columns: max-content auto max-content max-content;
          }

          button[role="menu-button"] {
            display: none;
          }

          /* Desktop navlist */
          nav.topbar ul {
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }
        }
      </style>
      <header>
        <button id="menubutton"
          @click="${(e: Event) => this._toggleMenu(e)}"
          role="menu-button"
          aria-expanded="false"
          aria-controls="menu"
          aria-label="Menu button">
            ${menuIcon}
        </button>
        <a href="#">
          <img class="logo" src="./img/logo.png" alt="Dashedjs logo">
          <h1 class="logo-text"></h1>
        </a>
        <div></div>
        <nav class="sidebar" role="navigation">
          <ul id="menu" role="menu" aria-labelledby="menubutton">
            ${this.navItems.map(navItem => {
              return html`
                <li role="none">
                  <a role="menuitem" href="${navItem.href}"
                  @click="${(e: Event) => this._activateLink(e)}">
                  ${navItem.text}
                  </a>
                </li>`;
            })}
          </ul>
        </nav>
        <button role="search" aria-label="search button">${githubIcon}</button>
      </header>
      <svg class="dash" filter="url(#shadow2)">
        <rect class="background" />
        <line class="border-bottom" />
        <filter id="shadow2">
          <feDropShadow dx="2" dy="2" stdDeviation="2" flood-opacity="0.9" />
        </filter>
      </svg>
    `;
  }

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const borderBottom: SVGLineElement = svg.querySelector('.border-bottom');
    const { width, height } = this.getBoundingClientRect();

    const hostProps = { width, height };
    drawDashedLine(borderBottom, hostProps, this.dashProps);

    const background = svg.querySelector('.background');
    background.setAttribute('width', `${width}`);
    background.setAttribute('height', `${height - this.dashProps.dashWidth / 2}`);
  }

  _toggleMenu(e: Event) {
    if (!this._nav.classList.contains('open')) {
      this._openMenu(e);
    } else {
      this._closeMenu(e);
    }
  }

  _openMenu(e: Event) {
    e.stopPropagation();
    this._nav.classList.add('open');
    this._menuButton.setAttribute('aria-expanded', true);
  }

  _closeMenu(e: Event) {
    if (e.target != this && this._nav.classList.contains('open')) {
      e.stopPropagation();
      this._nav.classList.remove('open');
      this._menuButton.setAttribute('aria-expanded', false);
    }
  }

  _activateLink(e: Event) {
    const oldActive = this.renderRoot.querySelector('.active');
    if (oldActive) {
      oldActive.classList.remove('active');
    }
    const newActive = e.target;
    (newActive as HTMLElement).classList.add('active');
    this._closeMenu(e);
  }

  _mediaQueryChange(e: MediaQueryList) {
    if (e.matches) {
      /* Desktop */
      this._nav.classList.remove('sidebar');
      this._nav.classList.add('topbar');
    } else {
      /* Mobile */
      this._nav.classList.remove('topbar');
      this._nav.classList.add('sidebar');
    }
  }
}
customElements.define(DashedHeader.is, DashedHeader);
