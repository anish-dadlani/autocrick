import React, { Component } from 'react';

export class MatchScoring extends Component {
  render() {
    const summaryData = {
      matchInfo: 'Match 5 | Young blood vs Stars II',
      tossInfo: 'Toss Won Shahhens, Batting First Shahhens',
      players: [
        { playerNumber: 'Player one', playerName: 'playername' },
        { playerNumber: 'Player two', playerName: 'playername' },
      ],
    };

    const battingOrderData = [
        'Player one',
        'Player two',
        'Player three',
        'Player four',
        'Player five',
        'Player six',
        'Player seven',
        'Player eight',
        'Player nine',
        'Player ten',
        'Player eleven',
      ];
      
      const scoreData = {
        bowlerName: 'Bowler name',
        selectScoreOptions: ['0', '1', '2', '3', '4', '5', '6'],
        extras: ['Wide', 'No ball', 'Bye', 'Leg bye'],
        outOptions: ['Out', 'Run out', 'Retired out', 'Not out'],
      };
      
      const sectionStyle = {
        border: '1px solid #000',
        borderRadius: '10px',
        padding: '10px',
        marginBottom: '10px',
      };
      
      const subsectionStyle = {
        border: '1px solid #000',
        borderRadius: '10px',
        padding: '10px',
        marginTop: '10px',
      };
      
      const scoreBoxesStyle = {
        display: 'flex',
        gap: '5px',
      };
      
      const scoreBoxStyle = {
        border: '1px solid #000',
        borderRadius: '5px',
        padding: '5px',
        cursor: 'pointer',
      };
      
      const runsBoxStyle = {
        marginTop: '10px',
      };
      
      return (
        <div>
          <div style={sectionStyle}>
            <h2 style={{ textDecoration: 'underline' }}>Summary</h2>
            <p style={{ fontWeight: 'bold' }}>{summaryData.matchInfo}</p>
            <p>{summaryData.tossInfo}</p>
            <p style={{ fontStyle: 'italic' }}>Now playing:</p>
            <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
              {summaryData.players.map((player, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>
                  <span style={{ fontWeight: 'bold' }}>{player.playerNumber}:</span> {player.playerName}
                </li>
              ))}
            </ul>
          </div>
      
          <div style={sectionStyle}>
            <h2 style={{ textDecoration: 'underline' }}>Batting Order</h2>
            <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
              {battingOrderData.map((player, index) => (
                <li key={index} style={{ marginBottom: '5px', cursor: 'pointer' }} onClick={() => alert(player)}>
                  {player}
                </li>
              ))}
            </ul>
          </div>
      
          <div style={sectionStyle}>
            <h2 style={{ textDecoration: 'underline' }}>Score</h2>
            <p style={{ fontWeight: 'bold' }}>{scoreData.bowlerName}</p>
            <div style={subsectionStyle}>
              <h3>Select Score</h3>
              <div style={scoreBoxesStyle}>
                {scoreData.selectScoreOptions.map((score, index) => (
                  <div
                    key={index}
                    style={scoreBoxStyle}
                    onClick={() => alert(`Selected score: ${score}`)}
                  >
                    {score}
                  </div>
                ))}
              </div>
              <div style={runsBoxStyle}>
                <label style={{ fontWeight: 'bold' }}>Runs:</label>
                <span>0</span>
              </div>
            </div>
      
            <div style={subsectionStyle}>
              <h3>Extra</h3>
              <div style={scoreBoxesStyle}>
                {scoreData.extras.map((extra, index) => (
                  <div
                    key={index}
                    style={scoreBoxStyle}
                    onClick={() => alert(`Selected extra: ${extra}`)}
                  >
                    {extra}
                  </div>
                ))}
              </div>
            </div>
      
            <div style={subsectionStyle}>
              <h3>Out</h3>
              <div style={scoreBoxesStyle}>
                {scoreData.outOptions.map((outOption, index) => (
                  <div
                    key={index}
                    style={scoreBoxStyle}
                    onClick={() => alert(`Selected out option: ${outOption}`)}
                  >
                    {outOption}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
      }
      }
      
      export default MatchScoring;
      
      
      
      
      
      
      