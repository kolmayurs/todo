export function todoData(id, text, completed){
	return function(dispatch){
		let newObj = {id, text, completed};
		dispatch({type:'Add_Todo', addTodo:newObj})
	}
}

export function removeTodo(id){
	return function(dispatch){
		dispatch({type:'Remove_Todo', removeTodo:id})
	}
}

export function updateStatus(id,completed){
	return function(dispatch){
		dispatch({type:'Update_Status', updateID:id, updateStatus:completed})
	}
}