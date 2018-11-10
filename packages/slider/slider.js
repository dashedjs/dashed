import { borderImage } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedSlider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    Boolean(value) ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  get min() {
    return parseFloat(this.getAttribute('min')) || 0;
  }
  set min(value) {
    this.setAttribute('min', value);
  }

  get max() {
    return parseFloat(this.getAttribute('max')) || 100;
  }
  set max(value) {
    this.setAttribute('max', value);
  }

  get value() {
    return parseFloat(this.getAttribute('value')) || 30;
  }
  set value(value) {
    this.setAttribute('value', value);
  }

  get step() {
    return parseFloat(this.hasAttribute('step')) || 1;
  }
  set step(value) {
    this.setAttribute('step', value);
  }

  get dashWidth() {
    return parseFloat(this.getAttribute('dash-width')) || 2;
  }
  set dashWidth(value) {
    this.setAttribute('dash-width', value);
  }

  get dashLength() {
    return parseFloat(this.getAttribute('dash-length')) || 2;
  }
  set dashLength(value) {
    this.setAttribute('dash-length', value);
  }

  get dashSpacing() {
    return parseFloat(this.getAttribute('dash-spacing')) || 1;
  }
  set dashSpacing(value) {
    this.setAttribute('dash-spacing', value);
  }

  connectedCallback() {
    this.render();
    this._nativeInput = this.shadowRoot.querySelector('input');
    this._nativeInput.addEventListener('input', this._onInputHandler.bind(this));
  }

  disconnectedCallback() {
    this._nativeInput.removeEventListener('input', this._onInputHandler.bind(this));
  }

  render() {
    const [min, max, value] = [this.min, this.max, this.value].map(str => parseFloat(str));
    const percentage = `${((value - min) / (max - min)) * 100}%`;
    const template = document.createElement('template');
    // prettier-ignore
    template.innerHTML = `
      ${dashedStyles}
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

        input[type="range"] {
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
        <input type="range" id="range"
          min="${this.min}" max="${this.max}" step="${this.step}" value="${this.value}" />
        <svg class="dash" stroke-width="${this.dashWidth}">
          <line class="slider-background" x2="100%" y2="0"  transform="translate(0, 12)"
            stroke-dasharray="${this.dashLength} ${this.dashSpacing}" />
          <line class="slider-tracker" x2="${percentage}" y2="0"  transform="translate(0, 12)"
            stroke-dasharray="${this.dashLength} ${this.dashSpacing}" />
          <g class="slider-cursor" style="transform: translate(calc(${percentage} - 6px), 0)">
            <circle class="slider-cursor-focus-ring" cx="6" cy="12" r="9" />
            <circle class="slider-cursor-inner" cx="6" cy="12" r="6"  />
          </g>
        </svg>
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  _onInputHandler(e) {
    this.value = parseFloat(e.target.value);

    const [min, max, value] = [this.min, this.max, this.value].map(str => parseFloat(str));
    const percentage = `${((value - min) / (max - min)) * 100}%`;

    const svg = this.shadowRoot.querySelector('svg.dash');

    const sliderCursor = svg.querySelector('.slider-cursor');
    sliderCursor.style.transform = `translateX(calc(${percentage} - 6px))`;

    const sliderTracker = svg.querySelector('.slider-tracker');
    sliderTracker.setAttribute('x2', percentage);
  }
}
customElements.define('dashed-slider', DashedSlider);
