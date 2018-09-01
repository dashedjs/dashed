define(["exports","../../../node_modules/@polymer/lit-element/lit-element.js","../styles/styles.js","../utils/rect-dasharray.js"],function(_exports,_litElement,_styles,_rectDasharray){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.DashedTag=void 0;class DashedTag extends _litElement.LitElement{static get is(){return"dashed-tag"}static get properties(){return{disabled:Boolean,dashWidth:Number,dashLength:Number,dashRatio:Number}}constructor(){super();this.disabled=!1;this.dashWidth=1;this.dashLength=6;this.dashRatio=.2}_createRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){super.connectedCallback();this.drawDash()}_render({disabled,checked,name,dashWidth,dashLength,dashRatio}){return _litElement.html`
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;
          min-width: 48px;
          ${_styles.dashedColors}
        }

        :host(:focus) svg.dash {
          outline: 1px solid var(--dashed-outline-color);
          outline-offset: 1px;
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
          padding: 4px 8px;
          font-size: 12px;
          position: relative;
          transition: 50ms ease-in-out;
        }

        button.active {
          color: var(--dashed-secondary-color);
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
      <button type="button" on-click="${e=>this._toggleTag(e)}">
        <slot></slot>
        <svg class="dash">
          <rect class="border" />
        </svg>
      </button>
    `}get nativeElement(){return this._root.querySelector("button")}get svg(){return this._root.querySelector("svg.dash")}_toggleTag(){const button=this.nativeElement;if(!button.classList.contains("active")){button.classList.add("active")}else{button.classList.remove("active")}}drawDash(){const svg=this.svg,border=svg.querySelector(".border"),{width,height}=this.getBoundingClientRect(),borderRadius=(height-this.dashWidth)/2,dashProps={dashWidth:this.dashWidth,dashLength:this.dashLength,dashRatio:this.dashRatio};(0,_rectDasharray.drawDashedRect)(border,{width,height,borderRadius},dashProps)}}_exports.DashedTag=DashedTag;customElements.define(DashedTag.is,DashedTag)});