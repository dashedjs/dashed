export function ariaButton(el: HTMLButtonElement, props: any) {
  const { role, label } = props;
  el.setAttribute('role', role);
  el.setAttribute('aria-label', label);
}

export function ariaCheckbox(el: HTMLInputElement, props: any) {
  const { role, label } = props;
  el.setAttribute('role', role);
  el.setAttribute('aria-label', label);
}

export function ariaApp(el: HTMLElement, props: any) {
  const { role, label } = props;
  el.setAttribute('role', role);
  el.setAttribute('aria-label', label);
}
