import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { commonStyles } from '../styles/styles.js';
import { drawDashedRect } from '../utils/rect-dasharray.js';

export class DashedInput extends LitElement {
  static get is() {
    return 'dashed-input';
  }

  static get properties() {
    return {
      disabled: Boolean,
      checked: Boolean,

      dashWidth: Number,
      dashLength: Number,
      dashRatio: Number
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.checked = false;

    this.dashWidth = 1;
    this.dashLength = 6;
    this.dashRatio = 0.15;
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated() {
    super.firstUpdated();
    this.drawDash();
  }

  render() {
    return html`
      ${commonStyles}
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
    const { width, height } = this.renderRoot
      .querySelector('.input-container')
      .getBoundingClientRect();
    const borderRadius = 5;

    const hostProps = { width, height, borderRadius };
    const dashProps = {
      dashWidth: this.dashWidth,
      dashLength: this.dashLength,
      dashRatio: this.dashRatio
    };
    drawDashedRect(border, hostProps, dashProps);
  }
}
customElements.define(DashedInput.is, DashedInput);
