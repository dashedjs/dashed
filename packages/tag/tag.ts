import { LitElement, html, property, PropertyValues } from '@polymer/lit-element/lit-element';
import { commonStyles } from '../styles/styles';
import { drawDashedRect } from '../utils/rect-dasharray';
import { DashProps, Dash } from '../utils/dash';
import { TemplateResult } from 'lit-html';

export class DashedTag extends LitElement implements Dash {
  static get is() {
    return 'dashed-tag';
  }

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: Object })
  dashProps: DashProps = { dashWidth: 1, dashLength: 6, dashRatio: 0.2 };

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

        button {
          min-width: 32px;
          min-height: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          cursor: inherit;
          border: none;
          outline: none;
          padding: 4px 12px;
          font-size: 12px;
          position: relative;
          transition: color 50ms ease-in-out;
        }

        button.active {
          color: var(--dashed-secondary-color);
        }

        :host ::slotted(dashed-icon[slot="icon"]),
        :host ::slotted(svg) {
          padding-left: 4px;
        }
      </style>
      <button type="button" @click="${(e: Event) => this._toggleTag(e)}">
        <slot></slot>
        <slot name="icon"></slot>
        <svg class="dash">
          <rect class="border" />
        </svg>
      </button>
    `;
  }

  _toggleTag(e: Event) {
    const button = this.renderRoot.querySelector('button');
    button.classList.toggle('active');
  }

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const border: SVGRectElement = svg.querySelector('.border');
    const { width, height } = this.getBoundingClientRect();
    const borderRadius = (height - this.dashProps.dashWidth) / 2;

    const hostProps = { width, height, borderRadius };
    drawDashedRect(border, hostProps, this.dashProps);
  }
}
customElements.define(DashedTag.is, DashedTag);