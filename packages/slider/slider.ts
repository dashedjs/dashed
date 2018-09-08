import { LitElement, html, property } from '@polymer/lit-element/lit-element';
import { Dash, DashProps, HostProps } from '../utils/dash';
import { drawDashedLine } from '../utils/line-dasharray';
import { commonStyles } from '../styles/styles';

export class DashedSlider extends LitElement implements Dash {
  static get is() {
    return 'dashed-slider';
  }

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: Number })
  min: number = 0;

  @property({ type: Number })
  max: number = 100;

  @property({ type: Number })
  value: number = 30;

  @property({ type: Number })
  step: number = 1;

  @property({ type: Object })
  dashProps: DashProps = { dashWidth: 2, dashLength: 2, dashRatio: 0.5 };

  _sliderCursor: any;
  _sliderTracker: any;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.drawDash();
    const svg = this.renderRoot.querySelector('svg.dash');
    this._sliderCursor = svg.querySelector('.slider-cursor');
    this._sliderTracker = svg.querySelector('.slider-tracker');
  }

  render() {
    return html`
      ${commonStyles}
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
          stroke: var(--dashed-secondary-color);
          opacity: 0.8;
        }

        svg.dash .slider-cursor {
          will-change: transform;
        }

        svg.dash .slider-cursor-inner {
          fill: var(--dashed-secondary-color);
        }

        svg.dash .slider-cursor-focus-ring {
          fill: rgba(255, 0, 0, 0.5);
          opacity: 0;
        }
      </style>
      <label for="range"><slot></slot></label>
      <div class="slider-container">
        <input type="range" id="range" min="${this.min}" max="${this.max}"
          step="${this.step}" value="${this.value}"
          @input="${(e: Event) => this._onInputHandler(e)}" />
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
  }

  _onInputHandler(e: Event) {
    this.value = parseFloat((e.target as HTMLInputElement).value);
    const sliderBackgroundwidth = 192 - 2 * 6;
    const percentage = (this.value - this.min) / (this.max - this.min);
    this._sliderCursor.style.transform = `translateX(${percentage * sliderBackgroundwidth}px)`;
    this._sliderTracker.setAttribute('x2', percentage * sliderBackgroundwidth);
  }

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const { width, height } = this.renderRoot.querySelector('.slider-container').getBoundingClientRect();

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

    const sliderBackground: SVGLineElement = svg.querySelector('.slider-background');
    const sliderBackgroundwidth = width - 2 * sliderCursorInnerRadius;
    const hostProps: HostProps = { width: sliderBackgroundwidth, height };
    let dashProps: DashProps = { ...this.dashProps };
    drawDashedLine(sliderBackground, hostProps, dashProps);
    sliderBackground.setAttribute('transform', `translate(${sliderCursorInnerRadius} ${-height / 2})`);

    const sliderTracker: SVGLineElement = svg.querySelector('.slider-tracker');
    drawDashedLine(sliderTracker, hostProps, dashProps);
    sliderTracker.setAttribute('transform', `translate(${sliderCursorInnerRadius} ${-height / 2})`);

    const percentage = (this.value - this.min) / (this.max - this.min);
    (sliderCursor as SVGGElement).style.transform = `translateX(${percentage * sliderBackgroundwidth}px)`;
    sliderTracker.setAttribute('x2', `${percentage * sliderBackgroundwidth}`);
  }
}
customElements.define(DashedSlider.is, DashedSlider);
