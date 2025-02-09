//populate project section with 6 most recent github projects (GitHup API)
$(document).ready(function() {
  $.ajax({
    dataType: "json",
    url: "https://api.github.com/users/josierice/repos?sort=updated&order=desc",
    success: function(res) {
      $.each(res, function(i, obj) {
        if (i > 5) return;
        let date = new Date(obj.created_at).toDateString();

        $("#project-list").append(
          `<div class="card">
            <div class="content">
              <a href="${obj.html_url}" target="_blank">
                <h3 class="header">${obj.name}</h3>
                <p class="meta">${obj.description}</p>
                <p class="meta">Language: ${obj.language}</p>
                <p class="meta">Last Updated: ${date}</p>
              </a>
            </div>
          </div>`
        );
      });
    }
  });

  //show contact form on btn/nav click
  $("#show-contact-btn").click(function() {
    $(".contact-me").css({ display: "block" });
    if ($(window).width() >= 767) {
      $(".contact-me")
        .css({ left: "50%" })
        .animate({ left: "0" }, "slow");
      $("#show-contact-btn").addClass("disabled");
    }
  });

  //hiding contact form
  $("#hide-contact-form").click(function() {
    if ($(window).width() >= 767) {
      $(".contact-me")
        .css({ left: "0" })
        .animate({ left: "50%" }, "slow", function() {
          $(this).css({ display: "none" });
        });
      $("#show-contact-btn").removeClass("disabled");
    }
  });

  //Nav link smooth-scrolling
  $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html,body").animate(
            {
              scrollTop: target.offset().top - 56
            },
            700
          );
          return false;
        }
      }
    });
});
