import { borderImage } from './border-image.js';
import { sharedStyles } from './shared-styles.js';

export { borderImage, sharedStyles };
export class DashedBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
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
    const colorAttrList = ['primary', 'secondary', 'success', 'danger', 'warn'];
    const colorAttr = this.getAttribute('dash-color') ? this.getAttribute('dash-color') : 'primary';
    if (colorAttrList.includes(colorAttr)) {
      // hack since CSS variables are not supported inside the border-image url()
      const colorValueRegex = new RegExp(`--color-${colorAttr}\: (\#*\\w+);`);
      const colorValue = sharedStyles.match(colorValueRegex)[1];
      return colorValue;

      // return `var(--color-${colorAttr})`;
    }
    return colorAttr;
  }
  set dashColor(value) {
    this.setAttribute('dash-color', value);
  }
}
customElements.define('dashed-base', DashedBase);
