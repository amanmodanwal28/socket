const fs = require('fs');
const xlsx = require('xlsx');
const os = require('os');
const path = require('path');
const { exec } = require('child_process');

const downloadsFolder = path.join(os.homedir(), 'Downloads');

const sourceDirectory = path.join(__dirname);

// Find all files in the directory
const files = fs.readdirSync(sourceDirectory);

// Filter out Excel files
const excelFiles = files.filter(file => file.endsWith('.xlsx'));

if (excelFiles.length === 0) {
    console.error('No Excel files found in the directory.');
    process.exit(1);
}

// Assuming the first Excel file found is the one to process
const excelFileToProcess = excelFiles[0];
console.log(`Processing Excel file: ${excelFileToProcess}`);

const workbook = xlsx.readFile(path.join(sourceDirectory, excelFileToProcess));
// const workbook = xlsx.readFile(excelFileToProcess);
const sheet_name_list = workbook.SheetNames;

// Create a new workbook
const newWorkbook = xlsx.utils.book_new();
let stringWithHexValues = '';

sheet_name_list.forEach(sheetName => {
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    // Find the index of the column with the heading 'hex_code'
    const headingIndex = data[0].indexOf('hex_code');

    if (headingIndex !== -1) {
        // Extract hex codes corresponding to 'hex_code' column
        const hexCodes = data.slice(1).map(row => {
            const cellValue = row[headingIndex].toString(); // Convert to string in case of numeric values
            let hexString = '';
            let stringWithHex = '"';
            for (let i = 0; i < cellValue.length; i++) {
                const unicodeValue = cellValue.charCodeAt(i);
                const hexValue = unicodeValue.toString(16).toUpperCase();
                // Get the last two digits of the hex value
                const lastTwoDigits = hexValue.slice(-2);
                hexString += `\\x${lastTwoDigits}`;
                stringWithHex += `\\x${lastTwoDigits}`;
            }
            stringWithHex += '"';
            stringWithHexValues += stringWithHex + ',\n';
            return { hex_code_value: hexString, hex_code_value_with_string: stringWithHex };
        });

        // Add new column headers for the hex codes
        data[0].push('hex_code_value', 'hex_code_value_with_string');

        // Add the extracted hex codes to the data
        for (let i = 1; i < data.length; i++) {
            const hexCode = hexCodes[i - 1];
            data[i].push(hexCode.hex_code_value, hexCode.hex_code_value_with_string);
        }

        // Convert the updated data to a new worksheet
        const newWorksheet = xlsx.utils.aoa_to_sheet(data);

        // Add the new worksheet to the new workbook
        xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, sheetName);
    } else {
        console.log(`'hex_code' heading not found in ${sheetName}`);
    }
});


const excell_downloaded_file_name = 'output.xlsx';
const txt_downloaded_file_name = 'stringWithHexValues.txt';
// Write the new workbook to a file in the downloads folder
const outputFilePath = path.join(downloadsFolder, excell_downloaded_file_name);
xlsx.writeFile(newWorkbook, outputFilePath);

// Write stringWithHexValues to a text file
const textFilePath = path.join(downloadsFolder, txt_downloaded_file_name);
fs.writeFileSync(textFilePath, stringWithHexValues);
console.log(" ")
console.log('Text file generated in download folder:', textFilePath);
console.log(" ")
console.log('Excell file generated in download folder:', outputFilePath);
console.log(" ")

// Open the downloads folder
exec(`explorer.exe "${downloadsFolder}"`, { stdio: 'ignore' }, (error, stdout, stderr) => {
    if (stderr) {
        console.error(`Error2 opening downloads folder: ${stderr}`);
        return;
    }
    console.log('Downloads folder opened successfully');
});
















// const fs = require('fs');
// const xlsx = require('xlsx');
// const os = require('os');
// const path = require('path');
// const { exec } = require('child_process');

// const downloadsFolder = path.join(os.homedir(), 'Downloads');

// const workbook = xlsx.readFile('example.xlsx');
// const sheet_name_list = workbook.SheetNames;

// // Create a new workbook
// const newWorkbook = xlsx.utils.book_new();
// let stringWithHexValues = '';

// sheet_name_list.forEach(sheetName => {
//     const worksheet = workbook.Sheets[sheetName];
//     const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

//     // Find the index of the column with the heading 'hex_code'
//     const headingIndex = data[0].indexOf('hex_code');

