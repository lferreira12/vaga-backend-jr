var classification= {
	"Arabia_Saudita": {"pontos":0,"vitorias":0,"empates":0,"saldo_de_gols":0,"gols_sofridos":0,"gols_feitos":0},
	"Uruguai": {"pontos":0,"vitorias":0,"empates":0,"saldo_de_gols":0,"gols_sofridos":0,"gols_feitos":0},
	"Egito": {"pontos":0,"vitorias":0,"empates":0,"saldo_de_gols":0,"gols_sofridos":0,"gols_feitos":0},
	"Russia": {"pontos":0,"vitorias":0,"empates":0,"saldo_de_gols":0,"gols_sofridos":0,"gols_feitos":0},
};

var final_classification = [];

var matches = [
	{
		"home_name" : "Uruguai",
		"home_goals" : 1,
		"away_name" : "Egito",
		"away_goals" : 0,
	},
	{
		"home_name" : "Russia",
		"home_goals" : 5,
		"away_name" : "Arabia_Saudita",
		"away_goals" : 0,
		
	},
	{
		"home_name" : "Russia",
		"home_goals" : 3,
		"away_name" : "Egito",
		"away_goals" : 1,
	},
	{
		"home_name" : "Uruguai",
		"home_goals" : 1,
		"away_name" : "Arabia_Saudita",
		"away_goals" : 0,
	},
	{
		"home_name" : "Uruguai",
		"home_goals" : 3,
		"away_name" : "Russia",
		"away_goals" : 0,
	},
	{
		"home_name" : "Egito",
		"home_goals" : 1,
		"away_name" : "Arabia_Saudita",
		"away_goals" : 2,
	}
];

function win(home_name, home_goals, away_name, away_goals){
	if(home_goals > away_goals){
		return {"winner" : "home_name", "looser" : "away_name"};
	}
	else if(home_goals < away_goals){
		return {"winner" : "away_name", "looser" : "home_name"};
	}
	else if(home_goals == away_goals){
		return null;
	}
};
for (var index in matches){
	var winner_points = 3;
	var looser_points = 0;
	var match = matches[index];
	var result_keys = win(match.home_name, match.home_goals, match.away_name, match.away_goals);
	var winner_goals = 0;
	var looser_goals = 0;

	if(result_keys == null)
	{
		var winner_points = 1;
		var looser_points = 1;
		result_keys = {"winner" : "home_name", "looser" : "away_name"};
	}
	else if(result_keys.winner == 'home_name')
	{
		winner_goals = match['home_goals'];
		looser_goals = match['away_goals'];
	}
	else{
		winner_goals = match['away_goals'];
		looser_goals = match['home_goals'];	
	}
	var winner = match[result_keys.winner];
	var looser = match[result_keys.looser];
	
	var winner_classification=classification[winner]
	var looser_classification=classification[looser]

	winner_classification.pontos += winner_points;
	winner_classification.gols_feitos += winner_goals;
	winner_classification.gols_sofridos += looser_goals;
	winner_classification.saldo_de_gols = winner_classification.gols_feitos - winner_classification.gols_sofridos;
	winner_classification.vitorias += 1;

	classification[winner] = winner_classification;
	looser_classification.pontos += looser_points;
	looser_classification.gols_feitos += looser_goals;
	looser_classification.gols_sofridos += winner_goals;
	looser_classification.saldo_de_gols = looser_classification.gols_feitos - looser_classification.gols_sofridos;
	classification[looser] = looser_classification;
}

for(var team_name in classification)
{
	var team = classification[team_name];
	team['team_name'] = team_name;
	final_classification.push(team);
}

final_classification.sort(function(a, b){
	var x = a.pontos;
	var y = b.pontos;


	if(x > y)
	{
		return -1;
	}
	else if(x < y)
	{
		return 1;
	}
	else if(x == y)
	{
		x = a.vitorias;
		y = b.vitorias;
		if(x > y)
		{
			return -1;
		}
		else if(x < y)
		{
			return 1;
		}
		else if(x == y)
		{
			x = a.saldo_de_gols;
			y = b.saldo_de_gols;
			if(x > y)
			{	
				return -1;
			}
			else if(x < y)
			{
				return 1;
			}
			else if(x == y)
			{

			}
				x = a.gols_feitos;
				y = b.gols_feitos;
				if (x > y)
				{
					return -1;
				}
				else if(x < y)
				{
					return 1;
				}
				else if(x == y)
				{

				}
					x = a.team_name;
					y = b.team_name
					if(x < y)
					{
						return -1;
					}
					else if(x > y)
					{
						return 1;
					}
					else if(x == y)
					{

					}
		}
	}
});


console.log(final_classification);
