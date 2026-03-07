import GetAllIssues from './ReportIssuesFunction/GetAllIssues';

export default function HrReportIssues() {
  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">Reported <span>Issues</span></h2>
      </div>
      <GetAllIssues />
    </div>
  );
}

