import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getSingleBlog } from "../apis"

const ReadBlog = ({useQueryClientFn})=>{
  const {id} = useParams()
  const queryClient = useQueryClientFn()
  const cachedBlog = queryClient.getQueryData(["blogs"])?.find(blog=>blog.id===id)
  const {data: currentBlog } = useQuery({queryKey: ['currentBlog', id], queryFn: ()=>(getSingleBlog(id)), enabled: !cachedBlog})

  
  return(
      <div className="flex flex-col h-screen items-center">
      <h1 className="text-5xl capitalize">{cachedBlog ? cachedBlog.title : currentBlog?.title}</h1>
      <div>
        {cachedBlog ? cachedBlog.body : currentBlog?.body}
      </div>
    </div>
  )
}

export default ReadBlog