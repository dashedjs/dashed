define(["exports","../../../node_modules/@polymer/lit-element/lit-element.js","../styles/styles.js","../utils/rect-dasharray.js"],function(_exports,_litElement,_styles,_rectDasharray){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.DashedToggle=void 0;class DashedToggle extends _litElement.LitElement{static get is(){return"dashed-toggle"}static get properties(){return{disabled:Boolean,checked:Boolean,dashWidth:Number,dashLength:Number,dashRatio:Number}}constructor(){super();this.disabled=!1;this.checked=!1;this.dashWidth=2;this.dashLength=4;this.dashRatio=.5}_createRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){super.connectedCallback();this.drawDash()}_render({disabled,checked,name,dashWidth,dashLength,dashRatio}){return _litElement.html`
      <style>
        :host {
          --dashed-toggle-width: 48px;
          --dashed-toggle-height: 24px;
          --dashed-dash-width: 2px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
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

        .toggle-container {
          display: inline-flex;
          position: relative;
          width: var(--dashed-toggle-width);
          height: var(--dashed-toggle-height);
        }

        label {
          display: inline-flex;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        input[type="checkbox"] {
          margin: 0;
          width: var(--dashed-toggle-width);
          height: var(--dashed-toggle-height);
          cursor: pointer;
          opacity: 0;
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
  
        svg.dash .toggle-background {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
          fill: var(--dashed-fill-color);
        }
  
        svg.dash .toggle-switcher {
          fill: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
        }

        input[type="checkbox"]:checked ~ svg.dash .toggle-switcher {
          transform: translateX(var(--dashed-toggle-height));
          fill: var(--dashed-secondary-color);
        }

        input[type="checkbox"]:not(:checked) ~ svg.dash .toggle-switcher {
          transform: translateX(- var(--dashed-toggle-height));
        }
      </style>
      <div class="toggle-container">
        <input type="checkbox" id="toggle" />
        <svg class="dash">
          <rect class="toggle-background" />
          <circle class="toggle-switcher" />
        </svg>
      </div>
      <label for="toggle"><slot></slot></label>
    `}get nativeElement(){return this._root.querySelector("input[type=\"checkbox\"]")}get svg(){return this._root.querySelector("svg.dash")}drawDash(){const svg=this.svg,toggleBackground=svg.querySelector(".toggle-background"),[width,height]=[48,24],[widthDelta,heightDelta]=[6,10],toggleBackgroundBorderRadius=(height-heightDelta-this.dashWidth)/2,dashProps={dashWidth:this.dashWidth,dashLength:this.dashLength,dashRatio:this.dashRatio};(0,_rectDasharray.drawDashedRect)(toggleBackground,{width:width-widthDelta,height:height-heightDelta,borderRadius:toggleBackgroundBorderRadius},dashProps);toggleBackground.setAttribute("transform",`translate(${widthDelta/2} ${heightDelta/2})`);const toggleSwitcher=svg.querySelector(".toggle-switcher");toggleSwitcher.setAttribute("stroke-width",this.dashWidth);toggleSwitcher.setAttribute("cx",height/2);toggleSwitcher.setAttribute("cy",height/2);toggleSwitcher.setAttribute("r",(height-this.dashWidth)/2)}}_exports.DashedToggle=DashedToggle;customElements.define(DashedToggle.is,DashedToggle)});