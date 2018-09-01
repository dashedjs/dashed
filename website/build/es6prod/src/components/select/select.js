define(["exports","../../../node_modules/@polymer/lit-element/lit-element.js","../styles/styles.js","../utils/line-dasharray.js"],function(_exports,_litElement,_styles,_lineDasharray){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.DashedSelect=void 0;class DashedSelect extends _litElement.LitElement{static get is(){return"dashed-select"}static get properties(){return{disabled:Boolean,value:String,dashWidth:Number,dashLength:Number,dashRatio:Number}}constructor(){super();this.disabled=!1;this.value="";this.dashWidth=2;this.dashLength=10;this.dashRatio=.3}_createRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){super.connectedCallback();this.drawDash();window.addEventListener("resize",this.drawDash.bind(this))}disconnectedCallback(){super.disconnectedCallback();window.removeEventListener("resize",this.drawDash.bind(this))}_render({disabled,dashWidth,dashLength,dashRatio}){return _litElement.html`
      <style>
        :host {
          --dashed-select-min-width: 96px;
          --dashed-select-min-height: 24px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: var(--dashed-select-min-width);
          min-height: var(--dashed-select-min-height);
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

        .select-container {
          display: inline-block;
          position: relative;
          width: 100%;
          height: 100%;
        }

        select {
          border: none;
          outline: none;
          padding-right: 12px;
          margin-bottom: 4px;
          background: transparent;
          cursor: pointer;
          width: 100%;
          height: 100%;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
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
  
        svg.dash .border-bottom {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
        }
  
        svg.dash .caret {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
        }
      </style>
      <label for="select"><slot></slot></label>
      <div class="select-container">
        <select id="select">
          <option value="1">Option 1</option>
          <option value="3">Option 3</option>
          <option value="2">Option 2</option>
        </select>
        <svg class="dash">
          <rect class="background" />
          <path class="caret" />
          <line class="border-bottom" />
        </svg>
      </div>
    `}get nativeElement(){return this._root.querySelector("select")}get svg(){return this._root.querySelector("svg.dash")}drawDash(){const svg=this.svg,borderBottom=svg.querySelector(".border-bottom"),{width,height}=this._root.querySelector(".select-container").getBoundingClientRect(),dashProps={dashWidth:this.dashWidth,dashLength:this.dashLength,dashRatio:this.dashRatio};(0,_lineDasharray.drawDashedLine)(borderBottom,{width,height},dashProps);const caret=svg.querySelector(".caret");caret.setAttribute("stroke-width",1.8*this.dashWidth);caret.setAttribute("d",`M${width-12} ${8}l4 4l4 -4`);const background=svg.querySelector(".background");background.setAttribute("width",width);background.setAttribute("height",height-this.dashWidth/2)}}_exports.DashedSelect=DashedSelect;customElements.define(DashedSelect.is,DashedSelect)});