import { DashedBase, borderImage, sharedStyles, html } from '@dashedjs/dashed-base/base.js';

export class DashedButton extends DashedBase {
  constructor() {
    super();
    this.borderRadius = 0;
    this.dashWidth = 2;
    this.dashLength = 8;
    this.dashSpacing = 2.4;
    this.dashColor = '';
  }

  static get properties() {
    const defaultProps = super.properties();
    console.log({ defaultProps });
    return {
      ...defaultProps,
      rounded: Boolean
    };
  }

  renderStyle() {
    return sharedStyles;
  }

  render() {
    console.log('props', DashedButton.properties);
    return html`
      ${this.renderStyle()}
      <style>
        :host {
          --padding: 4px 12px;
          --color: inherit;
          display: inline-block;
          cursor: pointer;
          outline: none;
          position: relative;
        }

        :host(:hover) {
          --color-fill: var(--color-primary-light);
        }

        button {
          padding: var(--padding);
          color: var(--color);
          min-width: 48px;
          min-height: 32px;
          width: 100%;
          height: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          cursor: inherit;
          outline: none;
          font-size: inherit;
          position: relative;
          transition: color 50ms ease-in-out;

          border: ${this.dashWidth}px solid;
          border-image: ${
            borderImage(this.dashWidth, this.dashLength, this.dashSpacing, this.dashColor, this.borderRadius)
          };
        }

        button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: ${this.dashWidth}px;
          border-radius: ${this.borderRadius}px;
          // background: var(--color-primary-light);
        }

        :host ::slotted([slot='icon']) {
          stroke: currentColor;
          padding-right: 4px;
        }
      </style>
      <button type="button"><slot name="icon"></slot> <slot></slot></button>
    `;
  }
}
customElements.define('dashed-button', DashedButton);
