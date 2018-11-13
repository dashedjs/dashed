import { DashedBase, borderImage, sharedStyles, html } from '@dashedjs/dashed-base';

export class DashedLink extends DashedBase {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['border-radius', 'dash-width', 'dash-length', 'dash-spacing', 'dash-color'];
  }

  get role() {
    return this.getAttribute('role');
  }
  set role(value) {
    this.setAttribute('role', '');
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
            display: inline-block;
            cursor: pointer;
            outline: none;
            position: relative;
            font-size: 16px;
          }

          :host(:hover) {
            color: var(--color-primary);
            --color-fill: var(--color-primary-light);
          }

          a {
            display: inline-block;
            cursor: inherit;
            text-align: center;
            text-decoration: none;
            color: inherit;
            outline: none;
            padding-bottom: 2px;
            font-size: inherit;
            position: relative;
            transition: color 50ms ease-in-out;

            border-bottom: ${dashWidth}px solid;
            border-image: ${borderImage(dashWidth, dashLength, dashSpacing, dashColor, borderRadius)};
          }
        </style>
        <a href="#"> <slot></slot> </a>
      `;
    };

    const { borderRadius = 0, dashWidth = 1.5, dashLength = 8, dashSpacing = 2, dashColor } = this.dashProps;
    return templateFactory({ borderRadius, dashWidth, dashLength, dashSpacing, dashColor });
  }
}
customElements.define('dashed-link', DashedLink);
