import DATAMatrix from "./datamatrix.js";
import fs from 'fs';

// Global trade item number (14)
let gtin = '00199284991309'
// YYMMDD
let manufacture_date = '250919';
// 0-20 long
let batch_or_lot = '1';
// 0-20 long
let serial = '';

const readable_separator = ' '
const ai_separator = '\x1D'

let ai = '';
if (gtin) { ai += '(01)' + gtin }
if (manufacture_date) { ai += '(11)' + manufacture_date }
if (batch_or_lot) { ai += '(10)' + batch_or_lot + (batch_or_lot.length < 20 ? readable_separator : "") }
if (serial) { ai += '(21)' + serial + (serial.length < 20 ? readable_separator : "") }

// Remove last separator
if (ai.endsWith(readable_separator)) ai = ai.slice(0, -1)

// Ai is now human readable...
console.log(ai);

// Remove parenthesis and replace separator characters accordingly
ai = ai_separator + ai.replace(/[()]/g, "").replace(readable_separator, ai_separator);

fs.writeFileSync("./matrix.svg", DATAMatrix(ai));