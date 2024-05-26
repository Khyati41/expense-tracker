import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURI = process.env.REACT_APP_BASE_URL;

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: baseURI}),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => '/api/categories'
        }),
        getTransactions: builder.query({
            query: () => '/api/transactions',
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                if(JSON.stringify(currentCache) !== JSON.stringify(newItems))
                    currentCache.push(...newItems);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            }
        }),
        addTransaction: builder.mutation({
            query: (transactionData) => ({
                url: 'api/transactions',
                method: 'POST',
                body: transactionData 
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const {data: newTransaction} = await queryFulfilled
                    console.log('newTransaction', newTransaction)
                    dispatch(
                        apiSlice.util.updateQueryData('getTransactions', undefined, (draft: any) => {
                           draft.unshift(newTransaction)
                        })
                    )
                } catch (error) {
                    console.log('error', error)
                }
            }
        }),
        deleteTransaction: builder.mutation({
            query: (id) => ({
                url: `api/transactions/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const {data} = await queryFulfilled
                    dispatch(
                        apiSlice.util.updateQueryData('getTransactions', data, (draft: any) => {
                           return draft.filter((transaction: any) => transaction._id !== data._id);
                        })
                    )
                } catch (error) {
                    console.log('error', error)
                }
            }
        })
    })
});

export const {
    useGetCategoriesQuery,
    useGetTransactionsQuery,
    useAddTransactionMutation,
    useDeleteTransactionMutation,
} = apiSlice;