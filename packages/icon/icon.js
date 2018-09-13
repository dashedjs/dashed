import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { until } from 'lit-html/directives/until';

export class DashedIcon extends LitElement {
  static get is() {
    return 'dashed-icon';
  }

  static get properties() {
    return {
      name: String,
      src: String,
      size: Number,
      ariaLabel: String,
      ariaLabelledBy: String
    };
  }

  constructor() {
    super();
    this.name = '';
    this.src = '';
    this.size = 24;
    this.ariaLabel = '';
    this.ariaLabelledBy = '';
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    const observer = new MutationObserver(mutations => {
      if (mutations[0].type === 'childList') this.dispatchEvent(new CustomEvent('iconloaded'));
    });
    try {
      observer.observe(this.renderRoot, { childList: true }); // Chrome
    } catch (e) {
      observer.observe(this, { childList: true }); // Firefox & Edge
    }
  }

  render() {
    return html`
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;
          width: 24px;
          height: 24px;
        }

        :host-context(dashed-button),
        :host-context(dashed-button) svg {
          width: 16px;
          height: 16px;
        }

        :host-context(dashed-tag),
        :host-context(dashed-tag) svg {
          width: 12px;
          height: 12px;
        }

        :host-context(dashed-fab),
        :host-context(dashed-fab) svg {
          width: 18px;
          height: 18px;
        }
        
        span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
      </style>
      ${until(this.fetchIcon(this.name, this.src), '')}
    `;
  }

  fetchIcon(name, src) {
    const iconUrl = name ? `/node_modules/@dashedjs/dashed-icons/${name}.svg` : src;
    return fetch(iconUrl)
      .then(res => res.text())
      .then(icon => html`<span .innerHTML="${icon}"></span>`)
      .catch(e => console.error(e));
  }
}
customElements.define(DashedIcon.is, DashedIcon);
