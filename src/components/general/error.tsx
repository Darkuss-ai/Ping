import React, {useState, useEffect} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { observer } from "mobx-react-lite";
import { store } from "../../store/store";
import "../../css/error/error.css"

export const Error = observer(() =>
{
    // const [err, setError] = useState<Array<string>>([])

    // const push = (el: string) => { err.push(el); setError(err);}
    // const shift = () => { err.shift(); setError(err) }
    // while (store.appStore.error.length !== 0)
    //     setTimeout(
    //         () =>
    //         {
    //             if(err.length === 3) shift();
    //             push(store.appStore.pop_error(0));
    //         },  2000
    //     )

    useEffect(() => {
        
        if(store.appStore.error.length !== 0)
            setTimeout(() => {
                store.appStore.error_add = false;
                store.appStore.pop_error(0);
            }, 10000)
    })
    console.log(store.appStore.error_add)
    return(
        <div className="errors">
            {
                store.appStore.error.map( (el, i) =>
                {
                    return <div className="error" 
                                key = {i.toString() + '_error'}
                                style = {store.appStore.error.length - 1 === i 
                                    && store.appStore.error_add === true ? 
                                {'animation': '0.3s linear 0s show'}:{}}>
                        <p>{el}</p>
                        <button className='xmark' 
                            onClick={ () =>
                            {
                                store.appStore.error_add = false;
                                store.appStore.pop_error(i);
                            }  }>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                })
            }
        </div>

        )
})

