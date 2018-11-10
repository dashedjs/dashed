import { DashedBase, sharedStyles } from '@dashedjs/dashed-base/base.js';

export class DashedSlider extends DashedBase {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['border-radius', 'dash-width', 'dash-length', 'dash-spacing', 'dash-color'];
  }

  get min() {
    return this.getAttribute('min');
  }
  set min(value) {
    this.setAttribute('min', value);
  }

  get max() {
    return this.getAttribute('max');
  }
  set max(value) {
    this.setAttribute('max', value);
  }

  get value() {
    return this.getAttribute('value');
  }
  set value(value) {
    this.setAttribute('value', value);
  }

  get step() {
    return this.getAttribute('step');
  }
  set step(value) {
    this.setAttribute('step', value);
  }

  connectedCallback() {
    this.render();
    this._nativeInput = this.shadowRoot.querySelector('input');
    this._nativeInput.addEventListener('input', this._onInputHandler.bind(this));
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    this.render();
  }

  disconnectedCallback() {
    this._nativeInput.removeEventListener('input', this._onInputHandler.bind(this));
  }

  render() {
    const [value = 30, min = 0, max = 100, step = 1] = [this.value, this.min, this.max, this.step].map(attr =>
      attr ? parseFloat(attr) : undefined
    );
    const percentage = `${((value - min) / (max - min)) * 100}%`;

    const [borderRadius = 0, dashWidth = 2, dashLength = 2, dashSpacing = 1] = [
      this.borderRadius,
      this.dashWidth,
      this.dashLength,
      this.dashSpacing
    ].map(attr => (attr ? parseFloat(attr) : undefined));
    const dashColor = this.dashColor

    const template = document.createElement('template');
    // prettier-ignore
    template.innerHTML = `
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
          min="${min}" max="${max}" step="${step}" value="${value}" />
        <svg class="dash" stroke-width="${dashWidth}">
          <line class="slider-background" x2="100%" y2="0"  transform="translate(0, 12)"
            stroke-dasharray="${dashLength} ${dashSpacing}" />
          <line class="slider-tracker" x2="${percentage}" y2="0"  transform="translate(0, 12)"
            stroke-dasharray="${dashLength} ${dashSpacing}" />
          <g class="slider-cursor" style="transform: translate(calc(${percentage} - 6px), 0)">
            <circle class="slider-cursor-focus-ring" cx="6" cy="12" r="9" />
            <circle class="slider-cursor-inner" cx="6" cy="12" r="6"  />
          </g>
        </svg>
      </div>
    `;
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild);
    }
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  _onInputHandler(e) {
    this.value = parseFloat(e.target.value);

    const [value = 30, min = 0, max = 100] = [this.value, this.min, this.max].map(attr =>
      attr ? parseFloat(attr) : undefined
    );
    const percentage = `${((value - min) / (max - min)) * 100}%`;

    const svg = this.shadowRoot.querySelector('svg.dash');

    const sliderCursor = svg.querySelector('.slider-cursor');
    sliderCursor.style.transform = `translateX(calc(${percentage} - 6px))`;

    const sliderTracker = svg.querySelector('.slider-tracker');
    sliderTracker.setAttribute('x2', percentage);
  }
}
customElements.define('dashed-slider', DashedSlider);
