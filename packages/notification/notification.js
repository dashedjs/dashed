import { borderImage } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedNotification extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  get borderRadius() {
    return parseFloat(this.getAttribute('border-radius')) || 0;
  }
  set borderRadius(value) {
    this.setAttribute('border-radius', value);
  }

  get dashWidth() {
    return parseFloat(this.getAttribute('dash-width')) || 1;
  }
  set dashWidth(value) {
    this.setAttribute('dash-width', value);
  }

  get dashLength() {
    return parseFloat(this.getAttribute('dash-length')) || 10;
  }
  set dashLength(value) {
    this.setAttribute('dash-length', value);
  }

  get dashSpacing() {
    return parseFloat(this.getAttribute('dash-spacing')) || 4;
  }
  set dashSpacing(value) {
    this.setAttribute('dash-spacing', value);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      ${dashedStyles}
      <style>
        :host {
          display: inline-block;
          position: relative;
          cursor: inherit;
          outline: none;
        }

        .notification {
          box-sizing: border-box;
          min-height: 48px;
          min-width: 128px;
          max-width: 100%;
          white-space: normal;
          display: grid;
          grid-template-columns: 32px auto 32px;
          justify-items: center;
          align-items: center;
          position: relative;
          padding: 4px;

          border: ${this.dashWidth}px solid;
          border-image: ${borderImage(
            this.dashWidth,
            this.dashLength,
            this.dashSpacing,
            this.dashColor,
            this.borderRadius
          )};
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
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('dashed-notification', DashedNotification);
