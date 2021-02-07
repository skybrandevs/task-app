import { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axiosClient from '../services/axiosClient';
import { Button} from 'react-bootstrap'
import { Image } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import UpdateTaskForm from './UpdateTaskForm';
  
 
export default ({data, onUpdate}) => {
   

    const [columns, setColumns] = useState([
        {
        dataField: 'title',
        text: 'Task Title'
      }, {
        dataField: 'description',
        text: 'Task Description'
      }, 
      {
        dataField: 'status',
        text: 'Status'
      },
      {
        dataField: 'action',
        text: 'Action'
      }
      ])
    


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (data) => {

        setTask(data)
        setShow(true); 

    }
    const [task, setTask] = useState({})
  
    return (
        <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task Data</Modal.Title>
        </Modal.Header>
        <Modal.Body p='3'>
        <UpdateTaskForm onUpdate={onUpdate} task={task}/>
        </Modal.Body>
    
      </Modal>
        <BootstrapTable  
        data={data.map((data) => {
            return {
                ...data, 
              status: (data.completed == 1 ?  <span className="badge badge-pill badge-success">Completed</span>
              : <span className="badge badge-pill badge-warning">Pending</span>),
              action : <div className='d-flex justify-content-around'>
                            <Image src='/eye.svg'  className='cursor-pointer' height='20px' width='20px' />
                            <Image src='/pencil.svg' onClick={()=> handleShow(data)} className='cursor-pointer' height='20px' width='20px' />
                    </div>
            
            //   <span class="badge badge-pill badge-danger">Danger</span>
            //   <span class="badge badge-pill badge-warning">Warning</span>/p>
            }})}
        
         
       
      keyField='id' columns={ columns } />
      </>

    )

}