import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { drawDashedRect } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedInput extends LitElement {
  static get is() {
    return 'dashed-input';
  }

  static get properties() {
    return {
      disabled: Boolean,
      checked: Boolean,
      dashProps: Object
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.checked = false;
    this.dashProps = { dashWidth: 1, dashLength: 6, dashRatio: 0.15 };
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.drawDash();
  }

  render() {
    return html`
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
  }

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const border = svg.querySelector('.border');
    const { width, height } = this.renderRoot.querySelector('.input-container').getBoundingClientRect();
    const borderRadius = 5;

    const hostProps = { width, height, borderRadius };

    drawDashedRect(border, hostProps, this.dashProps);
  }
}
customElements.define(DashedInput.is, DashedInput);
