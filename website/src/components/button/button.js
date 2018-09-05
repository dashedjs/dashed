import { LitElement, html, svg } from '@polymer/lit-element/lit-element.js';
import { commonStyles } from '../styles/styles.js';
import { drawDashedRect } from '../utils/rect-dasharray.js';
export class DashedButton extends LitElement {
  static get is() {
    return 'dashed-button';
  }

  static get properties() {
    return {
      disabled: Boolean,
      role: String,
      rounded: Boolean,

      dashWidth: Number,
      dashLength: Number,
      dashRatio: Number
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.role = '';
    this.rounded = false;

    this.dashWidth = 2;
    this.dashLength = 8;
    this.dashRatio = 0.3;
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated() {
    super.firstUpdated();
    this._icon = this.renderRoot
      .querySelector('slot[name="icon"]')
      .assignedNodes()[0];
    if (this._icon && this._icon.constructor.name === 'DashedIcon') {
      this._icon.addEventListener('iconloaded', this.drawDash.bind(this));
    } else {
      this.drawDash();
    }
  }

  disconnectedCallback() {
    if (this._icon) {
      this._icon.removeEventListener('iconloaded', this.drawDash.bind(this));
    }
  }

  render() {
    console.log('render');
    return html`
      ${commonStyles}
      <style>
        :host {
          display: inline-block;
          cursor: pointer;
          outline: none;
          position: relative;
          min-width: 48px;
          --host-width: 100%;
          --host-height: 100%;
        }

        :host(:hover) button {
          color: var(--dashed-secondary-color);
        }

        button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          cursor: inherit;
          border: none;
          outline: none;
          padding: 8px 12px;
          font-size: 16px;
          position: relative;
          transition: 50ms ease-in-out;
        }
        
        dashed-icon ::slotted(dashed-icon) {
          width: 12px;
          height: 12px;
        }
      </style>
      <button type="button">
        <slot name="icon"></slot>
        <slot></slot>
        <svg class="dash">
          <rect class="border" stroke-width="2" />
        </svg>
      </button>
    `;
  }

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const border = svg.querySelector('.border');
    const { width, height } = this.getBoundingClientRect();
    const borderRadius = this.rounded ? (height - this.dashWidth) / 2 : 0;

    const hostProps = { width, height, borderRadius };
    const dashProps = {
      dashWidth: this.dashWidth,
      dashLength: this.dashLength,
      dashRatio: this.dashRatio
    };
    drawDashedRect(border, hostProps, dashProps);
  }
}
customElements.define(DashedButton.is, DashedButton);
