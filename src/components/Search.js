import React from 'react';
import './Search.css';
import Table from './Table'
import store from './data/data';
import Typed from 'typed.js';

// var typed4 = new Typed('#typed4', {
//     strings: ['Some strings without', 'Some HTML', 'Chars'],
//     typeSpeed: 0,
//     backSpeed: 0,
//     attr: 'placeholder',
//     bindInputFocusEvents: true,
//     loop: true
// });

export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            searchValue: "",
            submittedValue: "",
            matchingTable: 0,
            submitted: false,
            resultsFound: null
        }
    }
    static defaultProps = {
        keywords: store.allKeywords
    }
    componentDidMount() {
        this.typed = new Typed('.form-field', {
            strings: [
                'enter keyword ... ', 
                'enter keyword ... ', 
                'enter keyword ... ', 
                ' example: SVT', 
                ' example: ulcer',
                ' example: afib', 
                ' example: LVEF', 
                'enter keyword ... '
            ],
            typeSpeed: 100,
            backSpeed: 75,
            backDelay: 1700,
            attr: 'placeholder',
            bindInputFocusEvents: false,
            loop: false
        });
            
    }
    handleOnChange = event => {
        this.setState({ searchValue: event.target.value });
    };
    handleSubmit = (event) => {
        event.preventDefault()
        const str = this.state.searchValue
        const search = str.toLowerCase()
        this.setState({
            submittedValue: search
        })
        console.log('search term \'' + search + '\' was submitted')
        for (let i=0; i<this.props.keywords.length; i++) {
            if (this.props.keywords[i].includes(search) === true) {
                console.log(`table ` + i + ` matches keyword '` + search + `'`)
                this.setState({
                    matchingTable: i,
                    submitted: true,
                    resultsFound: true
                })
                break;
            }
            else {
                console.log('\'' + search + '\' has no matching table')
                this.setState({
                    submitted: false,
                    resultsFound: false
                })
            }
        }

    }
    render() {
        return (
            <div className='main'>
                <form className='main-content' onSubmit={event => this.handleSubmit(event)}>
                    <input
                        className='form-field'
                        type="text" 
                        placeholder="enter keyword ..." 
                        onChange={event => this.handleOnChange(event)}
                        value={this.state.searchValue}
                        required />
                    <input className='form-submit' type='button' value='search' type='submit'></input>
                </form>
                <Table 
                    tableNumber={this.state.matchingTable} 
                    displayTable={this.state.submitted} 
                    resultsFound={this.state.resultsFound} 
                    submittedValue={this.state.submittedValue}
                />
            </div>
        )
    }
}