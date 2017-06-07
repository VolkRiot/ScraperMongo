/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */

$(document).ready(() => {
  $('.save-button').on('click', function () {
    const $button = $(this);
    const article = JSON.parse($button.attr('data'));
    $.post('/save', article, (data) => {
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
    const $deleteButton = $(this);
    const article = JSON.parse($deleteButton.attr('data'));
    $.ajax({
      url: '/delete',
      type: 'DELETE',
      data: { id: article._id },
      success(result) {
        if (result.success) {
          $deleteButton.closest('.article-cell').remove();
        }
      },
    });
  });
});
