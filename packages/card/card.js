export class DashedCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(DashedCard.template);
  }

  static get is() {
    return 'dashed-card';
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
      <div>Card</div>
    `;
    return template.content.cloneNode(true);
  }
}
customElements.define(DashedCard.is, DashedCard);
