import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { drawDashedRect } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedButton extends LitElement {
  static get is() {
    return 'dashed-button';
  }

  static get properties() {
    return {
      disabled: Boolean,
      role: String,
      rounded: Boolean,
      dashProps: Object
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.role = '';
    this.rounded = false;
    this.dashProps = { dashWidth: 2, dashLength: 8, dashRatio: 0.3 };
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this._icon = this.renderRoot.querySelector('slot[name="icon"]').assignedNodes()[0];
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
    return html`
      ${dashedStyles}
      <style>
        :host {
          display: inline-block;
          cursor: pointer;
          outline: none;
          position: relative;
        }

        :host(:hover) {
          color: var(--dashed-primary-color);
          --dashed-fill-color: var(--dashed-primary-light-color);
        }

        button {
          min-width: 48px;
          min-height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          cursor: inherit;
          color: inherit;
          border: none;
          outline: none;
          padding: 4px 12px;
          font-size: 14px;
          position: relative;
          transition: color 50ms ease-in-out;
        }

        :host ::slotted([slot="icon"]) {
          stroke: currentColor;
          padding-right: 4px;
        }
      </style>
      <button type="button">
        <slot name="icon"></slot>
        <slot></slot>
        <svg class="dash">
          <rect class="border" />
        </svg>
      </button>
    `;
  }

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const border = svg.querySelector('.border');
    const { width, height } = this.getBoundingClientRect();
    const borderRadius = this.rounded ? (height - this.dashProps.dashWidth) / 2 : 0;

    const hostProps = { width, height, borderRadius };
    drawDashedRect(border, hostProps, this.dashProps);
  }
}
customElements.define(DashedButton.is, DashedButton);
