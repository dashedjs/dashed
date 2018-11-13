import { DashedBase, borderImage, sharedStyles, html } from '@dashedjs/dashed-base';

export class DashedRadio extends DashedBase {
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

  attributeChangedCallback(attr, newVal, oldVal) {
    this.render();
  }

  template() {
    const templateFactory = (props = {}) => {
      const { borderRadius, dashWidth, dashLength, dashSpacing, dashColor } = props;
      return html`
        ${sharedStyles}
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

            border: ${dashWidth}px solid;
            border-image: ${borderImage(dashWidth, dashLength, dashSpacing, dashColor, borderRadius)};
          }

          .radio-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: ${borderRadius}px;
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
          <input type="radio" id="radio" />
          <svg class="dash"><circle class="inner-circle" cx="12" cy="12" r="5" /></svg>
        </div>
        <label for="radio"><slot></slot></label>
      `;
    };

    const { borderRadius = 12, dashWidth = 2, dashLength = 4, dashSpacing = 2, dashColor } = this.dashProps;
    return templateFactory({ borderRadius, dashWidth, dashLength, dashSpacing, dashColor });
  }
}
customElements.define('dashed-radio', DashedRadio);
