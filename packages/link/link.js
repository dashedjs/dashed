import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { drawDashedLine } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedLink extends LitElement {
  static get is() {
    return 'dashed-link';
  }

  static get properties() {
    return {
      disabled: Boolean,
      role: String,
      dashProps: Object
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.role = '';
    this.dashProps = { dashWidth: 4, dashLength: 8, dashRatio: 0.2 };
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
  }

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const borderBottom = svg.querySelector('.border-bottom');
    const { width, height } = this.getBoundingClientRect();

    const hostProps = { width, height };
    drawDashedLine(borderBottom, hostProps, this.dashProps);

    const background = svg.querySelector('.background');
    background.setAttribute('width', `${width}`);
    background.setAttribute('height', `${height - this.dashProps.dashWidth / 2}`);
  }
}
customElements.define(DashedLink.is, DashedLink);
