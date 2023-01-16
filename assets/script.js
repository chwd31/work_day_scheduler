// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
   

    $(document).ready(function () {
        // Display the current date
        let currentDate = dayjs();
        $('#currentDay').text(currentDate.format('dddd, MMMM DD'));

        // Add event listeners to the time-block save buttons
        $('.time-block').each(function () {
            let $textarea = $(this).find('.description');
            let $saveBtn = $(this).find('.saveBtn');
            $saveBtn.on('click', function () {
                let text = $textarea.val();
                let id = $(this).parent().attr('id');
                localStorage.setItem(currentDate.format(`${id}`), text);
            });
        });


        $('#prev-day').on('click', function () {
            currentDate = currentDate.subtract(1, 'day');
            $('#currentDay').text(currentDate.format('dddd, MMMM DD'));
            updateTimeBlocks();
        });

        $('#next-day').on('click', function () {
            currentDate = currentDate.add(1, 'day');
            $('#currentDay').text(currentDate.format('dddd, MMMM DD'));
            updateTimeBlocks();
        });

        updateTimeBlocks();



        // Load the saved schedule from local storage when the page loads
        $('.time-block').each(function () {
            let id = $(this).attr('id');
            let text = localStorage.getItem(currentDate.format(`${id}`));
            $(this).find('.description').val(text);
        });


        function updateTimeBlocks() {
            let currentTime = dayjs();
            let currentHour = currentTime.hour();
            $('.time-block').each(function () {
                let id = $(this).attr('id');
                if (id < currentHour) {
                    $(this).addClass('past');
                } else if (id == currentHour) {
                    $(this).addClass('present');
                } else {
                    $(this).addClass('future');
                }
            });
        }
    })






  // Update the time-block elements to reflect the past, present, and future
    //  updateTimeBlocks();

  

// function updateTimeBlocks() {
//     let currentHour = currentDate.hour();
//     $('.time-block').each(function() {
//     let id = $(this).attr('id');
//     if (id < currentHour) {
//       $(this).addClass('past');
//     } else if (id == currentHour) {
//     $(this).addClass('present');
//     } else {
//       $(this).addClass('future');
//     }
//   });
//