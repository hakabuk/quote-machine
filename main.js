function displayQuote() {
  $.ajax({
    url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
    success: function(data) {
      console.log(data[0]);
      var post = data.shift();
      $('#quote-text').html(post.content);
      currentQuote = $('#quote-text')
        .html(post.content)
        .text();

      // if the title is available -> use it
      if (typeof post.title !== 'undefined') {
        $('#quote-author').html(post.title + ' ');
      } else {
        $('#quote-author').text('');
      }

      // if the source is available -> use it
      if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
        $('#quote-source').html('(source: ' + post.custom_meta.Source + ')');
      } else {
        $('#quote-source').text('');
      }

      // share quote on twitter
      toTweet = 'Check out this quote: "' + currentQuote + '" via @hakabuk';
      toTweet = toTweet.replace(/[\n\r]+ */g, '');
      toTweet = toTweet.replace('  ', '');
      $('#tweet-quote').attr(
        'href',
        'https://twitter.com/intent/tweet?hashtags=quoteMachine, freeCodeCamp&related=freecodecamp&text=' +
          encodeURIComponent(toTweet)
      );
    },
    cache: false
  });
}

var currentQuote = '',
  currentAuthor = '';
$(document).ready(function() {
  $('.hidden')
    .fadeIn(4000)
    .removeClass('hidden');
  displayQuote();
  //getting initial quote to display
  // getting a new quote on click event
  $('#new-quote-btn').on('click', function(e) {
    displayQuote();
  });
});
