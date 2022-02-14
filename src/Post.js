import React from 'react'
import { useQuery } from 'react-query';
import { client } from './react-query-client';

const fetcher = url => fetch(url).then(res => res.json());

function Post({post, onClick}) {

    const {data, isLoading, isIdle, refetch} = useQuery(["post", post],() => fetcher(`
    https://jsonplaceholder.typicode.com/posts/${post}`),{
        // cacheTime: 0, // how long program keep this query when inactive
        // enabled: false // set to false so this query not fecthing, set isIdle to true
        // staleTime: Infinity //make query in fresh state by given time, it will not refetching in fresh state
    });

    if(isLoading){
        return <h2>Loading post</h2>
    }

    if(isIdle){
        return(
            <>
            <h2>Not Ready</h2>
            <button onClick={() => refetch()}>Refecth!</button>
            </>
        ) 

    }

    const dummy = client.getQueryData('dummy');

    return (
        <div>
            <button onClick={onClick}>Go Back</button>
            <h1>{data.title}</h1>
            <h3>{data.body}</h3>
            <ul>
                <li>{dummy.id}</li>
                <ul>
                    {dummy.keranjang.map(item => {
                        return(
                            <li>{item.name} : {item.amount}</li>
                        )
                    })}
                </ul>
            </ul>
        </div>
    )
}

export default Post
