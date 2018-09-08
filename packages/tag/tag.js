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
    return html`
      ${commonStyles}
      <style>
        :host {
          display: inline-block;
          cursor: pointer;
          outline: none;
          position: relative;
        }

        button {
          min-width: 32px;
          min-height: 24px;
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
          transition: color 50ms ease-in-out;
        }

        button.active {
          color: var(--dashed-secondary-color);
        }

        :host ::slotted(dashed-icon[slot="icon"]),
        :host ::slotted(svg) {
          padding-left: 4px;
        }
      </style>
      <button type="button" @click="${e => this._toggleTag(e)}">
        <slot></slot>
        <slot name="icon"></slot>
        <svg class="dash">
          <rect class="border" />
        </svg>
      </button>
    `;
  }

  _toggleTag(e) {
    const button = this.renderRoot.querySelector('button');
    button.classList.toggle('active');
  }

  drawDash() {
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
