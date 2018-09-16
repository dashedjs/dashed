import { drawDashedLine } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedSlider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.min = 0;
    this.max = 100;
    this.value = 0;
    this.step = 1;
    this.dashProps = { dashWidth: 2, dashLength: 2, dashRatio: 0.5 };
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    Boolean(value) ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
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
    return this.hasAttribute('step');
  }
  set step(value) {
    this.setAttribute('step', value);
  }

  get dashProps() {
    return this._dashProps;
  }
  set dashProps(value) {
    this._dashProps = value;
  }

  connectedCallback() {
    this.render();
    this.drawDash();
    this._nativeInput = this.shadowRoot.querySelector('input');
    this._nativeInput.addEventListener('input', this._onInputHandler.bind(this));
  }

  disconnectedCallback() {
    this._nativeInput.removeEventListener('input', this._onInputHandler.bind(this));
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      ${dashedStyles}
      <style>
        :host {
          --dashed-slider-width: 192px;
          --dashed-slider-height: 24px;
          --dashed-slider-cursor-radius: 6px;
          --dashed-dash-width: 2px;

          display: inline-flex;
          align-items: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: var(--dashed-slider-width);
        }

        :host(:focus) svg.dash .slider-cursor-focus-ring {
          opacity: 1;
        }

        .slider-container {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          position: relative;
          width: var(--dashed-slider-width);
          height: var(--dashed-slider-height);
        }

        input[type="range"] {
          margin: 0;
          width: calc(100% - var(--dashed-slider-cursor-radius));
          cursor: pointer;
          opacity: 0;
        }
  
        svg.dash .slider-background {
          stroke: var(--dashed-primary-color);
        }
  
        svg.dash .slider-tracker {
          stroke: var(--dashed-danger-color);
          opacity: 0.8;
        }

        svg.dash .slider-cursor {
          will-change: transform;
        }

        svg.dash .slider-cursor-inner {
          fill: var(--dashed-danger-color);
        }

        svg.dash .slider-cursor-focus-ring {
          fill: rgba(255, 0, 0, 0.5);
          opacity: 0;
        }
      </style>
      <label for="range"><slot></slot></label>
      <div class="slider-container">
        <input type="range" id="range" min="${this.min}" max="${this.max}"
          step="${this.step}" value="${this.value}" />
        <svg class="dash">
          <line class="slider-background" />
          <line class="slider-tracker" />
          <g class="slider-cursor">
            <circle class="slider-cursor-focus-ring" />
            <circle class="slider-cursor-inner" />
          </g>
        </svg>
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  _onInputHandler(e) {
    this.value = parseFloat(e.target.value);
    const sliderBackgroundwidth = 192 - 2 * 6;
    const percentage = (this.value - this.min) / (this.max - this.min);
    const svg = this.shadowRoot.querySelector('svg.dash');

    const sliderCursor = svg.querySelector('.slider-cursor');
    sliderCursor.style.transform = `translateX(${percentage * sliderBackgroundwidth}px)`;

    const sliderTracker = svg.querySelector('.slider-tracker');
    sliderTracker.setAttribute('x2', percentage * sliderBackgroundwidth);
  }

  drawDash() {
    const svg = this.shadowRoot.querySelector('svg.dash');
    const { width, height } = this.shadowRoot.querySelector('.slider-container').getBoundingClientRect();

    const sliderCursor = svg.querySelector('.slider-cursor');
    const sliderCursorInner = sliderCursor.querySelector('.slider-cursor-inner');
    const sliderCursorInnerRadius = 6;
    sliderCursorInner.setAttribute('stroke-width', `${this.dashProps.dashWidth}`);
    sliderCursorInner.setAttribute('cx', `${sliderCursorInnerRadius}`);
    sliderCursorInner.setAttribute('cy', `${height / 2}`);
    sliderCursorInner.setAttribute('r', `${sliderCursorInnerRadius}`);
    const sliderCursorFocusRing = sliderCursor.querySelector('.slider-cursor-focus-ring');
    sliderCursorFocusRing.setAttribute('stroke-width', `${this.dashProps.dashWidth}`);
    sliderCursorFocusRing.setAttribute('cx', `${sliderCursorInnerRadius}`);
    sliderCursorFocusRing.setAttribute('cy', `${height / 2}`);
    sliderCursorFocusRing.setAttribute('r', `${sliderCursorInnerRadius * 1.5}`);

    const sliderBackground = svg.querySelector('.slider-background');
    const sliderBackgroundwidth = width - 2 * sliderCursorInnerRadius;
    const hostProps = { width: sliderBackgroundwidth, height };
    let dashProps = { ...this.dashProps };
    drawDashedLine(sliderBackground, hostProps, dashProps);
    sliderBackground.setAttribute('transform', `translate(${sliderCursorInnerRadius} ${-height / 2})`);

    const sliderTracker = svg.querySelector('.slider-tracker');
    drawDashedLine(sliderTracker, hostProps, dashProps);
    sliderTracker.setAttribute('transform', `translate(${sliderCursorInnerRadius} ${-height / 2})`);

    const percentage = (this.value - this.min) / (this.max - this.min);
    sliderCursor.style.transform = `translateX(${percentage * sliderBackgroundwidth}px)`;
    sliderTracker.setAttribute('x2', `${percentage * sliderBackgroundwidth}`);
  }
}
customElements.define('dashed-slider', DashedSlider);
