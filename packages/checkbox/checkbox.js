import { LitElement, html, svg } from '@polymer/lit-element/lit-element.js';

export class DashedCheckbox extends LitElement {
  static get is() {
    return 'dashed-checkbox';
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
          --dashed-checkbox-dimension: 24px;
          --dashed-dash-width: 2px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: 48px;
        }

        :host(:focus) .dash {
          outline: 1px solid var(--dashed-outline-color);
          outline-offset: 1px;
        }

        :host(:disabled) {
          opacity: 0.6;
          pointer-events: none;
        }

        .checkbox-container {
          display: inline-block;
          position: relative;
          width: var(--dashed-checkbox-dimension);
          height: var(--dashed-checkbox-dimension);
        }

        input[type="checkbox"] {
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
          /* stroke-linecap: round; */
          z-index: -1;
        }
  
        svg.dash .border {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
        }

        input[type="checkbox"]:not(:checked) ~ svg.dash .checkmark {
          opacity: 0;
        }

        input[type="checkbox"]:checked ~ svg.dash .checkmark {
          opacity: 1;
        }
      </style>
      <div class="checkbox-container">
        <input type="checkbox" id="checkbox" />
        <svg class="dash">
          <path class="checkmark" />
          <rect class="border" />
        </svg>
      </div>
      <label for="checkbox"><slot></slot></label>
    `;
  }

  get nativeElement() {
    return this._root.querySelector('input[type="checkbox"]');
  }

  get svg() {
    return this._root.querySelector('svg.dash');
  }

  drawDash() {
    const [width, height] = [24, 24];
    const { strokeDasharray, strokeDashOffset, dashWidth } = this._computeRectStrokeDashParams(width, height);

    const svg = this.svg;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const border = svg.querySelector('.border');
    border.setAttribute('x', dashWidth / 2);
    border.setAttribute('y', dashWidth / 2);
    border.setAttribute('width', width - dashWidth);
    border.setAttribute('height', height - dashWidth);
    border.setAttribute('stroke-width', dashWidth);
    border.setAttribute('stroke-dasharray', strokeDasharray);
    border.setAttribute('stroke-dashoffset', strokeDashOffset);

    const checkmark = svg.querySelector('.checkmark');
    checkmark.setAttribute('stroke-width', dashWidth * 1.8);
    checkmark.setAttribute('stroke', 'red');
    checkmark.setAttribute('d', 'M6 12l4 4l8 -8');
  }

  _computeRectStrokeDashParams(width, height) {
    const { dashWidth, dashLength, dashRatio } = this._validateDashProps(width, height);

    const [borderWidth, borderHeight] = [width - dashWidth, height - dashWidth];

    const dashCountX = Math.floor((borderWidth - dashRatio * dashLength) / ((1 + dashRatio) * dashLength));
    const dashCountY = Math.floor((borderHeight - dashRatio * dashLength) / ((1 + dashRatio) * dashLength));

    const dashSpacingX = (borderWidth - dashCountX * dashLength) / (dashCountX + 1);
    const dashSpacingY = (borderHeight - dashCountY * dashLength) / (dashCountY + 1);

    const strokeDashArrayX =
      `${dashLength} ${dashSpacingX} `.repeat(dashCountX - 1) + `${dashLength} ${dashSpacingX + dashSpacingY} `;
    const strokeDasharrayY =
      `${dashLength} ${dashSpacingY} `.repeat(dashCountY - 1) + `${dashLength} ${dashSpacingY + dashSpacingX} `;

    const strokeDasharray = `${strokeDashArrayX}${strokeDasharrayY}`.trim();
    const strokeDashOffset = -dashSpacingX;

    return { strokeDasharray, strokeDashOffset, dashWidth };
  }

  _validateDashProps(width, height) {
    if (this.dashWidth < 0 || this.dashLength < 0 || this.dashRatio < 0) {
      throw new Error(`dashWidth, dashLength and dashRatio must be positive numbers`);
    }
    const refDimension = Math.min(width, height);
    const dashLength = this.dashLength > refDimension ? refDimension : this.dashLength;
    const dashWidth = this.dashWidth > refDimension / 2 ? refDimension / 2 : this.dashWidth;
    const dashRatio = dashLength * (1 + this.dashRatio) > refDimension ? refDimension - dashLength : this.dashRatio;

    return { dashWidth, dashLength, dashRatio };
  }
}
customElements.define(DashedCheckbox.is, DashedCheckbox);
