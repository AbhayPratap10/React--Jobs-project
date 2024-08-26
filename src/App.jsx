import {Route,
   createBrowserRouter ,
    RouterProvider,
    createRoutesFromElements,} from "react-router-dom"
import HomePage from  "./pages/HomePage"
import MainLayout from "./layouts/MainLayout"
import JobsPage from "./pages/JobsPage"
import NotFoundPage from "./pages/NotFoundPage"
import JobPage ,{jobLoader} from "./pages/JobPage"
import AddJobPage from "./pages/AddJobPage"
import EditJobPage from "./pages/EditJobPage"

const App = ()=>{

  const addNewJob= async(newJob)=>{
    const res  = await fetch('/api/jobs',{
      method: 'POST',
      headers : {
        'Content-Type':'application/jobs'
      },
      body : JSON.stringify(newJob)
    })
    return;
  }

  const deleteJob = async(jobId)=>{
    const res  = await fetch(`/api/jobs/${jobId}`,{
      method:'DELETE',
    });
    return;
  }
  const updateJob = async(updatedJob)=>{
    const res = await fetch(`/api/jobs/${updatedJob.id}`,{
      method:"PUT",
      headers:{
        'Content-Type': 'application/jobs'
      },
      body: JSON.stringify(updateJob)
    })

  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element = {<MainLayout/>}>
        <Route index element ={<HomePage/>}/>
        <Route path="/jobs" element={<JobsPage/>}/>
        <Route path="/edit-jobs/:id" element={<EditJobPage updateJob={updateJob}/>} loader={jobLoader}/>
        <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob}/>} loader={jobLoader}/>
        <Route path="/add-Job" element={<AddJobPage addNewJob={addNewJob}/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Route>
    )
  )
  return (<RouterProvider router= {router} />)
}

export default App