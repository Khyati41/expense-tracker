import {memo, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import History from './History';
import { useAddTransactionMutation, useGetCategoriesQuery } from '../store/apiSlice';
import { useSpeechContext } from "@speechly/react-client";

interface IExpenseForm {
    name: string;
    amount: string;
    category: string;
}

export interface ICategory {
    _id: string;
    type: string;
    color: string;
}

interface ICategoriesDropdownProps {
    category: ICategory
}

function Form() {

    const {register, handleSubmit, resetField, setValue, watch, getValues} = useForm<IExpenseForm>();
    const [addTransaction, {isLoading}] = useAddTransactionMutation()
    const {data, isSuccess} = useGetCategoriesQuery(null);
    const { segment } = useSpeechContext();

    useEffect(() => {
        if(segment) {
            if (segment.intent.intent === 'add_expense') {
                const expense = data.find((e: any) => e.type === 'Expense')
                setValue('category', expense._id)
            } else if (segment.intent.intent === 'add_savings') {
                const expense = data.find((e: any) => e.type === 'Saving')
                setValue('category', expense._id)
            } else if (segment.intent.intent === 'add_category') {
                console.log(segment)    
            } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
                handleForm(getValues())
            } else if (segment.isFinal && segment.intent.intent === 'delete_transaction') {
                resetField('name');
                resetField('category')
                resetField('amount');
            }

            segment.entities.forEach((event: any) => {
                switch (event.type) {
                    case 'amount':
                        setValue('amount', event.value)
                        break;
                    case 'category':
                        setValue('name', event.value.toLowerCase())
                        break;
                }
            })
        }
        
    }, [segment, watch])

    async function handleForm(formData: IExpenseForm) {
        if (formData && !Object.values(formData).includes('' || undefined)) {
            await addTransaction(formData)
            resetField('name');
            resetField('category')
            resetField('amount');
        } else {
            alert('Please fill all fields');
        }
    }
    return (
        <div className="px-20">
            <h2 className="font-bold pb-4 text-xl text-center">Transaction</h2>

            <form onSubmit={handleSubmit(handleForm)}>
                <div className="grid gap-4">
                    <div className="input-group">
                        <input type="text" {...register('name')} placeholder="Enter Salary, Expense, Investment" className="form-input"/>
                    </div>
                    <select className="form-input" {...register('category')}>
                        <option value="">Select</option>
                        {isSuccess && data?.map((value: ICategory, index: number) => <HandleDropDown key={index} category={value} />)}
                    </select>
                    <div className="input-group">
                        <input type="text" {...register('amount')} placeholder="Enter value" className="form-input" />
                    </div>
                        <button type="submit" className="submit-btn bg-indigo-500 text-white w-full p-2 m-1 text-center rounded" style={{cursor: 'pointer'}} disabled={isLoading}>Add Transaction</button>
                </div>
            </form>

            <History />
        </div>
    )
}

function HandleDropDown({category}: ICategoriesDropdownProps) {
    return (
        <option value={category?._id}>{category?.type}</option>
    )
}

export default memo(Form);