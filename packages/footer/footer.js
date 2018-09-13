import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedFooter extends LitElement {
  static get is() {
    return 'dashed-footer';
  }

  constructor() {
    super();
    this.dashProps = { dashWidth: 2, dashLength: 20, dashRatio: 0.1 };
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.drawDash();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this.drawDash.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.drawDash.bind(this));
  }

  render() {
    return html`
      ${dashedStyles}
      <style>
        :host {
          --dashed-footer-min-width: 256px;
          --dashed-footer-max-width: 512px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: var(--dashed-footer-min-width);
          max-width: var(--dashed-footer-max-width);
        }


        .footer {
          display: inline-block;
          position: relative;
          width: 100%;
          height: 100%;
          padding: 10px;
        }

        .footer__title {
        }

        .footer__content {
        }

        .footer__footer {
          display: flex;
          justify-content: flex-end;
        }

        .footer__footer__button {
          display: inline-block;
          cursor: pointer;
        }
      </style>
      <div class="footer">
        <h4 class="footer__title">Footer title</h3>
        <h5 class="footer__subtitle">Footer subtitle</h5>
        <div class="footer__content">
          This is the footer content. This is a text divlacehoder.
          <p>It can grow at will</p>
        </div>
        <div class="footer__footer">
          <small>Here the footer footer</small>
          <button class="footer__footer__button">button1</button>
          <button class="footer__footer__button">button2</button>
        </div>
        <svg class="dash" filter="url(#shadow2)">
          <rect class="border" />
          <filter id="shadow2">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3" />
          </filter>
        </svg>
      </div>
    `;
  }

  drawDash() {
    // console.log('Method not implemented.');
  }
}
customElements.define(DashedFooter.is, DashedFooter);
