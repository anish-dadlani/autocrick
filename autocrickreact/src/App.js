import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import TeamsList from "./components/TeamsList";
import Signup from "./components/signup";
import NewsFeed from "./components/newsfeed";
import Tournament from "./components/tournament_form";
import Match from "./components/match_form";
import Post from "./components/post_form";
import Team from "./components/team_form";
import TeamMemers from "./components/team_members_form";
import TournamentList from "./components/TournamentList";
import MatchUpdate from "./components/match_update_form";
import MatchesList from "./components/MatchesList";
import PostsList from "./components/PostsList";
import Homepage from "./components/homepage";
import TournamentScreen from "./components/tournament_screen";
import Profile from "./components/Profile";
import PlayersDetailsList from "./components/PlayersDetailsList";
import TournamentSummary from "./components/tournament_summary";
import MatchSummary from "./components/match_summary";
import SearchTournaments from "./components/search_tournaments";
import PendingRequests from "./components/pending_requests";
import PlayerStats from "./components/PlayerStats";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/User-Profile" element={<Profile />} />
        {/* Dashboard / Newsfeed Routes */}
        <Route path="/NewsFeed" element={<NewsFeed />} />
        {/* List Routes */}
        <Route path="/PostsList" element={<PostsList />} />
        <Route path="/TeamsList" element={<TeamsList />} />
        <Route path="/MatchesList" element={<MatchesList />} />
        <Route path="/TournamentList" element={<TournamentList />} />
        {/* Forms Route (For Edit and Add) */}
        <Route path="/Tournament" element={<Tournament />} />
        <Route path="/Match" element={<Match />} />
        <Route path="/CreatePost" element={<Post />} />
        <Route path="/CreateTeam" element={<Team />} />
        <Route path="/CreateTeamMembers" element={<TeamMemers />} />
        {/* Update Routes */}
        <Route path="/MatchUpdate" element={<MatchUpdate />} />
        {/* Stats */}
        <Route path="/TournamentSummary" element={<TournamentSummary />} />
        <Route path="/MatchSummary" element={<MatchSummary />} />
        <Route path="/Tournaments_TopPlayers" element={<Homepage />} />
        <Route path="/Tournament-Schedule" element={<TournamentScreen />} />
        <Route path="/Players-Details" element={<PlayersDetailsList />} />
        <Route path="/Search-Tournaments" element={<SearchTournaments />} />
        <Route path="/Pending-Requests" element={<PendingRequests />} />
        <Route path="/Player-Statistics" element={<PlayerStats />} />
      </Routes>
    </Router>
  );
}

export default App;
