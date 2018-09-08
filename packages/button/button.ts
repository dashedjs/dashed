import { LitElement, html, property, PropertyValues } from '@polymer/lit-element/lit-element';
import { commonStyles } from '../styles/styles';
import { drawDashedRect } from '../utils/rect-dasharray';
import { DashProps, HostProps, Dash } from '../utils/dash';
import { TemplateResult } from 'lit-html';
export class DashedButton extends LitElement implements Dash {
  static get is() {
    return 'dashed-button';
  }

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: Boolean })
  rounded: boolean = false;

  @property({ type: Object })
  dashProps: DashProps = { dashWidth: 2, dashLength: 8, dashRatio: 0.3 };

  _icon: any;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this._icon = (this.renderRoot.querySelector('slot[name="icon"]') as HTMLSlotElement).assignedNodes()[0];
    if (this._icon && this._icon.constructor.name === 'DashedIcon') {
      this._icon.addEventListener('iconloaded', this.drawDash.bind(this));
    } else {
      this.drawDash();
    }
  }

  disconnectedCallback() {
    if (this._icon) {
      this._icon.removeEventListener('iconloaded', this.drawDash.bind(this));
    }
  }

  render(): TemplateResult {
    return html`
      ${commonStyles}
      <style>
        :host {
          display: inline-block;
          cursor: pointer;
          outline: none;
          position: relative;
        }

        :host(:hover) button {
          color: var(--dashed-secondary-color);
        }

        button {
          min-width: 48px;
          min-height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          cursor: inherit;
          border: none;
          outline: none;
          padding: 4px 12px;
          font-size: 14px;
          position: relative;
          transition: color 50ms ease-in-out;
        }

        :host ::slotted(dashed-icon[slot="icon"]),
        :host ::slotted(svg) {
          padding-right: 4px;
        }
      </style>
      <button type="button">
        <slot name="icon"></slot>
        <slot></slot>
        <svg class="dash">
          <rect class="border" stroke-width="2" />
        </svg>
      </button>
    `;
  }

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const border: SVGRectElement = svg.querySelector('.border');
    const { width, height } = this.getBoundingClientRect();
    const borderRadius = this.rounded ? (height - this.dashProps.dashWidth) / 2 : 0;

    const hostProps: HostProps = { width, height, borderRadius };
    drawDashedRect(border, hostProps, this.dashProps);
  }
}
customElements.define(DashedButton.is, DashedButton);
