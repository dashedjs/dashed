import { DashedBase, borderImage, sharedStyles, html } from '@dashedjs/dashed-base';

export class DashedCheckbox extends DashedBase {
  constructor() {
    super();
    this.borderRadius = 0;
    this.dashWidth = 2;
    this.dashLength = 4;
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
        }

        label {
          padding-left: 8px;
        }

        .checkbox-container {
          display: inline-block;
          position: relative;
          width: 24px;
          height: 24px;

          border: ${this.dashWidth}px solid;
          border-image: ${
            borderImage(this.dashWidth, this.dashLength, this.dashSpacing, this.dashColor, this.borderRadius)
          };
        }

        .checkbox-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: ${this.borderRadius}px;
          background: var(--color-primary-light);
        }

        input[type='checkbox'] {
          margin: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        svg.dash .checkmark {
          stroke: var(--color-danger);
          stroke-width: ${this.dashWidth * 1.8};
        }

        input[type='checkbox']:not(:checked) ~ svg.dash .checkmark {
          opacity: 0;
        }

        input[type='checkbox']:checked ~ svg.dash .checkmark {
          opacity: 1;
        }
      </style>
      <div class="checkbox-container">
        <input type="checkbox" id="checkbox" /> <svg class="dash"><path class="checkmark" d="M6 12l4 4l8 -8" /></svg>
      </div>
      <label for="checkbox"><slot></slot></label>
    `;
  }
}
customElements.define('dashed-checkbox', DashedCheckbox);
