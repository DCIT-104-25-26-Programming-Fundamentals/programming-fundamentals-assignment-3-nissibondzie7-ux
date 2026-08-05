// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
// ... (comments unchanged)
//

const readlineSync = require('readline-sync');

/**
 * Reads an M x N matrix from the user, one row at a time.
 * @param {number} rows
 * @param {number} cols
 * @returns {number[][]} the matrix
 */
function readMatrix(rows, cols) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    let row;
    while (true) {
      const input = readlineSync.question(`Enter row ${i + 1}: `);
      row = input.trim().split(/\s+/).map(Number);
      if (row.length === cols && row.every(n => !isNaN(n))) {
        break;
      }
      console.log(`Please enter exactly ${cols} numbers separated by spaces.`);
    }
    matrix.push(row);
  }
  return matrix;
}

/**
 * Prints a matrix in a neat, aligned grid format.
 * @param {number[][]} matrix
 */
function printMatrix(matrix) {
  // Find the widest value for alignment
  let maxWidth = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const width = String(matrix[i][j]).length;
      if (width > maxWidth) {
        maxWidth = width;
      }
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    let line = '';
    for (let j = 0; j < matrix[i].length; j++) {
      line += String(matrix[i][j]).padStart(maxWidth + 2, ' ');
    }
    console.log(line);
  }
}

/**
 * Computes the transpose of a matrix.
 * @param {number[][]} matrix - M x N matrix
 * @returns {number[][]} N x M transposed matrix
 */
function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let j = 0; j < cols; j++) {
    const newRow = [];
    for (let i = 0; i < rows; i++) {
      newRow.push(matrix[i][j]);
    }
    result.push(newRow);
  }

  return result;
}

/**
 * Adds two matrices of the same size element-wise.
 * @param {number[][]} a
 * @param {number[][]} b
 * @returns {number[][]} the sum matrix
 */
function addMatrices(a, b) {
  const rows = a.length;
  const cols = a[0].length;
  const result = [];

  for (let i = 0; i < rows; i++) {
    const newRow = [];
    for (let j = 0; j < cols; j++) {
      newRow.push(a[i][j] + b[i][j]);
    }
    result.push(newRow);
  }

  return result;
}

/**
 * Multiplies matrix A (M x N) by matrix B (N x P).
 * @param {number[][]} a - M x N matrix
 * @param {number[][]} b - N x P matrix
 * @returns {number[][]} M x P product matrix
 */
function multiplyMatrices(a, b) {
  const m = a.length;
  const n = a[0].length;
  const p = b[0].length;
  const result = [];

  for (let i = 0; i < m; i++) {
    const newRow = [];
    for (let j = 0; j < p; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += a[i][k] * b[k][j];
      }
      newRow.push(sum);
    }
    result.push(newRow);
  }

  return result;
}

function main() {
  // ---------------------------------------------------------------------
  // PART A — Transpose
  // ---------------------------------------------------------------------
  console.log('=== PART A: Transpose a Matrix ===');
  const rowsA = readlineSync.questionInt('Enter number of rows: ');
  const colsA = readlineSync.questionInt('Enter number of columns: ');
  const matrixA = readMatrix(rowsA, colsA);

  console.log('\nOriginal Matrix:');
  printMatrix(matrixA);

  const transposed = transposeMatrix(matrixA);
  console.log('\nTransposed Matrix:');
  printMatrix(transposed);

  // ---------------------------------------------------------------------
  // PART B — Addition
  // ---------------------------------------------------------------------
  console.log('\n=== PART B: Add Two Matrices ===');
  const rowsB = readlineSync.questionInt('Enter number of rows: ');
  const colsB = readlineSync.questionInt('Enter number of columns: ');

  console.log('Enter first matrix:');
  const matrixB1 = readMatrix(rowsB, colsB);

  console.log('Enter second matrix:');
  const matrixB2 = readMatrix(rowsB, colsB);

  const sumMatrix = addMatrices(matrixB1, matrixB2);
  console.log('\nSum Matrix:');
  printMatrix(sumMatrix);

  // ---------------------------------------------------------------------
  // PART C — Multiplication
  // ---------------------------------------------------------------------
  console.log('\n=== PART C: Multiply Two Matrices ===');
  const rowsC1 = readlineSync.questionInt('Enter number of rows for Matrix A: ');
  const colsC1 = readlineSync.questionInt('Enter number of columns for Matrix A: ');
  console.log('Enter Matrix A:');
  const matrixC1 = readMatrix(rowsC1, colsC1);

  const rowsC2 = colsC1; // Must match columns of A
  console.log(`Matrix B must have ${rowsC2} rows (to match columns of Matrix A).`);
  const colsC2 = readlineSync.questionInt('Enter number of columns for Matrix B: ');
  console.log('Enter Matrix B:');
  const matrixC2 = readMatrix(rowsC2, colsC2);

  const productMatrix = multiplyMatrices(matrixC1, matrixC2);
  console.log('\nProduct Matrix (A x B):');
  printMatrix(productMatrix);
}

main();