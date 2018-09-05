import { html } from '@polymer/lit-element/lit-element.js';

export const commonStyles = html`
  <style title="Common styles">
    :host{
      --dashed-primary-color: #0000ff;
      --dashed-secondary-color: #ff0000;
      --dashed-fill-color: none;
      --dashed-outline-color: rgba(255, 0, 0, 0.5);
      z-index: 1;
    }

    :host(:focus) svg.dash {
      outline: 1px solid var(--dashed-outline-color);
      outline-offset: 1px;
    }

    :host([disabled]) {
      opacity: 0.6;
      pointer-events: none;
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

    svg.dash .border-bottom {
      stroke: var(--dashed-primary-color);
      transition: all 100ms ease-in-out;
    }

    svg.dash .background {
      fill: var(--dashed-fill-color);
    }
  </style>
`;
