import { borderImage } from '@dashedjs/dashed-utils/utils.js';
import { dashedStyles } from '@dashedjs/dashed-styles/styles.js';

export class DashedToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.dashProps = { dashWidth: 2, dashLength: 4, dashRatio: 0.5 };
    this.borderRadius = '12';
    this.dashWidth = '2';
    this.dashLength = '8';
    this.dashSpacing = '2';
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    Boolean(value) ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  get checked() {
    return this.hasAttribute('checked');
  }
  set checked(value) {
    Boolean(value) ? this.setAttribute('checked', '') : this.removeAttribute('checked');
  }

  get borderRadius() {
    return parseFloat(this.getAttribute('border-radius')) || 12;
  }
  set borderRadius(value) {
    this.setAttribute('border-radius', value);
  }

  get dashWidth() {
    return parseFloat(this.getAttribute('dash-width')) || 2;
  }
  set dashWidth(value) {
    this.setAttribute('dash-width', value);
  }

  get dashLength() {
    returnparseFloat(this.getAttribute('dash-length')) || 8;
  }
  set dashLength(value) {
    this.setAttribute('dash-length', value);
  }

  get dashSpacing() {
    returnparseFloat(this.getAttribute('dash-spacing')) || 2;
  }
  set dashSpacing(value) {
    this.setAttribute('dash-spacing', value);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const [widthDelta, heightDelta] = [6, 10];
    const dashWidth = parseFloat(this.dashWidth);

    const template = document.createElement('template');
    template.innerHTML = `
      ${dashedStyles}
      <style>
        :host {
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
          width: 48px;
          height: 24px;
        }

        label {
          display: inline-flex;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        input[type="checkbox"] {
          margin: 0;
          width: 48px;
          height: 24px;
          cursor: pointer;
          opacity: 0;
        }

        span.toggle-background {
          box-sizing: border-box;
          z-index: -1;
          display: inline-block;
          position: absolute;
          top: ${heightDelta / 2}px;
          left: ${widthDelta / 2}px;
          width: ${48 - widthDelta}px;
          height: ${24 - heightDelta}px;

          border: ${this.dashWidth}px solid;
          border-image: ${borderImage(this.dashWidth, this.dashLength, this.dashSpacing, this.borderRadius)};
        }

        
        span.toggle-background::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: ${this.borderRadius}px;
          background: var(--dashed-primary-light-color);
        }

  
        svg.dash .toggle-switcher {
          fill: var(--dashed-primary-color);
          transition: transform 100ms ease-in-out;
          will-change: transform;
        }

        input[type="checkbox"]:checked ~ svg.dash .toggle-switcher {
          transform: translateX(24px);
          fill: var(--dashed-danger-color);
        }
      </style>
      <div class="toggle-container">
        <input type="checkbox" id="toggle" />
        <span class="toggle-background"></span>
        <svg class="dash" stroke-width="${this.dashWidth}">
          <circle class="toggle-switcher" cx="12" cy="12" r="${(24 - dashWidth) / 2}" />
        </svg>
      </div>
      <label for="toggle"><slot></slot></label>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('dashed-toggle', DashedToggle);
