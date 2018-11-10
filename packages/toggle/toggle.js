import { DashedBase, borderImage, sharedStyles } from '@dashedjs/dashed-base/base.js';

export class DashedToggle extends DashedBase {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['border-radius', 'dash-width', 'dash-length', 'dash-spacing', 'dash-color'];
  }

  get checked() {
    return this.hasAttribute('checked');
  }
  set checked(value) {
    Boolean(value) ? this.setAttribute('checked', '') : this.removeAttribute('checked');
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    this.render();
  }

  render() {
    const [borderRadius = 12, dashWidth = 2, dashLength = 8, dashSpacing = 2] = [
      this.borderRadius,
      this.dashWidth,
      this.dashLength,
      this.dashSpacing
    ].map(attr => (attr ? parseFloat(attr) : undefined));
    const dashColor = this.dashColor

    const [widthDelta, heightDelta] = [6, 10];
    // const dashWidth = parseFloat(this.dashWidth);

    const template = document.createElement('template');
    template.innerHTML = `
      ${sharedStyles}
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
          outline: none;
          min-width: 48px;
        }

        .toggle-container {
          display: inline-flex;
          position: relative;
          width: 48px;
          height: 24px;
        }

        label {
          padding-left: 4px;
        }

        input[type="checkbox"] {
          margin: 0;
          width: 48px;
          height: 24px;
          cursor: pointer;
          opacity: 0;
        }

        span.toggle-background {
          box-sizing: border-box;
          z-index: -1;
          display: inline-block;
          position: absolute;
          top: ${heightDelta / 2}px;
          left: ${widthDelta / 2}px;
          width: ${48 - widthDelta}px;
          height: ${24 - heightDelta}px;

          border: ${dashWidth}px solid;
          border-image: ${borderImage(dashWidth, dashLength, dashSpacing, dashColor, borderRadius)};
        }

        
        span.toggle-background::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: ${borderRadius}px;
          background: var(--color-primary-light);
        }

  
        svg.dash .toggle-switcher {
          fill: var(--color-primary);
          transition: transform 100ms ease-in-out;
          will-change: transform;
        }

        input[type="checkbox"]:checked ~ svg.dash .toggle-switcher {
          transform: translateX(24px);
          fill: var(--color-danger);
        }
      </style>
      <div class="toggle-container">
        <input type="checkbox" id="toggle" />
        <span class="toggle-background"></span>
        <svg class="dash" stroke-width="${dashWidth}">
          <circle class="toggle-switcher" cx="12" cy="12" r="${(24 - dashWidth) / 2}" />
        </svg>
      </div>
      <label for="toggle"><slot></slot></label>
    `;
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild);
    }
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('dashed-toggle', DashedToggle);
