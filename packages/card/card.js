import { borderImage } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.borderRadius = '16';
    this.dashWidth = '2';
    this.dashLength = '20';
    this.dashSpacing = '2';
  }

  get borderRadius() {
    return this.getAttribute('border-radius');
  }
  set borderRadius(value) {
    this.setAttribute('border-radius', value);
  }

  get dashWidth() {
    return this.getAttribute('dash-width');
  }
  set dashWidth(value) {
    this.setAttribute('dash-width', value);
  }

  get dashLength() {
    return this.getAttribute('dash-length');
  }
  set dashLength(value) {
    this.setAttribute('dash-length', value);
  }

  get dashSpacing() {
    return this.getAttribute('dash-spacing');
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

        .card {
          display: inline-block;
          position: relative;
          min-width: 256px;
          padding: 10px;

          border: ${this.dashWidth}px solid;
          border-image: ${borderImage(this.dashWidth, this.dashLength, this.dashSpacing, this.borderRadius)};
        }

        .card::before {
          z-index: -1;
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: ${this.borderRadius}px;
          background: var(--dashed-primary-light-color);
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
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('dashed-card', DashedCard);
