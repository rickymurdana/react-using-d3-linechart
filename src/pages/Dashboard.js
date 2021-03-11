import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';

export default function Dashboard(props) {
    const [data, setData] = useState([]);

    const getData = () => {
        return new Promise((resolve, reject) => {
            fetch('./data.json').then(response => {
                return response.json();
            }).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        })
    }

    useEffect(async () => {
        let dataFetch = await getData();
        let arrToChart = dataFetch.data.map(dt => {
            return [dt.date, dt.prob]
        })
        setData(arrToChart);
    }, [])

    return (
        <div className="container">
            <div className="chart">
                <LineChart data={data} className="linechart" />
            </div>
        </div>
    )
}
