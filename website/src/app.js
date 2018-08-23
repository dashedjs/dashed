import { LitElement, html } from '@polymer/lit-element';

class DashedApp extends LitElement {
  _render(_props) {
    return html`
      <style>
        :host {
          display: block;
          /* Color palette */
          --dark-primary-color:       #1976d2;
          --default-primary-color:    #2196f3;
          --light-primary-color:      #bbdefb;
          --text-primary-color:       #ffffff;
          --accent-color:             #ff5252;
          --primary-background-color: #bbdefb;
          --primary-text-color:       #212121;
          --secondary-text-color:     #757575;
          --disabled-text-color:      #bdbdbd;
          --divider-color:            #bdbdbd;
          /* Polymer colors */
          min-height: 100vh;
          --app-primary-color: #202020;
          --app-secondary-color: #757575;
          --app-accent-color: #172C50;
          --paper-button-ink-color: var(--app-accent-color);
          --paper-icon-button-ink-color: var(--app-accent-color);
          --paper-spinner-color: var(--app-accent-color);
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
      </style>
      <div>
        Home page
      </div>
    `;
  }

  static get properties() {
    return {
      hello: String
    };
  }

  _didRender(props, changed, oldProps) {}

  constructor() {
    super();
  }

  _firstRendered() {}

  _stateChanged(state) {}
}
customElements.define('dashed-app', DashedApp);
