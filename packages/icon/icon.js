import { html, LitElement } from '@polymer/lit-element';

export class DashedIcon extends LitElement {
  constructor() {
    super();
    this.iconsRoot = 'assets/dashed-icons';
  }

  static get properties() {
    return {
      name: String,
      src: String,
      iconsRoot: String,
      size: Number,
      ariaLabel: String,
      ariaLabelledBy: String
    };
  }

  get iconsRoot() {
    return this.getAttribute('icons-root') || 'assets/dashed-icons';
  }
  set iconsRoot(value) {
    return this.setAttribute('icons-root', value);
  }

  async render() {
    const svg = await this.fetchIcon();
    console.log({ svg });
    return html`
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;
          width: 24px;
          height: 24px;
        }

        :host-context(dashed-button),
        :host-context(dashed-button) svg {
          width: 16px;
          height: 16px;
        }

        :host-context(dashed-tag),
        :host-context(dashed-tag) svg {
          width: 12px;
          height: 12px;
        }

        :host-context(dashed-fab),
        :host-context(dashed-fab) svg {
          width: 18px;
          height: 18px;
        }

        span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
      </style>
      <span .innerHTML="${svg}"></span>
    `;
  }

  async fetchIcon() {
    let iconUrl;
    if (this.src) {
      iconUrl = /^\//.test(this.src) ? this.src : `/${this.src}`;
    } else if (this.name) {
      iconUrl = /^\//.test(this.iconsRoot)
        ? `${this.iconsRoot}/${this.name}.svg`
        : `/${this.iconsRoot}/${this.name}.svg`;
    }
    try {
      const res = await fetch(iconUrl, { cache: 'force-cache' });
      if (res.status !== 200) {
        throw new Error(`Error code ${res.status}, failed to load icon: ${iconUrl}.
          Check your 'src' attribute or try setting 'iconsRoot' if you are using the 'name' attribute inside a framework
          (For Angular set 'iconsRoot' attribute to 'assets/dashed-icons')`);
      }
      return res.text();
    } catch (err) {
      console.error(err);
    }
  }
}
customElements.define('dashed-icon', DashedIcon);
