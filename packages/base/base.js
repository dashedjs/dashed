import { borderImage } from './border-image.js';
import { sharedStyles } from './shared-styles.js';
import { html, render } from 'lit-html';

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
export class DashedBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.customProperties = new Map([
      ['primary', '#3636e7'],
      ['secondary', '#ce8207'],
      ['success', '#1f8d57'],
      ['danger', '#fa3232'],
      ['warn', '#cd9a1a']
    ]);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    Boolean(value) ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
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

  get dashColor() {
    const dashColor = this.getAttribute('dash-color') || '';
    if ([...this.customProperties.keys()].includes(dashColor)) {
      // Hack to get the color since CSS variables are not supported inside the border-image url().
      // One can also get it from this.shadowRoot.styleSheets[0].rules[0].style.getPropertyValue(`--color-${dashColor}`)
      // But the latter method requires a first render
      const colorValue = this.customProperties.get(`${dashColor}`);
      return colorValue.replace('#', '%23'); // Using unescaped '#' characters in a data URI body is deprecated
    }
    return (dashColor || this.customProperties.get('primary')).replace('#', '%23');
  }
  set dashColor(value) {
    this.setAttribute('dash-color', value);
  }

  get dashProps() {
    return {
      borderRadius: parseFloat(this.borderRadius) || undefined,
      dashWidth: parseFloat(this.dashWidth) || undefined,
      dashLength: parseFloat(this.dashLength) || undefined,
      dashSpacing: parseFloat(this.dashSpacing) || undefined,
      dashColor: this.dashColor
    };
  }

  /**
   * Defines the markup of the element, must be implemented
   *
   * @returns
   * @memberof DashedBase
   */
  template() {
    const templateFactory = (props = {}) => {
      const { name } = props;
      return html`
        <div>Provide your own template() implement in ${name}</div>
      `;
    };

    const name = this.constructor.name;
    return templateFactory({ name });
  }

  /**
   * Protected method, must be called whenever an property update requires a re-render.
   * Final hould not be overriden,
   * Requires the template() method to be implemented
   *
   * @memberof DashedBase
   */
  render() {
    render(this.template(), this.shadowRoot);
  }
}
customElements.define('dashed-base', DashedBase);
