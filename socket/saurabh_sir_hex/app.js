const XLSX = require('xlsx');
const fs = require('fs');

// Load the Excel file
const workbook = XLSX.readFile('kanchipuram.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // Assuming the data is in the first sheet

// Find the column index of the column with the heading "hex_code"
let hexCodeColumnIndex = -1;
const firstRow = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
firstRow.forEach((heading, index) => {
    if (heading === 'hex_code') {
        hexCodeColumnIndex = index;
        
    }
});

// If "hex_code" column not found, exit
if (hexCodeColumnIndex === -1) {
    throw new Error('Column with heading "hex_code" not found.');
}

// Create a new array to store the hex values
const hexValues = [];
console.log(hexCodeColumnIndex)
// Iterate through each row
const rows = XLSX.utils.sheet_to_json(worksheet);

// console.log(rows)
rows.forEach((row, rowIndex) => {
    const cellValue = row[1];
    console.log(cellValue)
    if (typeof cellValue === 'string' && cellValue.length > 0) {
        let hexString = '';
        for (let i = 0; i < cellValue.length; i++) {
            const unicodeValue = cellValue.charCodeAt(i);
            const hexValue = unicodeValue.toString(16).toUpperCase();
            // Get the last two digits of the hex value
            const lastTwoDigits = hexValue.slice(-2);
            hexString += `\\x${lastTwoDigits}`;
        }
        console.log(cellValue.length)
        hexValues.push([hexString]);
    }
});


// Create a new workbook for writing the results
const outputWorkbook = XLSX.utils.book_new();
const outputSheet = XLSX.utils.aoa_to_sheet([['hex_code'], ...hexValues]);

// Add the worksheet to the workbook
XLSX.utils.book_append_sheet(outputWorkbook, outputSheet, 'HexValues');

// Write the output to a new Excel file
XLSX.writeFile(outputWorkbook, 'output.xlsx');
console.log('Hexadecimal values (last two digits) for "hex_code" column saved to output.xlsx');

























// const ExcelJS = require('exceljs');
// const workbook = new ExcelJS.Workbook();
// const fs = require('fs');

// // Load the Excel file
// workbook.xlsx.readFile('kanchipuram.xlsx')
//     .then(() => {
//         const worksheet = workbook.getWorksheet(1); // Assuming the data is in the first sheet
        
//         // Create a new workbook for writing the results
//         const outputWorkbook = new ExcelJS.Workbook();
//         const outputWorksheet = outputWorkbook.addWorksheet('HexValues');

//         // Iterate through each row
//         worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
//             // Iterate through each cell in the row
//             row.eachCell({ includeEmpty: false }, function(cell, colNumber) {
//                 const cellValue = cell.value;
//                 if (typeof cellValue === 'string' && cellValue.length > 0) {
//                     let hexString = '';
//                     let originalString = '';
//                     for (let i = 0; i < cellValue.length; i++) {
//                         const unicodeValue = cellValue.charCodeAt(i);
//                         const hexValue = unicodeValue.toString(16).toUpperCase();
//                         // Get the last two digits of the hex value
//                         const lastTwoDigits = hexValue.slice(-2);
//                         hexString += `\\x${lastTwoDigits}`;
//                         originalString += cellValue[i];
//                     }
                    
//                     // Write the concatenated hex string and original string to the output worksheet
//                     outputWorksheet.getCell(`${String.fromCharCode(64 + colNumber)}${rowNumber}`).value = hexString;
//                     outputWorksheet.getCell(`${String.fromCharCode(65 + colNumber)}${rowNumber}`).value = originalString;
//                 }
//             });
//         });

//         // Write the output to a new Excel file
//         return outputWorkbook.xlsx.writeFile('output.xlsx');
//     })
//     .then(() => {
//         console.log('Joined hexadecimal values (last two digits) and original string values saved to output.xlsx');
//     })
//     .catch((error) => {
//         console.error('Error:', error.message);
//     });




























// const ExcelJS = require('exceljs');
// const workbook = new ExcelJS.Workbook();
// const fs = require('fs');

// // Load the Excel file
// workbook.xlsx.readFile('kanchipuram.xlsx')
//     .then(() => {
//         const worksheet = workbook.getWorksheet(1); // Assuming the data is in the first sheet
        
//         // Create a new workbook for writing the results
//         const outputWorkbook = new ExcelJS.Workbook();
//         const outputWorksheet = outputWorkbook.addWorksheet('HexValues');

//         // Iterate through each row
//         worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
//             // Iterate through each cell in the row
//             row.eachCell({ includeEmpty: false }, function(cell, colNumber) {
//                 const cellValue = cell.value;
//                 if (typeof cellValue === 'string' && cellValue.length > 0) {
//                     let hexString = '';
//                     for (let i = 0; i < cellValue.length; i++) {
//                         const unicodeValue = cellValue.charCodeAt(i);
//                         const hexValue = unicodeValue.toString(16).toUpperCase();
//                         // Get the last two digits of the hex value
//                         const lastTwoDigits = hexValue.slice(-2);
//                         hexString += `\\x${lastTwoDigits}`;
//                     }
                    
//                     // Write the concatenated hex string to the output worksheet
//                     outputWorksheet.getCell(`${String.fromCharCode(64 + colNumber)}${rowNumber}`).value = hexString;
//                 }
//             });
//         });

//         // Write the output to a new Excel file
//         return outputWorkbook.xlsx.writeFile('output.xlsx');
//     })
//     .then(() => {
//         console.log('output.xlsx');
//     })
//     .catch((error) => {
//         console.error('Error:', error.message);
//     });
