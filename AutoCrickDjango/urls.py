from django.contrib import admin
from django.urls import path
from autocrick.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    # Show List of all tables in Mongo DB APIs Based on IDs
    path('api/get_user_details/', get_user_details, name='get_user_details'),
    path('api/get_team_details/', get_team_details, name='get_team_details'),
    path('api/get_post_details/', get_post_details, name='get_post_details'),
    path('api/get_match_details/', get_match_details, name='get_match_details'),
    path('api/get_tournament_details/', get_tournament_details, name='get_tournament_details'),
    # Show List of all tables in Mongo DB APIs
    path('api/users/', user_list, name='api_user_list'),
    path('api/roles/', roles_list, name='api_roles_list'),
    path('api/matches_list/', matches_list, name='matches_list'),
    path('api/teams_list/', teams_list, name='teams_list'),
    path('api/getCoachNameOfTeam/', getCoachNameOfTeam, name='getCoachNameOfTeam'),
    path('api/getTournamentNameofMatch/', getTournamentNameofMatch, name='getTournamentNameofMatch'),
    path('api/getTeamName/', getTeamName, name='getTeamName'),
    path('api/tournament_list/', tournament_list, name='tournament_list'),
    path('api/posts_list/', post_list, name='posts_list'),
    path('api/player_in_match_list/', player_in_match_list, name='player_in_match_list'),
    # Authentication, Registration Routes / APIs
    path('api/login',  login, name='login'),
    path('api/signup', signup, name='signup'),
    # Save Data in Mongo DB APIs
    path('api/postSave', postSave, name='postSave'),
    path('api/teamSave', teamSave, name='teamSave'),
    path('api/matchSave', matchSave, name='matchSave'),
    path('api/tournamentSave', tournamentSave, name='tournamentSave'),
    path('api/teamMembersSave', teamMembersSave, name='teamMembersSave'),
    path('api/playersInMatchSave', playersInMatchSave, name='playersInMatchSave'),
    path('api/matchDetailsSave', matchDetailsSave, name='matchDetailsSave'),
    # Update Information APIs
    path('api/updateUser', updateUser, name='updateUser'),
    path('api/updateTournament/', updateTournament, name='updateTournament'),
    path('api/updateTeam/', updateTeam, name='updateTeam'),
    path('api/updateMatch/', updateMatch, name='updateMatch'),
    path('api/updatePost/', updatePost, name='updatePost'),
    # Stats APIs
    path('api/getTournamentMatches/', getTournamentMatches, name='getTournamentMatches'),
    path('api/getMatcheDetailsById/', getMatcheDetailsById, name='getMatcheDetailsById'),
    path('api/get_top_players/', get_top_players, name='get_top_players'),
    # get lists by users APIs
    path('api/getUsersNameByUsername/', getUsersNameByUsername, name='getUsersNameByUsername'),
    path('api/posts_list_by_user/', posts_list_by_user, name='posts_list_by_user'),
    path('api/get_team_members/', get_team_members, name='get_team_members'),
]
