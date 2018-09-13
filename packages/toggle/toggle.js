import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { drawDashedRect } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedToggle extends LitElement {
  static get is() {
    return 'dashed-toggle';
  }

  static get properties() {
    return {
      disabled: Boolean,
      checked: Boolean,
      dashProps: Object
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.checked = false;
    this.dashProps = { dashWidth: 2, dashLength: 4, dashRatio: 0.5 };
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.drawDash();
  }

  render() {
    return html`
      ${dashedStyles}
      <style>
        :host {
          --dashed-toggle-width: 48px;
          --dashed-toggle-height: 24px;
          --dashed-dash-width: 2px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
          outline: none;
          min-width: 48px;
        }

        .toggle-container {
          display: inline-flex;
          position: relative;
          width: var(--dashed-toggle-width);
          height: var(--dashed-toggle-height);
        }

        label {
          display: inline-flex;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        input[type="checkbox"] {
          margin: 0;
          width: var(--dashed-toggle-width);
          height: var(--dashed-toggle-height);
          cursor: pointer;
          opacity: 0;
        }
  
        svg.dash .toggle-background {
          stroke: var(--dashed-primary-color);
          fill: var(--dashed-fill-color);
        }
  
        svg.dash .toggle-switcher {
          fill: var(--dashed-primary-color);
          transition: transform 100ms ease-in-out;
          will-change: transform;
        }

        input[type="checkbox"]:checked ~ svg.dash .toggle-switcher {
          transform: translateX(var(--dashed-toggle-height));
          fill: var(--dashed-danger-color);
        }

        input[type="checkbox"]:not(:checked) ~ svg.dash .toggle-switcher {
          transform: translateX(- var(--dashed-toggle-height));
        }
      </style>
      <div class="toggle-container">
        <input type="checkbox" id="toggle" />
        <svg class="dash">
          <rect class="toggle-background" />
          <circle class="toggle-switcher" />
        </svg>
      </div>
      <label for="toggle"><slot></slot></label>
    `;
  }

  drawDash() {
    const svg = this.renderRoot.querySelector('svg.dash');
    const toggleBackground = svg.querySelector('.toggle-background');
    const [width, height] = [48, 24];
    const [widthDelta, heightDelta] = [6, 10];
    const toggleBackgroundBorderRadius = (height - heightDelta - this.dashProps.dashWidth) / 2;
    const hostProps = {
      width: width - widthDelta,
      height: height - heightDelta,
      borderRadius: toggleBackgroundBorderRadius
    };
    drawDashedRect(toggleBackground, hostProps, this.dashProps);
    toggleBackground.setAttribute('transform', `translate(${widthDelta / 2} ${heightDelta / 2})`);

    const toggleSwitcher = svg.querySelector('.toggle-switcher');
    toggleSwitcher.setAttribute('stroke-width', `${this.dashProps.dashWidth}`);
    toggleSwitcher.setAttribute('cx', `${height / 2}`);
    toggleSwitcher.setAttribute('cy', `${height / 2}`);
    toggleSwitcher.setAttribute('r', `${(height - this.dashProps.dashWidth) / 2}`);
  }
}
customElements.define(DashedToggle.is, DashedToggle);
