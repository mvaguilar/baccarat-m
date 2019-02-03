import * as React from "react";
import GameHistory from './GameHistory';

interface IPopup {
    closePopup?: any;
    gameHistory: GameHistory;
}

class GameHistoryPopup extends React.Component<IPopup> {
    records = this.props.gameHistory;
    listItems = this.records.getPastResults().map((number) =>
        <li className="game-history-list">
            {number.getRoundResult()}
        </li>
    );
    tableHistory = this.records.getPastResults().map((number) =>
        <tr>
            <td>{number.getRoundName()}</td>
            <td>{number.getPlayerWin()}</td>
            <td>{number.getBankerWin()}</td>
            <td>{number.getTie()}</td>
            <td>{number.getPlayerPair()}</td>
            <td>{number.getBankerPair()}</td>
        </tr>
    );
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <table className="game-table">
                        <thead>
                            <tr>
                                <th>Round</th>
                                <th>Player Win</th>
                                <th>Banker Win</th>
                                <th>Tie</th>
                                <th>Player Pair</th>
                                <th>Banker Pair</th>
                            </tr>
                        </thead>
                        <tbody>{this.tableHistory}</tbody>
                    </table>
                    <button onClick={this.props.closePopup}>close me</button>
                </div>
            </div>
        );
    }
}

export default GameHistoryPopup;