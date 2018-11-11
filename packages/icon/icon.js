export class DashedIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  static get observedAttributes() {
    return ['name', 'src', 'size'];
  }

  get name() {
    return this.getAttribute('name');
  }
  set name(value) {
    this.setAttribute('name', value);
    if (!this.ariaLabel) this.ariaLabel = value;
  }

  get src() {
    return this.getAttribute('src');
  }
  set src(value) {
    this.setAttribute('src', value);
  }

  get iconsRoot() {
    return this.getAttribute('icons-root') || 'assets/dashed-icons';
  }
  set iconsRoot(value) {
    return this.setAttribute('icons-root', value);
  }

  get size() {
    return this.getAttribute('size');
  }
  set size(value) {
    this.setAttribute('size', value);
  }

  get ariaLabel() {
    return this.hasAttribute('aria-label');
  }
  set ariaLabel(value) {
    this.setAttribute('aria-label', value);
  }

  get ariaLabelledBy() {
    return this.hasAttribute('aria-labelledby');
  }
  set ariaLabelledBy(value) {
    this.setAttribute('aria-labelledby', value);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(attr, newVal, oldVal) {
    this.render();
  }

  async render() {
    const svg = await this.iconSvg();
    const template = document.createElement('template');
    template.innerHTML = `
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
      <span>${svg}</span>
    `;
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild);
    }
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  async iconSvg() {
    let iconUrl;
    if (this.src) {
      iconUrl = /^\//.test(this.src) ? this.src : `/${this.src}`;
      return this.fetchIcon(iconUrl);
    }
    if (this.name) {
      iconUrl = /^\//.test(this.iconsRoot)
        ? `${this.iconsRoot}/${this.name}.svg`
        : `/${this.iconsRoot}/${this.name}.svg`;
      return this.fetchIcon(iconUrl);
    }
  }

  async fetchIcon(url) {
    try {
      const res = await fetch(url, { cache: 'force-cache' });
      if (res.status !== 200) {
        throw new Error(`Error code ${res.status}, failed to load icon: ${url}.
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
