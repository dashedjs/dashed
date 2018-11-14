import { borderImage } from './border-image.js';
import { sharedStyles } from './shared-styles.js';
import { html, LitElement } from '@polymer/lit-element';

export { borderImage, sharedStyles, sharedStylesBis, html, render };

/**
 * Abstract class implemented by all dashed elements
 * Should not be directly instancied
 *
 * @export
 * @abstract
 * @class DashedBase
 * @extends {HTMLElement}
 */
export class DashedBase extends LitElement {
  constructor() {
    super();
    this.dashColor = '#3636e7';
  }

  static get properties() {
    return {
      disabled: Boolean,
      borderRadius: Number,
      dashWidth: Number,
      dashLength: Number,
      dashSpacing: Number,
      dashColor: String
    };
  }

  render() {
    return html`
      <div>Provide your own template() implement in ${this.constructor.name}</div>
    `;
  }
}
customElements.define('dashed-base', DashedBase);
