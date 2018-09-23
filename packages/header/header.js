import { borderImage } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';
import { menuIcon, closeIcon, githubIcon } from '@dashedjs/dashed-icons/icons.js';

export class DashedHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.navItems = [
      { text: 'Getting started', href: '#' },
      { text: 'Components', href: '#' },
      { text: 'Playground', href: '#' }
    ];

    this.dashWidth = '1';
    this.dashLength = '4';
    this.dashSpacing = '4';
  }

  get navItems() {
    return this._navItems;
  }
  set navItems(value) {
    this._navItems = value;
  }

  get logo() {
    return this._logo;
  }
  set logo(value) {
    this._logo = value;
  }

  get iconLeft() {
    return this._iconLeft;
  }
  set iconLeft(value) {
    this._iconLeft = value;
  }

  get iconRight() {
    return this._iconRight;
  }
  set iconRight(value) {
    this._iconRight = value;
  }

  get dashWidth() {
    return this.getAttribute('dash-width');
  }
  set dashWidth(value) {
    this.setAttribute('dash-width', value);
  }

  get dashLength() {
    return this.getAttribute('dash-length');
  }
  set dashLength(value) {
    this.setAttribute('dash-length', value);
  }

  get dashSpacing() {
    return this.getAttribute('dash-spacing');
  }
  set dashSpacing(value) {
    this.setAttribute('dash-spacing', value);
  }

  connectedCallback() {
    this.render();
    this._menuButton = this.shadowRoot.querySelector('#menubutton');
    this._menuButton.addEventListener('click', this._toggleMenu.bind(this));
    this._nav = this.shadowRoot.querySelector('nav');
    this._menuItems = [...this._nav.querySelectorAll('a[role="menuitem"]')];
    this._menuItems.forEach(menuitem => menuitem.addEventListener('click', this._activateLink.bind(this)));

    this._mediaQueryList = window.matchMedia('screen and (min-width: 600px)');
    this._mediaQueryList.addListener(this._mediaQueryChange.bind(this));
    this._mediaQueryChange(this._mediaQueryList);

    document.addEventListener('click', this._closeMenu.bind(this));
  }

  disconnectedCallback() {
    this._menuButton.removeEventListener('click', this._toggleMenu.bind(this));
    this._menuItems.forEach(menuitem => menuitem.removeEventListener('click', this._activateLink.bind(this)));
    this._mediaQueryList.removeListener(this._mediaQueryChange.bind(this));

    document.removeEventListener('click', this._closeMenu.bind(this));
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      ${dashedStyles}
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
  
          border-bottom: ${this.dashWidth}px solid;
          border-image: ${borderImage(this.dashWidth, this.dashLength, this.dashSpacing)};
        }

        header::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--dashed-primary-light-color);
          z-index: -1;
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

          button#menubutton {
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
          aria-expanded="false"
          aria-controls="menu"
          aria-label="Menu button">
            <dashed-icon name="menu"></dashed-icon>
        </button>
        <a href="#">
          <img class="logo" src="/src/assets/img/logo.png" alt="Dashedjs logo">
          <h1 class="logo-text"></h1>
        </a>
        <div></div>
        <nav class="sidebar" role="navigation">
          <ul id="menu" role="menu" aria-labelledby="menubutton">
            ${this.navItems
              .map(navItem => {
                return `
                <li role="none">
                  <a role="menuitem" href="${navItem.href}">
                  ${navItem.text}
                  </a>
                </li>`;
              })
              .join(' ')}
          </ul>
        </nav>
        <button role="search" aria-label="search button">
          <dashed-icon name="github"></dashed-icon>
        </button>
      </header>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
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
    this._menuButton.setAttribute('aria-expanded', 'true');
  }

  _closeMenu(e) {
    if (e.target != this && this._nav.classList.contains('open')) {
      e.stopPropagation();
      this._nav.classList.remove('open');
      this._menuButton.setAttribute('aria-expanded', 'false');
    }
  }

  _activateLink(e) {
    const oldActive = this.shadowRoot.querySelector('.active');
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
customElements.define('dashed-header', DashedHeader);
