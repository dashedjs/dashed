import { DashedBase, borderImage, sharedStyles } from '@dashedjs/dashed-base';

export class DashedInput extends DashedBase {
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
    const [borderRadius = 5, dashWidth = 1, dashLength = 6, dashSpacing = 1] = [
      this.borderRadius,
      this.dashWidth,
      this.dashLength,
      this.dashSpacing
    ].map(attr => (attr ? parseFloat(attr) : undefined));
    const dashColor = this.dashColor.replace('#', '%23'); // Using unescaped '#' characters in a data URI body is deprecated

    const template = document.createElement('template');
    template.innerHTML = `
      ${sharedStyles}
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: 96px;
          min-height: 24px;
        }

        .input-container {
          display: inline-block;
          position: relative;

          border: ${dashWidth}px solid;
          border-image: ${borderImage(dashWidth, dashLength, dashSpacing, dashColor, borderRadius)};
        }

        input {
          margin: 5px;
          padding: 5px;
          box-sizing: border-box;
          border: none;
          outline: none;
          height: 100%;
          border-radius: 2px;
          background: var(--color-fill);
        }
      </style>
      <label for="input"><slot></slot></label>
      <div class="input-container">
        <input id="input" />
      </div>
    `;
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild);
    }
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('dashed-input', DashedInput);
