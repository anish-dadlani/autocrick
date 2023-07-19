import React, { Component } from 'react';
import { FaDonate } from 'react-icons/fa';
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";

export default class DonatePledge extends Component {
  state = {
    showDonateDialog: false,
    showPledgeDialog: false,
    selectedOption: '', // 'player' or 'team'
    selectedPlayer: '',
    selectedTeam: '',
    amount: 0,
    pledgeTitle: '', // New state to store pledge title
    pledgeDescription: '', // New state to store pledge description
    successMessage: '',
  };

  toggleDialog = () => {
    this.setState((prevState) => ({
      showDonateDialog: !prevState.showDonateDialog,
      selectedOption: '',
      selectedPlayer: '',
      selectedTeam: '',
      amount: 0,
      successMessage: '',
    }));
  };

  togglePledgeDialog = () => {
    this.setState((prevState) => ({
      showPledgeDialog: !prevState.showPledgeDialog,
      pledgeTitle: '',
      pledgeDescription: '',
      successMessage: '',
    }));
  };

  handleOptionChange = (event) => {
    this.setState({ selectedOption: event.target.value });
  };

  handlePlayerChange = (event) => {
    this.setState({ selectedPlayer: event.target.value });
  };

  handleTeamChange = (event) => {
    this.setState({ selectedTeam: event.target.value });
  };

  handleAmountChange = (event) => {
    this.setState({ amount: event.target.value });
  };

  handlePledgeTitleChange = (event) => {
    this.setState({ pledgeTitle: event.target.value });
  };

  handlePledgeDescriptionChange = (event) => {
    this.setState({ pledgeDescription: event.target.value });
  };

  handleSubmit = () => {
    const { selectedOption, selectedPlayer, selectedTeam, amount } = this.state;

    // Do whatever you want to do with the selected data, e.g., store in a variable, send to the server, etc.

    const successMessage = `Donation successful!
     Selected ${selectedOption}: ${
      selectedOption === 'player' ? selectedPlayer : selectedTeam
    }, Amount: $${amount}`;
    this.setState({ successMessage });
  };

  handlePledgeSubmit = () => {
    const { pledgeTitle, pledgeDescription } = this.state;

    // Do whatever you want to do with the pledge data, e.g., store in a variable, send to the server, etc.

    const successMessage = `Pledge successfully created! Title: ${pledgeTitle}, Description: ${pledgeDescription}`;
    this.setState({ successMessage });
  };

  render() {
    const containerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    };

    const buttonsContainerStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '50px',
    };

    const buttonStyle = {
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '180px',
      height: '50px',
      backgroundColor: 'white',
      color: 'black',
      fontSize: '20px',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    };

    const imageContainerStyle = {
      width: '300px',
      height: '350px',
      overflow: 'hidden',
      border: '1px solid #ccc',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      borderRadius: '5px',
      display: 'flex',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '100px',
    };

    const dialogBoxStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '30px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      borderRadius: '5px',
      display: this.state.showDonateDialog || this.state.showPledgeDialog ? 'block' : 'none',
      minWidth: '300px',
      border: '2px solid #ccc',
    };

    const closeBtnStyle = {
      position: 'absolute',
      top: '10px',
      right: '10px',
      cursor: 'pointer',
    };

    const optionMenuStyle = {
      marginBottom: '15px',
    };

    const successMessageStyle = {
      marginTop: '10px',
      color: 'green',
      fontWeight: 'bold',
    };
    
    const boybackground = {
        backgroundColor: '#014421',
    };

    const players = ['Player 1', 'Player 2', 'Player 3']; // Replace with your actual player names
    const teams = ['Team A', 'Team B', 'Team C']; // Replace with your actual team names

    const DonateIcon = () => <FaDonate />;

    return (
        <div>
            <HeaderBar/>
        <div style={boybackground}>
      <div style={containerStyle}>
        <div style={buttonsContainerStyle}>
          <button style={buttonStyle} className="donate-btn" onClick={this.toggleDialog}>
            Donate Now
          </button>
          <button style={buttonStyle} className="pledge-btn" onClick={this.togglePledgeDialog}>
            Make a Pledge
          </button>
        </div>
        <div style={imageContainerStyle}>
          <DonateIcon />
        </div>

        <div style={dialogBoxStyle}>
          <span style={closeBtnStyle} onClick={this.toggleDialog}>
            &times;
          </span>

          {this.state.showDonateDialog && (
            <div>
              <h2>Donate Now</h2>
              <div>
                <label>
                  <input
                    type="radio"
                    value="player"
                    checked={this.state.selectedOption === 'player'}
                    onChange={this.handleOptionChange}
                  />
                  Player
                </label>
                <label>
                  <input
                    type="radio"
                    value="team"
                    checked={this.state.selectedOption === 'team'}
                    onChange={this.handleOptionChange}
                  />
                  Team
                </label>
              </div>

              {this.state.selectedOption === 'player' && (
                <div style={optionMenuStyle}>
                  <label>Select Player:</label>
                  <select value={this.state.selectedPlayer} onChange={this.handlePlayerChange}>
                    <option value="">Choose</option>
                    {players.map((player) => (
                      <option key={player} value={player}>
                        {player}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {this.state.selectedOption === 'team' && (
                <div style={optionMenuStyle}>
                  <label>Select Team:</label>
                  <select value={this.state.selectedTeam} onChange={this.handleTeamChange}>
                    <option value="">Choose</option>
                    {teams.map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div style={optionMenuStyle}>
                <label>Amount:</label>
                <input type="number" value={this.state.amount} onChange={this.handleAmountChange} />
              </div>

              <button
                style={{
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
                onClick={this.handleSubmit}
              >
                Submit
              </button>

              {this.state.successMessage && (
                <div style={successMessageStyle}>{this.state.successMessage}</div>
              )}
            </div>
          )}

          {this.state.showPledgeDialog && (
            <div>
              <span style={closeBtnStyle} onClick={this.togglePledgeDialog}>
                &times;
              </span>
              <h2>Make a Pledge</h2>
              <div style={optionMenuStyle}>
                <label>Pledge Title:</label>
                <input
                  type="text"
                  value={this.state.pledgeTitle}
                  onChange={this.handlePledgeTitleChange}
                />
              </div>

              <div style={optionMenuStyle}>
                <label>Pledge Description:</label>
                <input
                  type="text"
                  value={this.state.pledgeDescription}
                  onChange={this.handlePledgeDescriptionChange}
                />
              </div>

              <button
                style={{
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
                onClick={this.handlePledgeSubmit}
              >
                Submit
              </button>

              {this.state.successMessage && (
                <div style={successMessageStyle}>{this.state.successMessage}</div>
              )}
            </div>
          )}
        </div>
      </div>
      </div>
      <Footer/>
      </div>
    );
  }
}
