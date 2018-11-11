export const sharedStyles = String.raw`
  <style title="Shared styles">
    :host{
      --color-primary: #3636e7;
      --color-primary-light: #3636e726;
      --color-secondary: #ce8207;
      --color-secondary-light: #e39248bf;
      --color-accent: #cc6c7a;
      --color-accent-light: #ef8e9d99;
      --color-success: #1f8d57;
      --color-success-light: #1f8d5726;
      --color-danger: #fa3232;
      --color-danger-light: #fa323226;
      --color-warn: #cd9a1a;
      --color-warn-light: #cbab59ad;
      --color-outline: #6299f2;
      --color-fill: var(--color-primary-light);

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

    :host(:focus) > button,
    :host(:focus) > a,
    :host(:focus) > input,
    :host(:focus) > dashed-icon {
      outline: 1px solid var(--color-outline);
      outline-offset: 1px;
    }

    :host([dash-color]) {
      color: attr(dash-color);
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
