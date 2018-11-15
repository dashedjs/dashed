import { DashedBase, borderImage, sharedStyles, html } from '@dashedjs/dashed-base';

export class DashedHeader extends DashedBase {
  constructor() {
    super();
    this.borderRadius = 0;
    this.dashWidth = 1;
    this.dashLength = 4;
    this.dashSpacing = 4;

    this.navItems = [];
    this.navOpened = false;
    this._mobile = true;
  }

  static get properties() {
    return {
      ...super.properties,
      logoSrc: String,
      logoText: String,
      iconRight: String,
      navItems: Array,
      navOpened: Boolean
    };
  }

  connectedCallback() {
    this.addListeners();
  }

  disconnectedCallback() {
    this.removeListeners();
  }

  addListeners() {
    this._mediaQueryList = window.matchMedia('screen and (min-width: 600px)');
    this._mediaQueryList.addListener(this._mediaQueryChange.bind(this));
    this._mediaQueryChange(this._mediaQueryList);

    document.addEventListener('click', this._closeMenu.bind(this));
  }

  removeListeners() {
    this._mediaQueryList.removeListener(this._mediaQueryChange.bind(this));

    document.removeEventListener('click', this._closeMenu.bind(this));
  }

  render() {
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

          border-bottom: ${this.dashWidth}px solid;
          border-image: ${
            borderImage(this.dashWidth, this.dashLength, this.dashSpacing, this.dashColor, this.borderRadius)
          };
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
          aria-expanded="${this.navOpened}"
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
        <nav class="${this._mobile ? 'sidebar' : 'topbar'} ${this.navOpened ? 'open' : ''}" role="navigation">
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
  }

  _toggleMenu(e) {
    this.navOpened = !this.navOpened;
  }

  _closeMenu(e) {
    if (e.target != this && this.navOpened) {
      e.stopPropagation();
      this.navOpened = false;
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
      this._mobile = false;
      this.requestUpdate();
    } else {
      /* Mobile */
      this._mobile = true;
      this.requestUpdate();
    }
  }
}
customElements.define('dashed-header', DashedHeader);
