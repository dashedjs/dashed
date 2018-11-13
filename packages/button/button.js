import { DashedBase, borderImage, sharedStyles, html } from '@dashedjs/dashed-base/base.js';

export class DashedButton extends DashedBase {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['rounded', 'border-radius', 'dash-width', 'dash-length', 'dash-spacing', 'dash-color'];
  }

  get rounded() {
    return this.hasAttribute('rounded');
  }
  set rounded(value) {
    Boolean(value) ? this.setAttribute('rounded', '') : this.removeAttribute('rounded');
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
            --padding: 4px 12px;
            --color: inherit;
            display: inline-block;
            cursor: pointer;
            outline: none;
            position: relative;
          }

          :host(:hover) {
            --color-fill: var(--color-primary-light);
          }

          button {
            padding: var(--padding);
            color: var(--color);
            min-width: 48px;
            min-height: 32px;
            width: 100%;
            height: 100%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: none;
            cursor: inherit;
            outline: none;
            font-size: inherit;
            position: relative;
            transition: color 50ms ease-in-out;

            border: ${dashWidth}px solid;
            border-image: ${borderImage(dashWidth, dashLength, dashSpacing, dashColor, borderRadius)};
          }

          button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: ${dashWidth}px;
            border-radius: ${borderRadius}px;
            // background: var(--color-primary-light);
          }

          :host ::slotted([slot='icon']) {
            stroke: currentColor;
            padding-right: 4px;
          }
        </style>
        <button type="button"><slot name="icon"></slot> <slot></slot></button>
      `;
    };

    const { borderRadius = 0, dashWidth = 2, dashLength = 8, dashSpacing = 2.4, dashColor } = this.dashProps;
    return templateFactory({ borderRadius, dashWidth, dashLength, dashSpacing, dashColor });
  }
}
customElements.define('dashed-button', DashedButton);
