import { DashedBase, sharedStyles } from '@dashedjs/dashed-base';

export class DashedFooter extends DashedBase {
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
    const template = document.createElement('template');
    template.innerHTML = `
      ${sharedStyles}
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
      </div>
    `;
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild);
    }
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('dashed-footer', DashedFooter);
