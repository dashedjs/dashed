export const dashedStyles = `
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

      --dashed-shadow-2dp: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      --dashed-shadow-3dp: 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 3px -2px rgba(0, 0, 0, 0.4);
      --dashed-shadow-4dp: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
      --dashed-shadow-6dp: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.4);
    }

    :host(:focus) > * {
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
