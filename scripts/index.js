var app = angular.module("poke_app", ["ngRoute"]);

app.config(function($routeProvider)
{
	$routeProvider.when("/", {templateUrl: "partials/home.html"});
	$routeProvider.when("/pokedex/:pokemon_id", {templateUrl: "partials/pokedex.html", controller: "pokedex_ctrl"});
	$routeProvider.when("/team", {templateUrl: "partials/team.html", controller: ""});
	$routeProvider.when("/battle", {templateUrl: "partials/battle.html", controller: ""});
	$routeProvider.otherwise({redirectTo: "/"});
});

app.controller("pokedex_ctrl", function($scope, $http, $routeParams)
{
	$http.get("http://pokeapi.co/api/v2/pokemon/" + $routeParams.pokemon_id).success(function(data)
	{
		$scope.sprite = data.sprites.front_default;
		$scope.name = data.name;
		//$scope.description = data.description;
		var types = "";
		for (var i = 0; i < data.types.length; ++i)
			types += data.types[i].type.name + ' ';
		$scope.types = types;
		$scope.height = data.height / 10;
		$scope.weight = data.weight / 10;
		var talents = "";
		for (var i = 0; i < data.abilities.length; ++i)
			talents += data.abilities[i].ability.name + ' ';
		$scope.talents = talents;
		$scope.hp = data.stats[5].base_stat;
		$scope.atk = data.stats[4].base_stat;
		$scope.def = data.stats[3].base_stat;
		$scope.speatk = data.stats[2].base_stat;
		$scope.spedef = data.stats[1].base_stat;
		$scope.speed = data.stats[0].base_stat;
		var attacks = "";
		for (var i = 0; i < data.moves.length; ++i)
			attacks += '[' + data.moves[i].move.name + "] - ";
		$scope.attack_list = attacks;

		$scope.get_evolutions();
	});
	$scope.get_evolutions = function()
	{
		$http.get("http://pokeapi.co/api/v1/pokemon/" + $routeParams.pokemon_id).success(function(data)
		{
			$scope.pokemon_evolutions = [];
			for (var i = 0; i < data.evolutions.length; ++i)
				$scope.pokemon_evolutions.push({name: data.evolutions[i].to, link: "#pokedex/" + (data.evolutions[i].to).toLowerCase()});
			console.log(data);
		});
	}
});
