export default function todo(state={
	todo:[]
}, action){
	switch(action.type){
		case 'Add_Todo' : {
			return {...state, todo:state.todo.concat(action.addTodo)}
		}
		case 'Remove_Todo' : {
			return {...state, todo:state.todo.filter(todo => todo.id !== action.removeTodo)}
		}
		default: {
			return {...state}
		}
	}
}