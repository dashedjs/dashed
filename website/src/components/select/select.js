import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { commonStyles } from '../styles/styles.js';
import { drawDashedLine } from '../utils/line-dasharray.js';

export class DashedSelect extends LitElement {
  static get is() {
    return 'dashed-select';
  }

  static get properties() {
    return {
      disabled: Boolean,
      value: String,

      dashWidth: Number,
      dashLength: Number,
      dashRatio: Number
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.value = '';

    this.dashWidth = 2;
    this.dashLength = 10;
    this.dashRatio = 0.3;
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
          --dashed-select-min-width: 96px;
          --dashed-select-min-height: 24px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: var(--dashed-select-min-width);
          min-height: var(--dashed-select-min-height);
        }

        .select-container {
          display: inline-block;
          position: relative;
          width: 100%;
          height: 100%;
        }

        select {
          border: none;
          outline: none;
          padding-right: 12px;
          margin-bottom: 4px;
          background: transparent;
          cursor: pointer;
          width: 100%;
          height: 100%;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
        }
  
        svg.dash .caret {
          stroke: var(--dashed-primary-color);
        }
      </style>
      <label for="select"><slot></slot></label>
      <div class="select-container">
        <select id="select">
          <option value="1">Option 1</option>
          <option value="3">Option 3</option>
          <option value="2">Option 2</option>
        </select>
        <svg class="dash">
          <rect class="background" />
          <path class="caret" />
          <line class="border-bottom" />
        </svg>
      </div>
    `;
  }

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const borderBottom = svg.querySelector('.border-bottom');
    const { width, height } = this.renderRoot
      .querySelector('.select-container')
      .getBoundingClientRect();

    const hostProps = { width, height };
    const dashProps = {
      dashWidth: this.dashWidth,
      dashLength: this.dashLength,
      dashRatio: this.dashRatio
    };
    drawDashedLine(borderBottom, hostProps, dashProps);

    const caret = svg.querySelector('.caret');
    caret.setAttribute('stroke-width', this.dashWidth * 1.8);
    caret.setAttribute('d', `M${width - 12} ${8}l4 4l4 -4`);

    const background = svg.querySelector('.background');
    background.setAttribute('width', width);
    background.setAttribute('height', height - this.dashWidth / 2);
  }
}
customElements.define(DashedSelect.is, DashedSelect);
