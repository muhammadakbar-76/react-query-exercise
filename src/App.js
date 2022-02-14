import React,{useState} from 'react'
import { useQuery } from 'react-query';
import { useMutation } from 'react-query';
import { client } from './react-query-client';

const fetcher = (url, body) => 
{
    return fetch(url, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
    }).then(data => data.json());
}

const App = () => {

    const [lang, setLang] = useState("");

    const {data: favLang, isLoading, isError} = useQuery("favLang", async () => {
        try {
            const data = await fetch("http://localhost:3001/api/get-records");
            return await data.json();
        } catch (error) {
            console.error(error);
        }
    }, {select: data => data.lang, staleTime: 0});

      const mutation = useMutation(body => fetcher('http://localhost:3001/api/create-record',body), {
        onSuccess(data) {
          console.log("request is completed", {data});
          client.invalidateQueries('favLang'); // or you can use refetch from destructuring useQuery
          setLang("");
        },
        onError(error) {
          console.log("error", {error});
        }
      });

    const callMutation = () => {
        mutation.mutate({record: lang});
    }

    if (isLoading) {
        return <h2>Loading..</h2>
    }

    if(isError){
        return <h2>Error</h2>
    }

    return (
        <div>
            <h1 className='text-center'>Some Fav Languages</h1>
            {
            favLang.map((item,index) => {
                return <li key={index+1}>{item}</li>
            })}
            <input type="text" onChange={e => setLang(e.target.value)} value={lang}/>
            <button onClick={() => callMutation()}>Submit</button>
        </div>
    )
}

export default App
