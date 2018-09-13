import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { drawDashedRect } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedCheckbox extends LitElement {
  static get is() {
    return 'dashed-checkbox';
  }

  static get properties() {
    return {
      disabled: Boolean,
      checked: String,
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

        .checkbox-container {
          display: inline-block;
          position: relative;
          width: 24px;
          height: 24px;
        }

        input[type="checkbox"] {
          margin: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        svg.dash .checkmark {
          stroke: var(--dashed-danger-color);
        }

        input[type="checkbox"]:not(:checked) ~ svg.dash .checkmark {
          opacity: 0;
        }

        input[type="checkbox"]:checked ~ svg.dash .checkmark {
          opacity: 1;
        }
      </style>
      <div class="checkbox-container">
        <input type="checkbox" id="checkbox" />
        <svg class="dash">
          <rect class="border" />
          <path class="checkmark" />
        </svg>
      </div>
      <label for="checkbox"><slot></slot></label>
    `;
  }

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const border = svg.querySelector('.border');
    const [width, height] = [24, 24];
    const borderRadius = 0;

    const hostProps = { width, height, borderRadius };
    drawDashedRect(border, hostProps, this.dashProps);

    const checkmark = svg.querySelector('.checkmark');
    checkmark.setAttribute('stroke-width', `${this.dashProps.dashWidth * 1.8}`);
    checkmark.setAttribute('d', 'M6 12l4 4l8 -8');
  }
}
customElements.define(DashedCheckbox.is, DashedCheckbox);
