export function drawDashedRect(svgRect, hostProps, dashProps) {
  const { width, height, borderRadius } = hostProps;
  const validDashProps = _validateRectDashProps(hostProps, dashProps);
  _drawRect(svgRect, width, height, borderRadius, validDashProps.dashWidth);
  const { strokeDasharray, strokeDashOffset } = _calculateRectStrokeDasharray(hostProps, validDashProps);
  _drawDash(svgRect, strokeDasharray, strokeDashOffset);
}

function _drawRect(svgRect, width, height, borderRadius, strokeWidth) {
  svgRect.setAttribute('stroke-width', strokeWidth);
  svgRect.setAttribute('x', strokeWidth / 2);
  svgRect.setAttribute('y', strokeWidth / 2);
  svgRect.setAttribute('width', width - strokeWidth);
  svgRect.setAttribute('height', height - strokeWidth);
  svgRect.setAttribute('rx', borderRadius);
  svgRect.setAttribute('ry', borderRadius);
  return svgRect;
}

function _drawDash(svgRect, strokeDasharray, strokeDashOffset) {
  svgRect.setAttribute('stroke-dasharray', strokeDasharray);
  svgRect.setAttribute('stroke-dashoffset', strokeDashOffset);
}

function _calculateRectStrokeDasharray(hostProps, dashProps) {
  const { width, height, borderRadius } = hostProps;
  const { dashWidth, dashLength, dashRatio } = _validateRectDashProps(hostProps, dashProps);

  const lineX = width - dashWidth - 2 * borderRadius;
  const lineY = height - dashWidth - 2 * borderRadius;
  const arcCorner = (2 * Math.PI * borderRadius) / 4;

  const dashCountX = _calculatePathDashCount(lineX, { dashLength, dashRatio });
  const dashCountY = _calculatePathDashCount(lineY, { dashLength, dashRatio });
  const dashCountCorner = _calculatePathDashCount(arcCorner, { dashLength, dashRatio });

  const dashSpacingX = _calculatePathDashSpacing(lineX, dashCountX, dashLength);
  const dashSpacingY = _calculatePathDashSpacing(lineY, dashCountY, dashLength);
  const dashSpacingCorner = _calculatePathDashSpacing(arcCorner, dashCountCorner, dashLength);

  const strokeDashArrayX = _calculatePathStrokeDasharray(dashCountX, dashSpacingX, dashSpacingCorner, dashLength);
  const strokeDashArrayCorner1 = _calculatePathStrokeDasharray(
    dashCountCorner,
    dashSpacingCorner,
    dashSpacingY,
    dashLength
  );
  const strokeDasharrayY = _calculatePathStrokeDasharray(dashCountY, dashSpacingY, dashSpacingCorner, dashLength);
  const strokeDashArrayCorner2 = _calculatePathStrokeDasharray(
    dashCountCorner,
    dashSpacingCorner,
    dashSpacingX,
    dashLength
  );

  const strokeDasharray = `${strokeDashArrayX}${strokeDashArrayCorner1}${strokeDasharrayY}${strokeDashArrayCorner2}`.trim();
  const strokeDashOffset = -dashSpacingX;

  return { strokeDasharray, strokeDashOffset, dashWidth };
}

function _validateRectDashProps(hostProps, dashProps) {
  const { width, height } = hostProps;
  let { dashWidth, dashLength, dashRatio } = dashProps;

  if (dashWidth < 0 || dashLength < 0 || dashRatio < 0) {
    throw new Error(`dashWidth, dashLength and dashRatio must be positive numbers`);
  }
  const ref = Math.min(width, height);
  dashLength = dashLength > ref ? ref : dashLength;
  dashWidth = dashWidth > ref / 2 ? ref / 2 : dashWidth;
  dashRatio = dashLength * (1 + dashRatio) > ref ? ref - dashLength : dashRatio;

  return { dashWidth, dashLength, dashRatio };
}

function _calculatePathDashCount(pathLength, dashProps) {
  const { dashLength, dashRatio } = dashProps;
  if (pathLength - dashRatio * dashLength <= 0) return 0;
  return Math.floor((pathLength - dashRatio * dashLength) / ((1 + dashRatio) * dashLength));
}

function _calculatePathDashSpacing(pathLength, dashCount, dashLength) {
  if (dashCount === 0) return pathLength / 2;
  return Math.round(((pathLength - dashCount * dashLength) / (dashCount + 1)) * Math.pow(10, 3)) / Math.pow(10, 3);
}

function _calculatePathStrokeDasharray(dashCount, dashSpacing, adjacentdashSpacing, dashLength) {
  if (dashCount === 0) return `0 ${dashSpacing + adjacentdashSpacing} `;
  return `${dashLength} ${dashSpacing} `.repeat(dashCount - 1) + `${dashLength} ${dashSpacing + adjacentdashSpacing} `;
}
