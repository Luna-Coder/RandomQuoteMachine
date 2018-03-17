var quotationTxt;
var quotationAuthor;
var tweetText;

// initial function call to have a quote appear when users first land on page
getRandomQuote();

function getRandomQuote() {
  $.ajax({
    type: "GET",
    url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
    // set cache to false in order to ensure a random quote each time
    cache: false,
    // code to run if the ajax request is succesful
    success: function(data) {
      console.log(data);  // display the entire return object
      // embedding the data array into a jquery object to only grab its text data
      quotationTxt = $(data[0].content).text();
      quotationAuthor = data[0].title;
      // format the text that will get tweeted
      tweetText = ('"' + quotationTxt + '" -' + quotationAuthor);
      // use jQuery to update the text content in the appropriate html elements
      $('#quote').text('"' + quotationTxt + '"');
      $('#author').text('-' + quotationAuthor);
      // create the twitter share button, using Twitter's Factory Function,
      // inside the success function, no need if request fails.
      twttr.widgets.createShareButton(' ',
        document.getElementById('tweetDiv'), {
          text: tweetText,
          size: 'large'
        }
      );
    },
    // code to log and display an error message if ajax request fails
    error: function() {
      console.log('There was an error.');
      alert('There was an error.');
    }
  });
};

// event listener/handler that generates a small pop-up twitter window 
// so users do not have to leave the page
$('#tweetBtn').on('click', function(e) {
  $('#tweetBtn').attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweetText) );
});

// event listener/handler to generate a new quote and re-run the program
$('#newQuote').on('click', function(e) {
  // get rid of the previously generated twitter share button
  $('#tweetDiv').html('');
  // function call to generate a new ajax request/response
  getRandomQuote();
});