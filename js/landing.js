// ============================================
// Connor's Carpet Cleaning - Landing Page JS
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ---- Pricing Calculator ----
    var checkboxes = document.querySelectorAll('input[name="room"]');
    var totalPriceEl = document.getElementById('totalPrice');
    var resultNote = document.querySelector('.result-note');
    var calculatorActions = document.getElementById('calculatorActions');

    function calculatePrice() {
        var selectedRooms = [];

        checkboxes.forEach(function (cb) {
            if (cb.checked) {
                selectedRooms.push(cb.value);
            }
        });

        var totalRooms = selectedRooms.length;

        if (totalRooms === 0) {
            totalPriceEl.textContent = '\u00A30.00';
            resultNote.textContent = 'Select rooms above to see your quote';
            calculatorActions.style.display = 'none';
            return;
        }

        // First room £60, each additional room £30
        var price = 60 + (Math.max(0, totalRooms - 1) * 30);

        // Silent discount: if any two or more of stairs, hallway, landing are selected, remove £30
        var hasStairs = selectedRooms.indexOf('stairs') !== -1;
        var hasHallway = selectedRooms.indexOf('hallway') !== -1;
        var hasLanding = selectedRooms.indexOf('landing') !== -1;
        var stairAreaCount = (hasStairs ? 1 : 0) + (hasHallway ? 1 : 0) + (hasLanding ? 1 : 0);
        if (stairAreaCount >= 2) {
            price -= 30;
        }

        // Ensure price never goes below £60
        if (price < 60) {
            price = 60;
        }

        totalPriceEl.textContent = '\u00A3' + price.toFixed(2);

        // Update note with room count
        var roomText = totalRooms === 1 ? '1 room' : totalRooms + ' rooms';
        resultNote.textContent = 'Based on ' + roomText + ' selected';

        // Show actions
        calculatorActions.style.display = 'flex';
    }

    checkboxes.forEach(function (cb) {
        cb.addEventListener('change', function () {
            calculatePrice();
            updateBookingSummary();
        });
    });

    // ---- Booking Form Toggle & Pre-population ----
    var showBookingBtn = document.getElementById('showBookingBtn');
    var bookingFormWrapper = document.getElementById('bookingFormWrapper');
    var bookingDateInput = document.getElementById('booking-date');

    // Set minimum date to tomorrow
    if (bookingDateInput) {
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var dd = String(today.getDate() + 1).padStart(2, '0');
        bookingDateInput.setAttribute('min', yyyy + '-' + mm + '-' + dd);
    }

    if (showBookingBtn) {
        showBookingBtn.addEventListener('click', function () {
            if (bookingFormWrapper.style.display === 'none') {
                bookingFormWrapper.style.display = 'block';
                updateBookingSummary();
                bookingFormWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                bookingFormWrapper.style.display = 'none';
            }
        });
    }

    function updateBookingSummary() {
        var selectedLabels = [];
        var selectedValues = [];

        checkboxes.forEach(function (cb) {
            if (cb.checked) {
                selectedLabels.push(cb.dataset.label || cb.value);
                selectedValues.push(cb.value);
            }
        });

        var totalRooms = selectedLabels.length;
        var price = 0;

        if (totalRooms > 0) {
            price = 60 + (Math.max(0, totalRooms - 1) * 30);
            // Silent discount: if any two or more of stairs, hallway, landing are selected, remove £30
            var hasStairs = selectedValues.indexOf('stairs') !== -1;
            var hasHallway = selectedValues.indexOf('hallway') !== -1;
            var hasLanding = selectedValues.indexOf('landing') !== -1;
            var stairAreaCount = (hasStairs ? 1 : 0) + (hasHallway ? 1 : 0) + (hasLanding ? 1 : 0);
            if (stairAreaCount >= 2) {
                price -= 30;
            }
            if (price < 60) {
                price = 60;
            }
        }

        var roomsText = selectedLabels.length > 0 ? selectedLabels.join(', ') : 'None selected';
        var priceText = '\u00A3' + price.toFixed(2);

        // Update visible summary
        var summaryRooms = document.getElementById('bookingSummaryRooms');
        var summaryPrice = document.getElementById('bookingSummaryPrice');
        if (summaryRooms) summaryRooms.textContent = roomsText;
        if (summaryPrice) summaryPrice.textContent = priceText;

        // Update hidden form fields
        var bookingRoomsInput = document.getElementById('bookingRooms');
        var bookingPriceInput = document.getElementById('bookingPrice');
        if (bookingRoomsInput) bookingRoomsInput.value = roomsText;
        if (bookingPriceInput) bookingPriceInput.value = priceText;
    }

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
