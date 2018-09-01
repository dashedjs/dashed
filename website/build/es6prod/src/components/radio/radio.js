define(["exports","../../../node_modules/@polymer/lit-element/lit-element.js","../styles/styles.js","../utils/circle-dasharray.js"],function(_exports,_litElement,_styles,_circleDasharray){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.DashedRadio=void 0;class DashedRadio extends _litElement.LitElement{static get is(){return"dashed-radio"}static get properties(){return{disabled:Boolean,checked:Boolean,dashWidth:Number,dashLength:Number,dashRatio:Number}}constructor(){super();this.disabled=!1;this.checked=!1;this.dashWidth=2;this.dashLength=4;this.dashRatio=.5}_createRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){super.connectedCallback();this.drawDash()}_render({disabled,dashWidth,dashLength,dashRatio}){return _litElement.html`
      <style>
        :host {
          --dashed-radio-dimension: 24px;
          --dashed-dash-width: 2px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
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

        .radio-container {
          display: inline-block;
          position: relative;
          width: var(--dashed-radio-dimension);
          height: var(--dashed-radio-dimension);
        }

        input[type="radio"] {
          margin: 0;
          width: 100%;
          height: 100%;
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
  
        svg.dash .outer-circle {
          stroke: var(--dashed-primary-color);
          transition: all 100ms ease-in-out;
          fill: var(--dashed-fill-color);
        }
  
        svg.dash .inner-circle {
          fill: var(--dashed-secondary-color);
          transition: all 100ms ease-in-out;
        }

        input[type="radio"]:not(:checked) ~ svg.dash .inner-circle {
          opacity: 0;
        }

        input[type="radio"]:checked ~ svg.dash .inner-circle {
          opacity: 1;
        }
      </style>
      <div class="radio-container">
        <input type="radio" id="radio" />
        <svg class="dash">
          <circle class="outer-circle" />
          <circle class="inner-circle" />
        </svg>
      </div>
      <label for="radio"><slot></slot></label>
    `}get nativeElement(){return this._root.querySelector("input[type=\"radio\"]")}get svg(){return this._root.querySelector("svg.dash")}drawDash(){const svg=this.svg,[width,height]=[24,24],outerCircle=svg.querySelector(".outer-circle"),dashProps={dashWidth:this.dashWidth,dashLength:this.dashLength,dashRatio:this.dashRatio};(0,_circleDasharray.drawDashedCircle)(outerCircle,{width,height},dashProps);const innerCircle=svg.querySelector(".inner-circle");innerCircle.setAttribute("cx",width/2);innerCircle.setAttribute("cy",height/2);innerCircle.setAttribute("r",5)}}_exports.DashedRadio=DashedRadio;customElements.define(DashedRadio.is,DashedRadio)});