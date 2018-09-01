define(["exports","../../../node_modules/@polymer/lit-element/lit-element.js","../styles/styles.js"],function(_exports,_litElement,_styles){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.DashedFooter=void 0;class DashedFooter extends _litElement.LitElement{static get is(){return"dashed-footer"}static get properties(){return{dashWidth:Number,dashLength:Number,dashRatio:Number}}constructor(){super();this.dashWidth=2;this.dashLength=20;this.dashRatio=.1}_createRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){super.connectedCallback();this.drawDash();window.addEventListener("resize",this.drawDash.bind(this))}disconnectedCallback(){super.disconnectedCallback();window.removeEventListener("resize",this.drawDash.bind(this))}_render({disabled,dashWidth,dashLength,dashRatio}){return _litElement.html`
      <style>
        :host {
          --dashed-footer-min-width: 256px;
          --dashed-footer-max-width: 512px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: var(--dashed-footer-min-width);
          max-width: var(--dashed-footer-max-width);
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

        .footer {
          display: inline-block;
          position: relative;
          width: 100%;
          height: 100%;
          padding: 10px;
        }

        .footer__title {
        }

        .footer__content {
        }

        .footer__footer {
          display: flex;
          justify-content: flex-end;
        }

        .footer__footer__button {
          display: inline-block;
          cursor: pointer;
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
      <div class="footer">
        <h4 class="footer__title">Footer title</h3>
        <h5 class="footer__subtitle">Footer subtitle</h5>
        <div class="footer__content">
          This is the footer content. This is a text divlacehoder.
          <p>It can grow at will</p>
        </div>
        <div class="footer__footer">
          <small>Here the footer footer</small>
          <button class="footer__footer__button">button1</button>
          <button class="footer__footer__button">button2</button>
        </div>
        <svg class="dash" filter="url(#shadow2)">
          <rect class="border" />
          <filter id="shadow2">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3" />
          </filter>
        </svg>
      </div>
    `}get nativeElement(){return this._root.querySelector("footer")}get svg(){return this._root.querySelector("svg.dash")}drawDash(){const{width,height}=this.getBoundingClientRect(),{dashWidth}=this._validateDashProps(width,height),svg=this.svg;svg.setAttribute("viewBox",`0 0 ${width} ${height}`);const border=svg.querySelector(".border"),borderRadius=16;border.setAttribute("stroke-width",dashWidth);border.setAttribute("x",dashWidth/2);border.setAttribute("y",dashWidth/2);border.setAttribute("width",width-dashWidth);border.setAttribute("height",height-dashWidth);border.setAttribute("rx",borderRadius);border.setAttribute("ry",borderRadius);const{strokeDasharray,strokeDashOffset}=this._computeRectStrokeDashParams(width,height,borderRadius);border.setAttribute("stroke-dasharray",strokeDasharray);border.setAttribute("stroke-dashoffset",strokeDashOffset)}_computeRectStrokeDashParams(width,height,borderRadius){const{dashWidth,dashLength,dashRatio}=this._validateDashProps(width,height),lineX=width-dashWidth-2*borderRadius,lineY=height-dashWidth-2*borderRadius,arcCorner=2*Math.PI*borderRadius/4,dashCountX=calculateDashCount(lineX),dashCountY=calculateDashCount(lineY),dashCountCorner=calculateDashCount(arcCorner),dashSpacingX=calculateDashSpacing(lineX,dashCountX),dashSpacingY=calculateDashSpacing(lineY,dashCountY),dashSpacingCorner=calculateDashSpacing(arcCorner,dashCountCorner),strokeDashArrayX=calculateStrokeDasharray(dashCountX,dashSpacingX,dashSpacingCorner),strokeDashArrayCorner1=calculateStrokeDasharray(dashCountCorner,dashSpacingCorner,dashSpacingY),strokeDasharrayY=calculateStrokeDasharray(dashCountY,dashSpacingY,dashSpacingCorner),strokeDashArrayCorner2=calculateStrokeDasharray(dashCountCorner,dashSpacingCorner,dashSpacingX),strokeDasharray=`${strokeDashArrayX}${strokeDashArrayCorner1}${strokeDasharrayY}${strokeDashArrayCorner2}`.trim();function calculateDashCount(totalDistance){if(0>=totalDistance-dashRatio*dashLength)return 0;return Math.floor((totalDistance-dashRatio*dashLength)/((1+dashRatio)*dashLength))}function calculateDashSpacing(totalDistance,dashCount){if(0===dashCount)return totalDistance/2;return(totalDistance-dashCount*dashLength)/(dashCount+1)}function calculateStrokeDasharray(dashCount,dashSpacing,adjacentdashSpacing){if(0===dashCount)return`0 ${dashSpacing+adjacentdashSpacing} `;return`${dashLength} ${dashSpacing} `.repeat(dashCount-1)+`${dashLength} ${dashSpacing+adjacentdashSpacing} `}return{strokeDasharray,strokeDashOffset:-dashSpacingX,dashWidth}}_validateDashProps(width,height){if(0>this.dashWidth||0>this.dashLength||0>this.dashRatio){throw new Error(`dashWidth, dashLength and dashRatio must be positive numbers`)}const refDimension=Math.min(width,height),dashLength=this.dashLength>refDimension?refDimension:this.dashLength,dashWidth=this.dashWidth>refDimension/2?refDimension/2:this.dashWidth,dashRatio=dashLength*(1+this.dashRatio)>refDimension?refDimension-dashLength:this.dashRatio;return{dashWidth,dashLength,dashRatio}}}_exports.DashedFooter=DashedFooter;customElements.define(DashedFooter.is,DashedFooter)});