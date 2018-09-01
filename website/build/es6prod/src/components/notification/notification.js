define(["exports","../../../node_modules/@polymer/lit-element/lit-element.js","../styles/styles.js","../utils/rect-dasharray.js"],function(_exports,_litElement,_styles,_rectDasharray){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.DashedNotification=void 0;class DashedNotification extends _litElement.LitElement{static get is(){return"dashed-notification"}static get properties(){return{dashWidth:Number,dashLength:Number,dashRatio:Number}}constructor(){super();this.dashWidth=2;this.dashLength=10;this.dashRatio=.1}_createRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){super.connectedCallback();this.drawDash();window.addEventListener("resize",this.drawDash.bind(this))}disconnectedCallback(){super.disconnectedCallback();window.removeEventListener("resize",this.drawDash.bind(this))}_render({disabled,dashWidth,dashLength,dashRatio}){return _litElement.html`
      <style>
        :host {
          --dashed-notification-min-width: 256px;
          --dashed-notification-max-width: 512px;
          --dashed-notification-min-height: 48px;
          --dashed-notification-padding: 8px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-height: var(--dashed-notification-min-height);
          min-width: var(--dashed-notification-min-width);
          max-width: var(--dashed-notification-max-width);
          ${_styles.dashedColors}
        }

        :host(:focus) .dash {
          outline: 1px solid var(--dashed-outline-color);
          outline-offset: 1px;
        }

        :host([disabled]) {
          opacity: 0.6;
          pointer-events: none;
        }

        .notification {
          display: grid;
          grid-template-columns: 32px auto 32px;
          justify-items: center;
          align-items: center;
          position: relative;
          width: 100%;
          height: 100%;
          padding: var(--dashed-notification-padding);
        }

        .notification__icon {
          /* display: inline-block; */
        }

        .notification__message {
        }

        .notification__button {
          display: inline-block;
          cursor: pointer;
          background: none;
          border: none;
          width: 32px;
          height: 32px;
          margin: 0;
        }

        svg.dash {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          fill: none;
          z-index: -1;
        }
  
        svg.dash .border {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
          fill: var(--dashed-fill-color);
        }
      </style>
      <div class="notification">
        <span class="notification__icon">ico</span>
        <div class="notification__message">Here is an example of notification.</div>
        <button class="notification__button">x</button>
        <svg class="dash">
          <rect class="border" />
        </svg>
      </div>
    `}get nativeElement(){return this._root.querySelector("notification")}get svg(){return this._root.querySelector("svg.dash")}drawDash(){const svg=this.svg,border=svg.querySelector(".border"),{width,height}=this.getBoundingClientRect(),borderRadius=this.rounded?(height-dashWidth)/2:0,dashProps={dashWidth:this.dashWidth,dashLength:this.dashLength,dashRatio:this.dashRatio};(0,_rectDasharray.drawDashedRect)(border,{width,height,borderRadius},dashProps)}}_exports.DashedNotification=DashedNotification;customElements.define(DashedNotification.is,DashedNotification)});