/* eslint-disable no-undef, func-names, no-underscore-dangle,
prefer-const, prefer-arrow-callback, no-var, vars-on-top, prefer-template, consistent-return,
eqeqeq, */

$(document).ready(function () {
  $(document).keypress(function () {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
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
    $button.siblings('.comment-input').val('');
    $.post('/newcomment/' + articleId, { comment: value }, function (resp) {
      if (resp.success) {
        var block =
          '<div class="row">' +
          '<div class="col m10">' +
          '<blockquote id="comment-' +
          resp.id +
          '">' +
          value +
          '</blockquote>' +
          '</div>' +
          '<div class="col m2">' +
          '<a class="right waves-effect waves-light btn amber darken-4 remove-comment" data-id="' +
          resp.id +
          '">X</a>' +
          '</div>' +
          '</div>';

        $('#comment-block-' + articleId).append(block);
        $('#comment-block-' + articleId).find('.remove-comment').on('click', function () {
          $(this).closest('.row').remove();
        });
      } else {
        Materialize.toast('Could not save your comment', 3000);
      }
    });
  });
  $('.remove-comment').on('click', function () {
    var $button = $(this);
    var commentID = $button.attr('data-id');
    $.ajax({
      url: '/delete/comment/' + commentID,
      type: 'DELETE',
      success(result) {
        if (result.success) {
          $('#comment-' + commentID).remove();
          $button.remove();
        } else {
          Materialize.toast('Could not delete the comment', 3000);
        }
      },
    });
  });
});
