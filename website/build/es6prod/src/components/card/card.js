define(["exports","../../../node_modules/@polymer/lit-element/lit-element.js","../styles/styles.js","../utils/rect-dasharray.js"],function(_exports,_litElement,_styles,_rectDasharray){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.DashedCard=void 0;class DashedCard extends _litElement.LitElement{static get is(){return"dashed-card"}static get properties(){return{dashWidth:Number,dashLength:Number,dashRatio:Number}}constructor(){super();this.dashWidth=2;this.dashLength=20;this.dashRatio=.1}_createRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){super.connectedCallback();this.drawDash();window.addEventListener("resize",this.drawDash.bind(this))}disconnectedCallback(){super.disconnectedCallback();window.removeEventListener("resize",this.drawDash.bind(this))}_render({disabled,dashWidth,dashLength,dashRatio}){return _litElement.html`
      <style>
        :host {
          --dashed-card-min-width: 256px;
          --dashed-card-max-width: 512px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: inherit;
          outline: none;
          min-width: var(--dashed-card-min-width);
          max-width: var(--dashed-card-max-width);
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

        .card {
          display: inline-block;
          position: relative;
          width: 100%;
          height: 100%;
          padding: 10px;
        }

        .card__title {
        }

        .card__content {
        }

        .card__footer {
          display: flex;
          justify-content: flex-end;
        }

        .card__footer__button {
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
      <div class="card">
        <h4 class="card__title">Card title</h3>
        <h5 class="card__subtitle">Card subtitle</h5>
        <div class="card__content">
          This is the card content. This is a text divlacehoder.
          <p>It can grow at will</p>
        </div>
        <div class="card__footer">
          <small>Here the card footer</small>
          <button class="card__footer__button">button1</button>
          <button class="card__footer__button">button2</button>
        </div>
        <svg class="dash" filter="url(#shadow2)">
          <rect class="border" />
          <filter id="shadow2">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3" />
          </filter>
        </svg>
      </div>
    `}get nativeElement(){return this._root.querySelector("card")}get svg(){return this._root.querySelector("svg.dash")}drawDash(){const svg=this.svg,border=svg.querySelector(".border"),{width,height}=this.getBoundingClientRect(),dashProps={dashWidth:this.dashWidth,dashLength:this.dashLength,dashRatio:this.dashRatio};(0,_rectDasharray.drawDashedRect)(border,{width,height,borderRadius:16},dashProps)}}_exports.DashedCard=DashedCard;customElements.define(DashedCard.is,DashedCard)});