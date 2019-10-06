import React, { Component } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import axios from 'axios';
import ReactTable from 'react-table';

class ExceljsReact extends Component {
    state = {
        data: []
        // collectionDetails: [
        //   {
        //     wardNumber: 1,
        //     totalPropertyUnits: 500,
        //     noOfPropertiesCovered: 100,
        //     collectionPer: 20,
        //     segPer: 35
        //   },
        //   {
        //     wardNumber: 2,
        //     totalPropertyUnits: 350,
        //     noOfPropertiesCovered: 130,
        //     collectionPer: 37,
        //     segPer: 40
        //   },
        //   {
        //     wardNumber: 3,
        //     totalPropertyUnits: 480,
        //     noOfPropertiesCovered: 211,
        //     collectionPer: 44,
        //     segPer: 40
        //   },
        //   {
        //     wardNumber: 4,
        //     totalPropertyUnits: 250,
        //     noOfPropertiesCovered: 115,
        //     collectionPer: 46,
        //     segPer: 25
        //   },
        //   {
        //     wardNumber: 5,
        //     totalPropertyUnits: 300,
        //     noOfPropertiesCovered: 141,
        //     collectionPer: 47,
        //     segPer: 70
        //   },
        //   {
        //     wardNumber: 6,
        //     totalPropertyUnits: 250,
        //     noOfPropertiesCovered: 123,
        //     collectionPer: 49,
        //     segPer: 78
        //   },
        //   {
        //     wardNumber: 7,
        //     totalPropertyUnits: 400,
        //     noOfPropertiesCovered: 208,
        //     collectionPer: 52,
        //     segPer: 44
        //   },
        //   {
        //     wardNumber: 8,
        //     totalPropertyUnits: 270,
        //     noOfPropertiesCovered: 146,
        //     collectionPer: 54,
        //     segPer: 89
        //   },
        //   {
        //     wardNumber: 9,
        //     totalPropertyUnits: 300,
        //     noOfPropertiesCovered: 213,
        //     collectionPer: 71,
        //     segPer: 70
        //   },
        //   {
        //     wardNumber: 10,
        //     totalPropertyUnits: 380,
        //     noOfPropertiesCovered: 304,
        //     collectionPer: 80,
        //     segPer: 91
        //   }
        // ],
        // collectionDate: new Date(),
        // blocking: false,
        // loaderType: "ball-triangle-path",
        // months: [
        //   "Jan",
        //   "Feb",
        //   "Mar",
        //   "Apr",
        //   "May",
        //   "Jun",
        //   "Jul",
        //   "Aug",
        //   "Sep",
        //   "Oct",
        //   "Nov",
        //   "Dec"
        // ],
        // selectedMonth: "August",
        // sweetalertMessage: "",
        // sweetalertShow: false,
        // sweetalertType: "",
        // collectionStartDate: new Date(),
        // collectionEndDate: new Date()
      };

  componentDidMount() {
    // workbook.xlsx.writeBuffer().then(function (data) {
    //     const blob = new Blob([data],
    //       { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    //     const url = window.URL.createObjectURL(blob);
    //     const anchor = document.createElement('a');
    //     anchor.href = url;
    //     anchor.download = 'download.xls';
    //     anchor.click();
    //     window.URL.revokeObjectURL(url);
    //   });
    axios.get("https://jsonplaceholder.typicode.com/todos")
    .then(res => {
        console.log(res);
        this.setState({data: res.data});
    })
  }

  downloadExcel = () => {
    var workbook = new ExcelJS.Workbook();

    workbook.creator = "Ankit Vats";
    workbook.lastModifiedBy = "Ankit Vats";
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();

    var worksheet = workbook.addWorksheet("Todos");
    worksheet.views = [{ state: "frozen", xSplit: 0, ySplit: 1 }];
    worksheet.columns = [
        { header: 'ID', key: 'id', width: 15 },
        { header: 'User ID', key: 'userId', width: 15 },
        { header: 'Title', key: 'title', width: 50 },
        { header: 'Completed', key: 'completed', width: 25 }
    ];

    ['A1', 'B1', 'C1', 'D1'].map(key => {
        worksheet.getCell(key).fill = {
            type: 'pattern',
            pattern:'solid',
            fgColor: { argb: 'FFD6D6D6' },
            bgColor: { argb: 'FFD6D6D6' }
        };
    }); 

    // worksheet.addRow(
    //   { package_name: "ABC", author_name: "Author 1" },
    //   { package_name: "XYZ", author_name: "Author 2" }
    // );

    // Add rows as Array values
    // worksheet.addRow(["BCD", "Author Name 3"]);

    // Add rows using both the above of rows
    // const rows = [
    //   ["FGH", "Author Name 4"],
    //   { package_name: "PQR", author_name: "Author 5" }
    // ];

    worksheet.addRows(this.state.data);

    let rowlast = worksheet.lastRow; 
    console.log(rowlast);
    rowlast.eachCell({ includeEmpty: false }, function(cell, colNumber) {
       
                    cell.fill = {
                        type: 'pattern',
                        pattern:'solid',
                        fgColor:{ argb:'009d0b'}
                    };
              
                 

                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                    }; 
           

    }); 

    var buff = workbook.xlsx.writeBuffer().then(function(data) {
      var blob = new Blob([data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      var fileName = "Todos_" + Math.floor(new Date() / 1000) + '.xlsx';
      saveAs(blob, fileName);
    });
  }
  render() {
      console.log(this.state);
      const columns = [
        {
        Header: 'ID',
        accessor: 'id', // String-based value accessors!
        width: 100
       },
       {
        Header: 'User ID',
        accessor: 'userId', // String-based value accessors!
        width: 100
       },
       {
        Header: 'Title',
        accessor: 'title', // String-based value accessors!
        minWidth: 250
       },
       {
        id: 'completed',
        Header: 'Completed',
        accessor: d => d.completed.toString(), // String-based value accessors!
        width: 120
       }
    ];
    return (
      <>
      <button onClick={this.downloadExcel}>Download</button>
       <ReactTable data={this.state.data} columns={columns}>
        </ReactTable>
      </>
    )
    
    
  }
}

export default ExceljsReact;
