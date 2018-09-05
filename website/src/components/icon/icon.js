import { LitElement, html, svg } from '@polymer/lit-element/lit-element.js';
import { until } from '../../../node_modules/lit-html/directives/until.js';
import { commonStyles } from '../styles/styles.js';

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

  firstUpdated() {
    super.firstUpdated();
    const observer = new MutationObserver(mutations => {
      if (mutations[0].type === 'childList')
        this.dispatchEvent(new CustomEvent('iconloaded'));
    });
    observer.observe(this.renderRoot, { childList: true });
  }

  render() {
    return html`
      <style>
        :host {
          display: inline-block;
          cursor: pointer;
          outline: none;
        }
        
        span {
          display: inline-block;
        }
      </style>
      ${until(this.fetchIcon(this.name, this.src), '')}
    `;
  }

  fetchIcon(name, src) {
    const iconUrl = name ? `/src/components/icons/${name}.svg` : src;
    return fetch(iconUrl)
      .then(res => res.text())
      .then(icon => html`<span .innerHTML="${icon}"></span>`)
      .catch(e => console.error(e));
  }
}
customElements.define(DashedIcon.is, DashedIcon);
