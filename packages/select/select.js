import { LitElement, html } from '../button/node_modules/@polymer/lit-element/lit-element';

export class DashedSelect extends LitElement {
  static get is() {
    return 'dashed-select';
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

    this.dashWidth = 2;
    this.dashLength = 10;
    this.dashRatio = 0.3;
  }

  _createRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  connectedCallback() {
    super.connectedCallback();
    // this._drawDash();
  }

  _render({ disabled, dashWidth, dashLength, dashRatio }) {
    return html`
      <style>
        :host {
          --dashed-primary-color: blue;
          --dashed-secondary-color: red;
          --dashed-outline-color: rgba(255, 0, 0, 0.5);

          display: inline-block;
          position: relative;
          cursor: pointer;
          outline: none;
          padding: 5px;
        }

        :host(:focus) .dash {
          outline: 1px solid var(--dashed-outline-color);
          outline-offset: 1px;
        }

        :host(:disabled) {
          opacity: 0.6;
          pointer-events: none;
        }
  
        select {
          /* display: inline-block;
          border: none;
          outline: none; */
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
      <select>
        <option value="1">My option 1</option>
        <option value="2">My option 2</option>
        <option value="3">My option 3</option>
      </select>
      <svg class="dash">
        <rect class="border" />
      </svg>
    `;
  }

  get nativeElement() {
    return this._root.querySelector('select');
  }

  get svg() {
    return this._root.querySelector('svg.dash');
  }

  _drawDash() {
    const { width, height } = this.getBoundingClientRect();
    const [borderWidth, borderHeight] = [width - this.dashWidth, height - this.dashWidth];

    if (this.dashLength > width || this.dashLength > height) {
      console.log('dashLength cannot be greater than width or height');
      return;
    }

    if (this.dashWidth === 0) return;

    const dashCountX = Math.floor(
      (borderWidth - this.dashRatio * this.dashLength) / ((1 + this.dashRatio) * this.dashLength)
    );
    const dashCountY = Math.floor(
      (borderHeight - this.dashRatio * this.dashLength) / ((1 + this.dashRatio) * this.dashLength)
    );

    const dashSpacingX = (borderWidth - dashCountX * this.dashLength) / (dashCountX + 1);
    const dashSpacingY = (borderHeight - dashCountY * this.dashLength) / (dashCountY + 1);

    console.log({ width, height, dashCountX, dashCountY, dashSpacingX, dashSpacingY });

    const strokeDashArrayX =
      `${this.dashLength} ${dashSpacingX} `.repeat(dashCountX - 1) +
      `${this.dashLength} ${dashSpacingX + dashSpacingY} `;
    const strokeDasharrayY =
      `${this.dashLength} ${dashSpacingY} `.repeat(dashCountY - 1) +
      `${this.dashLength} ${dashSpacingY + dashSpacingX} `;
    const strokeDasharray = (strokeDashArrayX + strokeDasharrayY).trim();
    const strokeDashOffset = -dashSpacingX;
    console.log({ strokeDasharray, strokeDashOffset });

    const svg = this.svg;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const border = svg.querySelector('.border');
    border.setAttribute('x', this.dashWidth / 2);
    border.setAttribute('y', this.dashWidth / 2);
    border.setAttribute('width', borderWidth);
    border.setAttribute('height', borderHeight);
    border.setAttribute('stroke-width', this.dashWidth);
    border.setAttribute('stroke-dasharray', strokeDasharray);
    border.setAttribute('stroke-dashoffset', strokeDashOffset);
  }
}
customElements.define(DashedSelect.is, DashedSelect);
