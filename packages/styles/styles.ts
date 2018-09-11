import { html } from '@polymer/lit-element/lit-element';

export const commonStyles = html`
  <style title="Common styles">
    :host{
      --dashed-primary-color: rgba(54, 54, 231, 1);
      --dashed-primary-light-color: rgba(54, 54, 231, 0.15);

      --dashed-danger-color: rgba(250, 50, 50, 1);
      --dashed-danger-light-color: rgba(250, 50, 50, 0.15);

      --dashed-success-color: rgba(31, 141, 87, 1);
      --dashed-success-light-color: rgba(31, 141, 87, 0.15);

      --dashed-fill-color: var(--dashed-primary-light-color);
      --dashed-outline-color: rgba(129, 129, 193);
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
      fill: var(--dashed-fill-color);
    }

    svg.dash .border-bottom {
      stroke: var(--dashed-primary-color);
    }

    svg.dash .background {
      fill: var(--dashed-fill-color);
    }
  </style>
`;
