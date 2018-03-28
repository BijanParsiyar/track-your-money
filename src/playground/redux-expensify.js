import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});


// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});
// SET_START_DATE
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});
// SET_END_DATE
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
      break;
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
      break;
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense;
        }
      });
      break;
    default:
      return state;
  }
};

// Filters Reducer
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
      break;
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      }
      break;
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
      break;
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
      break;
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state;
  }
};

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch =  expense.description.toLowerCase().includes(text.toLowerCase());


    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
      if(sortBy === 'date'){
        return b.createdAt > a.createdAt ? 1 : -1;
      } else if (sortBy === 'amount'){
        return b.amount > a.amount ? 1 : -1
      }
  });
};





// Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});


const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 1500, createdAt:  4000}));

const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 700, createdAt: 5000 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));


// store.dispatch(setTextFilter('rent'));

// store.dispatch(setTextFilter('ffe'));

store.dispatch(sortByAmount()); // amount
// store.dispatch(sortByDate()); // date


// store.dispatch(setStartDate(0));
// // store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));






const demoState = {
  expenses: [{
    id: 'adjkfasldfjs',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createAt: 0
  }],
  filters: {
    text: 'rent', // find description or note in expenses array with that word in it
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};

// const user = {
//   name: 'Jen',
//   age: 25
// }

// console.log({
//   ...user,
//   location: 'Philadelphia',
//   age: 27
// });
