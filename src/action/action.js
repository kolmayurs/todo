export function todoData(id, text, status){
	return function(dispatch){
		let newObj = {id, text, status};
		dispatch({type:'Add_Todo', addTodo:newObj})
	}
}

export function removeTodo(id){
	return function(dispatch){
		dispatch({type:'Remove_Todo', removeTodo:id})
	}
}