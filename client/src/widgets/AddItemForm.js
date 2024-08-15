import { useState } from "react";
import callAPIEndPoint from "../hooks/useAPI";

const AddItemForm = (refresh) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [type, setType] = useState('Mechanical Part');

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function AddItem(event) {
        event.preventDefault();
        setIsSubmitting(true);

        const item = {
            type,
            name,
            quantity,
        };

        const res = await callAPIEndPoint('POST', `items`, item);

        setName('');
        setQuantity(1);
        
        refresh();
        setIsSubmitting(false);
        
    }

    return ( 

        <div className="inventory-items-input">
                <form onSubmit={AddItem}>
                    <label>Type</label>
                    <label>Name</label>
                    <label>Quantity</label>

                    <select value={type} onChange={(e)=>setType(e.target.value)}>
                    <option>Mechanical Part</option>
                    <option>Raw Material</option>
                    <option>Electrical Part</option>
                    </select>

                    <input value={name} onChange={(e)=>setName(e.target.value)} placeholder='name'></input>

                    <input value={quantity} onChange={(e)=> setQuantity(Math.max(1,e.target.value))} placeholder='1' type='number'></input>


                    {!isSubmitting && <button>Add</button>}
                    {isSubmitting && <button disabled>Adding ...</button>}
                </form>
        </div>
     );
}
 
export default AddItemForm;