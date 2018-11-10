import { DashedBase, borderImage, sharedStyles } from '@dashedjs/dashed-base';

export class DashedNotification extends DashedBase {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['border-radius', 'dash-width', 'dash-length', 'dash-spacing', 'dash-color'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    this.render();
  }

  render() {
    const [borderRadius = 0, dashWidth = 1, dashLength = 10, dashSpacing = 4] = [
      this.borderRadius,
      this.dashWidth,
      this.dashLength,
      this.dashSpacing
    ].map(attr => (attr ? parseFloat(attr) : undefined));
    const dashColor = this.dashColor

    const template = document.createElement('template');
    template.innerHTML = `
      ${sharedStyles}
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

          border: ${dashWidth}px solid;
          border-image: ${borderImage(dashWidth, dashLength, dashSpacing, dashColor, borderRadius)};
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
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild);
    }
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('dashed-notification', DashedNotification);
