import {memo, useState, useEffect} from 'react'
import { Doughnut } from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
import Label from './Label';
import {getTotal} from '../helper/helper'

Chart.register(ArcElement)

export interface IGraphData {
    type: string; 
    total: number; 
    color: string
}

const config: any = {
    data: {
        datasets: []
    },
    options: {
        cutout: 115
    }
}

function ExpenseChart() {

    const [graphData, setGraphData] = useState<IGraphData[]>([]);
    const [configData, setConfig] = useState(config);

    useEffect(() => {
        const config = {
            data: {
                datasets: [{
                    data: graphData.length && graphData.map((ele: IGraphData) => ele.total),
                    backgroundColor: graphData.length && graphData.map((ele: IGraphData) => ele.color),
                    hoverOffset: 4,
                    borderRadius: 30,
                    spacing: 10
                  }]
            },
            options: {
                cutout: 115
            }
        }
        setConfig(config)
    }, [setGraphData, graphData])
    return(
        <div className="flex flex-col mx-auto">
        <div className="item">
            <div className="chart relative">
                {graphData.length ? <Doughnut {...configData}></Doughnut> : ''}
                <h3 className="mb-4 font-bold title text-center">Total
                    <span className="block text-3xl text-emerald-400">${getTotal(graphData)}</span>
                </h3>
            </div>
        </div>

        <div className="flex flex-col py-10 gap-4">
           <Label setGraphData={setGraphData}/>
        </div>
    </div>
    )
}

export default memo(ExpenseChart);