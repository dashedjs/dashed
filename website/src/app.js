import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import * as dashedjs from './components/dashed.js';
// import * as dashedjs from '../../packages/dashed.js';

class DashedSiteApp extends LitElement {
  static get is() {
    return 'dashed-site-app';
  }

  connectedCallback() {
    super.connectedCallback();
  }

  _createRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

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

        main {
          padding: 10px;
        }

        dashed-button {
          --dashed-fill-color: #b2eaff;
        }
      </style>
      <dashed-header></dashed-header>
      <main class="main">
        <br/>
        <dashed-button role="button">My button</dashed-button>
        <dashed-button> Hello
          <svg slot="icon" stroke="blue" width="12" height="12" viewBox="0 0 24 24" class="icon">
            <path d="M4 4L20 20 M4 20L20 4" stroke-width="2" stroke-dasharray="5 0.876" />
          </svg>
        </dashed-button>
        <br/> 1.
        <br>
        <dashed-card>Card</dashed-card>
        <br/><br/> 1.
        <dashed-checkbox>Checkbox</dashed-checkbox>
        <br/> 1.
        <dashed-input>Input</dashed-input>
        <br/> 1.
        <dashed-link>Link</dashed-link>
        <br/><br> 1.
        <dashed-notification>Notification</dashed-notification>
        <br/> 1.
        <dashed-radio dashLength="4" dashWidth="2" dashRatio="0.5">Radio</dashed-radio>
        <br/> 1.
        <dashed-select>select</dashed-select>
        <br/> 1.
        <dashed-slider value="30">Slider</dashed-slider>
        <br/> 1.
        <dashed-tag>Taunt</dashed-tag>
        <br/> 1.
        <dashed-textarea>Textarea</dashed-textarea>
        <br/> 1.
        <dashed-toggle>Toggle</dashed-toggle>
        <br/>
      </main>
      <dashed-footer></dashed-footer>
    `;
  }
}
customElements.define(DashedSiteApp.is, DashedSiteApp);
