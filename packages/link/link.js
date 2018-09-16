import { drawDashedLine } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedLink extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.dashProps = { dashWidth: 4, dashLength: 8, dashRatio: 0.2 };
  }

  static get properties() {
    return {
      disabled: Boolean,
      role: String,
      dashProps: Object
    };
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    Boolean(value) ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  get role() {
    return this.getAttribute('role');
  }
  set role(value) {
    this.setAttribute('role', '');
  }

  get dashProps() {
    return this._dashProps;
  }
  set dashProps(value) {
    this._dashProps = value;
  }

  connectedCallback() {
    this.render();
    this.drawDash();
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      ${dashedStyles}
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;
          position: relative;
        }

        :host(:hover) link {
          color: var(--dashed-danger-color);
        }

        a {
          display: inline-block;
          cursor: inherit;
          text-align: center;
          text-decoration: none;
          outline: none;
          padding-bottom: 4px;
          font-size: 16px;
          position: relative;
          transition: color 50ms ease-in-out;
          width: 100%;
        }
      </style>
      <a href="#" @click="${e => console.log(e)}">
        <slot></slot>
        <svg class="dash">
          <rect class="background" />
          <line class="border-bottom" />
        </svg>
      </a>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  drawDash() {
    const svg = this.shadowRoot.querySelector('svg.dash');
    const borderBottom = svg.querySelector('.border-bottom');
    const { width, height } = this.getBoundingClientRect();

    const hostProps = { width, height };
    drawDashedLine(borderBottom, hostProps, this.dashProps);

    const background = svg.querySelector('.background');
    background.setAttribute('width', `${width}`);
    background.setAttribute('height', `${height - this.dashProps.dashWidth / 2}`);
  }
}
customElements.define('dashed-link', DashedLink);
