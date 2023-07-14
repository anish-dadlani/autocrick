import React, { Component } from "react";
import {
  matchDetailsSave,
  getUsers,
  getMatches,
  getMatcheDetailsById,
} from "../services/api";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import "../assets/styles.css";
import SuccessMessage from "../includes/success";
import ErrorMessage from "../includes/error";

export default class MatchUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      match_id: "",
      batsman_id: "",
      bowler_id: "",
      runs: "",
      wickets: "0",
      extras: "0",
      innings: "",
      outOption: "not_out",
      players: [],
      matches: [],
      matchDetailsbyId: [],
      showSuccessModal: false,
      showErrorModal: false,
      successMessage: "",
      errorMessage: "",
      isLoading: true,
      isError: false,
      current_over: "0", // Add the current_over variable to the initial state
      current_ball: "0", // Add the current_ball variable to the initial state
    };
  }

  async componentDidMount() {
    try {
      const players = await getUsers(3);
      const matches = await getMatches();
      this.setState({ players, matches, isLoading: false });
    } catch (error) {
      this.setState({ isError: true, isLoading: false });
    }
  }

  showSuccessModal = (message) => {
    this.setState({ successMessage: message, showSuccessModal: true });
  };

  hideSuccessModal = () => {
    this.setState({ showSuccessModal: false });
  };

  showErrorModal = (message) => {
    this.setState({ errorMessage: message, showErrorModal: true });
  };

  hideErrorModal = () => {
    this.setState({ showErrorModal: false });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "extra") {
      this.setState({ extra: value === "" ? "0" : "1" });
    } else {
      if (name === "match_id") {
        getMatcheDetailsById(value).then((data) => {
          this.setState({ matchDetailsbyId: data });
        });
      }
      this.setState({ [name]: value });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      match_id,
      batsman_id,
      bowler_id,
      runs,
      wickets,
      innings,
      extras,
      outOption,
      current_over,
      current_ball,
    } = this.state;
    const matchDetails = {
      match_id,
      batsman_id,
      bowler_id,
      runs,
      wickets,
      innings,
      extras,
      outOption,
      current_over,
      current_ball,
    };

    matchDetailsSave(matchDetails)
      .then((data) => {
        if (data.response === true) {
          this.showSuccessModal(data.message);
          this.setState(
            {
              batsman_id: "",
              bowler_id: "",
              runs: "",
              wickets: "0",
              innings: "",
              extras: "0",
              outOption: "not_out",
              current_over: "",
              current_ball: "",
            },
            () => {
              if (this.state.match_id !== "") {
                getMatcheDetailsById(this.state.match_id).then((data) => {
                  this.setState({ matchDetailsbyId: data });
                });
              }
            }
          );
        } else {
          this.showErrorModal(data.error);
        }
      })
      .catch((error) => {
        this.showErrorModal(error.message);
      });
  };

  renderSuccessModal() {
    const { successMessage } = this.state;
    return (
      <SuccessMessage
        message={successMessage}
        onClose={this.hideSuccessModal}
        onAddAnother={() => {
          this.hideSuccessModal();
          // Perform additional actions for adding another team member
        }}
        onGoToHomepage={() => {
          this.hideSuccessModal();
          // Redirect to the homepage
          window.location.replace("/NewsFeed");
        }}
      />
    );
  }

  renderErrorModal() {
    const { errorMessage } = this.state;
    return (
      <ErrorMessage message={errorMessage} onClose={this.hideErrorModal} />
    );
  }

  render() {
    const {
      matchDetailsbyId,
      match_id,
      batsman_id,
      bowler_id,
      runs,
      wickets,
      players,
      matches,
      innings,
      outOption,
      extras,
      current_ball,
      current_over,
    } = this.state;
    // Generate options for the "over" menu
    const overOptions = [];
    const maxOverValue = 20; // Adjust the maximum value as needed
    for (let i = 1; i <= maxOverValue; i++) {
      overOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    var overSummaryRows = [];
    var matchSummaryRows = [];
    if (matchDetailsbyId.length > 0) {
      var currentOver = null;
      var currentOverSummary = null;

      matchDetailsbyId.forEach((item) => {
        const overNumber = parseInt(item.current_over);
        const ballNumber = parseInt(item.current_ball);

        if (overNumber !== currentOver) {
          currentOver = overNumber;
          currentOverSummary = {
            over_number: currentOver,
            balls: [],
          };
          overSummaryRows.push(currentOverSummary);
        }

        const ballSummary = {
          ball_no: ballNumber,
          sixes: item.runs === "6" ? 1 : 0,
          fours: item.runs === "4" ? 1 : 0,
          extra: parseInt(item.extras),
          type_of_extra: "-",
          wickets: parseInt(item.wickets),
          type_of_wicket: "-",
          total_runs: parseInt(item.runs),
        };

        currentOverSummary.balls.push(ballSummary);
      });
      var matchSummaryMap = {};
      matchDetailsbyId.forEach((item) => {
        const overNumber = parseInt(item.current_over);
        if (!matchSummaryMap[overNumber]) {
          matchSummaryMap[overNumber] = {
            over_number: overNumber,
            sixes: 0,
            fours: 0,
            extra: 0,
            type_of_extra: "-",
            wickets: 0,
            type_of_wicket: "-",
            total_runs: 0,
          };
        }
        const matchSummaryRow = matchSummaryMap[overNumber];
        matchSummaryRow.total_runs += parseInt(item.runs);
        if (item.runs === "6") {
          matchSummaryRow.sixes += 1;
        } else if (item.runs === "4") {
          matchSummaryRow.fours += 1;
        }
        matchSummaryRow.extra += parseInt(item.extras);
        matchSummaryRow.wickets += parseInt(item.wickets);
      });
      matchSummaryRows = Object.values(matchSummaryMap);
    }

    return (
      <div>
        <HeaderBar />
        <div style={styles.container}>
          <Sidebar />
          <div style={styles.containerMain}>
            <div className="news-feed">
              <div className="content">
                <div className="container">
                  <h2>Match Details</h2>
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      padding: "20px",
                      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
                      borderRadius: "10px",
                      marginBottom: "20px",
                      width: "100%",
                      maxWidth: "480px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <form onSubmit={this.handleSubmit}>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label>Innings:</label>
                            <select
                              id="innings"
                              name="innings"
                              value={innings}
                              onChange={this.handleChange}
                            >
                              <option value="">Select Innings</option>
                              <option value="first">First Inning</option>
                              <option value="second">Second Inning</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Batsman:</label>
                            <select
                              id="batsman_id"
                              name="batsman_id"
                              value={batsman_id}
                              onChange={this.handleChange}
                            >
                              <option value="">Select Batsman</option>
                              {players.map((player) => (
                                <option key={player._id} value={player._id}>
                                  {player.fullname}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Bowler:</label>
                            <select
                              id="bowler_id"
                              name="bowler_id"
                              value={bowler_id}
                              onChange={this.handleChange}
                            >
                              <option value="">Select Bowler</option>
                              {players.map((player) => (
                                <option key={player._id} value={player._id}>
                                  {player.fullname}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Wickets:</label>
                            <input
                              type="text"
                              name="wickets"
                              value={wickets}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Out:</label>
                            <select
                              id="outOption"
                              name="outOption"
                              value={outOption}
                              onChange={this.handleChange}
                            >
                              <option value="">Select Out Option</option>
                              <option value="out">Out</option>
                              <option value="run_out">Run Out</option>
                              <option value="retired_out">Retired Out</option>
                              <option value="not_out">Not Out</option>
                            </select>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-group">
                            <label>Match:</label>
                            <select
                              id="match_id"
                              name="match_id"
                              value={match_id}
                              onChange={this.handleChange}
                            >
                              <option value="">Select Match</option>
                              {matches.map((match) => (
                                <option key={match._id} value={match._id}>
                                  {match.title}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Runs:</label>
                            <input
                              type="text"
                              name="runs"
                              value={runs}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Over:</label>
                            <select
                              id="current_over"
                              name="current_over"
                              value={current_over}
                              onChange={this.handleChange}
                            >
                              <option value="">Select Over</option>
                              {overOptions}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Ball:</label>
                            <select
                              id="current_ball"
                              name="current_ball"
                              value={current_ball}
                              onChange={this.handleChange}
                            >
                              <option value="">Select Ball</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Extra:</label>
                            <select
                              id="extra"
                              name="extra"
                              value={extras}
                              onChange={this.handleChange}
                            >
                              <option value="0">Select Extra</option>
                              <option value="wide">Wide</option>
                              <option value="no_ball">No Ball</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      {this.state.showSuccessModal && this.renderSuccessModal()}
                      {this.state.showErrorModal && this.renderErrorModal()}
                      <div className="submit-button-container">
                        <button type="submit" className="submit-button">
                          Add Detail
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {matchDetailsbyId.length > 0 && (
                <div className="match-summary">
                  <h2>Over Summary</h2>
                  {overSummaryRows.map((over, index) => (
                    <div key={index}>
                      <h3>Over {over.over_number}</h3>
                      <table>
                        <thead>
                          <tr>
                            <th>Ball No</th>
                            <th>Sixes</th>
                            <th>Fours</th>
                            <th>Extra</th>
                            <th>Type of Extra</th>
                            <th>Wickets</th>
                            <th>Type of Wicket</th>
                            <th>Total Runs</th>
                          </tr>
                        </thead>
                        <tbody>
                          {over.balls.map((ball, ballIndex) => (
                            <tr key={ballIndex}>
                              <td>{ball.ball_no}</td>
                              <td>{ball.sixes}</td>
                              <td>{ball.fours}</td>
                              <td>{ball.extra}</td>
                              <td>{ball.type_of_extra}</td>
                              <td>{ball.wickets}</td>
                              <td>{ball.type_of_wicket}</td>
                              <td>{ball.total_runs}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                  <div className="over-summary"></div>

                  <h2>Match Summary</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Over Number</th>
                        <th>Sixes</th>
                        <th>Fours</th>
                        <th>Extra</th>
                        <th>Type of Extra</th>
                        <th>Wickets</th>
                        <th>Type of Wicket</th>
                        <th>Total Runs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matchSummaryRows.map((row, index) => (
                        <tr key={index}>
                          <td>{row.over_number}</td>
                          <td>{row.sixes}</td>
                          <td>{row.fours}</td>
                          <td>{row.extra}</td>
                          <td>{row.type_of_extra}</td>
                          <td>{row.wickets}</td>
                          <td>{row.type_of_wicket}</td>
                          <td>{row.total_runs}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <style>
                    {`
        .match-summary {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        table {
          border-collapse: collapse;
          width: 100%;
          max-width: 600px;
          margin-top: 20px;
        }

        th, td {
          padding: 10px;
          text-align: center;
          border: 1px solid #ccc;
        }

        thead {
          background-color: #f2f2f2;
          font-weight: bold;
        }

        tbody tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        tbody tr:hover {
          background-color: #eaeaea;
        }

        .over-summary {
          margin-top: 20px;
        }
      `}
                  </style>
                </div>
              )}
              <br></br>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  containerMain: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};
