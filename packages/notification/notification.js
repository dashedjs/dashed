import { DashedBase, borderImage, sharedStyles, html } from '@dashedjs/dashed-base';

export class DashedNotification extends DashedBase {
  constructor() {
    super();
    this.borderRadius = 0;
    this.dashWidth = 1;
    this.dashLength = 10;
    this.dashSpacing = 4;
  }

  renderStyle() {
    return sharedStyles;
  }

  render() {
    return html`
      ${this.renderStyle()}
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
          border-image: ${
            borderImage(this.dashWidth, this.dashLength, this.dashSpacing, this.dashColor, this.borderRadius)
          };
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
  }
}
customElements.define('dashed-notification', DashedNotification);
