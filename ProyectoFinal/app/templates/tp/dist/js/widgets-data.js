/*Widgets Init*/
"use strict"; 
/*****Ready function start*****/
$(function(){
if( $('#tweets_fetch').length > 0 ){
		var configList = {
		  "profile": {"screenName": 'hencework'},
		  "domId": 'tweets_fetch',
		  "maxTweets": 2,
		  "enableLinks": true, 
		  "showUser": false,
		  "showTime": true,
		  "showImages": false,
		  "showInteraction":false,
		  "lang": 'en'
		};
		twitterFetcher.fetch(configList);
	}	
});
/*****Ready function end*****/
