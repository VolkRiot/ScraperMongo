/* eslint-disable no-undef, func-names, no-underscore-dangle,
prefer-const, prefer-arrow-callback, no-var, vars-on-top, prefer-template */

$(document).ready(function () {
  $('.save-button').on('click', function () {
    var $button = $(this);
    var article = JSON.parse($button.attr('data'));
    $.post('/save', article, function (data) {
      if (data.success) {
        Materialize.toast('Article Saved!', 4000);
      } else if (data.duplicate) {
        Materialize.toast('That articles is already saved!', 4000);
      } else {
        Materialize.toast('Failed to save article. Try again.', 4000);
      }
    });
  });

  $('.comment-button').on('click', function (e) {
    e.preventDefault();
    $(this).collapsible();
  });

  $('.delete-button').on('click', function (e) {
    e.preventDefault();
    var $deleteButton = $(this);
    var article = JSON.parse($deleteButton.attr('data'));
    $.ajax({
      url: '/delete/' + article._id,
      type: 'DELETE',
      success(result) {
        if (result.success) {
          $deleteButton.closest('.article-cell').remove();
        }
      },
    });
  });

  $('.submit-comment').on('click', function (e) {
    e.preventDefault();
    var $button = $(this);
    var value = $button.siblings('.comment-input').val();
    var articleId = $button.attr('data-id');
    $.post('/newcomment/' + articleId, { comment: value }, function (resp) {
      if (resp.success) {
        $('#comment-block-' + articleId).append($('<blockquote>').text(value));
      } else {
        Materialize.toast('Could not save your comment', 3000);
      }
    });
  });
  $('.remove-comment').on('click', function () {});
});
