export function borderImage(dashWidth, dashLength, dashSpacing, dashColor, borderRadius = 0) {
  const [width, length, spacing, color, radius] = [dashWidth, dashLength, dashSpacing, dashColor, borderRadius];
  console.log({ dashColor });

  const borderImageRepeat = 'round';
  let borderImageSlice;
  let borderImageWidth;
  let borderImageSource;

  if (radius <= width / 2 || radius <= spacing / 2) {
    borderImageSlice = width;
    borderImageWidth = width;
    // prettier-ignore
    borderImageSource = `
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='${spacing + length + 2*width}'
        height='${spacing + length + 2*width}'
        viewBox='0 0 ${spacing + length + 2*width} ${spacing + length + 2*width}'
        stroke-width='${width}'
        stroke='${color}'>
          <path
            stroke-width='${width}'
            d='M${width + spacing/2} ${width/2}h${length}m${spacing/2 + width/2} ${width/2 + spacing/2}v${length}m${-width/2 - spacing/2} ${spacing/2 + width/2}h${-length}m${-spacing/2 - width/2} ${-width/2 - spacing/2}v${-length}'/>
      </svg>`.replace(/\n|\r|\t/gm, '');
  } else {
    borderImageSlice = width / 2 + radius;
    borderImageWidth = width / 2 + radius;
    // prettier-ignore
    borderImageSource = `
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='${spacing + length + width + 2*radius}'
        height='${spacing + length + width + 2*radius}'
        viewBox='0 0 ${spacing + length + width + 2*radius} ${spacing + length + width + 2*radius}'
        stroke-width='${width}'
        stroke='${color}'>
          <path
            d='M${width/2 + radius + spacing/2} ${width/2}h${length}m${spacing/2 + radius} ${radius + spacing/2}v${length}m${-radius - spacing/2} ${spacing/2 + radius}h${-length}m${-spacing/2 - radius} ${-radius - spacing/2}v${-length}' />
          <path
            fill='none'
            d='M${width/2} ${width/2 + radius - spacing/2}a${radius - spacing/2} ${radius - spacing/2} 0 0 1 ${radius - spacing/2} ${-radius + spacing/2}m${length + 2*spacing} 0a${radius - spacing/2} ${radius - spacing/2} 0 0 1 ${radius - spacing/2} ${radius - spacing/2}m0 ${length + 2*spacing}a${radius - spacing/2} ${radius - spacing/2} 0 0 1 ${-radius + spacing/2} ${radius - spacing/2}m${-length - 2*spacing} 0a${radius - spacing/2} ${radius - spacing/2} 0 0 1 ${-radius + spacing/2} ${-radius + spacing/2}'/>
      </svg>`.replace(/\n|\r|\t/gm, '');
  }

  return `url("data:image/svg+xml;utf8,${borderImageSource}") ${borderImageSlice} / ${borderImageWidth} ${borderImageRepeat}`;
}
