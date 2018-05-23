// ---Quotes APi----


$(document).ready(function(){
var randomVar;
getQuote();
function getQuote(){
var url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
  $.getJSON(url, function(data){
  randomVar = data.quoteText; 
// passing value to corresponding div
    $(".quote").hide().fadeIn(1000).html('"' + data.quoteText +'"');
    $(".author").html("- " + data.quoteAuthor); 
randomVar = data.quoteText;  
});
};
$("#rand-quote").on("click",function(){
getQuote();
});
});


/* SuccessStory-generator */

$('#linkStory1').click(function() {
	  $('#myStory1').toggle('slow', function() {
	    // Animation complete.
	  });
	});
$('#linkStory2').click(function() {
	  $('#myStory2').toggle('slow', function() {
	    // Animation complete.
	  });
	});
$('#linkStory3').click(function() {
	  $('#myStory3').toggle('slow', function() {
	    // Animation complete.
	  });
	});
$('#linkStory4').click(function() {
	  $('#myStory4').toggle('slow', function() {
	    // Animation complete.
	  });
	});
$('#linkStory5').click(function() {
	  $('#myStory5').toggle('slow', function() {
	    // Animation complete.
	  });
	});
$('#linkStory6').click(function() {
	  $('#myStory6').toggle('slow', function() {
	    // Animation complete.
	  });
	});


/*
 * Grid/list view script!
 */

$(document).ready(function () {

    $('#list').click(function (event) {
        event.preventDefault();
        $('#info_boxes .item').addClass('list-group-item');

        $(".youTubeVideoContainer").removeClass("col-md-4");
        $(".youTubeVideoContainer").addClass("col-md-12");
        
        $(".youTubeImgContainer").removeClass("col-md-12");
        $(".youTubeImgContainer").addClass("col-md-4");

    });

    $('#grid').click(function (event) {
        event.preventDefault();
        $('#info_boxes .item').removeClass('list-group-item');
        $('#info_boxes .item').addClass('grid-group-item');

        $(".youTubeVideoContainer").removeClass("col-md-12");
        $(".youTubeVideoContainer").addClass("col-md-4");
        
        $(".youTubeImgContainer").removeClass("col-md-4");
        $(".youTubeImgContainer").addClass("col-md-12");
        
    });

});

/*
 * Multimedia Api script
 */
$(document).ready(function() {
	 $("#pageTokenNext").on( "click", function( event ) {
		 $("#pageToken").val($("#pageTokenNext").val());
		 youtubeApiCall();
	 });
	 $("#pageTokenPrev").on( "click", function( event ) {
		 $("#pageToken").val($("#pageTokenPrev").val());
		 youtubeApiCall();
	 });
	 $("#hyv-searchBtn").on( "click", function( event ) {
		 youtubeApiCall();
		 return false;
	 });
	 jQuery( "#hyv-search" ).autocomplete({
		 source: function( request, response ) {
			 // console.log(request.term);
			 var sqValue = [];
			 jQuery.ajax({
				 type: "POST",
				 url: "http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1",
				 dataType: 'jsonp',
				 data: jQuery.extend({
				 q: request.term
				 }, { }),
				 success: function(data){
					 console.log(data[1]);
					 obj = data[1];
					 jQuery.each( obj, function( key, value ) {
						 sqValue.push(value[0]);
					 });
					 response( sqValue);
				 }
			 });
		 },
		 select: function( event, ui ) {
		 setTimeout( function () { 
		 youtubeApiCall();
		 }, 300);
		 }
	 }); 
});

/* Youtube Api Call here */

function youtubeApiCall(){
	 $.ajax({
		 cache: false,
		 data: $.extend({
			 key: 'AIzaSyAfPr33ZG6smzYairca3L1djzEhPkjEjA8',
			 q: $('#hyv-search').val(),
			 part: 'snippet'
		 }, {maxResults:6,pageToken:$("#pageToken").val()}),
		 dataType: 'json',
		 type: 'GET',
		 timeout: 5000,
		 url: 'https://www.googleapis.com/youtube/v3/search'
	 })
	.done(function(data) {
		$('.btn-group').show();
	
		
		/*
		 * Calling via ul var items = data.items, videoList = ""; $.each(items,
		 * function(index,e) { console.log(e); videoList += videoList + '<li class="hyv-video-list-item"><div
		 * class="hyv-content-wrapper"><a href="" class="hyv-content-link"
		 * title="'+e.snippet.title+'"><span class="title">'+e.snippet.title+'</span><span
		 * class="stat attribution">by <span>'+e.snippet.channelTitle+'</span></span></a></div><div
		 * class="hyv-thumb-wrapper"><a href="" class="hyv-thumb-link"><span
		 * class="hyv-simple-thumb-wrap"><img alt="'+e.snippet.title+'"
		 * src="'+e.snippet.thumbnails.default.url+'" width="120" height="90"></span></a></div></li>';
		 * 
		 * }); $("#hyv-watch-related").html(videoList);
		 */
		
		var items = data.items, videoList = "";
	    var youTubeContainerCache= "";
 $.each(items, function(index, e){youTubeContainerCache +='<div class="youTubeVideoContainer col-md-4"><div class="youTubeImgContainer col-md-12"><a href="https://www.youtube.com/watch?v=' + e.id.videoId + '" ><img  class="col-md-12"  src="' + e.snippet.thumbnails.default.url + '"/></a> </div><div classs="textManupalation">' + e.snippet.title + '</div><div classs="textManupalation">' + e.snippet.channelTitle + '</div></div>'
	 ;});

	    $(".youTubeContainer").html(youTubeContainerCache);
		
	 });
	}



	