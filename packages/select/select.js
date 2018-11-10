import { borderImage } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedSelect extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    Boolean(value) ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  get value() {
    return this.getAttribute('value');
  }
  set value(value) {
    this.setAttribute('value', value);
  }

  get dashWidth() {
    return parseFloat(this.getAttribute('dash-width')) || 2;
  }
  set dashWidth(value) {
    this.setAttribute('dash-width', value);
  }

  get dashLength() {
    return parseFloat(this.getAttribute('dash-length')) || 10;
  }
  set dashLength(value) {
    this.setAttribute('dash-length', value);
  }

  get dashSpacing() {
    return parseFloat(this.getAttribute('dash-spacing')) || 3.33;
  }
  set dashSpacing(value) {
    this.setAttribute('dash-spacing', value);
  }

  get dashColor() {
    return this.shadowRoot.styleSheets[0].rules[0].style.getPropertyValue('--color-warn');
  }
  set dashColor(value) {
    this.setAttribute('dash-color', value);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      ${dashedStyles}
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
          border-image: ${borderImage(this.dashWidth, this.dashLength, this.dashSpacing, this.dashColor)};
        }

        .select-container::before {
          content: "";
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
        <svg class="dash">
          <path class="caret" d="M0 ${8}l4 4l4 -4" transform="translate(${96 - 12}, 0)" />
        </svg>
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('dashed-select', DashedSelect);