//     if (headingIndex !== -1) {
//         // Extract hex codes corresponding to 'hex_code' column
//         const hexCodes = data.slice(1).map(row => {
//             const cellValue = row[headingIndex].toString(); // Convert to string in case of numeric values
//             let hexString = '';
//             let stringWithHex = '{';
//             for (let i = 0; i < cellValue.length; i++) {
//                 const unicodeValue = cellValue.charCodeAt(i);
//                 const hexValue = unicodeValue.toString(16).toUpperCase();
//                 // Get the last two digits of the hex value
//                 const lastTwoDigits = hexValue.slice(-2);
//                 hexString += `\\x${lastTwoDigits}`;
//                 stringWithHex += `\\x${lastTwoDigits}`;
//             }
//             stringWithHex += '}';
//             stringWithHexValues += stringWithHex + ',\n';
//             return { hex_code_value: hexString, hex_code_value_with_string: stringWithHex };
//         });

//         // Add new column headers for the hex codes
//         data[0].push('hex_code_value', 'hex_code_value_with_string');

//         // Add the extracted hex codes to the data
//         for (let i = 1; i < data.length; i++) {
//             const hexCode = hexCodes[i - 1];
//             data[i].push(hexCode.hex_code_value, hexCode.hex_code_value_with_string);
//         }

//         // Convert the updated data to a new worksheet
//         const newWorksheet = xlsx.utils.aoa_to_sheet(data);

//         // Add the new worksheet to the new workbook
//         xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, sheetName);
//     } else {
//         console.log(`'hex_code' heading not found in ${sheetName}`);
//     }
// });


// const excell_downloaded_file_name = 'output.xlsx';
// const txt_downloaded_file_name = 'stringWithHexValues.txt';
// // Write the new workbook to a file in the downloads folder
// const outputFilePath = path.join(downloadsFolder, excell_downloaded_file_name);
// xlsx.writeFile(newWorkbook, outputFilePath);

// // Write stringWithHexValues to a text file
// const textFilePath = path.join(downloadsFolder, txt_downloaded_file_name);
// fs.writeFileSync(textFilePath, stringWithHexValues);
// console.log(" ")
// console.log('Text file generated in download folder:', textFilePath);
// console.log(" ")
// console.log('Excell file generated in download folder:', outputFilePath);
// console.log(" ")

// // Open the downloads folder
// exec(`explorer.exe "${downloadsFolder}"`, { stdio: 'ignore' }, (error, stdout, stderr) => {
//     if (stderr) {
//         console.error(`Error2 opening downloads folder: ${stderr}`);
//         return;
//     }
//     console.log('Downloads folder opened successfully');
// });















// const fs = require('fs');
// const xlsx = require('xlsx');
// const os = require('os');
// const path = require('path');

// const downloadsFolder = path.join(os.homedir(), 'Downloads');

// const workbook = xlsx.readFile('example.xlsx');
// const sheet_name_list = workbook.SheetNames;

// // Create a new workbook
// const newWorkbook = xlsx.utils.book_new();
// let stringWithHexValues = '';

// sheet_name_list.forEach(sheetName => {
//     const worksheet = workbook.Sheets[sheetName];
//     const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

//     // Find the index of the column with the heading 'hex_code'
//     const headingIndex = data[0].indexOf('hex_code');

//     if (headingIndex !== -1) {
//         // Extract hex codes corresponding to 'hex_code' column
//         const hexCodes = data.slice(1).map(row => {
//             const cellValue = row[headingIndex].toString(); // Convert to string in case of numeric values
//             let hexString = '';
//             let stringWithHex = '"';
//             for (let i = 0; i < cellValue.length; i++) {
//                 const unicodeValue = cellValue.charCodeAt(i);
//                 const hexValue = unicodeValue.toString(16).toUpperCase();
//                 // Get the last two digits of the hex value
//                 const lastTwoDigits = hexValue.slice(-2);
//                 hexString += `\\x${lastTwoDigits}`;
//                 stringWithHex += `\\x${lastTwoDigits}`;
//             }
//             stringWithHex += '"';
//             stringWithHexValues += stringWithHex + ',\n';
//             return { hex_code_value: hexString, hex_code_value_with_string: stringWithHex };
//         });

//         // Add new column headers for the hex codes
//         data[0].push('hex_code_value', 'hex_code_value_with_string');

//         // Add the extracted hex codes to the data
//         for (let i = 1; i < data.length; i++) {
//             const hexCode = hexCodes[i - 1];
//             data[i].push(hexCode.hex_code_value, hexCode.hex_code_value_with_string);
//         }

//         // Convert the updated data to a new worksheet
//         const newWorksheet = xlsx.utils.aoa_to_sheet(data);

//         // Add the new worksheet to the new workbook
//         xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, sheetName);
//     } else {
//         console.log(`'hex_code' heading not found in ${sheetName}`);
//     }
// });

