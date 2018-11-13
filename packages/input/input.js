import { DashedBase, borderImage, sharedStyles, html } from '@dashedjs/dashed-base';

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

  attributeChangedCallback(attr, newVal, oldVal) {
    this.render();
  }

  template() {
    const templateFactory = (props = {}) => {
      const { borderRadius, dashWidth, dashLength, dashSpacing, dashColor } = props;
      return html`
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
        <div class="input-container"><input id="input" /></div>
      `;
    };

    const { borderRadius = 5, dashWidth = 1, dashLength = 6, dashSpacing = 1, dashColor } = this.dashProps;
    return templateFactory({ borderRadius, dashWidth, dashLength, dashSpacing, dashColor });
  }
}
customElements.define('dashed-input', DashedInput);
