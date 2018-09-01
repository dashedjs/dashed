define(["exports"],function(_exports){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.drawDashedLine=function(svgLine,lineProps,dashProps){const{width,height}=lineProps,validDashProps=_validateLineDashProps(lineProps,dashProps);_drawLine(svgLine,width,height,validDashProps.dashWidth);const{strokeDasharray,strokeDashOffset}=_calculateLineStrokeDasharray(lineProps,validDashProps);_drawDash(svgLine,strokeDasharray,strokeDashOffset)};function _drawLine(svgLine,width,height,strokeWidth){svgLine.setAttribute("x1",0);svgLine.setAttribute("y1",height-strokeWidth/2);svgLine.setAttribute("x2",width);svgLine.setAttribute("y2",height-strokeWidth/2);svgLine.setAttribute("stroke-width",strokeWidth);return svgLine}function _drawDash(svgLine,strokeDasharray,strokeDashOffset){svgLine.setAttribute("stroke-dasharray",strokeDasharray);svgLine.setAttribute("stroke-dashoffset",strokeDashOffset)}function _calculateLineStrokeDasharray(hostProps,dashProps){const{width}=hostProps,{dashWidth,dashLength,dashRatio}=_validateLineDashProps(hostProps,dashProps),dashCount=1+Math.floor((width-dashLength)/((1+dashRatio)*dashLength)),dashSpacing=Math.round(1000*((width-dashCount*dashLength)/(dashCount-1)))/1000;return{strokeDasharray:`${dashLength} ${dashSpacing}`,strokeDashOffset:0,dashWidth}}function _validateLineDashProps(hostProps,dashProps){const{width}=hostProps;let{dashWidth,dashLength,dashRatio}=dashProps;if(0>dashWidth||0>dashLength||0>dashRatio){throw new Error(`dashWidth, dashLength and dashRatio must be positive numbers`)}const ref=width;dashLength=dashLength>ref?ref:dashLength;dashWidth=dashWidth>ref/2?ref/2:dashWidth;dashRatio=dashLength*(1+dashRatio)>ref?ref-dashLength:dashRatio;return{dashWidth,dashLength,dashRatio}}});