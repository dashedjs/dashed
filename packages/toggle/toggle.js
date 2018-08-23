import { LitElement, html } from '../button/node_modules/@polymer/lit-element/lit-element';

export class DashedToggle extends LitElement {
  static get is() {
    return 'dashed-toggle';
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
          --dashed-toggle-width: 48px;
          --dashed-toggle-height: 24px;
          --dashed-dash-width: 2px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
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

        .toggle-container {
          display: inline-flex;
          position: relative;
          width: var(--dashed-toggle-width);
          height: var(--dashed-toggle-height);
        }

        label {
          display: inline-flex;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        input[type="checkbox"] {
          margin: 0;
          width: var(--dashed-toggle-width);
          height: var(--dashed-toggle-height);
          cursor: pointer;
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
  
        svg.dash .toggle-background {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
        }
  
        svg.dash .toggle-switcher {
          fill: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
        }

        input[type="checkbox"]:checked ~ svg.dash .toggle-switcher {
          transform: translateX(var(--dashed-toggle-height));
          fill: var(--dashed-secondary-color);
        }

        input[type="checkbox"]:not(:checked) ~ svg.dash .toggle-switcher {
          transform: translateX(- var(--dashed-toggle-height));
        }
      </style>
      <div class="toggle-container">
        <input type="checkbox" id="toggle" />
        <svg class="dash">
          <rect class="toggle-background" />
          <circle class="toggle-switcher" />
        </svg>
      </div>
      <label for="toggle"><slot></slot></label>
    `;
  }

  get nativeElement() {
    return this._root.querySelector('input[type="checkbox"]');
  }

  get svg() {
    return this._root.querySelector('svg.dash');
  }

  drawDash() {
    const [width, height] = [48, 24];
    const { dashWidth } = this._validateDashProps(width, height);

    const svg = this.svg;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const toggleBackground = svg.querySelector('.toggle-background');
    const [toggleBackgroundWidth, toggleBackgroundHeight] = [width - 4 * dashWidth, height - 6 * dashWidth];
    const toggleBackgroundBorderRadius = toggleBackgroundHeight / 2;
    toggleBackground.setAttribute('x', 4);
    toggleBackground.setAttribute('y', 6);
    toggleBackground.setAttribute('width', toggleBackgroundWidth);
    toggleBackground.setAttribute('height', toggleBackgroundHeight);
    toggleBackground.setAttribute('rx', toggleBackgroundBorderRadius);
    toggleBackground.setAttribute('ry', toggleBackgroundBorderRadius);
    toggleBackground.setAttribute('stroke-width', dashWidth);

    const lineX = toggleBackgroundWidth - 2 * toggleBackgroundBorderRadius;
    const arcY = (toggleBackground.getTotalLength() - 2 * lineX) / 2;

    const { strokeDasharray, strokeDashOffset } = this._computeRectRoundedStrokeDashParams(width, height, lineX, arcY);
    toggleBackground.setAttribute('stroke-dasharray', strokeDasharray);
    toggleBackground.setAttribute('stroke-dashoffset', strokeDashOffset);

    const toggleSwitcher = svg.querySelector('.toggle-switcher');
    toggleSwitcher.setAttribute('stroke-width', dashWidth);
    toggleSwitcher.setAttribute('cx', height / 2);
    toggleSwitcher.setAttribute('cy', height / 2);
    toggleSwitcher.setAttribute('r', (height - dashWidth) / 2);
  }

  _computeRectRoundedStrokeDashParams(width, height, lineX, arcY) {
    const { dashWidth, dashLength, dashRatio } = this._validateDashProps(width, height);

    const dashCountX = Math.floor(
      (lineX - this.dashRatio * this.dashLength) / ((1 + this.dashRatio) * this.dashLength)
    );
    const dashCountY = Math.floor((arcY - dashRatio * this.dashLength) / ((1 + dashRatio) * dashLength));

    const dashSpacingX = (lineX - dashCountX * this.dashLength) / (dashCountX + 1);
    const dashSpacingY = (arcY - dashCountY * this.dashLength) / (dashCountY + 1);

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
    // const refDimension = width - 4 * this.dashWidth < height - 6 * this.dashWidth ? width : height;
    const refDimension = Math.min(width, height);
    const dashLength = this.dashLength > refDimension ? refDimension : this.dashLength;
    const dashWidth = this.dashWidth > refDimension / 2 ? refDimension / 2 : this.dashWidth;
    const dashRatio = dashLength * (1 + this.dashRatio) > refDimension ? refDimension - dashLength : this.dashRatio;

    return { dashWidth, dashLength, dashRatio };
  }
}
customElements.define(DashedToggle.is, DashedToggle);
