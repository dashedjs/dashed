export interface DashProps {
  dashWidth: number;
  dashLength: number;
  dashRatio: number;
}

export interface HostProps {
  width: number;
  height: number;
  borderRadius?: number;
}

export interface Dash {
  drawDash(): void;
}
