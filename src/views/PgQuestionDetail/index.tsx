import React, {useEffect, useState} from 'react'
import './style.scss'
//questiondetails

function query () {
    let url = window.location.href
    if (url.indexOf('?') == -1) return null
    var arr1 = url.split("?");
    var params = arr1[1].split("&");
    var obj = {};//声明对象
    for (var i = 0; i < params.length; i++) {
        var param = params[i].split("=");
        obj[param[0]] = param[1];//为对象赋值
    }
    return obj;
}
function PgQuestionDetail(props) {
    console.log(props)
    // let details: any = query()
    // console.log(decodeURIComponent(details.answer))
    let details = props.location.state
    return(
        <>
            <div className='question-title'>题目</div>
            <div className="question-wrap" dangerouslySetInnerHTML={{ __html:details.question}}>
                {/* {JSON.stringify(query()) != 'null' ? details.question : ''} */}
                {}
            </div>
            <div className='question-title'>答案</div>
            <div className="question-wrap" dangerouslySetInnerHTML={{ __html:details.answer}}>
                {}
            </div>
        </>
    )
}

export default PgQuestionDetail