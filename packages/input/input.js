import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { dashedColors } from '../styles/styles.js';
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

  _createRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  connectedCallback() {
    super.connectedCallback();
    this.drawDash();
  }

  _render() {
    return html`
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
          ${dashedColors}
        }

        :host(:focus) .dash {
          outline: 1px solid var(--dashed-outline-color);
          outline-offset: 1px;
        }

        :host([disabled]) {
          opacity: 0.6;
          pointer-events: none;
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

        svg.dash {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          fill: var(--dashed-fill-color);
          z-index: -1;
        }
  
        svg.dash .border {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
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

  get nativeElement() {
    return this._root.querySelector('input');
  }

  get svg() {
    return this._root.querySelector('svg.dash');
  }

  drawDash() {
    const svg = this.svg;
    const border = svg.querySelector('.border');
    const { width, height } = this._root.querySelector('.input-container').getBoundingClientRect();
    const borderRadius = 5;

    const hostProps = { width, height, borderRadius };
    const dashProps = { dashWidth: this.dashWidth, dashLength: this.dashLength, dashRatio: this.dashRatio };
    drawDashedRect(border, hostProps, dashProps);
  }
}
customElements.define(DashedInput.is, DashedInput);
