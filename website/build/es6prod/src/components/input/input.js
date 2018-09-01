define(["exports","../../../node_modules/@polymer/lit-element/lit-element.js","../styles/styles.js","../utils/rect-dasharray.js"],function(_exports,_litElement,_styles,_rectDasharray){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.DashedInput=void 0;class DashedInput extends _litElement.LitElement{static get is(){return"dashed-input"}static get properties(){return{disabled:Boolean,checked:Boolean,dashWidth:Number,dashLength:Number,dashRatio:Number}}constructor(){super();this.disabled=!1;this.checked=!1;this.dashWidth=1;this.dashLength=6;this.dashRatio=.15}_createRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){super.connectedCallback();this.drawDash()}_render(){return _litElement.html`
      <style>
        :host {
          --dashed-input-dimension: 24px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: 96px;
          min-height: 24px;
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

        .input-container {
          display: inline-block;
          position: relative;
          outline: none;
          /* width: 100%; */
          /* height: 100%; */
        }

        input {
          margin: 5px;
          padding: 5px;
          box-sizing: border-box;
          border: none;
          outline: none;
          /* max-width: 100%; */
          height: 100%;
          background: var(--dashed-fill-color);
        }

        svg.dash {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          fill: var(--dashed-fill-color);
          z-index: -1;
        }
  
        svg.dash .border {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
        }
      </style>
      <label for="input"><slot></slot></label>
      <div class="input-container">
        <input id="input" />
        <svg class="dash">
          <rect class="border" />
        </svg>
      </div>
    `}get nativeElement(){return this._root.querySelector("input")}get svg(){return this._root.querySelector("svg.dash")}drawDash(){const svg=this.svg,border=svg.querySelector(".border"),{width,height}=this._root.querySelector(".input-container").getBoundingClientRect(),dashProps={dashWidth:this.dashWidth,dashLength:this.dashLength,dashRatio:this.dashRatio};(0,_rectDasharray.drawDashedRect)(border,{width,height,borderRadius:5},dashProps)}}_exports.DashedInput=DashedInput;customElements.define(DashedInput.is,DashedInput)});