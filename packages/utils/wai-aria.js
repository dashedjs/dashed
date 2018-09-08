export function ariaButton(el, props) {
  const { role, label } = props;
  el.setAttribute('role', role);
  el.setAttribute('aria-label', label);
}

export function ariaCheckbox(el, props) {
  const { role, label } = props;
  el.setAttribute('role', role);
  el.setAttribute('aria-label', label);
}

export function ariaApp(el, props) {
  const { role, label } = props;
  el.setAttribute('role', role);
  el.setAttribute('aria-label', label);
}