// const excell_downloaded_file_name = 'output.xlsx';
// const txt_downloaded_file_name = 'stringWithHexValues.txt';
// // Write the new workbook to a file in the downloads folder
// const outputFilePath = path.join(downloadsFolder, excell_downloaded_file_name);
// xlsx.writeFile(newWorkbook, outputFilePath);

// // Write stringWithHexValues to a text file
// const textFilePath = path.join(downloadsFolder, txt_downloaded_file_name);
// fs.writeFileSync(textFilePath, stringWithHexValues);

// console.log('Text file generated in download folder:', textFilePath);
// console.log('Excell file generated in download folder:', outputFilePath);




















// const xlsx = require('xlsx');
// const os = require('os');
// const path = require('path');

// const downloadsFolder = path.join(os.homedir(), 'Downloads');

// const workbook = xlsx.readFile('example.xlsx');
// const sheet_name_list = workbook.SheetNames;

// // Create a new workbook
// const newWorkbook = xlsx.utils.book_new();

// sheet_name_list.forEach(sheetName => {
//     const worksheet = workbook.Sheets[sheetName];
//     const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

//     // Find the index of the column with the heading 'hex_code'
//     const headingIndex = data[0].indexOf('hex_code');

//     if (headingIndex !== -1) {
//         // Extract hex codes corresponding to 'hex_code' column
//         const hexCodes = data.slice(1).map(row => {
//             const cellValue = row[headingIndex].toString(); // Convert to string in case of numeric values
//             let hexString = '';
//             let stringWithHex = '{';
//             for (let i = 0; i < cellValue.length; i++) {
//                 const unicodeValue = cellValue.charCodeAt(i);
//                 const hexValue = unicodeValue.toString(16).toUpperCase();
//                 // Get the last two digits of the hex value
//                 const lastTwoDigits = hexValue.slice(-2);
//                 hexString += `\\x${lastTwoDigits}`;
//                 stringWithHex += `\\x${lastTwoDigits}`;
//             }
//             stringWithHex += '}';
//             return { hex_code_value: hexString, hex_code_value_with_string: stringWithHex };
//         });

//         // Add new column headers for the hex codes
//         data[0].push('hex_code_value', 'hex_code_value_with_string');

//         // Add the extracted hex codes to the data
//         for (let i = 1; i < data.length; i++) {
//             const hexCode = hexCodes[i - 1];
//             data[i].push(hexCode.hex_code_value, hexCode.hex_code_value_with_string);
//         }

//         // Convert the updated data to a new worksheet
//         const newWorksheet = xlsx.utils.aoa_to_sheet(data);

//         // Add the new worksheet to the new workbook
//         xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, sheetName);
//     } else {
//         console.log(`'hex_code' heading not found in ${sheetName}`);
//     }
// });

// const download_file_name = 'output.xlsx';
// // Write the new workbook to a file in the downloads folder
// const outputFilePath = path.join(downloadsFolder, download_file_name);
// xlsx.writeFile(newWorkbook, outputFilePath);
// console.log(` ${download_file_name} file Download successfully .`)











// const xlsx = require('xlsx');
// const workbook = xlsx.readFile('example.xlsx');
// const sheet_name_list = workbook.SheetNames;

// // Create a new workbook
// const newWorkbook = xlsx.utils.book_new();

// sheet_name_list.forEach(sheetName => {
//     const worksheet = workbook.Sheets[sheetName];
//     const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

//     // Find the index of the column with the heading 'hex_code'
//     const headingIndex = data[0].indexOf('hex_code');

//     if (headingIndex !== -1) {
//         // Extract hex codes corresponding to 'hex_code' column
//         const hexCodes = data.slice(1).map(row => {
//             const cellValue = row[headingIndex].toString(); // Convert to string in case of numeric values
//             let hexString = '';
//             let stringWithHex = '{';
//             for (let i = 0; i < cellValue.length; i++) {
//                 const unicodeValue = cellValue.charCodeAt(i);
//                 const hexValue = unicodeValue.toString(16).toUpperCase();
//                 // Get the last two digits of the hex value
//                 const lastTwoDigits = hexValue.slice(-2);
//                 hexString += `\\x${lastTwoDigits}`;
//                 stringWithHex += `\\x${lastTwoDigits}`;
//             }
//             stringWithHex += '}';
//             return { hex_code_value: hexString, hex_code_value_with_string: stringWithHex };
//         });

//         // Add new column headers for the hex codes
//         data[0].push('hex_code_value', 'hex_code_value_with_string');

