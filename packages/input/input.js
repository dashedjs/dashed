import { DashedBase, borderImage, sharedStyles, html } from '@dashedjs/dashed-base';

export class DashedInput extends DashedBase {
  constructor() {
    super();
    this.borderRadius = 5;
    this.dashWidth = 1;
    this.dashLength = 6;
    this.dashSpacing = 1;
  }

  renderStyle() {
    return sharedStyles;
  }

  render() {
    return html`
      ${this.renderStyle()}
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: 96px;
          min-height: 24px;
        }

        .input-container {
          display: inline-block;
          position: relative;

          border: ${this.dashWidth}px solid;
          border-image: ${
            borderImage(this.dashWidth, this.dashLength, this.dashSpacing, this.dashColor, this.borderRadius)
          };
        }

        input {
          margin: 5px;
          padding: 5px;
          box-sizing: border-box;
          border: none;
          outline: none;
          height: 100%;
          border-radius: 2px;
          background: var(--color-fill);
        }
      </style>
      <label for="input"><slot></slot></label>
      <div class="input-container"><input id="input" /></div>
    `;
  }
}
customElements.define('dashed-input', DashedInput);
