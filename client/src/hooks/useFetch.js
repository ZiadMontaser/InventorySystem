import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  function refresh() {

    const abortCont = new AbortController();

    fetch(url, {headers: {'authorization': `Basic ${sessionStorage.getItem('authorization')}`}}, { signal: abortCont.signal })
    .then(res => {
      if (!res.ok) { // error coming back from server
        throw Error('could not fetch the data for that resource');
      } 
      return res.json();
    })
    .then(data => {
      setIsPending(false);
      setData(data);
      setError(null);
    })
    .catch(err => {
      if (err.name === 'AbortError') {
        console.log('fetch aborted')
      } else {
        // auto catches network / connection error
        setIsPending(false);
        setError(err.message);
      }
    })
    
    // abort the fetch
    return () => abortCont.abort();
  }

  useEffect(refresh, [url])

  return {refresh, data,setData, isPending, error };
}
 
export default useFetch;