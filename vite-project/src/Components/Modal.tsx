interface ModalProps{
    message:string
    isOpen:boolean
}
const Modal = ({message,isOpen}:ModalProps)=>{
    console.log("isooen",isOpen)
    if(!isOpen) return null
    return <div className="fixed inset-0 flex items-center justify-end  bg-black bg-opacity-50 z-50">
    <div className="bg-white p-3 h-14 rounded shadow-lg mr-36">
      <h1 className="mb-4">{message}</h1>
     
    </div>
  </div>
}
export default Modal;