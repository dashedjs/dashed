import { DashedBase, borderImage, sharedStyles, html } from '@dashedjs/dashed-base';

export class DashedFab extends DashedBase {
  constructor() {
    super();
    this.borderRadius = 24;
    this.dashWidth = 2;
    this.dashLength = 4;
    this.dashSpacing = 2;
  }

  static get properties() {
    return {
      ...super.properties,
      disabled: Boolean,
      ariaLabel: String
    };
  }

  render() {
    const borderRadiusInner = this.borderRadius - 4;
    return html`
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

          border: ${this.dashWidth}px solid;
          border-image: ${
            borderImage(this.dashWidth, this.dashLength, this.dashSpacing, this.dashColor, this.borderRadius)
          };
        }

        button::before {
          content: '';
          box-sizing: border-box;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: ${this.borderRadius}px;
          background: var(--color-primary-light);
          box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12),
            0 3px 5px -1px rgba(0, 0, 0, 0.4);
        }

        button::after {
          content: '';
          position: absolute;
          top: 4px;
          left: 4px;
          bottom: 4px;
          right: 4px;

          border: ${this.dashWidth}px solid;
          border-image: ${
            borderImage(this.dashWidth, this.dashLength, this.dashSpacing, this.dashColor, borderRadiusInner)
          };
        }
      </style>
      <div class="button-container">
        <button type="button" aria-label="${this.ariaLabel}"><slot></slot></button>
      </div>
    `;
  }
}
customElements.define('dashed-fab', DashedFab);
