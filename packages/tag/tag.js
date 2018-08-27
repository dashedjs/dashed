import { LitElement, html } from '../button/node_modules/@polymer/lit-element/lit-element';

export class DashedTag extends LitElement {
  static get is() {
    return 'dashed-tag';
  }

  static get properties() {
    return {
      disabled: Boolean,

      dashWidth: Number,
      dashLength: Number,
      dashRatio: Number
    };
  }

  constructor() {
    super();
    this.disabled = false;

    this.dashWidth = 1;
    this.dashLength = 6;
    this.dashRatio = 0.2;
  }

  _createRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  connectedCallback() {
    super.connectedCallback();
    this.drawDash();
  }

  _render({ disabled, checked, name, dashWidth, dashLength, dashRatio }) {
    return html`
      <style>
        :host {
          --dashed-primary-color: blue;
          --dashed-secondary-color: red;
          --dashed-outline-color: rgba(255, 0, 0, 0.5);

          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
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

        button {
          display: inline-block;
          background: none;
          cursor: inherit;
          border: none;
          outline: none;
          padding: 4px 8px;
          font-size: 12px;
          position: relative;
          color: var(--dashed-primary-color);
          transition: 50ms ease-in-out;
        }

        button.active {
          color: var(--dashed-secondary-color);
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
  
        svg.dash .border {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
        }
      </style>
      <button type="button" on-click="${e => this._toggleTag(e)}">
        <slot></slot>
        <svg class="dash">
          <rect class="border" />
        </svg>
      </button>
    `;
  }

  get nativeElement() {
    return this._root.querySelector('button');
  }

  get svg() {
    return this._root.querySelector('svg.dash');
  }

  _toggleTag(e) {
    const button = this.nativeElement;
    if (!button.classList.contains('active')) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  }

  drawDash() {
    const { width, height } = this.getBoundingClientRect();
    const { dashWidth } = this._validateDashProps(width, height);

    const svg = this.svg;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const border = svg.querySelector('.border');
    const borderRadius = (height - dashWidth) / 2;
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
customElements.define(DashedTag.is, DashedTag);
