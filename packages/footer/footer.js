export class DashedFooter extends HTMLElement {
  constructor() {
    super();
    this.appendChild(DashedFooter.template);
  }

  static get is() {
    return 'dashed-footer';
  }

  static get template() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        footer {
          width: 100%;
          height: 56px;
          text-align: center;
        }
      </style>
      <footer>
        Footer
      </footer>
    `;
    return template.content.cloneNode(true);
  }
}
customElements.define(DashedFooter.is, DashedFooter);
