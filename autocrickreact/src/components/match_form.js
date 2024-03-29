import React, { Component } from "react";
import {
  getTournaments,
  matchSave,
  get_match_details,
  updateMatch,
  get_list,
} from "../services/api";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import "../assets/styles.css";
import SuccessMessage from "../includes/success";
import ErrorMessage from "../includes/error";

export default class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournament_id: "",
      title: "",
      description: "",
      start_date: "",
      start_time: "",
      status: "1",
      total_overs: "0",
      created_at: "",
      tournaments: [],
      teams: [],
      team_id1: null,
      team_id2: null,
      isError: false,
      isLoading: true,
      showSuccessModal: false,
      showErrorModal: false,
      successMessage: "",
      errorMessage: "",
      _id: this.props._id ?? null,
    };
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

  async componentDidMount() {
    try {
      if (this.state._id !== null) {
        const match = await get_match_details(this.state._id);
        this.setState({
          title: match[0].title,
          description: match[0].description,
          tournament_id: match[0].tournament_id,
          start_date: match[0].start_date,
          start_time: match[0].start_time,
          team_id1: match[0].team_id1,
          team_id2: match[0].team_id2,
          total_overs: match[0].total_overs,
        });
      }
      const tournaments = await getTournaments();
      const teams = await get_list("teams_list_status_active");
      this.setState({ tournaments, teams: teams.teams, isLoading: false });
    } catch (error) {
      this.setState({ isError: true, isLoading: false });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      tournament_id,
      title,
      description,
      start_date,
      start_time,
      team_id1,
      team_id2,
      status,
      total_overs,
      created_at,
      _id,
    } = this.state;
    if (_id == null) {
      const matchData = {
        tournament_id,
        title,
        description,
        start_date,
        start_time,
        team_id1,
        team_id2,
        status,
        total_overs,
        created_at,
      };
      matchSave(matchData)
        .then((data) => {
          if (data.response === true) {
            this.showSuccessModal(data.message);
            this.setState({
              tournament_id: "",
              title: "",
              description: "",
              start_date: "",
              start_time: "",
              status: "1",
              created_at: "",
              team_id1: null,
              team_id2: null,
              total_overs: "0",
            });
          } else {
            this.showErrorModal(data.error);
          }
        })
        .catch((error) => {
          this.showErrorModal(error.message);
        });
    } else if (_id !== null) {
      const matchDataUpdate = {
        tournament_id,
        title,
        description,
        start_date,
        start_time,
        team_id1,
        team_id2,
        total_overs,
      };
      updateMatch(_id, matchDataUpdate)
        .then((data) => {
          if (data.response === true) {
            this.showSuccessModal(data.message);
            this.setState({
              tournament_id: "",
              title: "",
              description: "",
              start_date: "",
              start_time: "",
              team_id1: null,
              team_id2: null,
              total_overs: "0",
            });
          } else {
            this.showErrorModal(data.error);
          }
        })
        .catch((error) => {
          this.showErrorModal(error.message);
        });
    }
  };

  renderSuccessModal() {
    const { successMessage } = this.state;
    return (
      <SuccessMessage
        message={successMessage}
        onClose={this.hideSuccessModal}
        onGoToHomepage={() => {
          this.hideSuccessModal();
          window.location.replace("/MatchesList");
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
      tournament_id,
      title,
      description,
      start_date,
      start_time,
      tournaments,
      _id,
      teams,
      team_id1,
      team_id2,
      total_overs,
    } = this.state;
    return (
      <div>
        <HeaderBar />
        <div style={styles.container}>
          <Sidebar />
          <div style={styles.containerMain}>
            <div className="news-feed">
              <div className="content">
                <div className="container">
                  <h2>{_id == null ? "Create" : "Update"} Match</h2>
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      padding: "20px",
                      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
                      borderRadius: "10px",
                      marginBottom: "20px",
                      width: "100%",
                      maxWidth: "475px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <form onSubmit={this.handleSubmit}>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label>Title:</label>
                            <input
                              type="text"
                              name="title"
                              value={title}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Start Date:</label>
                            <input
                              type="date"
                              name="start_date"
                              value={start_date}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Tournament:</label>
                            <select
                              name="tournament_id"
                              value={tournament_id}
                              onChange={this.handleChange}
                            >
                              <option value="">Select Tournament</option>
                              {tournaments.map((tournament) => (
                                <option value={tournament._id}>
                                  {tournament.title}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Team 2:</label>
                            <select
                              name="team_id2"
                              value={team_id2}
                              onChange={this.handleChange}
                            >
                              <option value="">Select Team 2</option>
                              {teams.map((team) => (
                                <option value={team._id} key={team._id}>
                                  {team.title}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-group">
                            <label>Description:</label>
                            <input
                              type="text"
                              name="description"
                              value={description}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Start Time:</label>
                            <input
                              type="time"
                              name="start_time"
                              value={start_time}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Team 1:</label>
                            <select
                              name="team_id1"
                              value={team_id1}
                              onChange={this.handleChange}
                            >
                              <option value="">Select Team 1</option>
                              {teams.map((team) => (
                                <option value={team._id} key={team._id}>
                                  {team.title}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Total Overs:</label>
                            <input
                              type="text"
                              name="total_overs"
                              value={total_overs}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      {this.state.showSuccessModal && this.renderSuccessModal()}
                      {this.state.showErrorModal && this.renderErrorModal()}
                      <button type="submit" className="submit-button">
                        {_id == null ? "Create" : "Update"} Match
                      </button>
                    </form>
                  </div>
                </div>
              </div>
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
    /* backgroundColor: "#f5f5f5", */
	backgroundImage: `url('posts/background.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
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
