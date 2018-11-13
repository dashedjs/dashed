import { DashedBase, borderImage, sharedStyles, html } from '@dashedjs/dashed-base/base.js';

export class DashedTag extends DashedBase {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['border-radius', 'dash-width', 'dash-length', 'dash-spacing', 'dash-color'];
  }

  connectedCallback() {
    this.render();
    this.addListeners();
  }

  attributeChangedCallback(attr, newVal, oldVal) {
    this.render();
  }

  disconnectedCallback() {
    this.removeListeners();
  }

  addListeners() {
    this._nativeButton = this.shadowRoot.querySelector('button');
    this._nativeButton.addEventListener('click', this._toggleTag.bind(this));
  }

  removeListeners() {
    this._nativeButton.remove('click', this._toggleTag.bind(this));
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
            font-size: 12px;
          }

          :host(:hover) {
            color: var(--color-primary);
            --color-fill: var(--color-primary-light);
          }

          button {
            min-width: 32px;
            min-height: 24px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: none;
            cursor: inherit;
            color: inherit;
            outline: none;
            padding: 4px 10px;
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
            width: 100%;
            height: 100%;
            border-radius: ${borderRadius}px;
            background: var(--color-primary-light);
          }

          button.active {
            color: var(--color-danger);
          }

          :host ::slotted(dashed-icon[slot='icon']),
          :host ::slotted(svg) {
            stroke: currentColor;
            padding-left: 4px;
          }
        </style>
        <button type="button"><slot></slot> <slot name="icon"></slot></button>
      `;
    };

    const { borderRadius = 16, dashWidth = 2, dashLength = 8, dashSpacing = 4, dashColor } = this.dashProps;
    return templateFactory({ borderRadius, dashWidth, dashLength, dashSpacing, dashColor });
  }

  _toggleTag(e) {
    this._nativeButton.classList.toggle('active');
  }
}
customElements.define('dashed-tag', DashedTag);
