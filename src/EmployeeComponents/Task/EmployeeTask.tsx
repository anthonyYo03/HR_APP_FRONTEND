import GetMyTasksEmployee from './TasksFunction/GetMyTasksEmployee';

export default function EmployeeTask() {
  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">My <span>Tasks</span></h2>
      </div>
      <GetMyTasksEmployee />
    </div>
  );
}

