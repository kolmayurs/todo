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
        if (this.props.todo && this.props.todo.length > 0) {
            this.props.todoData(parseInt(this.props.todo[this.props.todo.length - 1].id) + 1, this.state.text, false);

        } else {
            this.props.todoData(parseInt(0), this.state.text, false);
        }

        this.setState({ text: '' });
    }

    remove(id) {
        this.props.removeTodo(id);
    }
    checked(id,item){
      this.props.updateStatus(id,item);
    }
    render() {
        const list = this.props.todo.map((items, key) => {
            return (
                <li key={'id_'+key}> <div className="round">
    <input type="checkbox" id={'checkbox_'+key} onClick={this.checked.bind(this,items.id,items.completed)} defaultChecked={(!items.completed?false:true)} />
    <label htmlFor={'checkbox_'+key}></label>
  </div>||{items.id} || {items.text} || {items.completed} || <span onClick={this.remove.bind(this,items.id)}>X</span></li>
            )
        })
        return (
            <div className="App">
      <input type="text" value={this.state.text} onChange={e => {this.setState({text: e.target.value})}} />
      <button onClick={this.add.bind(this)}>Submit</button>
      <div>List:</div>
      <ol>{list}</ol>

    </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);