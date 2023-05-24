const board: HTMLDivElement = document.querySelector('#board') as HTMLDivElement;

class Cell {
    public element: HTMLDivElement;
    public selected: boolean = false;

    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('cell');
        this.element.addEventListener('click', () => this.onClick());
    }

    onClick(): void {
        if (this.selected) {
            return;
        }
        this.selected = true;
        this.element.classList.add('selected');
    }
}

class Board {
    public cells: Cell[][] = [];

    constructor() {
        for (let i = 0; i < 5; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 5; j++) {
                const cell = new Cell();
                row.push(cell);
                board.appendChild(cell.element);
            }
            this.cells.push(row);
        }
    }
}

new Board();
