import { getRandomMatrix } from "../utils/matrix";
export default class LifeMatrix {
    private _matrix: number[][];
    constructor(rows: number, columns: number) {
        this._matrix = getRandomMatrix(rows, columns, 0, 1);
    }
    get matrix() {
      return this._matrix;
    };

    private countAliveAround(x: number, y: number): number {
        let count = 0;
        const directions = [
          [x - 1, y - 1], [x - 1, y], [x - 1, y + 1],
          [x,     y - 1],             [x,     y + 1],
          [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]
        ];    
        directions.forEach(([i, j]) => {
          if (this._matrix[i]?.[j] === 1) {
            count++;
          };
        });      
        return count;
    };
    next(): number[][] {       
        //implementation of game of life algorith         
        const cols = this._matrix[0].length;
        const newMatrix: number[][] = [];
        this._matrix.flat().map((_, i) => {         
           const Newy = Math.floor(i / cols);
           const Newx = i % cols;        
           const aliveAround = this.countAliveAround(Newy, Newx);
           const cell = this._matrix[Newy][Newx]; 
           if (!newMatrix[Newy]) { newMatrix[Newy] = []; newMatrix[Newy][Newx]=0; }
           if (cell === 1) {
            newMatrix[Newy][Newx] = aliveAround === 2 || aliveAround === 3 ? 1 : 0;
          } else {
            newMatrix[Newy][Newx] = aliveAround === 3 ? 1 : 0;
          };        
        });     
        this._matrix = newMatrix;
        return this._matrix
    };
};
