import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import EditModal from '../admin/EditModal';
import RemoveModal from '../admin/RemoveModal';

const ProductPreviewOverlay = (props) => {
    const {userData} = useContext(UserContext);
    
  
    const history=useHistory();
    const onClickView=()=>{
        console.log("View "+props.isbn)
        history.push(`/product/${props.isbn}`)
    }

    const [removeModalIsOpen,setRemoveModalIsOpen] = useState(false);
    const [editModalIsOpen,setEditModalIsOpen] = useState(false);

    const openRemoveModal=()=> {
        setRemoveModalIsOpen(true);        
    }
    const openEditModal=()=> {
        setEditModalIsOpen(true);
    }
    const onClickEdit=()=>{
        console.log("Edit "+props.isbn);
        openEditModal();       
    }
    const onClickRemove=()=>{
        console.log("Remove "+props.isbn);
        openRemoveModal();
    }

    return (
        <div className="overlay">
            
            <button onClick={props.onClickAddToCart}>
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M10.975 8l.025-.5c0-.517-.067-1.018-.181-1.5h5.993l-.564 2h-5.273zm-2.475 10c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm11.305-15l-3.432 12h-10.428l-.455-1.083c-.323.049-.653.083-.99.083-.407 0-.805-.042-1.191-.114l1.306 3.114h13.239l3.474-12h1.929l.743-2h-4.195zm-6.305 15c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm-4.5-10.5c0 2.485-2.018 4.5-4.5 4.5-2.484 0-4.5-2.015-4.5-4.5s2.016-4.5 4.5-4.5c2.482 0 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z"/></svg>
                Add
            </button>
            <button onClick={onClickView}>
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.21 0-4 1.791-4 4s1.79 4 4 4c2.209 0 4-1.791 4-4s-1.791-4-4-4zm-.004 3.999c-.564.564-1.479.564-2.044 0s-.565-1.48 0-2.044c.564-.564 1.479-.564 2.044 0s.565 1.479 0 2.044z"/></svg>    
                View
            </button>
            <div className="admin-buttons">
                <button onClick={onClickEdit} className="yellow">
                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                    Edit
                </button>
                <button onClick={onClickRemove} className="red">
                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"/></svg>
                    Remove
                </button>
            </div>
            
            <EditModal book={props.bookDetails} modalIsOpen={editModalIsOpen} setIsOpen={setEditModalIsOpen} setIsHover={props.setIsHover}/>
            <RemoveModal isbn={props.isbn} modalIsOpen={removeModalIsOpen} setIsOpen={setRemoveModalIsOpen} setIsHover={props.setIsHover}/>
        </div>
    );
};

export default ProductPreviewOverlay;