import { borderImage } from './border-image.js';
import { sharedStyles } from './shared-styles.js';

const html = String.raw; // Used only for code highligthing in VS Code with the lit-html extension

export { borderImage, sharedStyles, html };

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
    return dashColor.replace('#', '%23') || 'primary';
  }
  set dashColor(value) {
    this.setAttribute('dash-color', value);
  }
}
customElements.define('dashed-base', DashedBase);
