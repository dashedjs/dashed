import { DashedBase, borderImage, sharedStyles, html } from '../base/base';

export class DashedCard extends DashedBase {
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

          .card {
            display: inline-block;
            position: relative;
            /* width: 256px; */
            /* max-width: 100%; */
            padding: 10px;

            border: ${dashWidth}px solid;
            border-image: ${borderImage(dashWidth, dashLength, dashSpacing, dashColor, borderRadius)};
          }

          .card::before {
            z-index: -1;
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: ${borderRadius}px;
            background: var(--color-primary-light);
          }

          .card__title {
          }

          .card__content {
          }

          .card__footer {
            display: flex;
            justify-content: flex-end;
          }

          .card__footer__button {
            display: inline-block;
            cursor: pointer;
          }
        </style>
        <div class="card">
          <h4 class="card__title">Card title</h3>
          <h5 class="card__subtitle">Card subtitle</h5>
          <div class="card__content">
            This is the card content. This is a text divlacehoder.
            <p>It can grow at will</p>
          </div>
          <div class="card__footer">
            <small>Here the card footer</small>
            <button class="card__footer__button">button1</button>
            <button class="card__footer__button">button2</button>
          </div>
        </div>
      `;
    };

    const { borderRadius = 16, dashWidth = 2, dashLength = 20, dashSpacing = 2, dashColor } = this.dashProps;
    return templateFactory({ borderRadius, dashWidth, dashLength, dashSpacing, dashColor });
  }
}
customElements.define('dashed-card', DashedCard);
