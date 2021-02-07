import { useRouter } from "next/router";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { startLogout } from "../redux/actions/auth";
import UpdateTaskForm from "./UpdateTaskForm";

const Sidebar = ({setCount, onUpdate, startLogout}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {

     
        setShow(true); 

    }
    const router = useRouter();
   
    return (
        <div className='sidebar-box'>
             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create Task Data</Modal.Title>
                </Modal.Header>
                <Modal.Body p='3'>
                <UpdateTaskForm onUpdate={() =>  onUpdate()} />
                </Modal.Body>

            </Modal>
            <div className='sidebar-item pl-5 cursor-pointer'>
                <h6 className='text-align-center' onClick={()=> handleShow()}>  Create Task</h6>
            </div>

            <div className='sidebar-item pl-5 mt-5 cursor-pointer'>
                <h6 className='text-align-center' onClick={()=> {
                    startLogout()
                    router.push('/login')
                }}> Sign Out</h6>
            </div>
        </div>
    )



}


const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    // startFetchLeads: () => dispatch(startFetchLeads())
  })
  
  export default connect(undefined, mapDispatchToProps)(Sidebar)