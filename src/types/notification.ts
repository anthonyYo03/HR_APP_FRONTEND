export interface Notification {
  _id: string;
  type:
    | 'DEFAULT'
    | 'CREATE_ANNOUNCEMENT'
    | 'UPDATE_ANNOUNCEMENT'
    | 'NEW_REPORTED_ISSUE'
    | 'UPDATE_REPORT_ISSUE_STATUS'
    | 'NEW_LEAVE_REQUEST'
    | 'UPDATED_LEAVE_REQUEST'
    | 'UPDATE_STATUS_LEAVE_REQUEST'
    | 'NEW_TASK'
    | 'UPDATE_TASK'
    | 'UPDATE_TASK_STATUS';
  title: string;
  message: string;
  relatedId?: string;
  relatedModel?: 'Announcement' | 'Task' | 'Request' | 'ReportIssue';
  isRead: boolean;
  isHidden: boolean;
  createdAt: string;
}
