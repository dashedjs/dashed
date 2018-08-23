export class DashedFab extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(DashedFab.template);
  }

  static get is() {
    return 'dashed-fab';
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
      <div>Fab</div>
    `;
    return template.content.cloneNode(true);
  }
}
customElements.define(DashedFab.is, DashedFab);
