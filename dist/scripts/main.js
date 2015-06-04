$(document).on('ready', start);

function start(e) {

	var routerConfig = {
		routes: {
			"": 'home',
			'home': 'home',
			'search': 'search'
		},
		home: function() {
			$('.page').hide();
			$('#home').show();
		},
		search: function() {
			$('.page').hide();
			$('#search').show();
		}
	}
	var app = Backbone.Router.extend(routerConfig);
	var myRouter = new app();
	var keepTrack = [];

	Backbone.history.start();
	$('.inputBox').keyup(searchStuffPush)
	$('#sub').click(searchStuff)
	$('div').click(addMov);
	$('div').click(remMov);

	// $('.inputBox').submit(searchStuff());

	function searchStuff(e) {
		$('#result').html("");
		event.preventDefault();
		console.log($('#title').val());
		var goToPage = 'search/' + ($('#title').val()+'/' + $('#year').val() + $('#type').val());
		myRouter.navigate(goToPage, {trigger: true});
		searchMovies();
	}
	function searchStuffPush(e) {
		if (event.keyCode === 13) {
			$('#result').html("");
			event.preventDefault();
			var goToPage = 'search/' + ($('#title').val()+'/' + $('#year').val() + $('#type').val());
			myRouter.navigate(goToPage, {trigger: true});
			searchMovies();
		}
	}
	function onMoviesReceived(val) {
		var res = val.Search;
		var list = $('#result').html();
		for (var i = 0; i<res.length; i++) {
			$.get('http://www.omdbapi.com/?',
				{
					t: res[i].Title,
				},more, 'json');



			function more(val2) {
				list += "<div class = 'movie'>"+"<br>" + "Title: "+ val2.Title + "<br>" + "Year: " + val2.Year + "<br>" + "Genre: " + val2.Genre + "<br>" + "Actors: " + val2.Actors + "<br>" + "Plot: " + val2.Plot + "<br>" + "Type: " + val2.Type + "<br>" + "Release Date: " + val2.Released + "<br>" + "Runtime: " + val2.Runtime + "<br>"+"</div>";
				$('#result').html(list);
			}
		}
	}
	function searchMovies() {
		$.get('http://www.omdbapi.com/?',
		{
			s: $('#title').val(),
			y: $('#year').val(),
			type: $('#type').val(),
		},onMoviesReceived, 'json');
	}
	function addMov(e) {
		if($(e.target).attr('class') === 'movie') {
			var hue = '<div class = "wMov">' + $(e.target).html() + '</div>';
			$('#result2').append(hue);
			$(e.target).empty();
		}
	}
	function remMov(e) {
		if($(e.target).attr('class') === 'wMov') {
			// var hue = $(e.target).html();
			$(e.target).empty();
		}
	}
}