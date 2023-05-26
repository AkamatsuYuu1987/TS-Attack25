type Panel = {
    id: number;
    color: 'red' | 'white' | 'green' | 'blue' | 'gray';
};

type Player = {
    name: string;
    color: 'red' | 'white' | 'green' | 'blue';
};

class Game {
    panels: Panel[] = [];
    players: Player[] = [];

    constructor() {
        // Create 25 panels
        for (let i = 1; i <= 25; i++) {
            this.panels.push({ id: i, color: 'gray' });
        }

        // Create players
        this.players.push({ name: 'Player1', color: 'red' });
        this.players.push({ name: 'Player2', color: 'white' });
        this.players.push({ name: 'Player3', color: 'green' });
        this.players.push({ name: 'Player4', color: 'blue' });
    }

    selectPanel(player: Player, panelId: number) {
        // Add logic here to validate the move and change colors as per the rules
    }
}
