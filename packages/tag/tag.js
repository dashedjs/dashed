import { DashedBase, borderImage, sharedStyles, html } from '@dashedjs/dashed-base/base.js';

export class DashedTag extends DashedBase {
  constructor() {
    super();
    this.borderRadius = 16;
    this.dashWidth = 2;
    this.dashLength = 8;
    this.dashSpacing = 4;

    this._active = false;
  }

  static get properties() {
    return {
      ...super.properties,
      disabled: Boolean
    };
  }

  render() {
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

          border: ${this.dashWidth}px solid;
          border-image: ${
            borderImage(this.dashWidth, this.dashLength, this.dashSpacing, this.dashColor, this.borderRadius)
          };
        }

        button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: ${this.borderRadius}px;
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
      <button type="button" @click="${e => this._toggleTag(e)}" class="${this._active ? 'active' : ''}">
        <slot></slot> <slot name="icon"></slot>
      </button>
    `;
  }

  _toggleTag(e) {
    this._active = !this._active;
    this.requestUpdate();
  }
}
customElements.define('dashed-tag', DashedTag);
