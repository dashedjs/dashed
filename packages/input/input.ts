import { LitElement, html, property } from '@polymer/lit-element/lit-element';
import { drawDashedRect, Dash, DashProps, HostProps } from '@dashedjs/dashed-utils/utils';
import { commonStyles } from '@dashedjs/dashed-styles/styles';

export class DashedInput extends LitElement implements Dash {
  static get is() {
    return 'dashed-input';
  }

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: Boolean })
  checked: boolean = false;

  @property({ type: Object })
  dashProps: DashProps = { dashWidth: 1, dashLength: 6, dashRatio: 0.15 };

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.drawDash();
  }

  render() {
    return html`
      ${commonStyles}
      <style>
        :host {
          --dashed-input-dimension: 24px;

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
          outline: none;
          /* width: 100%; */
          /* height: 100%; */
        }

        input {
          margin: 5px;
          padding: 5px;
          box-sizing: border-box;
          border: none;
          outline: none;
          /* max-width: 100%; */
          height: 100%;
          background: var(--dashed-fill-color);
        }
      </style>
      <label for="input"><slot></slot></label>
      <div class="input-container">
        <input id="input" />
        <svg class="dash">
          <rect class="border" />
        </svg>
      </div>
    `;
  }

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const border: SVGRectElement = svg.querySelector('.border');
    const { width, height } = this.renderRoot.querySelector('.input-container').getBoundingClientRect();
    const borderRadius = 5;

    const hostProps: HostProps = { width, height, borderRadius };

    drawDashedRect(border, hostProps, this.dashProps);
  }
}
customElements.define(DashedInput.is, DashedInput);
