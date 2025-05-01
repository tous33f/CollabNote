import Header from "../Components/Header";
import Stats from "../Components/Stats";
import MyTasks from "../Components/TasksViewer";

export default function Project() {
  return (

      <div className="flex-1 p-6 flex flex-col gap-6">
        <Header title="Home" description="Monitor all of your projects and tasks here" />

        {/* Project info  */}
        <div className="flex justify-between items-center">
          <div className="flex justify-center gap-2" >
            <div className="w-8 h-8 rounded bg-purple-600 text-white flex items-center justify-center text-lg font-semibold">M</div>
            <p className="text-lg text-blakc font-semibold">Project</p>
          </div>
          <button className="bg-blue-600 text-white font-semibold px-3 py-1 rounded flex items-center gap-1" >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
            Edit project
          </button>
        </div>

        {/* Stats Cards */}
        <Stats />

        {/* Tasks  */}
        <MyTasks />

      </div>
    )
}