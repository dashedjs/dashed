import { html } from '@polymer/lit-element/lit-element';

export const commonStyles = html`
  <style title="Common styles">
    :host{
      --dashed-primary-color: #3636e7;
      /* --dashed-primary-light-color: #6c6ced; */
      --dashed-primary-light-color: #dadafa;
      --dashed-secondary-color: #d34242;
      --dashed-secondary-light-color: #e38686;
      --dashed-danger-color: #fa3232;
      --dashed-danger-light-color: #fb7c7c;
      --dashed-success-color: #1f8d57;
      --dashed-success-light-color: #70b694;
      --dashed-fill-color: none;
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
