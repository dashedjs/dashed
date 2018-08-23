import { LitElement, html } from '../button/node_modules/@polymer/lit-element/lit-element';

export class DashedToggles extends LitElement {
  static get is() {
    return 'dashed-toggles';
  }

  static get properties() {
    return {
      disabled: Boolean,
      checked: Boolean,
      name: String,

      dashWidth: Number,
      dashLength: Number,
      dashRatio: Number
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.checked = false;
    this.name = 'dashed-toggles-name';

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
          --dashed-toggles-width: 48px;
          --dashed-toggles-height: 24px;
          --dashed-dash-width: 2px;

          display: inline-flex;
          align-items: center;
          position: relative;
          cursor: inherit;
          outline: none;
        }

        :host(:focus) svg.dash {
          outline: 1px solid var(--dashed-outline-color);
          outline-offset: 1px;
        }

        :host(:disabled) {
          opacity: 0.6;
          pointer-events: none;
        }

        .toggles-container {
          display: inline-flex;
          position: relative;
          width: var(--dashed-toggles-width);
          height: var(--dashed-toggles-height);
        }

        input[type="radio"] {
          margin: 0;
          width: 100%;
          height: 100%;
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
  
        svg.dash .toggles-background {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
        }
  
        svg.dash .toggles-switcher {
          fill: var(--dashed-secondary-color);
          transition: all 100ms ease-in-out;
        }

        input#radio-left:checked ~ svg.dash .toggles-switcher {
          transform: translateX(- var(--dashed-toggles-height));
        }

        input#radio-left:not(:checked) ~ svg.dash .toggles-switcher {
          transform: translateX(var(--dashed-toggles-height));
        }
      </style>
      <label for="radio-left">Radio 1</label>
      <div class="toggles-container">
        <input type="radio" id="radio-left" name="${name}" checked="${!checked}" />
        <svg class="dash">
          <rect class="toggles-background" />
          <circle class="toggles-switcher" />
        </svg>
        <input type="radio" id="radio-right" name="${name}" checked="${checked}" />
      </div>
      <label for="radio-right">Radio 2</label>
    `;
  }

  get nativeElement() {
    return this._root.querySelectorAll('input[type="radio"]');
  }

  get svg() {
    return this._root.querySelector('svg.dash');
  }

  drawDash() {
    const [width, height] = [48, 24];
    // const { strokeDasharray, strokeDashOffset, dashWidth } = this._computeRectStrokeDashParams(width, height);

    const svg = this.svg;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const toggleBackground = svg.querySelector('.toggles-background');
    const [toggleBackgroundWidth, toggleBackgroundHeight] = [width - 4 * this.dashWidth, height - 6 * this.dashWidth];
    const toggleBackgroundBorderRadius = toggleBackgroundHeight / 2;
    toggleBackground.setAttribute('x', 4);
    toggleBackground.setAttribute('y', 6);
    toggleBackground.setAttribute('width', toggleBackgroundWidth);
    toggleBackground.setAttribute('height', toggleBackgroundHeight);
    toggleBackground.setAttribute('rx', toggleBackgroundBorderRadius);
    toggleBackground.setAttribute('ry', toggleBackgroundBorderRadius);
    toggleBackground.setAttribute('stroke-width', this.dashWidth);

    const lineX = toggleBackgroundWidth - 2 * toggleBackgroundBorderRadius;
    const arcY = (toggleBackground.getTotalLength() - 2 * lineX) / 2;

    const dashCountX = Math.floor(
      (lineX - this.dashRatio * this.dashLength) / ((1 + this.dashRatio) * this.dashLength)
    );
    const dashCountY = Math.floor((arcY - this.dashRatio * this.dashLength) / ((1 + this.dashRatio) * this.dashLength));

    const dashSpacingX = (lineX - dashCountX * this.dashLength) / (dashCountX + 1);
    const dashSpacingY = (arcY - dashCountY * this.dashLength) / (dashCountY + 1);

    const strokeDashArrayX =
      `${this.dashLength} ${dashSpacingX} `.repeat(dashCountX - 1) +
      `${this.dashLength} ${dashSpacingX + dashSpacingY} `;
    const strokeDasharrayY =
      `${this.dashLength} ${dashSpacingY} `.repeat(dashCountY - 1) +
      `${this.dashLength} ${dashSpacingY + dashSpacingX} `;
    const strokeDasharray = (strokeDashArrayX + strokeDasharrayY).trim();
    const strokeDashOffset = -dashSpacingX;
    console.log({ strokeDasharray, strokeDashOffset });
    toggleBackground.setAttribute('stroke-dasharray', strokeDasharray);
    toggleBackground.setAttribute('stroke-dashoffset', strokeDashOffset);

    const toggleSwitcher = svg.querySelector('.toggles-switcher');
    toggleSwitcher.setAttribute('stroke-width', this.dashWidth);
    toggleSwitcher.setAttribute('cx', height / 2);
    toggleSwitcher.setAttribute('cy', height / 2);
    toggleSwitcher.setAttribute('r', (height - this.dashWidth) / 2);
  }
}
customElements.define(DashedToggle.is, DashedToggle);
