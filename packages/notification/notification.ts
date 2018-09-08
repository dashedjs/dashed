import { LitElement, html, property, PropertyValues } from '@polymer/lit-element/lit-element';
import { commonStyles } from '../styles/styles';
import { drawDashedRect } from '../utils/rect-dasharray';
import { Dash, DashProps, HostProps } from '../utils/dash';
import { TemplateResult } from 'lit-html';

export class DashedNotification extends LitElement implements Dash {
  static get is() {
    return 'dashed-notification';
  }

  @property({ type: Boolean })
  rounded: boolean = false;

  @property({ type: Object })
  dashProps: DashProps = { dashWidth: 2, dashLength: 10, dashRatio: 0.1 };

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.drawDash();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this.drawDash.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.drawDash.bind(this));
  }

  render(): TemplateResult {
    return html`
      ${commonStyles}
      <style>
        :host {
          --dashed-notification-min-width: 256px;
          --dashed-notification-max-width: 512px;
          --dashed-notification-min-height: 48px;
          --dashed-notification-padding: 8px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-height: var(--dashed-notification-min-height);
          min-width: var(--dashed-notification-min-width);
          max-width: var(--dashed-notification-max-width);
        }

        .notification {
          display: grid;
          grid-template-columns: 32px auto 32px;
          justify-items: center;
          align-items: center;
          position: relative;
          width: 100%;
          height: 100%;
          padding: var(--dashed-notification-padding);
        }

        .notification__icon {
          /* display: inline-block; */
        }

        .notification__message {
        }

        .notification__button {
          display: inline-block;
          cursor: pointer;
          background: none;
          border: none;
          width: 32px;
          height: 32px;
          margin: 0;
        }
      </style>
      <div class="notification">
        <span class="notification__icon">ico</span>
        <div class="notification__message">Here is an example of notification.</div>
        <button class="notification__button">x</button>
        <svg class="dash">
          <rect class="border" />
        </svg>
      </div>
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
customElements.define(DashedNotification.is, DashedNotification);