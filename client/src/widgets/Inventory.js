import {useContext, useState} from 'react'
import {redirect, useNavigate} from 'react-router-dom'
import callEndPoint from '../hooks/useAPI'
import useFetch from '../hooks/useFetch'
import AddItemForm from './AddItemForm';

const Inventory = () => {
    const navigator = useNavigate();
    if(!sessionStorage.getItem('authorization')){
        navigator('/');
    }
    const {refresh, data: items,setData: setItems, isPending, error } = useFetch(`https://inventory-system-server-woad.vercel.app/api/items`);
    const isAdmin = Number(sessionStorage.getItem('isAdmin')) === 1;

    async function handleQuantityChange(id, change){
        const newItems = [...items];
        newItems[id].quantity += change;
        setItems(newItems);

        await callEndPoint('PATCH', `items/${newItems[id]._id}`, newItems[id])
    }

    const [pendingADelete, setPendingADelete] = useState(false);

    async function handleDeleteItem(id) {
        const item = items[id];
        setPendingADelete(true);

        console.log(item._id)

        const res = await callEndPoint('DELETE', `items/${item._id}`);
    
        if(typeof res === 'boolean' && !res){
            alert("Somthing went wrong");
        }

        const newItems = [...items];
        newItems.splice(id, 1)
        setItems(newItems);

        setPendingADelete(false)
    }

    return ( 
        <div className="inventory">
            <h1>Inventory</h1>

            {isAdmin && <AddItemForm refresh={refresh} />}

            <div className="inventory-items">
                <div>Type</div>
                <div>Name</div>
                <div>Quantity</div>
                <div>Action</div>
            </div>

            {isPending && <div className='wait-screen'>
                <h3>Loading Data ...</h3>
            </div>}

            {!isPending && items.map(({type, name, quantity}, index)=>
                <div key={index}>
                    <div className="inventory-item">
                        <div>{type}</div>
                        <div>{name}</div>
                        <div className="quantity-element">
                                {isAdmin && <button onClick={()=>handleQuantityChange(index, -1)}> -1</button>}
                                <div>{quantity}</div>
                                {isAdmin && <button onClick={()=>handleQuantityChange(index, 1)}> +1</button>}
                                {isAdmin && !pendingADelete && <button className='delete-button' onClick={()=>handleDeleteItem(index)}>Delete</button>}    
                                {isAdmin &&  pendingADelete && <button className='disabled-delete-button' disabled >Delete</button>}    
                            </div>
                        </div>
                        <div className='break-line' />
                </div>
            )}
            

        </div>
     );
}
 
export default Inventory;