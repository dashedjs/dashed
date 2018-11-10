import { DashedBase, borderImage, sharedStyles } from '@dashedjs/dashed-base';

export class DashedFab extends DashedBase {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['border-radius', 'dash-width', 'dash-length', 'dash-spacing', 'dash-color'];
  }

  get ariaLabel() {
    return this.hasAttribute('aria-label');
  }
  set ariaLabel(value) {
    Boolean(value) ? this.setAttribute('aria-label', value) : this.removeAttribute('aria-label');
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    this.render();
  }

  render() {
    const [borderRadius = 24, dashWidth = 2, dashLength = 4, dashSpacing = 2] = [
      this.borderRadius,
      this.dashWidth,
      this.dashLength,
      this.dashSpacing
    ].map(attr => (attr ? parseFloat(attr) : undefined));
    const dashColor = this.dashColor.replace('#', '%23'); // Using unescaped '#' characters in a data URI body is deprecated
    const borderRadiusInner = borderRadius - 4;

    const template = document.createElement('template');
    template.innerHTML = `
      ${sharedStyles}
      <style>
        :host {
          display: inline-block;
          cursor: pointer;
          outline: none;
          position: relative;
        }

        :host(:hover) button {
          color: var(--color-danger);
        }

        .button-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 56px;
          height: 56px;
        }

        button {
          width: 48px;
          height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          cursor: inherit;
          border: none;
          outline: none;
          position: relative;
          transition: color 50ms ease-in-out;

          border: ${dashWidth}px solid;
          border-image: ${borderImage(dashWidth, dashLength, dashSpacing, dashColor, borderRadius)};
        }

        button::before {
          content: "";
          box-sizing: border-box;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: ${borderRadius}px;
          background: var(--color-primary-light);
          box-shadow: var(--shadow-6dp);
        }

        button::after {
          content: "";
          position: absolute;
          top: 4px;
          left: 4px;
          bottom: 4px;
          right: 4px;

          border: ${dashWidth}px solid;
          border-image: ${borderImage(dashWidth, dashLength, dashSpacing, dashColor, borderRadiusInner)};
        }
      </style>
      <div class="button-container">
        <button type="button" aria-label="${this.ariaLabel}">
          <slot></slot>
        </button>
      </div>
    `;
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild);
    }
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('dashed-fab', DashedFab);
