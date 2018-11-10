import { DashedBase, borderImage, sharedStyles } from '@dashedjs/dashed-base';

export class DashedLink extends DashedBase {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['border-radius', 'dash-width', 'dash-length', 'dash-spacing', 'dash-color'];
  }

  get role() {
    return this.getAttribute('role');
  }
  set role(value) {
    this.setAttribute('role', '');
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    this.render();
  }

  render() {
    const [borderRadius = 0, dashWidth = 1.5, dashLength = 8, dashSpacing = 2] = [
      this.borderRadius,
      this.dashWidth,
      this.dashLength,
      this.dashSpacing
    ].map(attr => (attr ? parseFloat(attr) : undefined));
    const dashColor = this.dashColor.replace('#', '%23'); // Using unescaped '#' characters in a data URI body is deprecated

    const template = document.createElement('template');
    template.innerHTML = `
      ${sharedStyles}
      <style>
        :host {
          display: inline-block;
          cursor: pointer;
          outline: none;
          position: relative;
          font-size: 16px;
        }

        :host(:hover) {
          color: var(--color-primary);
          --color-fill: var(--color-primary-light);
        }

        a {
          display: inline-block;
          cursor: inherit;
          text-align: center;
          text-decoration: none;
          color: inherit;
          outline: none;
          padding-bottom: 4px;
          font-size: inherit;
          position: relative;
          transition: color 50ms ease-in-out;

          border-bottom: ${dashWidth}px solid;
          border-image: ${borderImage(dashWidth, dashLength, dashSpacing, dashColor, borderRadius)};
        }
      </style>
      <a href="#">
        <slot></slot>
      </a>
    `;
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild);
    }
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('dashed-link', DashedLink);
