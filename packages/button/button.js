import { drawDashedRect } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.dashProps = { dashWidth: 2, dashLength: 8, dashRatio: 0.3 };
    this._firstRender = true;
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    Boolean(value) ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  get rounded() {
    return this.hasAttribute('rounded');
  }
  set rounded(value) {
    Boolean(value) ? this.setAttribute('rounded', '') : this.removeAttribute('rounded');
  }

  get dashProps() {
    return this._dashProps;
  }
  set dashProps(value) {
    this._dashProps = value;
  }

  connectedCallback() {
    this.render();
    this.updateIcon();
    this._firstRender = false;
  }

  static get observedAttributes() {
    return ['rounded'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._firstRender) {
      this.drawDash();
    }
  }

  updateIcon() {
    this._icon = this.shadowRoot.querySelector('slot[name="icon"]').assignedNodes()[0];
    if (this._icon && this._icon.localName === 'dashed-icon') {
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
    const template = document.createElement('template');
    template.innerHTML = `
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
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  drawDash() {
    const svg = this.shadowRoot.querySelector('svg.dash');
    const border = svg.querySelector('.border');
    const { width, height } = this.getBoundingClientRect();
    const borderRadius = this.rounded ? (height - this.dashProps.dashWidth) / 2 : 0;

    const hostProps = { width, height, borderRadius };
    drawDashedRect(border, hostProps, this.dashProps);
  }
}
customElements.define('dashed-button', DashedButton);
