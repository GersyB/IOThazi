import React, {useEffect, useState} from 'react'
import io from 'socket.io-client'

import Card from './Card'
import Chart from './Chart'
import C2DMessage from './C2DMessage'
import States from './States'

const socket = io('http://localhost:5000')

let temperature = 0.0;
let humidity = 0.0;
let watertemperature = 0.0;
let tds = 0.0;
let pump = false;
let led = false;

const Dashboard = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        socket.on('payload', payload => {
            setData(currentData => [...currentData, payload])
            temperature = payload.Temperature;
            humidity = payload.Humidity;
        })
    }, [])
    if (data.length > 10) {
        data.shift()
    }

    return <div>
        <h1 className="title">Vertical farm data</h1>
        <div className="card-container">
            <Card name="Temperature" icon="fas fa-tachometer-alt fa-2x" value={temperature}/>
            <Card name="Humidity" icon="fas fa-tint fa-2x" value={humidity} />
            <Card name="Water temperature" icon="fas fa-water fa-2x" value={watertemperature} />
        </div>
        <div>
        </div>
        <div>
        </div>
        <div className="card-container">
            <States name="Tds" icon="fas fa-atom fa-2x" value={tds} type="0"/>
            <States name="Pump" icon="" value={pump} type="1"/>
            <States name="LEDs" icon="" value={led} type="2"/>
        </div>
    </div>
}

export default Dashboard
