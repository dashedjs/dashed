import { drawDashedRect } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedNotification extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.dashProps = { dashWidth: 2, dashLength: 10, dashRatio: 0.1 };
  }

  connectedCallback() {
    this.render();
    this.drawDash();
    window.addEventListener('resize', this.drawDash.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.drawDash.bind(this));
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      ${dashedStyles}
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
customElements.define('dashed-notification', DashedNotification);
