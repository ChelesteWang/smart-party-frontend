import React from "react"
import './style.css'

function Detail() {
    return (
        <div className='detail' style={{ width: 750, height: 200 }}>
            <h1 className='title'>概况统计</h1>
            <div className='container'>
                <p>党员总数</p>
                <p>100人</p>
            </div>
            <div className='container'>
                <p>预备党员</p>
                <p>56人</p>
            </div>
            {/* <br style={{ clear: 'both', }} /> */}
            <div className='container'>
                <p>正式党员</p>
                <p>44人</p>
            </div>
            <div className='container'>
                <p>教职工党员</p>
                <p>26人</p>
            </div>
        </div>
    )
}

export default Detail