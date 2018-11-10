export function borderImage(dashWidth, dashLength, dashSpacing, dashColor, borderRadius = '0') {
  const [width, length, spacing, radius] = [dashWidth, dashLength, dashSpacing, borderRadius].map(str =>
    parseFloat(str)
  );
  const borderImageSlice = width + radius;
  const borderImageWidth = width + radius;
  const borderImageRepeat = 'round';
  // prettier-ignore
  const borderImageSource = `
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='${spacing + length + width + 2*radius}'
      height='${spacing + length + width + 2*radius}'
      viewBox='0 0 ${spacing + length + width + 2*radius} ${spacing + length + width + 2*radius}'
      stroke-width='${width}'
      stroke='blue'>
        <path
          stroke-width='${width}'
          d='M${width/2 + radius + spacing/2} ${width/2}h${length}m${spacing/2 + radius} ${width/2 + radius + spacing/2}v${length}m${-radius -spacing/2} ${spacing/2 + radius}h${-length}m${-spacing/2 - radius} ${-radius - spacing/2}v${-length}'/>

        ${radius > 0
          ? `<path
              fill='none'
              d='M${width/2} ${width/2 + radius - spacing/2}a${radius -spacing/2} ${radius - spacing/2} 0 0 1 ${radius - spacing/2} ${-radius + spacing/2}m${length + 2 * spacing} 0a${radius - spacing/2} ${radius - spacing/2} 0 0 1 ${radius - spacing/2} ${radius - spacing/2}m0 ${length + 2*spacing}a${radius - spacing/2} ${radius -spacing/2} 0 0 1 ${-radius + spacing/2} ${radius - spacing/2}m${-length - 2* spacing} 0a${radius -spacing/2} ${radius - spacing/2} 0 0 1 ${-radius + spacing/2} ${-radius + spacing/2}'/>`
          : ''}
    </svg>`.replace(/\n|\r|\t/gm, '');

  // prettier-ignore
  return `url("data:image/svg+xml;utf8,${borderImageSource}") ${borderImageSlice} / ${borderImageWidth} ${borderImageRepeat}`;
}
