define(["exports","../../../node_modules/@polymer/lit-element/lit-element.js","../styles/styles.js","../utils/line-dasharray.js"],function(_exports,_litElement,_styles,_lineDasharray){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.DashedLink=void 0;class DashedLink extends _litElement.LitElement{static get is(){return"dashed-link"}static get properties(){return{disabled:Boolean,dashWidth:Number,dashLength:Number,dashRatio:Number}}constructor(){super();this.disabled=!1;this.dashWidth=4;this.dashLength=8;this.dashRatio=.2}_createRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){super.connectedCallback();this.drawDash()}_render({disabled,dashWidth,dashLength,dashRatio}){return _litElement.html`
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;
          ${_styles.dashedColors}
        }

        :host(:focus) svg.dash {
          outline: 1px solid var(--dashed-outline-color);
          outline-offset: 1px;
        }

        :host(:hover) link {
          color: var(--dashed-secondary-color);
        }

        :host([disabled]) {
          opacity: 0.6;
          pointer-events: none;
        }

        a {
          display: inline-block;
          cursor: inherit;
          text-align: center;
          text-decoration: none;
          outline: none;
          padding-bottom: 4px;
          font-size: 16px;
          position: relative;
          transition: 50ms ease-in-out;
          width: 100%;
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
  
        svg.dash .border-bottom {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
        }

        svg.dash .background {
          fill: var(--dashed-fill-color);
        }
      </style>
      <a href="#">
        <slot></slot>
        <svg class="dash">
          <rect class="background" />
          <line class="border-bottom" />
        </svg>
      </a>
    `}get nativeElement(){return this._root.querySelector("a")}get svg(){return this._root.querySelector("svg.dash")}drawDash(){const svg=this.svg,borderBottom=svg.querySelector(".border-bottom"),{width,height}=this.getBoundingClientRect(),dashProps={dashWidth:this.dashWidth,dashLength:this.dashLength,dashRatio:this.dashRatio};(0,_lineDasharray.drawDashedLine)(borderBottom,{width,height},dashProps);const background=svg.querySelector(".background");background.setAttribute("width",width);background.setAttribute("height",height-this.dashWidth/2)}}_exports.DashedLink=DashedLink;customElements.define(DashedLink.is,DashedLink)});