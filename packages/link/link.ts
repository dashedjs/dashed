import { LitElement, html, property, PropertyValues } from '@polymer/lit-element/lit-element';
import { commonStyles } from '../styles/styles';
import { drawDashedLine } from '../utils/line-dasharray';
import { Dash, DashProps, HostProps } from '../utils/dash';
import { TemplateResult } from 'lit-html';

export class DashedLink extends LitElement implements Dash {
  static get is() {
    return 'dashed-link';
  }

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: String })
  role: string = '';

  @property({ type: Boolean })
  dashProps: DashProps = { dashWidth: 4, dashLength: 8, dashRatio: 0.2 };

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.drawDash();
  }

  render(): TemplateResult {
    return html`
      ${commonStyles}
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;
          position: relative;
        }

        :host(:hover) link {
          color: var(--dashed-secondary-color);
        }

        a {
          display: inline-block;
          cursor: inherit;
          text-align: center;
          text-decoration: none;
          outline: none;
          padding-bottom: 4px;
          font-size: 16px;
          position: relative;
          transition: color 50ms ease-in-out;
          width: 100%;
        }
      </style>
      <a href="#" @click="${(e: Event) => console.log(e)}">
        <slot></slot>
        <svg class="dash">
          <rect class="background" />
          <line class="border-bottom" />
        </svg>
      </a>
    `;
  }

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const borderBottom: SVGLineElement = svg.querySelector('.border-bottom');
    const { width, height } = this.getBoundingClientRect();

    const hostProps: HostProps = { width, height };
    drawDashedLine(borderBottom, hostProps, this.dashProps);

    const background = svg.querySelector('.background');
    background.setAttribute('width', `${width}`);
    background.setAttribute('height', `${height - this.dashProps.dashWidth / 2}`);
  }
}
customElements.define(DashedLink.is, DashedLink);
