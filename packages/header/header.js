import { DashedBase, borderImage, sharedStyles, html } from '@dashedjs/dashed-base';

export class DashedHeader extends DashedBase {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['border-radius', 'dash-width', 'dash-length', 'dash-spacing', 'dash-color'];
  }

  get navItems() {
    return this._navItems || [];
  }
  set navItems(value) {
    this._navItems = value;
    console.log(this.navItems);
    this.render();
    this.addListeners();
  }

  get logoSrc() {
    return this.getAttribute('logo-src') || '';
  }
  set logoSrc(value) {
    this.setAttribute('logo-src', value);
  }

  get logoText() {
    return this.getAttribute('logo-text') || '';
  }
  set logoText(value) {
    this.setAttribute('logo-text', value);
  }

  get iconRight() {
    return this.getAttribute('icon-right');
  }
  set iconRight(value) {
    this.setAttribute('icon-right', value);
  }

  connectedCallback() {
    this.render();
    this.addListeners();
  }

  disconnectedCallback() {
    this.removeListeners();
  }

  attributeChangedCallback(attr, newVal, oldVal) {
    this.render();
    this.addListeners();
  }

  addListeners() {
    this._menuButton = this.shadowRoot.querySelector('#menubutton');
    this._nav = this.shadowRoot.querySelector('nav');

    this._mediaQueryList = window.matchMedia('screen and (min-width: 600px)');
    this._mediaQueryList.addListener(this._mediaQueryChange.bind(this));
    this._mediaQueryChange(this._mediaQueryList);

    document.addEventListener('click', this._closeMenu.bind(this));
  }

  removeListeners() {
    this._mediaQueryList.removeListener(this._mediaQueryChange.bind(this));

    document.removeEventListener('click', this._closeMenu.bind(this));
  }

  template() {
    const templateFactory = (props = {}) => {
      const { borderRadius, dashWidth, dashLength, dashSpacing, dashColor } = props;
      return html`
        ${sharedStyles}
        <style>
          :host {
            --height: 56px;
            --transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
            --topbar-background: var(--color-primary-light);
            --sidebar-background: lightgrey;
            --topbar-box-shadow: 0px 2px 2px -2px rgba(0, 0, 0, 0.7);
            --sidebar-box-shadow: 0 2px 2px 0 rgba(10, 9, 9, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
              0 3px 1px -2px rgba(0, 0, 0, 0.2);

            display: block;
            position: sticky;
            top: 0;
            outline: none;
          }

          header {
            height: var(--height);
            display: grid;
            grid-template-columns: max-content max-content auto max-content;
            align-items: center;

            border-bottom: ${dashWidth}px solid;
            border-image: ${borderImage(dashWidth, dashLength, dashSpacing, dashColor, borderRadius)};
          }

          header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--topbar-background);
            z-index: -1;
          }

          button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: none;
            cursor: pointer;
            border: 0;
            width: 48px;
            height: 48px;
            /* padding: 8px 16px; */
          }

          nav {
            height: 100%;
          }

          /* Mobile navlist */
          nav.sidebar {
            position: fixed;
            top: var(--height);
            left: 0;
            width: 60%;
            height: 100%;
            transition: var(--transition);
            background: var(--sidebar-background);
            box-shadow: var(--sidebar-box-shadow);
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
            overflow: auto;
          }

          nav.sidebar ul li a {
            padding: 1rem;
            width: 100%;
            height: 100%;
          }

          nav ul li a:hover,
          nav ul li a.active {
            background: var(--color-accent);
            color: white;
          }

          a {
            padding-bottom: 4px;
            text-decoration: none;
            display: flex;
            align-items: center;
          }

          a img.logo {
            height: 32px;
            margin: 4px;
          }

          a .logo-text {
            font-size: var(--font-medium);
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

            nav.topbar ul li a {
              padding: 0.5rem;
            }
          }
        </style>
        <header>
          <button
            @click="${e => this._toggleMenu(e)}"
            id="menubutton"
            aria-expanded="false"
            aria-controls="menu"
            aria-label="Menu button"
          >
            <dashed-icon name="menu"></dashed-icon>
          </button>
          <a href="#">
            <img class="logo" src="${this.logoSrc}" alt="Dashedjs logo" />
            <h1 class="logo-text">${this.logoText}</h1>
          </a>
          <div></div>
          <nav class="sidebar" role="navigation">
            <ul id="menu" role="menu" aria-labelledby="menubutton">
              ${
                this.navItems.map(
                  navItem => html`
                    <li role="none">
                      <a @click="${e => this._activateLink(e)}" role="menuitem" href="${navItem.href}">
                        ${navItem.text}
                      </a>
                    </li>
                  `
                )
              }
            </ul>
            <!-- <slot name="ul"></slot> -->
          </nav>
          <slot name="right-slot"></slot>
        </header>
      `;
    };

    const { borderRadius = 0, dashWidth = 1, dashLength = 4, dashSpacing = 4, dashColor } = this.dashProps;
    return templateFactory({ borderRadius, dashWidth, dashLength, dashSpacing, dashColor });
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