//         // Add the extracted hex codes to the data
//         for (let i = 1; i < data.length; i++) {
//             const hexCode = hexCodes[i - 1];
//             data[i].push(hexCode.hex_code_value, hexCode.hex_code_value_with_string);
//         }

//         // Convert the updated data to a new worksheet
//         const newWorksheet = xlsx.utils.aoa_to_sheet(data);

//         // Add the new worksheet to the new workbook
//         xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, sheetName);
//     } else {
//         console.log(`'hex_code' heading not found in ${sheetName}`);
//     }
// });

// const download_file_name = 'output.xlsx';
// // Write the new workbook to a file
// xlsx.writeFile(newWorkbook, download_file_name);
// console.log(`file Download successfully  ${download_file_name}`)



















// const xlsx = require('xlsx');
// const workbook = xlsx.readFile('example.xlsx');
// const sheet_name_list = workbook.SheetNames;

// // Create a new workbook
// const newWorkbook = xlsx.utils.book_new();

// sheet_name_list.forEach(sheetName => {
//     const worksheet = workbook.Sheets[sheetName];
//     const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

//     // Find the index of the column with the heading 'hex_code'
//     const headingIndex = data[0].indexOf('hex_code');

//     if (headingIndex !== -1) {
//         // Extract hex codes corresponding to 'hex_code' column
//         const hexCodes = data.slice(1).map(row => {
//             const cellValue = row[headingIndex].toString(); // Convert to string in case of numeric values
//             let hexString = '';
//             for (let i = 0; i < cellValue.length; i++) {
//                 const unicodeValue = cellValue.charCodeAt(i);
//                 const hexValue = unicodeValue.toString(16).toUpperCase();
//                 // Get the last two digits of the hex value
//                 const lastTwoDigits = hexValue.slice(-2);
//                 hexString += `\\x${lastTwoDigits}`;
//             }
//             return hexString;
//         });

//         // Add a new column header for the hex codes
//         data[0].push('hex_code_value');

//         // Add the extracted hex codes to the data
//         for (let i = 1; i < data.length; i++) {
//             data[i].push(hexCodes[i - 1]);
//         }

//         // Convert the updated data to a new worksheet
//         const newWorksheet = xlsx.utils.aoa_to_sheet(data);

//         // Add the new worksheet to the new workbook
//         xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, sheetName);
//     } else {
//         console.log(`'hex_code' heading not found in ${sheetName}`);
//     }
// });

// // Write the new workbook to a file
// xlsx.writeFile(newWorkbook, 'output.xlsx');





















// const xlsx = require('xlsx');
// const workbook = xlsx.readFile('example.xlsx');
// const sheet_name_list = workbook.SheetNames;


// // Create a new workbook
// const newWorkbook = xlsx.utils.book_new();

// sheet_name_list.forEach(sheetName => {
//     const worksheet = workbook.Sheets[sheetName];
//     const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

//     // Find the index of the column with the heading 'hex_code'
//     const headingIndex = data[0].indexOf('hex_code');

//     if (headingIndex !== -1) {
//         // Extract hex codes corresponding to 'hex_code' column
//         const hexCodes = data.slice(1).map(row => {
//             const cellValue = row[headingIndex].toString(); // Convert to string in case of numeric values
//             let hexString = '';
//             for (let i = 0; i < cellValue.length; i++) {
//                 const unicodeValue = cellValue.charCodeAt(i);
//                 const hexValue = unicodeValue.toString(16).toUpperCase();
//                 // Get the last two digits of the hex value
//                 const lastTwoDigits = hexValue.slice(-2);
//                 hexString += `\\x${lastTwoDigits}`;
//             }
//             return hexString;
//         });
//         console.log(`Hex codes from ${sheetName}:`, hexCodes);
//          // Create a new worksheet
//         const newWorksheet = xlsx.utils.aoa_to_sheet(hexCodes.map(code => [code]));

//         // Add the new worksheet to the new workbook
//         xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, sheetName);

//     } else {
//         console.log(`'hex_code' heading not found in ${sheetName}`);
//     }
// });


// // Write the new workbook to a file
// xlsx.writeFile(newWorkbook, 'output.xlsx');



















// const xlsx = require('xlsx');
// const workbook = xlsx.readFile('example.xlsx');
// const sheet_name_list = workbook.SheetNames;

// sheet_name_list.forEach(sheetName => {
//     const worksheet = workbook.Sheets[sheetName];
//     const data = xlsx.utils.sheet_to_json(worksheet, { header: 1, range: 1 });
//     console.log(`Data from ${sheetName}:`, data);
// });




