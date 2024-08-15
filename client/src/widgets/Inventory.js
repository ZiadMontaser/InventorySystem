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
    const {refresh, data: items,setData: setItems, isPending, error } = useFetch(`/api/items`);
    const isAdmin = Number(sessionStorage.getItem('isAdmin')) === 1;

    async function handleQuantityChange(id, change){
        const newItems = [...items];
        newItems[id].quantity += change;
        setItems(newItems);

        await callEndPoint('PATCH', `items/${newItems[id]._id}`, newItems[id])
    }

    return ( 
        <div className="inventory">
            <h1>Inventory</h1>

            {isAdmin && <AddItemForm refresh={refresh} />}

            <div className="inventory-items">
                <div>Type</div>
                <div>Name</div>
                <div>Quantity</div>
            </div>

            {!isPending && items.map(({type, name, quantity}, index)=>
                <div>
                    <div className="inventory-item">
                        <div>{type}</div>
                        <div>{name}</div>
                        <div className="quantity-element">
                                {isAdmin && <button onClick={()=>handleQuantityChange(index, -1)}> -1</button>}
                                <div>{quantity}</div>
                                {isAdmin && <button onClick={()=>handleQuantityChange(index, 1)}> +1</button>}
                            </div>
                        </div>
                        <div className='break-line' />
                </div>
            )}
            

        </div>
     );
}
 
export default Inventory;