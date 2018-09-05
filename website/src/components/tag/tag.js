import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { commonStyles } from '../styles/styles';
import { drawDashedRect } from '../utils/rect-dasharray';

export class DashedTag extends LitElement {
  static get is() {
    return 'dashed-tag';
  }

  static get properties() {
    return {
      disabled: Boolean,

      dashWidth: Number,
      dashLength: Number,
      dashRatio: Number
    };
  }

  constructor() {
    super();
    this.disabled = false;

    this.dashWidth = 1;
    this.dashLength = 6;
    this.dashRatio = 0.2;
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
          display: inline-block;
          cursor: pointer;
          outline: none;
          min-width: 48px;
        }

        button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          cursor: inherit;
          border: none;
          outline: none;
          padding: 4px 12px;
          font-size: 12px;
          position: relative;
          transition: 50ms ease-in-out;
        }

        button.active {
          color: var(--dashed-secondary-color);
        }
      </style>
      <button type="button" @click="${e => this._toggleTag(e)}">
        <slot></slot>
        <svg class="dash">
          <rect class="border" />
        </svg>
      </button>
    `;
  }

  _toggleTag(e) {
    const button = this.renderRoot.querySelector('svg.dash');
    if (!button.classList.contains('active')) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  }

  drawDash() {
    // const { width, height } = this.getBoundingClientRect();
    // const { dashWidth } = this._validateDashProps(width, height);

    // const svg = this.renderRoot.querySelector('svg.dash');
    // svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // const border = svg.querySelector('.border');
    // const borderRadius = (height - dashWidth) / 2;
    // border.setAttribute('stroke-width', dashWidth);
    // border.setAttribute('x', dashWidth / 2);
    // border.setAttribute('y', dashWidth / 2);
    // border.setAttribute('width', width - dashWidth);
    // border.setAttribute('height', height - dashWidth);
    // border.setAttribute('rx', borderRadius);
    // border.setAttribute('ry', borderRadius);

    // const { strokeDasharray, strokeDashOffset } = this._computeRectStrokeDashParams(width, height, borderRadius);
    // border.setAttribute('stroke-dasharray', strokeDasharray);
    // border.setAttribute('stroke-dashoffset', strokeDashOffset);

    const svg = this.renderRoot.querySelector('svg.dash');
    const border = svg.querySelector('.border');
    const { width, height } = this.getBoundingClientRect();
    const borderRadius = (height - this.dashWidth) / 2;

    const hostProps = { width, height, borderRadius };
    const dashProps = {
      dashWidth: this.dashWidth,
      dashLength: this.dashLength,
      dashRatio: this.dashRatio
    };
    drawDashedRect(border, hostProps, dashProps);
  }
}
customElements.define(DashedTag.is, DashedTag);
