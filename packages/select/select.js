import { LitElement, html } from '../button/node_modules/@polymer/lit-element/lit-element';
import { dashedColors } from '../styles/styles.js';

export class DashedSelect extends LitElement {
  static get is() {
    return 'dashed-select';
  }

  static get properties() {
    return {
      disabled: Boolean,
      value: String,

      dashWidth: Number,
      dashLength: Number,
      dashRatio: Number
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.value = '';

    this.dashWidth = 2;
    this.dashLength = 10;
    this.dashRatio = 0.3;
  }

  _createRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  connectedCallback() {
    super.connectedCallback();
    this.drawDash();
    window.addEventListener('resize', this.drawDash.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.drawDash.bind(this));
  }

  _render({ disabled, dashWidth, dashLength, dashRatio }) {
    return html`
      <style>
        :host {
          /* --dashed-primary-color: blue;
          --dashed-secondary-color: red;
          --dashed-fill-color: lightcyan;
          --dashed-outline-color: rgba(255, 0, 0, 0.5); */

          --dashed-select-min-width: 96px;
          --dashed-select-min-height: 24px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: var(--dashed-select-min-width);
          min-height: var(--dashed-select-min-height);
          ${dashedColors}
        }

        :host(:focus) .dash {
          outline: 1px solid var(--dashed-outline-color);
          outline-offset: 1px;
        }

        :host(:disabled) {
          opacity: 0.6;
          pointer-events: none;
        }

        .select-container {
          display: inline-block;
          position: relative;
          width: 100%;
          height: 100%;
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

        svg.dash {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          fill: var(--dashed-fill-color);
          z-index: -1;
        }
  
        svg.dash .border-bottom {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
        }
  
        svg.dash .caret {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
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
          <rect class="background" />
          <path class="caret" />
          <line class="border-bottom" />
        </svg>
      </div>
    `;
  }

  get nativeElement() {
    return this._root.querySelector('select');
  }

  get svg() {
    return this._root.querySelector('svg.dash');
  }

  drawDash() {
    const { width, height } = this.getBoundingClientRect();
    const { strokeDasharray, strokeDashOffset, dashWidth } = this._computeLineStrokeDashParams(width);

    const svg = this.svg;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const borderBottom = svg.querySelector('.border-bottom');
    borderBottom.setAttribute('x1', 0);
    borderBottom.setAttribute('y1', height - dashWidth / 2);
    borderBottom.setAttribute('x2', width);
    borderBottom.setAttribute('y2', height - dashWidth / 2);
    borderBottom.setAttribute('stroke-width', dashWidth);
    borderBottom.setAttribute('stroke-dasharray', strokeDasharray);
    borderBottom.setAttribute('stroke-dashoffset', strokeDashOffset);

    const caret = svg.querySelector('.caret');
    caret.setAttribute('stroke-width', dashWidth * 1.8);
    caret.setAttribute('d', `M${width - 12} ${8}l4 4l4 -4`);

    const background = svg.querySelector('.background');
    background.setAttribute('width', width);
    background.setAttribute('height', height - dashWidth / 2);
  }

  _computeLineStrokeDashParams(width) {
    const { dashWidth, dashLength, dashRatio } = this._validateDashProps(width);

    const dashCount = 1 + Math.floor((width - dashLength) / ((1 + dashRatio) * dashLength));
    const dashSpacing = (width - dashCount * dashLength) / (dashCount - 1);

    const strokeDasharray = `${dashLength} ${dashSpacing}`;
    const strokeDashOffset = 0;

    return { strokeDasharray, strokeDashOffset, dashWidth };
  }

  _validateDashProps(width) {
    if (this.dashWidth < 0 || this.dashLength < 0 || this.dashRatio < 0) {
      throw new Error(`dashWidth, dashLength and dashRatio must be positive numbers`);
    }
    const refDimension = width;
    const dashLength = this.dashLength > refDimension ? refDimension : this.dashLength;
    const dashWidth = this.dashWidth > refDimension / 2 ? refDimension / 2 : this.dashWidth;
    const dashRatio = dashLength * (1 + this.dashRatio) > refDimension ? refDimension - dashLength : this.dashRatio;
    return { dashWidth, dashLength, dashRatio };
  }
}
customElements.define(DashedSelect.is, DashedSelect);
