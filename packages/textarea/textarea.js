export class DashedTextarea extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(DashedTextarea.template);
  }

  static get is() {
    return 'dashed-textarea';
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
      <div>Textarea</div>
    `;
    return template.content.cloneNode(true);
  }
}
customElements.define(DashedTextarea.is, DashedTextarea);
