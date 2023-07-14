const API_BASE_URL = "http://localhost:8000/api";

// Authentication Registration APIs
export const login = async (userData) => {
  return fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Invalid login credentials");
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const signup = async (userData) => {
  return fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Invalid Input");
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};

// update users APIs
export const updateUser = async (userId, userData) => {
  return fetch(`${API_BASE_URL}/updateUser`, {
    // return fetch(`${API_BASE_URL}/updateUser/?user_id=${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Invalid Input");
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};

// update tournament API
export const updateTournament = async (tournamentId, tournamentData) => {
  return fetch(
    `${API_BASE_URL}/updateTournament/?tournamentId=${tournamentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tournamentData),
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something Went Wrong!");
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};

export const updateTeam = async (teamId, teamData) => {
  return fetch(`${API_BASE_URL}/updateTeam/?teamId=${teamId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teamData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something Went Wrong!");
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};

export const updatePost = async (postId, postData) => {
  return fetch(`${API_BASE_URL}/updatePost/?postId=${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something Went Wrong!");
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};

export const updateMatch = async (matchId, matchData) => {
  return fetch(`${API_BASE_URL}/updateMatch/?matchId=${matchId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(matchData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something Went Wrong!");
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};

// Show list of Users APIs
export const getUsers = async (role_id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/?role_id=${role_id}`);
    if (!response.ok) {
      throw new Error("Error loading users.");
    }
    const data = await response.json();
    return data.users;
  } catch (error) {
    throw new Error("Error loading users.");
  }
};

// Show list of Users APIs
export const get_user_details = async (user_id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/get_user_details/?user_id=${user_id}`
    );
    if (!response.ok) {
      throw new Error("Error loading users.");
    }
    const data = await response.json();
    return data.users;
  } catch (error) {
    throw new Error("Error loading users.");
  }
};

export const get_tournament_details = async (_id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/get_tournament_details/?_id=${_id}`
    );
    if (!response.ok) {
      throw new Error("Error loading tournamnents.");
    }
    const data = await response.json();
    return data.tournament;
  } catch (error) {
    throw new Error("Error loading users.");
  }
};

export const get_team_details = async (_id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/get_team_details/?_id=${_id}`
    );
    if (!response.ok) {
      throw new Error("Error loading team.");
    }
    const data = await response.json();
    return data.team;
  } catch (error) {
    throw new Error("Error loading users.");
  }
};

export const get_match_details = async (_id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/get_match_details/?_id=${_id}`
    );
    if (!response.ok) {
      throw new Error("Error loading match.");
    }
    const data = await response.json();
    return data.match;
  } catch (error) {
    throw new Error("Error loading users.");
  }
};

export const get_post_details = async (_id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/get_post_details/?_id=${_id}`
    );
    if (!response.ok) {
      throw new Error("Error loading post.");
    }
    const data = await response.json();
    return data.post;
  } catch (error) {
    throw new Error("Error loading users.");
  }
};

export const getCoachNameOfTeam = async (coach_id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/getCoachNameOfTeam/?coach_id=${coach_id}`
    );
    if (!response.ok) {
      throw new Error("Error loading coach names.");
    }
    const data = await response.json();
    return data.coachNames;
  } catch (error) {
    throw new Error("Error loading coach names.");
  }
};

export const getUsersNameByUsername = async (username) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/getUsersNameByUsername/?username=${username}`
    );
    if (!response.ok) {
      throw new Error("Error loading user names.");
    }
    const data = await response.json();
    return data.UsersName;
  } catch (error) {
    throw new Error("Error loading user names.");
  }
};

export const getTournamentNameofMatch = async (tournament_id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/getTournamentNameofMatch/?tournament_id=${tournament_id}`
    );
    if (!response.ok) {
      throw new Error("Error loading tournament names.");
    }
    const data = await response.json();
    return data.tournamentNames;
  } catch (error) {
    throw new Error("Error loading tournament names.");
  }
};

export const getTournamentMatches = async (tournament_id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/getTournamentMatches/?tournament_id=${tournament_id}`
    );
    if (!response.ok) {
      throw new Error("Error loading tournament Matches.");
    }
    const data = await response.json();
    return data.tournamentMatches;
  } catch (error) {
    throw new Error("Error loading tournament Matches.");
  }
};

