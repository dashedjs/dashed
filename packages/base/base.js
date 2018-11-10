import { borderImage } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  get disabled() {
    return this.hasAttribute('disabled') || false;
  }
  set disabled(value) {
    Boolean(value) ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  get borderRadius() {
    return parseFloat(this.getAttribute('border-radius')) || 0;
  }
  set borderRadius(value) {
    this.setAttribute('border-radius', value);
  }

  get dashWidth() {
    return parseFloat(this.getAttribute('dash-width')) || 2;
  }
  set dashWidth(value) {
    this.setAttribute('dash-width', value);
  }

  get dashLength() {
    return parseFloat(this.getAttribute('dash-length')) || 8;
  }
  set dashLength(value) {
    this.setAttribute('dash-length', value);
  }

  get dashSpacing() {
    return parseFloat(this.getAttribute('dash-spacing')) || 2.4;
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
      const colorValue = dashedStyles.match(colorValueRegex)[1];
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
