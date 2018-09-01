define(["exports","../../../node_modules/@polymer/lit-element/lit-element.js","../styles/styles.js","../utils/rect-dasharray.js","../utils/wai-aria.js"],function(_exports,_litElement,_styles,_rectDasharray,_waiAria){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.DashedButton=void 0;class DashedButton extends _litElement.LitElement{static get is(){return"dashed-button"}static get properties(){return{disabled:Boolean,rounded:Boolean,dashWidth:Number,dashLength:Number,dashRatio:Number}}constructor(){super();this.disabled=!1;this.rounded=!1;this.dashWidth=2;this.dashLength=8;this.dashRatio=.3}_createRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){super.connectedCallback();(0,_waiAria.ariaButton)(this,{role:"button",label:"dashed-button"});this.drawDash()}_render(){return _litElement.html`
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;
          min-width: 48px;
          --host-width: 100%;
          --host-height: 100%;
          ${_styles.dashedColors}
        }

        :host(:focus) svg.dash {
          outline: 1px solid var(--dashed-outline-color);
          outline-offset: 1px;
        }

        :host(:hover) button {
          color: var(--dashed-secondary-color);
        }

        :host([disabled]) {
          opacity: 0.6;
          pointer-events: none;
        }

        button {
          display: inline-block;
          background: none;
          cursor: inherit;
          border: none;
          outline: none;
          padding: 8px 12px;
          font-size: 16px;
          position: relative;
          transition: 50ms ease-in-out;
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
      <button type="button">
        <slot></slot>
        ${_litElement.svg`
          <svg class="dash">
          <rect class="border" stroke-width="2" />
        </svg>
        `}
      </button>
    `}get nativeElement(){return this._root.querySelector("button")}get svg(){return this._root.querySelector("svg.dash")}drawDash(){const svg=this.svg,border=svg.querySelector(".border"),{width,height}=this.getBoundingClientRect(),borderRadius=this.rounded?(height-this.dashWidth)/2:0,dashProps={dashWidth:this.dashWidth,dashLength:this.dashLength,dashRatio:this.dashRatio};(0,_rectDasharray.drawDashedRect)(border,{width,height,borderRadius},dashProps)}}_exports.DashedButton=DashedButton;customElements.define(DashedButton.is,DashedButton)});