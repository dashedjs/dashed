export const dashedStyles = String.raw`
  <style title="Common styles">
    :host{
      --color-primary: #3636e7;
      --color-primary-light: #3636e726;
      --color-secondary: #ce8207;
      --color-secondary-light: #e39248bf;
      --color-success: #1f8d57;
      --color-success-light: #1f8d5726;
      --color-danger: #fa3232;
      --color-danger-light: #fa323226;
      --color-warn: #cd9a1a;
      --color-warn-light: #cbab59ad;
      --color-outline: #8181c1;
      --color-fill: var(--color-primary-light);
      
      --shadow-2dp: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      --shadow-3dp: 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 3px -2px rgba(0, 0, 0, 0.4);
      --shadow-4dp: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
      --shadow-6dp: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.4);

      --font-small: 0.8rem;
      --font-medium: 1rem;
      --font-large: 1.5rem;
      --font-xlarge: 2rem;

      font-size: var(--font-medium);
      z-index: 1;
    }

    :host([disabled]) {
      opacity: 0.6;
      pointer-events: none;
    }

    :host(:focus) > * {
      outline: 1px solid var(--color-outline);
      outline-offset: 1px;
    }

    :host([dash-color="primary"]) {
      color: var(--color-primary);
    }
    :host([dash-color="secondary"]) {
      color: var(--color-secondary);
    }
    :host([dash-color="success"]) {
      color: var(--color-success);
    }
    :host([dash-color="danger"]) {
      color: var(--color-danger);
    }
    :host([dash-color="warn"]) {
      color: var(--color-warn);
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
      stroke: var(--color-primary);
      fill: var(--color-fill);
    }

    svg.dash .border-bottom {
      stroke: var(--color-primary);
    }

    svg.dash .background {
      fill: var(--color-fill);
    }
  </style>
`;
