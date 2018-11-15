import { DashedBase, borderImage, sharedStyles, html } from '@dashedjs/dashed-base/base.js';

export class DashedToggle extends DashedBase {
  constructor() {
    super();
    this.borderRadius = 12;
    this.dashWidth = 2;
    this.dashLength = 8;
    this.dashSpacing = 2;
  }

  static get properties() {
    return {
      ...super.properties,
      checked: Boolean
    };
  }

  renderStyle() {
    return sharedStyles;
  }

  render() {
    const [widthDelta, heightDelta] = [6, 10];
    return html`
      ${this.renderStyle()}
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

        input[type='checkbox'] {
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

          border: ${this.dashWidth}px solid;
          border-image: ${
            borderImage(this.dashWidth, this.dashLength, this.dashSpacing, this.dashColor, this.borderRadius)
          };
        }

        span.toggle-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: ${this.borderRadius}px;
          background: var(--color-primary-light);
        }

        svg.dash .toggle-switcher {
          fill: var(--color-primary);
          transition: transform 100ms ease-in-out;
          will-change: transform;
        }

        input[type='checkbox']:checked ~ svg.dash .toggle-switcher {
          transform: translateX(24px);
          fill: var(--color-danger);
        }
      </style>
      <div class="toggle-container">
        <input type="checkbox" id="toggle" /> <span class="toggle-background"></span>
        <svg class="dash" stroke-width="${this.dashWidth}">
          <circle class="toggle-switcher" cx="12" cy="12" r="${(24 - this.dashWidth) / 2}" />
        </svg>
      </div>
      <label for="toggle"><slot></slot></label>
    `;
  }
}
customElements.define('dashed-toggle', DashedToggle);
