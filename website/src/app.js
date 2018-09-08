import { LitElement, html } from '@polymer/lit-element/lit-element.js';
// import * as dashedjs from '../../packages/index.js';
import * as dashedjs from '../../dist/transpiled/index.js';

class DashedSiteApp extends LitElement {
  static get is() {
    return 'dashed-site-app';
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render(_props) {
    return html`
      <style>
        :host {
          display: block;
          outline: none;
          min-height: 100vh;
          background: #fbfafe;
        }

        main {
          padding: 10px;
        }

        dashed-header {
          /* --dashed-fill-color: #e1ecf0; */
        }

        dashed-button {
          /* --dashed-fill-color: #b2eaff; */
        }

        @media screen and (min-width: 1080px) {
          :host {
            width: 1080px;
            margin: auto;
          }
        }
      </style>
      <dashed-header></dashed-header>
      <main class="main">
        <br/>
        <dashed-button>My button</dashed-button>
        <dashed-button> Hello
          <svg slot="icon" stroke="blue" width="16" height="16" viewBox="0 0 24 24" class="icon">
            <path d="M4 4L20 20 M4 20L20 4" stroke-width="2" stroke-dasharray="5 0.876" />
          </svg>
        </dashed-button>
        <br>
        <dashed-button>Hello
          <dashed-icon slot="icon" name="close"></dashed-icon>
        </dashed-button>
        <br>
        <dashed-icon name="menu"></dashed-icon>
        <br/> 1.
        <br>
        <dashed-card>Card</dashed-card>
        <br/><br/> 1.
        <dashed-checkbox>Checkbox</dashed-checkbox>
        <br/> 1.
        <br/><br/> 1.
        <dashed-fab>
          <dashed-icon slot="icon" name="close"></dashed-icon>
        </dashed-fab>
        <br/> 1.
        <dashed-input>Input</dashed-input>
        <br/> 1.
        <dashed-link>Link</dashed-link>
        <br/><br> 1.
        <dashed-notification>Notification</dashed-notification>
        <br/> 1.
        <dashed-radio>Radio</dashed-radio>
        <br/> 1.
        <dashed-select>select</dashed-select>
        <br/> 1.
        <dashed-slider value="30">Slider</dashed-slider>
        <br/> 1.
        <dashed-tag>Taunt</dashed-tag>
        <br/> 1.
        <dashed-tag>Taunt
          <dashed-icon slot="icon" name="close"></dashed-icon>
        </dashed-tag>
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
