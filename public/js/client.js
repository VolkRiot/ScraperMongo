/* eslint-disable no-undef */
/* eslint-disable func-names */

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
  $('.collapsible').collapsible();
});
