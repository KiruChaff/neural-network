
class Matrix {
   constructor(rows, cols){
      this.rows = rows;
      this.cols = cols;
      this.matrix = [];

      for (let i=0;i<this.rows; i++) {
         this.matrix[i]=[];
         for (let j=0;j<this.cols; j++){
            this.matrix[i][j]=0;
         }
      }
   }

   // fills Matrix with random values ranging from -1 to 1
   randomize(){
      for (let i=0;i<this.rows; i++) {
         for (let j=0;j<this.cols; j++){
            this.matrix[i][j]=Math.random()*2 - 1;
         }
      }
   }

   // performs a dot product with a matrix n
   dot(n){
      if (n instanceof Matrix) {
            if (this.cols !== n.rows) {
               console.log("The number of columns from the first matrix has to match the number of rows of the second matrix!")
               return undefined;
            }
            let product = new Matrix(this.rows, n.cols);
            let a = this.matrix;
            let b = n.matrix;
            for (let rows=0; rows<product.rows;rows++){
               for (let cols=0; cols<product.cols; cols++) {
                  for (let colsRows=0;colsRows<this.cols;colsRows++) {
                     product.matrix[rows][cols] += a[rows][colsRows]*b[colsRows][cols];
                  }
               }
            }
            return product;
         }
         return undefined;
      }
   // does a Hadamard-Product (element-wise)
   mult(n){
      if (n instanceof Matrix) {
         for (let rows=0; rows<this.rows;rows++){
            for (let cols=0; cols<this.cols; cols++) {
               this.matrix[rows][cols] *= n.matrix[rows][cols];
            }
         }
      } else {
         for (let i=0;i<this.rows; i++) {
            for (let j=0;j<this.cols; j++){
               this.matrix[i][j]*=n;
            }
         }
         return this
      }
   }

   // returns the dot-product of two matricies
   static dot(m, n) {
            if (m.cols !== n.rows) {
               console.log("The number of columns from the first matrix has to match the number of rows of the second matrix!")
               return undefined;
            }
            let product = new Matrix(m.rows, n.cols);
            let a = m.matrix;
            let b = n.matrix;
            for (let rows=0; rows<product.rows;rows++){
               for (let cols=0; cols<product.cols; cols++) {
                  for (let colsRows=0;colsRows<m.cols;colsRows++) {
                     product.matrix[rows][cols]+=a[rows][colsRows]*b[colsRows][cols];
                  }
               }
            }
      return product;
   }

   // displays Matrix in the browser console
   show(){
      console.table(this.matrix);
   }

   // converts a one-dimensional array into a n-by-1 matrix
   static fromArray(array){
      let m = new Matrix(array.length, 1);
      for (let i=0; i<array.length; i++) {
         m.matrix[i][0] = array[i];
      }
      return m;
   }

   //returns a transposed matrix m (rows and columns flipped)
   static transpose(m){
      let result = new Matrix(m.cols, m.rows);
      for (let i=0;i<m.rows;i++){
         for(let j=0;j<m.cols;j++){
            result.matrix[j][i]=m.matrix[i][j];
         }
      }
      return result;
   }


   // converts a matrix to a one-dimensional array
   static toArray(matrix) {
      let result = [];
      for (let i=0;i<this.rows;i++){
         for(let j=0;j<this.cols;j++){
            result.push(this.matrix[i][j]);
         }
      }
      return result;
   }

   // maps a function to every element of the matrix
   map(func) {
      for (let i=0;i<this.rows; i++){
         for (let j=0;j<this.cols;j++){
            let val = this.matrix[i][j];
            this.matrix[i][j]=func(val);
         }
      }
   }

   // maps a function to every element in the matrix m
   static map(m, func) {
      let result = new Matrix(m.rows, m.cols);
      for (let i=0;i<m.rows; i++){
         for (let j=0;j<m.cols;j++){
            let val = m.matrix[i][j];
            result.matrix[i][j]=func(val);
         }
      }
      return result;
   }

   // subtracts n from m (element-wise)
   static subtract(m, n) {
      // Return new Matrix m-n
      let result = new Matrix(m.rows, m.cols);
      for (let i=0;i<result.rows;i++){
         for (let j=0;j<result.cols;j++){
            result.matrix[i][j] = m.matrix[i][j]-n.matrix[i][j];
         }
      }
      return result;
   }

   // subtracts n from the matrix
   subtract(n){
      if (n instanceof Matrix) {
         for (let i=0;i<this.rows; i++) {
            for (let j=0;j<this.cols; j++){
               this.matrix[i][j]-=n.matrix[i][j];
            }
         }
      }
      else {
         for (let i=0;i<this.rows; i++) {
            for (let j=0;j<this.cols; j++){
               this.matrix[i][j]-=n;
            }
         }
      }
   }

   // adds n to the matrix (element-wise)
   add(n){
      if (n instanceof Matrix) {
         for (let i=0;i<this.rows; i++) {
            for (let j=0;j<this.cols; j++){
               this.matrix[i][j]+=n.matrix[i][j];
            }
         }
      }
      else {
         for (let i=0;i<this.rows; i++) {
            for (let j=0;j<this.cols; j++){
               this.matrix[i][j]+=n;
            }
         }
      }
   }
}
