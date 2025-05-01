import Header from "../Components/Header";
import ProjectsCard from "../Components/ProjectsCard";
import Stats from "../Components/Stats";
import TasksCard from "../Components/TasksCard";

export default function Dashboard() {
  return (

      <div className="flex-1 p-6 flex flex-col gap-6">
        <Header title="Home" description="Monitor all of your projects and tasks here" />

        {/* Stats Cards */}
        <Stats />

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Assigned Tasks */}
          <TasksCard />

          {/* Projects */}
          <ProjectsCard />
        </div>
      </div>
        )
}