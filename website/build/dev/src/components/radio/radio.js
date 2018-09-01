import { LitElement, html } from "../../../node_modules/@polymer/lit-element/lit-element.js";
import { dashedColors } from '../styles/styles.js';
import { drawDashedCircle } from '../utils/circle-dasharray.js';
export class DashedRadio extends LitElement {
  static get is() {
    return 'dashed-radio';
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
    this.dashWidth = 2;
    this.dashLength = 4;
    this.dashRatio = 0.5;
  }

  _createRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: true
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.drawDash();
  }

  _render({
    disabled,
    dashWidth,
    dashLength,
    dashRatio
  }) {
    return html`
      <style>
        :host {
          --dashed-radio-dimension: 24px;
          --dashed-dash-width: 2px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: 48px;
          ${dashedColors}
        }

        :host(:focus) svg.dash {
          outline: 1px solid var(--dashed-outline-color);
          outline-offset: 1px;
        }

        :host([disabled]) {
          opacity: 0.6;
          pointer-events: none;
        }

        .radio-container {
          display: inline-block;
          position: relative;
          width: var(--dashed-radio-dimension);
          height: var(--dashed-radio-dimension);
        }

        input[type="radio"] {
          margin: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        svg.dash {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          fill: none;
          z-index: -1;
        }
  
        svg.dash .outer-circle {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
          fill: var(--dashed-fill-color);
        }
  
        svg.dash .inner-circle {
          fill: var(--dashed-secondary-color);
          transition: all 100ms ease-in-out;
        }

        input[type="radio"]:not(:checked) ~ svg.dash .inner-circle {
          opacity: 0;
        }

        input[type="radio"]:checked ~ svg.dash .inner-circle {
          opacity: 1;
        }
      </style>
      <div class="radio-container">
        <input type="radio" id="radio" />
        <svg class="dash">
          <circle class="outer-circle" />
          <circle class="inner-circle" />
        </svg>
      </div>
      <label for="radio"><slot></slot></label>
    `;
  }

  get nativeElement() {
    return this._root.querySelector('input[type="radio"]');
  }

  get svg() {
    return this._root.querySelector('svg.dash');
  }

  drawDash() {
    const svg = this.svg;
    const [width, height] = [24, 24];
    const outerCircle = svg.querySelector('.outer-circle');
    const hostProps = {
      width,
      height
    };
    const dashProps = {
      dashWidth: this.dashWidth,
      dashLength: this.dashLength,
      dashRatio: this.dashRatio
    };
    drawDashedCircle(outerCircle, hostProps, dashProps);
    const innerCircle = svg.querySelector('.inner-circle');
    innerCircle.setAttribute('cx', width / 2);
    innerCircle.setAttribute('cy', height / 2);
    innerCircle.setAttribute('r', 5);
  }

}
customElements.define(DashedRadio.is, DashedRadio);