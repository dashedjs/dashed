import { LitElement, html } from '@polymer/lit-element';

export class DashedSearch extends LitElement {
  static get is() {
    return 'dashed-search';
  }

  constructor() {
    super();
  }

  _render() {
    return html`
      <style>
      </style>
      <form role="search">
        <input type="search" name="q" placeholder="Search a component ..." aria-label="Search a component">
        <input type="submit" value="Go!">
      </form>
    `;
  }
}
customElements.define(DashedSearch.is, DashedSearch);
