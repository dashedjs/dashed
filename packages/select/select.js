import { DashedBase, borderImage, sharedStyles, html } from '@dashedjs/dashed-base/base.js';

export class DashedSelect extends DashedBase {
  constructor() {
    super();
    this.borderRadius = 0;
    this.dashWidth = 2;
    this.dashLength = 10;
    this.dashSpacing = 3.33;
  }

  static get properties() {
    return {
      ...super.properties,
      value: String
    };
  }

  renderStyle() {
    return sharedStyles;
  }

  render() {
    return html`
      ${this.renderStyle()}
      <style>
        :host {
          display: inline-block;
          position: relative;
          cursor: inherit;
          outline: none;
        }

        .select-container {
          min-width: 96px;
          min-height: 24px;
          display: inline-block;
          position: relative;

          border-bottom: ${this.dashWidth}px solid;
          border-image: ${
            borderImage(this.dashWidth, this.dashLength, this.dashSpacing, this.dashColor, this.borderRadius)
          };
        }

        .select-container::before {
          content: '';
          z-index: -1;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--color-primary-light);
        }

        select {
          border: none;
          outline: none;
          padding-left: 4px;
          padding-right: 12px;
          margin-bottom: 4px;
          background: transparent;
          cursor: pointer;
          width: 100%;
          height: 100%;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
        }

        svg.dash .caret {
          stroke: var(--color-primary);
          stroke-width: ${this.dashWidth};
        }
      </style>
      <label for="select"><slot></slot></label>
      <div class="select-container">
        <select id="select">
          <option value="1">Option 1</option>
          <option value="3">Option 3</option>
          <option value="2">Option 2</option>
        </select>
        <svg class="dash"><path class="caret" d="M0 ${8}l4 4l4 -4" transform="translate(${96 - 12}, 0)" /></svg>
      </div>
    `;
  }
}
customElements.define('dashed-select', DashedSelect);
