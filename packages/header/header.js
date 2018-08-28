import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { repeat } from './node_modules/lit-html/lib/repeat.js';
import { DashedButton } from '../button/button.js';
import { dashedColors } from '../styles/styles.js';

export class DashedHeader extends LitElement {
  static get is() {
    return 'dashed-header';
  }

  static get properties() {
    return {
      leftButton: Object,
      logoImg: Object,
      navList: Array,
      rightButton: Object,

      dashWidth: Number,
      dashLength: Number,
      dashRatio: Number
    };
  }

  constructor() {
    super();
    this.dashWidth = 1;
    this.dashLength = 4;
    this.dashRatio = 1;
  }

  _createRoot() {
    return this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    super.connectedCallback();
    this._menuButton = this._root.querySelector('#menubutton');
    this._nav = this._root.querySelector('nav');

    const desktopMediaQuery = 'screen and (min-width: 600px)';
    this._mediaQueryList = window.matchMedia(desktopMediaQuery);
    this._mediaQueryList.addListener(this._mediaQueryChange.bind(this));
    this._mediaQueryChange(this._mediaQueryList);

    document.addEventListener('click', this._closeMenu.bind(this));
    this.drawDash();
    window.addEventListener('resize', this.drawDash.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._mediaQueryList.removeListener(this._mediaQueryChange.bind(this));
    document.removeEventListener('click', this._closeMenu.bind(this));
    window.removeEventListener('resize', this.drawDash.bind(this));
  }

  _render({ navList }) {
    return html`
      <style>
        :host {
          /* --dashed-primary-color: blue;
          --dashed-secondary-color: red;
          --dashed-fill-color: lightcyan;
          --dashed-outline-color: rgba(255, 0, 0, 0.5); */

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
          z-index: 1;
          ${dashedColors}
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
          padding: 10px;
          font-size: 24px;
          height: 100%;
          line-height: 100%;
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
        }

        nav.sidebar.open {
          transform: translate(0, 0);
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
          font-weight: bold;
        }

        a {
          padding-bottom: 4px;
          text-decoration: none;
          text-transform: uppercase;
          display: flex;
          align-items: center;
        }

        a img.logo {
          height: 32px;
          margin: 4px;
        }

        svg.icon-menu {
          width: 24px;
          height: 24px;
          fill: var(--dashed-primary-color);
          stroke: var(--dashed-primary-color);
        }

        svg.dash {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          fill: none;
          z-index: -1;
        }
  
        svg.dash .border-bottom {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
        }

        svg.dash .background {
          fill: var(--dashed-fill-color);
        }

        @media screen and (min-width: 600px) {
          header {
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
          on-click="${e => this._toggleMenu(e)}"
          role="menu-button"
          aria-expanded="false"
          aria-controls="menu"
          aria-label="Menu button">
          <svg class="icon-menu" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="2" width="24" height="4" stroke-width="0" />
            <rect x="0" y="10" width="24" height="4" stroke-width="0" />
            <rect x="0" y="18" width="24" height="4" stroke-width="0" />
          </svg>
        </button>
        <a href="#">
          <img class="logo" src="./img/logo.png" alt="Dashedjs logo">
          <span></span>
        </a>
        <div></div>
        <nav class="sidebar" role="navigation">
          <ul id="menu" role="menu" aria-labelledby="menubutton">
            <li role="none">
              <a role="menu-item" href="#" on-click="${e => this._activateLink(e)}">Components</a>
            </li>
            <li role="none">
              <a role="menu-item" href="#" on-click="${e => this._activateLink(e)}">Style Guide</a>
            </li>
            <li role="none">
              <a role="menu-item" href="#" on-click="${e => this._activateLink(e)}">Chart Components</a>
            </li>
            <li role="none">
              <a role="menu-item" href="#" on-click="${e => this._activateLink(e)}">About</a>
            </li>
          </ul>
        </nav>
        <button role="search" aria-label="search button">🔍</button>
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

  get svg() {
    return this._root.querySelector('svg.dash');
  }

  drawDash() {
    const { width, height } = this.getBoundingClientRect();
    const { strokeDasharray, strokeDashOffset, dashWidth } = this._computeLineStrokeDashParams(width);

    const svg = this.svg;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const borderBottom = svg.querySelector('.border-bottom');
    borderBottom.setAttribute('x1', 0);
    borderBottom.setAttribute('y1', height - dashWidth / 2);
    borderBottom.setAttribute('x2', width);
    borderBottom.setAttribute('y2', height - dashWidth / 2);
    borderBottom.setAttribute('stroke-width', dashWidth);
    borderBottom.setAttribute('stroke-dasharray', strokeDasharray);
    borderBottom.setAttribute('stroke-dashoffset', strokeDashOffset);

    const background = svg.querySelector('.background');
    background.setAttribute('width', width);
    background.setAttribute('height', height - dashWidth / 2);
  }

  _computeLineStrokeDashParams(width) {
    const { dashWidth, dashLength, dashRatio } = this._validateDashProps(width);

    const dashCount = 1 + Math.floor((width - dashLength) / ((1 + dashRatio) * dashLength));
    const dashSpacing = (width - dashCount * dashLength) / (dashCount - 1);

    const strokeDasharray = `${dashLength} ${dashSpacing}`;
    const strokeDashOffset = 0;

    return { strokeDasharray, strokeDashOffset, dashWidth };
  }

  _validateDashProps(width) {
    if (this.dashWidth < 0 || this.dashLength < 0 || this.dashRatio < 0) {
      throw new Error(`dashWidth, dashLength and dashRatio must be positive numbers`);
    }
    const refDimension = width;
    const dashLength = this.dashLength > refDimension ? refDimension : this.dashLength;
    const dashWidth = this.dashWidth > refDimension / 2 ? refDimension / 2 : this.dashWidth;
    const dashRatio = dashLength * (1 + this.dashRatio) > refDimension ? refDimension - dashLength : this.dashRatio;
    return { dashWidth, dashLength, dashRatio };
  }

  _toggleMenu(e) {
    if (!this._nav.classList.contains('open')) {
      this._openMenu(e);
    } else {
      this._closeMenu(e);
    }
  }

  _openMenu(e) {
    e.stopPropagation();
    this._nav.classList.add('open');
    this._menuButton.setAttribute('aria-expanded', true);
  }

  _closeMenu(e) {
    if (e.target != this && this._nav.classList.contains('open')) {
      e.stopPropagation();
      this._nav.classList.remove('open');
      this._menuButton.setAttribute('aria-expanded', false);
    }
  }

  _activateLink(e) {
    const oldActive = this._root.querySelector('.active');
    if (oldActive) {
      oldActive.classList.remove('active');
    }
    const newActive = e.target;
    newActive.classList.add('active');
    this._closeMenu(e);
  }

  _mediaQueryChange(e) {
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
