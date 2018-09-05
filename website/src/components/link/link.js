import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { commonStyles } from '../styles/styles.js';
import { drawDashedLine } from '../utils/line-dasharray.js';

export class DashedLink extends LitElement {
  static get is() {
    return 'dashed-link';
  }

  static get properties() {
    return {
      disabled: Boolean,
      role: String,

      dashWidth: Number,
      dashLength: Number,
      dashRatio: Number
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.role = '';

    this.dashWidth = 4;
    this.dashLength = 8;
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
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;
          position: relative;
        }

        :host(:hover) link {
          color: var(--dashed-secondary-color);
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
          transition: 50ms ease-in-out;
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
    const dashProps = {
      dashWidth: this.dashWidth,
      dashLength: this.dashLength,
      dashRatio: this.dashRatio
    };
    drawDashedLine(borderBottom, hostProps, dashProps);

    const background = svg.querySelector('.background');
    background.setAttribute('width', width);
    background.setAttribute('height', height - this.dashWidth / 2);
  }
}
customElements.define(DashedLink.is, DashedLink);
