import { LitElement, html, property } from '@polymer/lit-element/lit-element';
import { drawDashedRect, DashProps, HostProps, Dash } from '@dashedjs/dashed-utils/utils';
import { commonStyles } from '@dashedjs/dashed-styles/styles';

export class DashedCard extends LitElement implements Dash {
  static get is() {
    return 'dashed-card';
  }

  @property({ type: Object })
  dashProps: DashProps = { dashWidth: 2, dashLength: 20, dashRatio: 0.1 };

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated(_changedProperties) {
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

  render() {
    return html`
      ${commonStyles}
      <style>
        :host {
          --dashed-card-min-width: 256px;
          --dashed-card-max-width: 512px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: var(--dashed-card-min-width);
          max-width: var(--dashed-card-max-width);
        }

        .card {
          display: inline-block;
          position: relative;
          width: 100%;
          height: 100%;
          padding: 10px;
        }

        .card__title {
        }

        .card__content {
        }

        .card__footer {
          display: flex;
          justify-content: flex-end;
        }

        .card__footer__button {
          display: inline-block;
          cursor: pointer;
        }
      </style>
      <div class="card">
        <h4 class="card__title">Card title</h3>
        <h5 class="card__subtitle">Card subtitle</h5>
        <div class="card__content">
          This is the card content. This is a text divlacehoder.
          <p>It can grow at will</p>
        </div>
        <div class="card__footer">
          <small>Here the card footer</small>
          <button class="card__footer__button">button1</button>
          <button class="card__footer__button">button2</button>
        </div>
        <svg class="dash" filter="url(#shadow2)">
          <rect class="border" />
          <filter id="shadow2">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3" />
          </filter>
        </svg>
      </div>
    `;
  }

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const border: SVGRectElement = svg.querySelector('.border');
    const { width, height } = this.getBoundingClientRect();
    const borderRadius = 16;

    const hostProps: HostProps = { width, height, borderRadius };
    drawDashedRect(border, hostProps, this.dashProps);
  }
}
customElements.define(DashedCard.is, DashedCard);
