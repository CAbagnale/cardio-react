import React from 'react';
import store from './data/data';
import './Table.css';

export default class Table extends React.Component {
    static defaultProps = {
        data: store.data
    }
    render() {
        const str1 = this.props.data[this.props.tableNumber]
        if (this.props.displayTable) {
           return (
                <div className='table-wrapper'>
                    <table>
                        <thead>
                            <tr>
                                <th>ICD</th>
                                <th>Description</th>
                                <th>Acuity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {str1.map(table => (
                                <tr key={table.name}>
                                        <th className="">{table.code}</th>
                                        <th className="">{table.description}</th>
                                        <th className="">{table.acuity}</th> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) 
        }
        else if (this.props.resultsFound === false) {
            return (
                <p>no results found for "{this.props.submittedValue}"</p>
            )
        }
        else {
            return (
                null
            )
        }
        
    }
}