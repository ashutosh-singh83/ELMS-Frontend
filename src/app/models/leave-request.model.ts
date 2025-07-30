export interface LeaveRequest {
  startDate: string;  // use ISO string
  endDate: string;
  reason: string;
  employeeId: number;
}