export const getTeamName = async (team_id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/getTeamName/?team_id=${team_id}`
    );
    if (!response.ok) {
      throw new Error("Error loading team name.");
    }
    const data = await response.json();
    return data.teamName[0].title;
  } catch (error) {
    throw new Error("Error loading team name.");
  }
};

export const getMatcheDetailsById = async (match_id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/getMatcheDetailsById/?match_id=${match_id}`
    );
    if (!response.ok) {
      throw new Error("Error loading Matches Details.");
    }
    const data = await response.json();
    return data.matchDetails;
  } catch (error) {
    throw new Error("Error loading Matches Details.");
  }
};

export const get_top_players = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/get_top_players/`);
    if (!response.ok) {
      throw new Error("Error loading Top Players.");
    }
    const data = await response.json();
    return data.top_players;
  } catch (error) {
    throw new Error("Error loading Top Players.");
  }
};

export const getRoles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/roles/`);
    if (!response.ok) {
      throw new Error("Error loading roles.");
    }
    const data = await response.json();
    return data.roles;
  } catch (error) {
    throw new Error("Error loading roles.");
  }
};

export const getTournaments = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tournament_list/`);
    if (!response.ok) {
      throw new Error("Error loading Tournaments.");
    }
    const data = await response.json();
    return data.tournaments;
  } catch (error) {
    throw new Error("Error loading Tournaments.");
  }
};

export const getMatches = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches_list/`);
    if (!response.ok) {
      throw new Error("Error loading Matches.");
    }
    const data = await response.json();
    return data.matches;
  } catch (error) {
    throw new Error("Error loading Matches.");
  }
};

export const getTeams = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/teams_list/`);
    if (!response.ok) {
      throw new Error("Error loading Teams.");
    }
    const data = await response.json();
    return data.teams;
  } catch (error) {
    throw new Error("Error loading Teams.");
  }
};

export const getPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts_list/`);
    if (!response.ok) {
      throw new Error("Error loading Posts.");
    }
    const data = await response.json();
    return data.posts;
  } catch (error) {
    throw new Error("Error loading Posts.");
  }
};

export const getPlayerInMatchList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/player_in_match_list/`);
    if (!response.ok) {
      throw new Error("Error loading Player In Match List.");
    }
    const data = await response.json();
    return data.players_in_match;
  } catch (error) {
    throw new Error("Error loading Player In Match List.");
  }
};

// Save Data in Mongo DB APIs
export const tournamentSave = async (tournamentData) => {
  return fetch(`${API_BASE_URL}/tournamentSave`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tournamentData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Invalid Input");
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};

export const matchSave = async (matchData) => {
  return fetch(`${API_BASE_URL}/matchSave`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(matchData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Invalid Input");
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};

export const playersInMatchSave = async (playersInMatchData) => {
  return fetch(`${API_BASE_URL}/playersInMatchSave`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playersInMatchData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Invalid Input");
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};

export const postSave = async (postData) => {
  return fetch(`${API_BASE_URL}/postSave`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'multipart/form-data'
    },
    body: JSON.stringify(postData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Invalid Input");
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};

export const teamSave = async (matchData) => {
  return fetch(`${API_BASE_URL}/teamSave`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(matchData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Invalid Input");
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};

export const teamMembersSave = async (matchData) => {
  return fetch(`${API_BASE_URL}/teamMembersSave`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(matchData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Invalid Input");
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};

export const matchDetailsSave = async (matchDetails) => {
  return fetch(`${API_BASE_URL}/matchDetailsSave`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(matchDetails),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Invalid Input");
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};

export const posts_list_by_user = async (username) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/posts_list_by_user/?username=${username}`
    );
    if (!response.ok) {
      throw new Error("Error loading Posts.");
    }
    const data = await response.json();
    return data.posts;
  } catch (error) {
    throw new Error("Error loading Posts.");
  }
};

export const get_team_members = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/get_team_members/`);
    if (!response.ok) {
      throw new Error("Error loading Players Details.");
    }
    const data = await response.json();
    return data.team_members;
  } catch (error) {
    throw new Error("Error loading  Players Details.");
  }
};
