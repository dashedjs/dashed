import { drawDashedCircle } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedFab extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.dashProps = { dashWidth: 2, dashLength: 4, dashRatio: 0.5 };
    this._firstRender = true;
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    Boolean(value) ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  get ariaLabel() {
    return this.hasAttribute('aria-label');
  }
  set ariaLabel(value) {
    Boolean(value) ? this.setAttribute('aria-label', value) : this.removeAttribute('aria-label');
  }

  get dashProps() {
    return this._dashProps;
  }
  set dashProps(value) {
    this._dashProps = value;
  }

  connectedCallback() {
    this.render();
    this.updateIcon();
    this._firstRender = false;
  }

  updateIcon() {
    this._icon = this.shadowRoot.querySelector('slot[name="icon"]').assignedNodes()[0];
    if (this._icon && this._icon.localName === 'dashed-icon') {
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
    const template = document.createElement('template');
    template.innerHTML = `
      ${dashedStyles}
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
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  drawDash() {
    const svg = this.shadowRoot.querySelector('svg.dash');
    const [width, height] = [48, 48];

    const circles = svg.querySelector('.circles');

    const outerCircle = circles.querySelector('.outer-circle');
    const outerHostProps = { width, height };
    drawDashedCircle(outerCircle, outerHostProps, this.dashProps);

    const innerCircle = circles.querySelector('.inner-circle');
    const innerCircleOffset = 12;
    const innerHostProps = { width: width - innerCircleOffset, height: height - innerCircleOffset };
    drawDashedCircle(innerCircle, innerHostProps, this.dashProps);
    innerCircle.setAttribute('transform', `translate(${innerCircleOffset / 2} ${innerCircleOffset / 2})`);

    circles.style.transform = `translate(4px, 4px)`;
  }
}
customElements.define('dashed-fab', DashedFab);
