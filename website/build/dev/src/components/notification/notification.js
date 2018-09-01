import { LitElement, html } from "../../../node_modules/@polymer/lit-element/lit-element.js";
import { dashedColors } from '../styles/styles.js';
import { drawDashedRect } from '../utils/rect-dasharray.js';
export class DashedNotification extends LitElement {
  static get is() {
    return 'dashed-notification';
  }

  static get properties() {
    return {
      dashWidth: Number,
      dashLength: Number,
      dashRatio: Number
    };
  }

  constructor() {
    super();
    this.dashWidth = 2;
    this.dashLength = 10;
    this.dashRatio = 0.1;
  }

  _createRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: true
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.drawDash();
    window.addEventListener('resize', this.drawDash.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.drawDash.bind(this));
  }

  _render({
    disabled,
    dashWidth,
    dashLength,
    dashRatio
  }) {
    return html`
      <style>
        :host {
          --dashed-notification-min-width: 256px;
          --dashed-notification-max-width: 512px;
          --dashed-notification-min-height: 48px;
          --dashed-notification-padding: 8px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-height: var(--dashed-notification-min-height);
          min-width: var(--dashed-notification-min-width);
          max-width: var(--dashed-notification-max-width);
          ${dashedColors}
        }

        :host(:focus) .dash {
          outline: 1px solid var(--dashed-outline-color);
          outline-offset: 1px;
        }

        :host([disabled]) {
          opacity: 0.6;
          pointer-events: none;
        }

        .notification {
          display: grid;
          grid-template-columns: 32px auto 32px;
          justify-items: center;
          align-items: center;
          position: relative;
          width: 100%;
          height: 100%;
          padding: var(--dashed-notification-padding);
        }

        .notification__icon {
          /* display: inline-block; */
        }

        .notification__message {
        }

        .notification__button {
          display: inline-block;
          cursor: pointer;
          background: none;
          border: none;
          width: 32px;
          height: 32px;
          margin: 0;
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
      <div class="notification">
        <span class="notification__icon">ico</span>
        <div class="notification__message">Here is an example of notification.</div>
        <button class="notification__button">x</button>
        <svg class="dash">
          <rect class="border" />
        </svg>
      </div>
    `;
  }

  get nativeElement() {
    return this._root.querySelector('notification');
  }

  get svg() {
    return this._root.querySelector('svg.dash');
  }

  drawDash() {
    const svg = this.svg;
    const border = svg.querySelector('.border');
    const {
      width,
      height
    } = this.getBoundingClientRect();
    const borderRadius = this.rounded ? (height - dashWidth) / 2 : 0;
    const hostProps = {
      width,
      height,
      borderRadius
    };
    const dashProps = {
      dashWidth: this.dashWidth,
      dashLength: this.dashLength,
      dashRatio: this.dashRatio
    };
    drawDashedRect(border, hostProps, dashProps);
  }

}
customElements.define(DashedNotification.is, DashedNotification);