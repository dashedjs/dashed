import { DashedBase, borderImage, sharedStyles, html } from '@dashedjs/dashed-base';

export class DashedRadio extends DashedBase {
  constructor() {
    super();
    this.borderRadius = 12;
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

        .radio-container {
          display: inline-block;
          position: relative;
          width: 24px;
          height: 24px;

          border: ${this.dashWidth}px solid;
          border-image: ${
            borderImage(this.dashWidth, this.dashLength, this.dashSpacing, this.dashColor, this.borderRadius)
          };
        }

        .radio-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: ${this.borderRadius}px;
          background: var(--color-primary-light);
        }

        input[type='radio'] {
          margin: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        svg.dash .inner-circle {
          fill: var(--color-danger);
        }

        input[type='radio']:not(:checked) ~ svg.dash .inner-circle {
          opacity: 0;
        }

        input[type='radio']:checked ~ svg.dash .inner-circle {
          opacity: 1;
        }
      </style>
      <div class="radio-container">
        <input type="radio" id="radio" /> <svg class="dash"><circle class="inner-circle" cx="12" cy="12" r="5" /></svg>
      </div>
      <label for="radio"><slot></slot></label>
    `;
  }
}
customElements.define('dashed-radio', DashedRadio);
