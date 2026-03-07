import GetAllRequestsHR from './RequestFunction/GetAllRequestsHR';

export default function HrRequest() {
  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">Leave <span>Requests</span></h2>
      </div>
      <GetAllRequestsHR />
    </div>
  );
}

