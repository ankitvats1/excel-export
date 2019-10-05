import React, {Component} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { CSVLink } from "react-csv";
 
class ReactCSV extends Component {
 
    constructor(props) {
        super(props);
    }
 
    render() {
        const headers = [
          { label: "First Name", key: "firstname" },
          { label: "Last Name", key: "lastname" },
          { label: "Email", key: "email" }
        ];
         
        const data = [
          { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
          { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
          { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
        ];

        const columns = [
            {
            Header: 'First Name',
            accessor: 'firstname' // String-based value accessors!
           },
           {
            Header: 'Last Name',
            accessor: 'lastname' // String-based value accessors!
           },
           {
            Header: 'Email',
            accessor: 'email' // String-based value accessors!
           }
        ];
         
        return (
            <>
        <CSVLink data={data} filename={"my-file.csv"} headers={headers}>
          Download me
        </CSVLink>
        <ReactTable data={data} columns={columns}>
        </ReactTable>
        </>
        ) 
    }
}
 
export default ReactCSV;