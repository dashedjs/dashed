import { LitElement, html, property } from '@polymer/lit-element/lit-element';
import { DashProps, HostProps, Dash } from '../utils/dash';
import { drawDashedCircle } from '../utils/circle-dasharray';
import { commonStyles } from '../styles/styles';

export class DashedFab extends LitElement implements Dash {
  static get is() {
    return 'dashed-fab';
  }

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: String })
  ariaLabel: string = 'Fab button';

  @property({ type: Object })
  dashProps: DashProps = { dashWidth: 2, dashLength: 4, dashRatio: 0.5 };

  _icon: any;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated(_changedProperties) {
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

  render() {
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
          color: var(--dashed-danger-color);
        }

        .button-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 56px;
          height: 56px;
        }

        button {
          width: 48px;
          height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          cursor: inherit;
          border: none;
          outline: none;
          position: relative;
          transition: color 50ms ease-in-out;
        }

        svg.dash .circles {
          will-change: transform;
        }

        svg.dash .outer-circle,
        svg.dash .inner-circle {
          stroke: var(--dashed-primary-color);
        }
      </style>
      <div class="button-container">
        <button type="button" aria-label="${this.ariaLabel}">
          <slot name="icon"></slot>
        </button>
        <svg class="dash">
          <g class="circles">
            <circle class="outer-circle" id="outer"  filter="url(#shadow2)"/>
            <circle class="inner-circle" />
          </g>
          <filter id="shadow2">
            <feDropShadow dx="2" dy="2" stdDeviation="2" flood-opacity="0.9" />
          </filter>
          <mask id="mask">
            <use href="#outer" fill="black" stroke="white" />
          </mask>
        </svg>
      </div>
    `;
  }

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const [width, height] = [48, 48];

    const circles = svg.querySelector('.circles');

    const outerCircle: SVGCircleElement = circles.querySelector('.outer-circle');
    const outerHostProps: HostProps = { width, height };
    drawDashedCircle(outerCircle, outerHostProps, this.dashProps);

    const innerCircle: SVGCircleElement = circles.querySelector('.inner-circle');
    const innerCircleOffset: number = 12;
    const innerHostProps: HostProps = { width: width - innerCircleOffset, height: height - innerCircleOffset };
    drawDashedCircle(innerCircle, innerHostProps, this.dashProps);
    innerCircle.setAttribute('transform', `translate(${innerCircleOffset / 2} ${innerCircleOffset / 2})`);

    (circles as SVGGElement).style.transform = `translate(4px, 4px)`;
  }
}
customElements.define(DashedFab.is, DashedFab);
