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
      borderRadius: Number,
      dashWidth: Number,
      dashLength: Number,
      dashSpacing: Number,
      dashColor: String
    };
  }

  // get dashColor() {
  //   const dashColor = this.getAttribute('dash-color') || '';
  //   if ([...this.customProperties.keys()].includes(dashColor)) {
  //     // Hack to get the color since CSS variables are not supported inside the border-image url().
  //     // One can also get it from this.shadowRoot.styleSheets[0].rules[0].style.getPropertyValue(`--color-${dashColor}`)
  //     // But the latter method requires a first render
  //     const colorValue = this.customProperties.get(`${dashColor}`);
  //     return colorValue.replace('#', '%23'); // Using unescaped '#' characters in a data URI body is deprecated
  //   }
  //   return (dashColor || this.customProperties.get('primary')).replace('#', '%23');
  // }

  render() {
    return html`
      <div>Provide your own template() implement in ${this.constructor.name}</div>
    `;
  }
}
customElements.define('dashed-base', DashedBase);
