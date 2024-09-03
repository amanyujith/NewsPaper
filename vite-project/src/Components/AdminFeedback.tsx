import { RootState } from "../store/store"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
function AdminFeedback() {
    const {user} = useParams<{user:string}>();
    const feedbacks  = useSelector((state:RootState)=>{
        const userFeedback = state.feedback.feedback.find(entry=>entry.user===user);
        return userFeedback ? userFeedback.saved : [];
    })
  return (
    <div>
        <h1>Admin Feedback</h1>
        <table>
            <tbody>
              {feedbacks.map((feedback,index)=>(
                <tr key={index}>
                    <td>{feedback.input1}</td>
                    <td>{feedback.input2}</td>
                    <td>{feedback.input3}</td>
                    <td>{feedback.input4}</td>
                    <td>{feedback.rating}</td>
                </tr>
              ))}
            </tbody>
        </table>
    </div>
  )
}

export default AdminFeedback