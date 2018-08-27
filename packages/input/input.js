import { LitElement, html } from '@polymer/lit-element';

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

  _render({ disabled, dashWidth, dashLength, dashRatio }) {
    return html`
      <style>
        :host {
          --dashed-primary-color: blue;
          --dashed-secondary-color: red;
          --dashed-fill-color: lightcyan;
          --dashed-outline-color: rgba(255, 0, 0, 0.5);
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

        :host(:focus) .dash {
          outline: 1px solid var(--dashed-outline-color);
          outline-offset: 1px;
        }

        :host(:disabled) {
          opacity: 0.6;
          pointer-events: none;
        }

        .input-container {
          display: inline-block;
          position: relative;
          outline: none;
          width: 100%;
          height: 100%;
        }

        input {
          margin: 5px;
          padding: 5px;
          box-sizing: border-box;
          border: none;
          outline: none;
          max-width: 100%;
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
    const { width, height } = this.getBoundingClientRect();
    const { dashWidth } = this._validateDashProps(width, height);

    const svg = this.svg;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const border = svg.querySelector('.border');
    const borderRadius = 5;
    border.setAttribute('stroke-width', dashWidth);
    border.setAttribute('x', dashWidth / 2);
    border.setAttribute('y', dashWidth / 2);
    border.setAttribute('width', width - dashWidth);
    border.setAttribute('height', height - dashWidth);
    border.setAttribute('rx', borderRadius);
    border.setAttribute('ry', borderRadius);

    const { strokeDasharray, strokeDashOffset } = this._computeRectStrokeDashParams(width, height, borderRadius);
    border.setAttribute('stroke-dasharray', strokeDasharray);
    border.setAttribute('stroke-dashoffset', strokeDashOffset);
  }

  _computeRectStrokeDashParams(width, height, borderRadius) {
    const { dashWidth, dashLength, dashRatio } = this._validateDashProps(width, height);

    const lineX = width - dashWidth - 2 * borderRadius;
    const lineY = height - dashWidth - 2 * borderRadius;
    const arcCorner = (2 * Math.PI * borderRadius) / 4;

    const dashCountX = calculateDashCount(lineX);
    const dashCountY = calculateDashCount(lineY);
    const dashCountCorner = calculateDashCount(arcCorner);

    const dashSpacingX = calculateDashSpacing(lineX, dashCountX);
    const dashSpacingY = calculateDashSpacing(lineY, dashCountY);
    const dashSpacingCorner = calculateDashSpacing(arcCorner, dashCountCorner);

    const strokeDashArrayX = calculateStrokeDasharray(dashCountX, dashSpacingX, dashSpacingCorner);
    const strokeDashArrayCorner1 = calculateStrokeDasharray(dashCountCorner, dashSpacingCorner, dashSpacingY);
    const strokeDasharrayY = calculateStrokeDasharray(dashCountY, dashSpacingY, dashSpacingCorner);
    const strokeDashArrayCorner2 = calculateStrokeDasharray(dashCountCorner, dashSpacingCorner, dashSpacingX);

    const strokeDasharray = `${strokeDashArrayX}${strokeDashArrayCorner1}${strokeDasharrayY}${strokeDashArrayCorner2}`.trim();
    const strokeDashOffset = -dashSpacingX;

    function calculateDashCount(totalDistance) {
      if (totalDistance - dashRatio * dashLength <= 0) return 0;
      return Math.floor((totalDistance - dashRatio * dashLength) / ((1 + dashRatio) * dashLength));
    }

    function calculateDashSpacing(totalDistance, dashCount) {
      if (dashCount === 0) return totalDistance / 2;
      return (totalDistance - dashCount * dashLength) / (dashCount + 1);
    }

    function calculateStrokeDasharray(dashCount, dashSpacing, adjacentdashSpacing) {
      if (dashCount === 0) return `0 ${dashSpacing + adjacentdashSpacing} `;
      return (
        `${dashLength} ${dashSpacing} `.repeat(dashCount - 1) + `${dashLength} ${dashSpacing + adjacentdashSpacing} `
      );
    }

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
customElements.define(DashedInput.is, DashedInput);
