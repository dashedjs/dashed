import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { commonStyles } from '../styles/styles.js';
import { drawDashedCircle } from '../utils/circle-dasharray.js';

export class DashedRadio extends LitElement {
  static get is() {
    return 'dashed-radio';
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
    this.dashLength = 4;
    this.dashRatio = 0.5;
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated() {
    super.firstUpdated();
    this.drawDash();
  }

  render() {
    return html`
      ${commonStyles}
      <style>
        :host {
          --dashed-radio-dimension: 24px;
          --dashed-dash-width: 2px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: 48px;
        }

        .radio-container {
          display: inline-block;
          position: relative;
          width: var(--dashed-radio-dimension);
          height: var(--dashed-radio-dimension);
        }

        input[type="radio"] {
          margin: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
  
        svg.dash .outer-circle {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
          fill: var(--dashed-fill-color);
        }
  
        svg.dash .inner-circle {
          fill: var(--dashed-secondary-color);
          transition: all 100ms ease-in-out;
        }

        input[type="radio"]:not(:checked) ~ svg.dash .inner-circle {
          opacity: 0;
        }

        input[type="radio"]:checked ~ svg.dash .inner-circle {
          opacity: 1;
        }
      </style>
      <div class="radio-container">
        <input type="radio" id="radio" />
        <svg class="dash">
          <circle class="outer-circle" />
          <circle class="inner-circle" />
        </svg>
      </div>
      <label for="radio"><slot></slot></label>
    `;
  }

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const [width, height] = [24, 24];

    const outerCircle = svg.querySelector('.outer-circle');
    const hostProps = { width, height };
    const dashProps = {
      dashWidth: this.dashWidth,
      dashLength: this.dashLength,
      dashRatio: this.dashRatio
    };
    drawDashedCircle(outerCircle, hostProps, dashProps);

    const innerCircle = svg.querySelector('.inner-circle');
    innerCircle.setAttribute('cx', width / 2);
    innerCircle.setAttribute('cy', height / 2);
    innerCircle.setAttribute('r', 5);
  }
}
customElements.define(DashedRadio.is, DashedRadio);
