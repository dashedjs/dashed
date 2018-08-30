export function drawDashedLine(svgLine, lineProps, dashProps) {
  const { width, height } = lineProps;
  const validDashProps = _validateLineDashProps(lineProps, dashProps);
  _drawLine(svgLine, width, height, validDashProps.dashWidth);
  const { strokeDasharray, strokeDashOffset } = _calculateLineStrokeDasharray(lineProps, validDashProps);
  _drawDash(svgLine, strokeDasharray, strokeDashOffset);
}

function _drawLine(svgLine, width, height, strokeWidth) {
  svgLine.setAttribute('x1', 0);
  svgLine.setAttribute('y1', height - strokeWidth / 2);
  svgLine.setAttribute('x2', width);
  svgLine.setAttribute('y2', height - strokeWidth / 2);
  svgLine.setAttribute('stroke-width', strokeWidth);
  return svgLine;
}

function _drawDash(svgLine, strokeDasharray, strokeDashOffset) {
  svgLine.setAttribute('stroke-dasharray', strokeDasharray);
  svgLine.setAttribute('stroke-dashoffset', strokeDashOffset);
}

function _calculateLineStrokeDasharray(hostProps, dashProps) {
  const { width } = hostProps;
  const { dashWidth, dashLength, dashRatio } = _validateLineDashProps(hostProps, dashProps);

  const dashCount = 1 + Math.floor((width - dashLength) / ((1 + dashRatio) * dashLength));
  const dashSpacing = (width - dashCount * dashLength) / (dashCount - 1);

  const strokeDasharray = `${dashLength} ${dashSpacing}`;
  const strokeDashOffset = 0;

  return { strokeDasharray, strokeDashOffset, dashWidth };
}

function _validateLineDashProps(hostProps, dashProps) {
  const { width } = hostProps;
  let { dashWidth, dashLength, dashRatio } = dashProps;

  if (dashWidth < 0 || dashLength < 0 || dashRatio < 0) {
    throw new Error(`dashWidth, dashLength and dashRatio must be positive numbers`);
  }
  const ref = width;
  dashLength = dashLength > ref ? ref : dashLength;
  dashWidth = dashWidth > ref / 2 ? ref / 2 : dashWidth;
  dashRatio = dashLength * (1 + dashRatio) > ref ? ref - dashLength : dashRatio;

  return { dashWidth, dashLength, dashRatio };
}
