import { DashedBase, borderImage, sharedStyles, html } from '@dashedjs/dashed-base';

export class DashedLink extends DashedBase {
  constructor() {
    super();
    this.borderRadius = 0;
    this.dashWidth = 1.5;
    this.dashLength = 8;
    this.dashSpacing = 2;
  }

  static get properties() {
    return {
      ...super.properties,
      disabled: Boolean,
      role: String
    };
  }

  render() {
    return html`
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
          padding-bottom: 2px;
          font-size: inherit;
          position: relative;
          transition: color 50ms ease-in-out;

          border-bottom: ${this.dashWidth}px solid;
          border-image: ${
            borderImage(this.dashWidth, this.dashLength, this.dashSpacing, this.dashColor, this.borderRadius)
          };
        }
      </style>
      <a href="#"> <slot></slot> </a>
    `;
  }
}
customElements.define('dashed-link', DashedLink);
