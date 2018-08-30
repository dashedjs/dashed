import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { dashedColors } from '../styles/styles';
import { drawDashedRect } from '../utils/rect-stroke-dasharray.js';

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

  _createRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  connectedCallback() {
    super.connectedCallback();
    this.drawDash();
  }

  _render({ disabled, checked, name, dashWidth, dashLength, dashRatio }) {
    return html`
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;
          min-width: 48px;
          ${dashedColors}
        }

        :host(:focus) svg.dash {
          outline: 1px solid var(--dashed-outline-color);
          outline-offset: 1px;
        }

        :host(:disabled) {
          opacity: 0.6;
          pointer-events: none;
        }

        button {
          display: inline-block;
          background: none;
          cursor: inherit;
          border: none;
          outline: none;
          padding: 4px 8px;
          font-size: 12px;
          position: relative;
          transition: 50ms ease-in-out;
        }

        button.active {
          color: var(--dashed-secondary-color);
        }

        svg.dash {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          fill: none;
          z-index: -1;
        }
  
        svg.dash .border {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
          fill: var(--dashed-fill-color);
        }
      </style>
      <button type="button" on-click="${e => this._toggleTag(e)}">
        <slot></slot>
        <svg class="dash">
          <rect class="border" />
        </svg>
      </button>
    `;
  }

  get nativeElement() {
    return this._root.querySelector('button');
  }

  get svg() {
    return this._root.querySelector('svg.dash');
  }

  _toggleTag(e) {
    const button = this.nativeElement;
    if (!button.classList.contains('active')) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  }

  drawDash() {
    // const { width, height } = this.getBoundingClientRect();
    // const { dashWidth } = this._validateDashProps(width, height);

    // const svg = this.svg;
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

    const svg = this.svg;
    const border = svg.querySelector('.border');
    const { width, height } = this.getBoundingClientRect();
    const borderRadius = (height - this.dashWidth) / 2;

    const hostProps = { width, height, borderRadius };
    const dashProps = { dashWidth: this.dashWidth, dashLength: this.dashLength, dashRatio: this.dashRatio };
    drawDashedRect(border, hostProps, dashProps);
  }
}
customElements.define(DashedTag.is, DashedTag);
