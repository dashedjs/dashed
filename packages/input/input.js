export class DashedInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(DashedInput.template);
  }

  static get is() {
    return 'dashed-input';
  }

  static get template() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          display: inline-block;
          cursor: pointer;
        }
      </style>
      <div>Input</div>
    `;
    return template.content.cloneNode(true);
  }
}
customElements.define(DashedInput.is, DashedInput);
