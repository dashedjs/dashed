import { html, LitElement } from '../button/node_modules/@polymer/lit-element';

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
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  connectedCallback() {
    super.connectedCallback();
    this.drawDash();
  }

  _render({ disabled, dashWidth, dashLength, dashRatio }) {
    return html`
      <style>
        :host {
          --dashed-primary-color: blue;
          --dashed-secondary-color: red;
          --dashed-outline-color: rgba(255, 0, 0, 0.5);
          --dashed-radio-dimension: 24px;
          --dashed-dash-width: 2px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: 48px;
        }

        :host(:focus) svg.dash {
          outline: 1px solid var(--dashed-outline-color);
          outline-offset: 1px;
        }

        :host(:disabled) {
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
        }
  
        svg.dash .inner-circle {
          /* stroke: var(--dashed-primary-color); */
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
          <circle class="inner-circle" />
          <circle class="outer-circle" />
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
    const [width, height] = [24, 24];
    const { dashWidth } = this._validateDashProps(width, height);

    const svg = this.svg;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const outerCircle = svg.querySelector('.outer-circle');
    const radius = (width - dashWidth) / 2;
    outerCircle.setAttribute('cx', width / 2);
    outerCircle.setAttribute('cy', height / 2);
    outerCircle.setAttribute('r', (width - dashWidth) / 2);
    outerCircle.setAttribute('stroke-width', dashWidth);

    const { strokeDasharray, strokeDashOffset } = this._computeCircleStrokeDashParams(width, height, radius);
    outerCircle.setAttribute('stroke-dasharray', strokeDasharray);
    outerCircle.setAttribute('stroke-dashoffset', strokeDashOffset);

    const innerCircle = svg.querySelector('.inner-circle');
    innerCircle.setAttribute('cx', width / 2);
    innerCircle.setAttribute('cy', height / 2);
    innerCircle.setAttribute('r', 5);
  }

  _computeCircleStrokeDashParams(width, height, radius) {
    const { dashWidth, dashLength, dashRatio } = this._validateDashProps(width, height);

    const circonference = 2 * Math.PI * radius;
    const dashCount = Math.floor((circonference - dashRatio * dashLength) / ((1 + dashRatio) * dashLength));
    const dashSpacing = (circonference - dashCount * dashLength) / (dashCount + 1);

    const strokeDasharray = `${dashLength} ${dashSpacing}`;
    const strokeDashOffset = 0;

    return { strokeDasharray, strokeDashOffset, dashWidth };
  }

  _validateDashProps(width, height) {
    if (this.dashWidth < 0 || this.dashLength < 0 || this.dashRatio < 0) {
      throw new Error(`dashWidth, dashLength and dashRatio must be positive numbers`);
    }
    const refDimension = (Math.min(width, height) * 3.1) / 4;
    const dashLength = this.dashLength > refDimension ? refDimension : this.dashLength;
    const dashWidth = this.dashWidth > refDimension / 2 ? refDimension / 2 : this.dashWidth;
    const dashRatio = dashLength * (1 + this.dashRatio) > refDimension ? refDimension - dashLength : this.dashRatio;

    return { dashWidth, dashLength, dashRatio };
  }
}
customElements.define(DashedRadio.is, DashedRadio);
