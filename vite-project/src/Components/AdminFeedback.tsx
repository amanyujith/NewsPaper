import { RootState } from "../store/store"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Button from "../Utilities/Button";
function AdminFeedback() {
    const {user} = useParams<{user:string}>();
    const feedbacks  = useSelector((state:RootState)=>{
        const userFeedback = state.feedback.feedback.find(entry=>entry.user===user);
        return userFeedback ? userFeedback.saved : [];
    })
    console.log(feedbacks);
    
  return (
    <div className="p-5">
        <div className="flex justify-between bg-slate-100 mb-5">
          <Button value="Back" onClick={()=>window.location.href='/admin'} />
        <h1 className=" text-2xl font-mono"> Feedback</h1>
     
        </div>
        <table className="min-w-full divide-y divide-gray-200 bg-white p-5">
  {feedbacks.map((feedback, index) => (
    <tbody key={index}>
      <tr className="border-2 border-gray-200 hover:bg-gray-50">
        <td className="px-6 py-4 text-left font-medium text-gray-700 border-2">What type of content would you like to see more of?</td>
        <td className="px-6 py-4 text-left text-gray-500">{feedback.input1}</td>
      </tr>
      <tr className="border-2 border-gray-200 hover:bg-gray-50">
        <td className="px-6 py-4 text-left font-medium text-gray-700 border-2">Do you find the reading experience on our website/app comfortable?</td>
        <td className="px-6 py-4 text-left text-gray-500">{feedback.input2}</td>
      </tr>
      <tr className="border-2 border-gray-200 hover:bg-gray-50">
        <td className="px-6 py-4 text-left font-medium text-gray-700 border-2">Are the headlines of our articles clear and engaging?</td>
        <td className="px-6 py-4 text-left text-gray-500">{feedback.input3}</td>
      </tr>
      <tr className="border-2 border-gray-200 hover:bg-gray-50">
        <td className="px-6 py-4 text-left font-medium text-gray-700 border-2">How satisfied are you with the search functionality on our platform?</td>
        <td className="px-6 py-4 text-left text-gray-500">{feedback.input4}</td>
      </tr>
      <tr className="border-2 border-gray-200 hover:bg-gray-50">
        <td className="px-6 py-4 text-left font-medium text-gray-700 border-2">Rate us out of 5</td>
        <td className="px-6 py-4 text-left font-bold text-gray-900">{feedback.rating}</td>
      </tr>
    </tbody>
  ))}
</table>

    </div>
  )
}

export default AdminFeedback