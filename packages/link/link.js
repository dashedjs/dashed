import { LitElement, html, svg } from '@polymer/lit-element/lit-element.js';

export class DashedLink extends LitElement {
  static get is() {
    return 'dashed-link';
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

    this.dashWidth = 4;
    this.dashLength = 8;
    this.dashRatio = 0.4;
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

        :host(:hover) link {
          color: var(--dashed-secondary-color);
        }

        :host(:disabled) {
          opacity: 0.6;
          pointer-events: none;
        }

        a {
          display: inline-block;
          cursor: inherit;
          text-decoration: none;
          outline: none;
          padding-bottom: 6px;
          font-size: 16px;
          position: relative;
          color: var(--dashed-primary-color);
          transition: 50ms ease-in-out;
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
  
        svg.dash .border-bottom {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
        }

        svg.dash .background {
          fill: var(--dashed-fill-color);
        }
      </style>
      <a href="#">
        <slot></slot>
        <svg class="dash">
          <rect class="background" />
          <line class="border-bottom" />
        </svg>
      </a>
    `;
  }

  get nativeElement() {
    return this._root.querySelector('a');
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

    const background = svg.querySelector('.background');
    background.setAttribute('x', 0);
    background.setAttribute('y', 0);
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
customElements.define(DashedLink.is, DashedLink);
