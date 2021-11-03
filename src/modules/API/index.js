/*
    Sample `team` object:
    
    {
        "team": {
            "id": 541,
            "name": "Real Madrid",
            "country": "Spain",
            "founded": 1902,
            "national": false,
            "logo": "https://media.api-sports.io/football/teams/541.png"
        },
        "venue": {
            "id": 1456,
            "name": "Estadio Santiago Bernabéu",
            "address": "Avenida de Concha Espina 1, Chamartín",
            "city": "Madrid",
            "capacity": 85454,
            "surface": "grass",
            "image": "https://media.api-sports.io/football/venues/1456.png"
        }
    }
*/

export const getTeamByName = (teamName) => {
    return fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?name=${teamName}`, {
	    "method": "GET",
	    "headers": {
	    	"x-rapidapi-host": "api-football-v1.p.rapidapi.com",
	    	"x-rapidapi-key": "152e0cdc26msh98d504390075f2dp1eeb72jsn4ab228d3c452"
	    }
    })
    .then(response => {
        return response.json();
    })
    .then(teamResponse => {
        const [teamData] = teamResponse.response;
        return teamData;
    })
    .catch(err => {
        console.error(err);
    });
}

export const getTeamPlayers = (teamId) => {
   // TODO: Update app to allow users to pick different seasons
    return fetch(`https://api-football-v1.p.rapidapi.com/v3/players?team=${teamId}&season=2021`, {
	    "method": "GET",
	    "headers": {
	    	"x-rapidapi-host": "api-football-v1.p.rapidapi.com",
	    	"x-rapidapi-key": "152e0cdc26msh98d504390075f2dp1eeb72jsn4ab228d3c452"
	    }
    })
    .then(response => response.json())
    .then(playersResponse => playersResponse.response)
    .catch(err => {
        console.error(err);
    }); 
}