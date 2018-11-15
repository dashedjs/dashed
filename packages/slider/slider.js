import { DashedBase, sharedStyles, html } from '@dashedjs/dashed-base/base.js';

export class DashedSlider extends DashedBase {
  constructor() {
    super();
    this.borderRadius = 0;
    this.dashWidth = 2;
    this.dashLength = 2;
    this.dashSpacing = 1;

    this.value = 30;
    this.min = 0;
    this.max = 100;
    this.step = 1;

    this._percentage = this.max != this.min ? `${((this.value - this.min) / (this.max - this.min)) * 100}%` : '0%';
  }

  static get properties() {
    return {
      ...super.properties,
      min: Number,
      max: Number,
      value: Number,
      step: Number
    };
  }

  render() {
    this._percentage = this.max != this.min ? `${((this.value - this.min) / (this.max - this.min)) * 100}%` : '0%';
    return html`
      ${sharedStyles}
      <style>
        :host {
          --dashed-background-width: 100%;
          display: inline-block;
          position: relative;
          cursor: inherit;
          outline: none;
        }

        :host(:focus) svg.dash .slider-cursor-focus-ring {
          opacity: 1;
        }

        .slider-container {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          position: relative;
          min-width: 192px;
          height: 24px;
        }

        input[type='range'] {
          margin: 0;
          width: calc(100% - 8px);
          cursor: pointer;
          opacity: 0;
        }

        svg.dash {
          box-sizing: border-box;
          padding: 0 8px;
        }

        svg.dash .slider-background {
          stroke: var(--color-primary);
        }

        svg.dash .slider-tracker {
          stroke: var(--color-danger);
          opacity: 0.8;
        }

        svg.dash .slider-cursor {
          will-change: transform;
        }

        svg.dash .slider-cursor-inner {
          fill: var(--color-danger);
        }

        svg.dash .slider-cursor-focus-ring {
          fill: rgba(255, 0, 0, 0.5);
          opacity: 0;
        }
      </style>
      <label for="range"><slot></slot></label>
      <div class="slider-container">
        <input
          @input="${e => this._onInputHandler(e)}"
          type="range"
          id="range"
          min="${this.min}"
          max="${this.max}"
          value="${this.value}"
          step="${this.step}"
        />
        <svg class="dash" stroke-width="${this.dashWidth}">
          <line
            class="slider-background"
            x2="100%"
            y2="0"
            transform="translate(0, 12)"
            stroke-dasharray="${this.dashLength} ${this.dashSpacing}"
          />
          <line
            class="slider-tracker"
            x2="${this._percentage}"
            y2="0"
            transform="translate(0, 12)"
            stroke-dasharray="${this.dashLength} ${this.dashSpacing}"
          />
          <g class="slider-cursor" style="transform: translate(calc(${this._percentage} - 6px), 0)">
            <circle class="slider-cursor-focus-ring" cx="6" cy="12" r="9" />
            <circle class="slider-cursor-inner" cx="6" cy="12" r="6" />
          </g>
        </svg>
      </div>
    `;
  }

  _onInputHandler(e) {
    this.value = parseFloat(e.target.value);
    this._percentage = `${((this.value - this.min) / (this.max - this.min)) * 100}%`;
    this.requestUpdate();
  }
}
customElements.define('dashed-slider', DashedSlider);
