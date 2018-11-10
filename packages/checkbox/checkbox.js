import { DashedBase, borderImage, sharedStyles } from '@dashedjs/dashed-base';

export class DashedCheckbox extends DashedBase {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['border-radius', 'dash-width', 'dash-length', 'dash-spacing', 'dash-color'];
  }

  get checked() {
    return this.hasAttribute('checked');
  }
  set checked(value) {
    Boolean(value) ? this.setAttribute('checked', '') : this.removeAttribute('checked');
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    this.render();
  }

  render() {
    const [borderRadius = 0, dashWidth = 2, dashLength = 4, dashSpacing = 2] = [
      this.borderRadius,
      this.dashWidth,
      this.dashLength,
      this.dashSpacing
    ].map(attr => (attr ? parseFloat(attr) : undefined));
    const dashColor = this.dashColor.replace('#', '%23'); // Using unescaped '#' characters in a data URI body is deprecated

    const template = document.createElement('template');
    template.innerHTML = `
      ${sharedStyles}
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
        }

        label {
          padding-left: 8px;
        }

        .checkbox-container {
          display: inline-block;
          position: relative;
          width: 24px;
          height: 24px;

          border: ${dashWidth}px solid;
          border-image: ${borderImage(dashWidth, dashLength, dashSpacing, dashColor, borderRadius)};
        }

        .checkbox-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: ${borderRadius}px;
          background: var(--color-primary-light);
        }

        input[type="checkbox"] {
          margin: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        svg.dash .checkmark {
          stroke: var(--color-danger);
          stroke-width: ${dashWidth * 1.8};
        }

        input[type="checkbox"]:not(:checked) ~ svg.dash .checkmark {
          opacity: 0;
        }

        input[type="checkbox"]:checked ~ svg.dash .checkmark {
          opacity: 1;
        }
      </style>
      <div class="checkbox-container">
        <input type="checkbox" id="checkbox" />
        <svg class="dash">
          <path class="checkmark" d='M6 12l4 4l8 -8' />
        </svg>
      </div>
      <label for="checkbox"><slot></slot></label>
    `;
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild);
    }
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('dashed-checkbox', DashedCheckbox);
