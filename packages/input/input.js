import { drawDashedRect } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.dashProps = { dashWidth: 1, dashLength: 6, dashRatio: 0.15 };
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    Boolean(value) ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  get dashProps() {
    return this._dashProps;
  }
  set dashProps(value) {
    this._dashProps = value;
  }

  connectedCallback() {
    this.render();
    this.drawDash();
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      ${dashedStyles}
      <style>
        :host {
          --dashed-input-dimension: 24px;

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
          outline: none;
          /* width: 100%; */
          /* height: 100%; */
        }

        input {
          margin: 5px;
          padding: 5px;
          box-sizing: border-box;
          border: none;
          outline: none;
          /* max-width: 100%; */
          height: 100%;
          background: var(--dashed-fill-color);
        }
      </style>
      <label for="input"><slot></slot></label>
      <div class="input-container">
        <input id="input" />
        <svg class="dash">
          <rect class="border" />
        </svg>
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  drawDash() {
    const svg = this.shadowRoot.querySelector('svg.dash');
    const border = svg.querySelector('.border');
    const { width, height } = this.shadowRoot.querySelector('.input-container').getBoundingClientRect();
    const borderRadius = 5;

    const hostProps = { width, height, borderRadius };

    drawDashedRect(border, hostProps, this.dashProps);
  }
}
customElements.define('dashed-input', DashedInput);
