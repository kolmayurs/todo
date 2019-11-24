import React from 'react';
import '../css/App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { todoData, removeTodo, updateStatus} from '../action/action';


const mapStateToProps = (state) => {
    return {
        todo: state.todo.todo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ todoData, removeTodo, updateStatus}, dispatch)
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''

        };
    }

    componentDidMount() {}
    add() {
        if(this.state.text === ''){
            alert('Please Enter Task');
        }
        else{
            if (this.props.todo && this.props.todo.length > 0) {
            this.props.todoData(parseInt(this.props.todo[this.props.todo.length - 1].id) + 1, this.state.text, false);

        } else {
            this.props.todoData(parseInt(0), this.state.text, false);
        }

        this.setState({ text: '' });
        }
        
    }

    remove(id) {
        this.props.removeTodo(id);
    }
    checked(id,item){
      this.props.updateStatus(id,item);
    }
    render() {
        const list = this.props.todo.map((items, key) => {
            if(items.completed){
                return (
                <li key={'id_'+key} style={{opacity:'0.5'}}>
                    <div className="round">
                        <input type="checkbox" id={'checkbox_'+key} onClick={this.checked.bind(this,items.id,items.completed)} defaultChecked={items.completed} />
                        <label htmlFor={'checkbox_'+key}></label>
                    </div>
                    <div className="todo-text" style={{ textDecoration: 'line-through'}}>{items.text}</div>
                    <span className="close" onClick={this.remove.bind(this,items.id)}>X</span>
                </li>
            )
            }
            else{
                return (
                <li key={'id_'+key} style={{opacity:'1'}}>
                    <div className="round">
                        <input type="checkbox" id={'checkbox_'+key} onClick={this.checked.bind(this,items.id,items.completed)} defaultChecked={items.completed} />
                        <label htmlFor={'checkbox_'+key}></label>
                    </div>
                    <div className="todo-text"  style={{ textDecoration: 'none'}}>{items.text}</div>
                    <span className="close" onClick={this.remove.bind(this,items.id)}>X</span>
                </li>
            )
            }
            
        })
        return (
            <div className="App">
                <div className="heading">Todo List</div>
                <div className="add-todo">
                    <input type="text" value={this.state.text} placeholder="Add Task Here" onChange={e=> {this.setState({text: e.target.value})}} />
                    <button onClick={this.add.bind(this)}>Submit</button>
                    
                </div>
                {this.props.todo.length>0 ? <ol>{list}</ol> : null}

            </div>

        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);