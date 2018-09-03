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

  _createRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  _render({ name, src }) {
    return html`
      <style>
        :host {
          display: inline-block;
          cursor: pointer;
          outline: none;
        }
      </style>
      ${until(this.fetchIcon(name, src), html`<span>...</span>`)}
    `;
  }

  fetchIcon(name, src) {
    const iconUrl = name ? `src/components/icons/${name}.svg` : src;
    return fetch(iconUrl)
      .then(res => res.text())
      .then(icon => {
        console.log(iconUrl, icon);
        return html`<span innerHTML="${icon}"></span>`;
      })
      .catch(e => console.error(e));
  }
}
customElements.define(DashedIcon.is, DashedIcon);
