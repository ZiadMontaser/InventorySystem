const { useState } = require("react");

async function callAPIEndPoint(method, subDir, body, headers)  {
    const result = await fetch(
        `/api/${subDir}`,
        {
            method: method,
            headers: {
                'Content-Type':'application/json',
                'authorization': `Basic ${sessionStorage.getItem('authorization')}`
                },
            body: JSON.stringify(body)
        });
    

    if(!result.ok) {
        return false;
    }
    
    try {
        const data = await result.json();
        return data;
        
    } catch (error) {
        
    }
    return true;
}

export default callAPIEndPoint;