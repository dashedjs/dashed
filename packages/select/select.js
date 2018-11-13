import { DashedBase, borderImage, sharedStyles, html } from '@dashedjs/dashed-base/base.js';

export class DashedSelect extends DashedBase {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['border-radius', 'dash-width', 'dash-length', 'dash-spacing', 'dash-color'];
  }

  get value() {
    return this.getAttribute('value');
  }
  set value(value) {
    this.setAttribute('value', value);
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

            border-bottom: ${dashWidth}px solid;
            border-image: ${borderImage(dashWidth, dashLength, dashSpacing, dashColor, borderRadius)};
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
            stroke-width: ${parseFloat(this.dashWidth)};
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
    };

    const { borderRadius = 0, dashWidth = 2, dashLength = 10, dashSpacing = 3.33, dashColor } = this.dashProps;
    return templateFactory({ borderRadius, dashWidth, dashLength, dashSpacing, dashColor });
  }
}
customElements.define('dashed-select', DashedSelect);
