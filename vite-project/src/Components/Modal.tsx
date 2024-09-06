interface ModalProps{
    message:string
    isOpen:boolean
    Icon: React.ReactNode;
}
const Modal = ({message,isOpen, Icon}:ModalProps)=>{
    console.log("isooen",isOpen)
    if(!isOpen) return null
    return <div className="fixed inset-0 flex items-center justify-end  bg-black bg-opacity-50 z-50">
    <div className="bg-white p-3 h-14 rounded shadow-lg mr-36 flex gap-3">
      <h1 className="mb-4">{message}</h1>
      {Icon}
    </div>
  </div>
}
export default Modal;