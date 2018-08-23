export class DashedNotification extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(DashedNotification.template);
  }

  static get is() {
    return 'dashed-notification';
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
      <div>Notification</div>
    `;
    return template.content.cloneNode(true);
  }
}
customElements.define(DashedNotification.is, DashedNotification);
