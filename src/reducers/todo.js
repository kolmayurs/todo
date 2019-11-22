import update from 'immutability-helper';

export default function todo(state = {
    todo: []
}, action) {
    switch (action.type) {
        case 'Add_Todo':
            {
                return { ...state, todo: state.todo.concat(action.addTodo) }
            }
        case 'Remove_Todo':
            {
                return { ...state, todo: state.todo.filter(todo => todo.id !== action.removeTodo) }
            }
        case 'Update_Status':
            {

                var data = state.todo;
                var dataIndex = data.findIndex(function(c) {
                    return c.id === action.updateID;
                });

                var updatedData = update(data[dataIndex], { completed: { $set: !action.updateStatus } });

                var newData = update(data, {
                    $splice: [
                        [dataIndex, 1, updatedData]
                    ]
                });

                return { ...state, todo: newData }
            }

        default:
            {
                return { ...state }
            }
    }
}