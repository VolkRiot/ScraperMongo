/* eslint-disable no-undef */
/* eslint-disable func-names */

$(document).ready(() => {
  $('.save-button').on('click', function () {
    const $button = $(this);
    const article = JSON.parse($button.attr('data'));
    $.post('/save', article, (data) => {});
  });
});
