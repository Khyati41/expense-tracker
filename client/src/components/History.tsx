import {memo} from 'react';
import {FaTrash} from 'react-icons/fa';
import {useGetTransactionsQuery, useDeleteTransactionMutation} from '../store/apiSlice';
import {ICategory} from './Form';

export interface ITransaction {
    _id: string;
    name: string;
    category: ICategory;
    amount: number;
}

interface ITransactionProps {
    transaction: ITransaction
}

function History() {

    const {data, isSuccess, isFetching, isError} = useGetTransactionsQuery(null);
    return(
        <div className="flex flex-col py-8 gap-4">
            <h1 className="font-bold pb-2 text-xl text-center">History</h1>
            {isFetching && <p>Loading</p>}
            {isSuccess && data?.map((value: ITransaction, index: number) => <Transaction key={index} transaction={value} />)}
            {isError && <p>Error</p>}
        </div>
    )
}

function Transaction({transaction}: ITransactionProps) {

    const [deleteTransaction] = useDeleteTransactionMutation();

    const handleDelete = async (transactionId: string) => {
        await deleteTransaction(transactionId);
    }
    return(
        <div className="item flex justify-center bg-gray-100 drop-shadow-md rounded-r p-2" style={{borderRight: `10px solid ${transaction?.category?.color || '#ef6td8'}`}}>
            <button onClick={() => handleDelete(transaction?._id)}>{<FaTrash style={{color: `${transaction?.category?.color}`}} />}</button>
            <span className="w-full text-center">{transaction.name}</span>
        </div>
    )
}

export default memo(History);