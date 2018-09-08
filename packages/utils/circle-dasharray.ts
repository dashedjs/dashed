import { DashProps, HostProps } from './dash';

export function drawDashedCircle(svgCircle: SVGCircleElement, circleProps: HostProps, dashProps: DashProps) {
  const { width, height } = circleProps;
  const validDashProps = _validateLineDashProps(circleProps, dashProps);
  _drawCircle(svgCircle, width, height, validDashProps.dashWidth);
  const { strokeDasharray, strokeDashOffset } = _calculateCircleStrokeDasharray(circleProps, validDashProps);
  _drawDash(svgCircle, strokeDasharray, strokeDashOffset);
}

function _drawCircle(svgCircle: SVGCircleElement, width: number, height: number, strokeWidth: number) {
  const radius = (Math.min(width, height) - strokeWidth) / 2;
  svgCircle.setAttribute('stroke-width', `${strokeWidth}`);
  svgCircle.setAttribute('cx', `${width / 2}`);
  svgCircle.setAttribute('cy', `${height / 2}`);
  svgCircle.setAttribute('r', `${radius}`);
  return svgCircle;
}

function _drawDash(svgCircle: SVGCircleElement, strokeDasharray: string, strokeDashOffset: string) {
  svgCircle.setAttribute('stroke-dasharray', strokeDasharray);
  svgCircle.setAttribute('stroke-dashoffset', strokeDashOffset);
}

function _calculateCircleStrokeDasharray(hostProps: HostProps, dashProps: DashProps) {
  const { width, height } = hostProps;
  const { dashWidth, dashLength, dashRatio } = _validateLineDashProps(hostProps, dashProps);
  const radius = (Math.min(width, height) - dashWidth) / 2;

  const circonference = 2 * Math.PI * radius;
  const dashCount = Math.floor((circonference - dashRatio * dashLength) / ((1 + dashRatio) * dashLength));
  const dashSpacing =
    Math.round(((circonference - dashCount * dashLength) / (dashCount + 1)) * Math.pow(10, 3)) / Math.pow(10, 3);

  const strokeDasharray = `${dashLength} ${dashSpacing}`;
  const strokeDashOffset = '0';

  return { strokeDasharray, strokeDashOffset, dashWidth };
}

function _validateLineDashProps(hostProps: HostProps, dashProps: DashProps) {
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
