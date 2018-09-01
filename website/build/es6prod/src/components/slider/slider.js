define(["exports","../../../node_modules/@polymer/lit-element/lit-element.js","../styles/styles.js","../utils/line-dasharray.js"],function(_exports,_litElement,_styles,_lineDasharray){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.DashedSlider=void 0;class DashedSlider extends _litElement.LitElement{static get is(){return"dashed-slider"}static get properties(){return{disabled:Boolean,min:Number,max:Number,value:Number,step:Number,dashWidth:Number,dashLength:Number,dashRatio:Number}}constructor(){super();this.disabled=!1;this.min=0;this.max=100;this.value=0;this.step=1;this.dashWidth=2;this.dashLength=2;this.dashRatio=.5}_createRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){super.connectedCallback();this.drawDash();this._sliderCursor=this.svg.querySelector(".slider-cursor");this._sliderTracker=this.svg.querySelector(".slider-tracker");window.addEventListener("resize",this.drawDash.bind(this))}disconnectedCallback(){super.disconnectedCallback();window.removeEventListener("resize",this.drawDash.bind(this))}_render({disabled,min,max,value,step}){return _litElement.html`
      <style>
        :host {
          --dashed-slider-width: 192px;
          --dashed-slider-height: 24px;
          --dashed-slider-cursor-radius: 6px;
          --dashed-dash-width: 2px;

          display: inline-flex;
          align-items: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: var(--dashed-slider-width);
          ${_styles.dashedColors}
        }

        :host(:focus) svg.dash {
          outline: 1px solid var(--dashed-outline-color);
          outline-offset: 1px;
        }

        :host(:focus) svg.dash .slider-cursor-focus-ring {
          opacity: 1;
        }

        :host([disabled]) {
          opacity: 0.6;
          pointer-events: none;
        }

        .slider-container {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          position: relative;
          width: var(--dashed-slider-width);
          height: var(--dashed-slider-height);
        }

        input[type="range"] {
          margin: 0;
          width: calc(100% - var(--dashed-slider-cursor-radius));
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
          transition: all 50ms ease-in-out;
          will-change: tranform, opacity;
        }
  
        svg.dash .slider-background {
          stroke: var(--dashed-primary-color);
        }
  
        svg.dash .slider-tracker {
          stroke: var(--dashed-secondary-color);
          opacity: 0.8;
        }

        svg.dash .slider-cursor-inner {
          fill: var(--dashed-secondary-color);
        }

        svg.dash .slider-cursor-focus-ring {
          fill: rgba(255, 0, 0, 0.5);
          opacity: 0;
        }
      </style>
      <label for="range"><slot></slot></label>
      <div class="slider-container">
        <input type="range" id="range" min="${min}" max="${max}" step="${step}" value="${value}"
          on-input="${e=>this._onInputHandler(e)}" />
        <svg class="dash">
          <line class="slider-background" />
          <line class="slider-tracker" />
          <g class="slider-cursor">
            <circle class="slider-cursor-focus-ring" />
            <circle class="slider-cursor-inner" />
          </g>
        </svg>
      </div>
    `}get nativeElement(){return this._root.querySelector("input[type=\"range\"]")}get svg(){return this._root.querySelector("svg.dash")}_onInputHandler(e){this.value=parseFloat(e.target.value);const sliderBackgroundwidth=192-6*2,percentage=(this.value-this.min)/(this.max-this.min);this._sliderCursor.style.transform=`translateX(${percentage*sliderBackgroundwidth}px)`;this._sliderTracker.setAttribute("x2",percentage*sliderBackgroundwidth)}drawDash(){const svg=this.svg,{width,height}=this._root.querySelector(".slider-container").getBoundingClientRect(),sliderCursor=svg.querySelector(".slider-cursor"),sliderCursorInner=sliderCursor.querySelector(".slider-cursor-inner"),sliderCursorInnerRadius=6;sliderCursorInner.setAttribute("stroke-width",this.dashWidth);sliderCursorInner.setAttribute("cx",sliderCursorInnerRadius);sliderCursorInner.setAttribute("cy",height/2);sliderCursorInner.setAttribute("r",sliderCursorInnerRadius);const sliderCursorFocusRing=sliderCursor.querySelector(".slider-cursor-focus-ring");sliderCursorFocusRing.setAttribute("stroke-width",this.dashWidth);sliderCursorFocusRing.setAttribute("cx",sliderCursorInnerRadius);sliderCursorFocusRing.setAttribute("cy",height/2);sliderCursorFocusRing.setAttribute("r",1.5*sliderCursorInnerRadius);const sliderBackground=svg.querySelector(".slider-background"),sliderBackgroundwidth=width-2*sliderCursorInnerRadius,hostProps={width:sliderBackgroundwidth,height};let dashProps={dashWidth:this.dashWidth,dashLength:this.dashLength,dashRatio:this.dashRatio};(0,_lineDasharray.drawDashedLine)(sliderBackground,hostProps,dashProps);sliderBackground.setAttribute("transform",`translate(${sliderCursorInnerRadius} ${-height/2})`);const sliderTracker=svg.querySelector(".slider-tracker");(0,_lineDasharray.drawDashedLine)(sliderTracker,hostProps,dashProps);sliderTracker.setAttribute("transform",`translate(${sliderCursorInnerRadius} ${-height/2})`);const percentage=(this.value-this.min)/(this.max-this.min);sliderCursor.style.transform=`translateX(${percentage*sliderBackgroundwidth}px)`;sliderTracker.setAttribute("x2",percentage*sliderBackgroundwidth)}_computeLineStrokeDashParams(width){const{dashWidth,dashLength,dashRatio}=this._validateDashProps(width),dashCount=1+Math.floor((width-dashLength)/((1+dashRatio)*dashLength));return{strokeDasharray:`${dashLength} ${(width-dashCount*dashLength)/(dashCount-1)}`,strokeDashOffset:0,dashWidth}}_validateDashProps(width){if(0>this.dashWidth||0>this.dashLength||0>this.dashRatio){throw new Error(`dashWidth, dashLength and dashRatio must be positive numbers`)}const refDimension=width,dashLength=this.dashLength>refDimension?refDimension:this.dashLength,dashWidth=this.dashWidth>refDimension/2?refDimension/2:this.dashWidth,dashRatio=dashLength*(1+this.dashRatio)>refDimension?refDimension-dashLength:this.dashRatio;return{dashWidth,dashLength,dashRatio}}}_exports.DashedSlider=DashedSlider;customElements.define(DashedSlider.is,DashedSlider)});