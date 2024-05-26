import {memo, useEffect, useState, useMemo, SetStateAction, Dispatch} from 'react';
import { useGetCategoriesQuery, useGetTransactionsQuery } from "../store/apiSlice";
import helper from '../helper/helper';
import {IGraphData} from './ExpenseChart';

type Props = {
    setGraphData: Dispatch<SetStateAction<Array<IGraphData>>>
}

type LabelProps = {
    data: IGraphData | null;
    total: number
}

function Label({setGraphData}: Props) {
    const [labelData, setLabelData] = useState<IGraphData[]>([]);
    const {data, isSuccess, isFetching, isError} = useGetCategoriesQuery(null);
    const {data: transaction} = useGetTransactionsQuery(null);

    useEffect(() => {
        if (isSuccess) {
            const obj: IGraphData[] | [] = helper(transaction, data);
            setLabelData(obj);
            setGraphData(obj);
        }
    }, [transaction])
    
    const total = useMemo(() => labelData.reduce((acc: number, obj: IGraphData) => acc + obj.total, 0), [labelData]);

    return(
        <div>
            {isFetching && <p>Loading</p>}
            {labelData.length ? labelData.map((value: IGraphData, index: number) => <LabelComponent key={index} data={value} total={total}></LabelComponent>) : ''}
            {isError && <p>Error</p>}
        </div>
    )
}

export function LabelComponent({data, total}: LabelProps) {
    if (!data) {
        return <></>
    }
    
    return(
        <div className="flex justify-between py-2">
            <div className="flex flex-row gap-2">
                <div className="flex w-2 h-2 rounded py-3" style={{backgroundColor: data.color}}></div>
                <h3 className="text-md">{data.type}</h3>
            </div>
            <h3 className="font-bold">{Math.round(data.total * 100 / total) ?? 0}%</h3>
        </div>
    )
}

export default memo(Label);