import { DashedBase, borderImage, sharedStyles, html } from '@dashedjs/dashed-base';

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

  attributeChangedCallback(attr, newVal, oldVal) {
    this.render();
  }

  template() {
    const templateFactory = (props = {}) => {
      const { borderRadius, dashWidth, dashLength, dashSpacing, dashColor } = props;
      return html`
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
    };

    const { borderRadius = 0, dashWidth = 1, dashLength = 10, dashSpacing = 4, dashColor } = this.dashProps;
    return templateFactory({ borderRadius, dashWidth, dashLength, dashSpacing, dashColor });
  }
}
customElements.define('dashed-notification', DashedNotification);
