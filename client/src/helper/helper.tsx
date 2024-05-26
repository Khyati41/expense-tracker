import { ITransaction } from '../components/History';
import { ICategory } from '../components/Form';
import { IGraphData } from '../components/ExpenseChart';

function helper(transactions: ITransaction[], categories: ICategory[]): IGraphData[] {
    const arr = [];

    for (const category of categories) {
        const {type, total, color} = getData(category, transactions)
        arr.push({type, total: total, color});
    }

    return arr;
}

function getData(category: ICategory, transactions: ITransaction[]): IGraphData {
    const transactionsByType = transactions.filter((ele: ITransaction) => ele.category.type === category.type);
    const total = transactionsByType.reduce((acc: number, obj: ITransaction) => acc + obj.amount, 0);
    
    return {type: category.type, total, color: category.color}
}

export function getTotal(values: Array<IGraphData>): number {
    return values.length ? values.reduce((acc: number, obj:IGraphData) => acc + obj.total, 0) : 0;
}

export default helper;