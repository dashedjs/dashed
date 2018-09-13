import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { drawDashedCircle } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedRadio extends LitElement {
  static get is() {
    return 'dashed-radio';
  }

  static get properties() {
    return {
      disabled: Boolean,
      checked: Boolean,
      dashProps: Object
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.checked = false;
    this.dashProps = { dashWidth: 2, dashLength: 4, dashRatio: 0.5 };
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.drawDash();
  }

  render() {
    return html`
      ${dashedStyles}
      <style>
        :host {
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
          width: 24px;
          height: 24px;
        }

        input[type="radio"] {
          margin: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
  
        svg.dash .outer-circle {
          stroke: var(--dashed-primary-color);
          fill: var(--dashed-fill-color);
        }
  
        svg.dash .inner-circle {
          fill: var(--dashed-danger-color);
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
    drawDashedCircle(outerCircle, hostProps, this.dashProps);

    const innerCircle = svg.querySelector('.inner-circle');
    innerCircle.setAttribute('cx', `${width / 2}`);
    innerCircle.setAttribute('cy', `${height / 2}`);
    innerCircle.setAttribute('r', '5');
  }
}
customElements.define(DashedRadio.is, DashedRadio);
