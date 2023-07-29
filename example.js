<script>
  $(function () {
    function formatCurrency(value) {
      // Remove any non-digit and non-decimal point characters
      var numericValue = value.replace(/[^0-9.]/g, "");
      // Handle the case when the input is empty or only contains a decimal point
      if (numericValue === "" || numericValue === ".") {
        return "";
      }
      // Parse the numeric value
      var number = parseFloat(numericValue);
      // Handle the case when the parsing results in NaN
      if (isNaN(number)) {
        return "";
      }
      // Format the number as a currency
      return number.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    function handleCurrencyInput() {
      var isSingleValue = false;
      var input = $(this);
      var cursorPosition = input.get(0).selectionStart; // Store the cursor position

      var originalValue = input.val();
      isSingleValue = originalValue.length == 1;

      var formattedValue = formatCurrency(originalValue);

      input.val(formattedValue);

      // Calculate the new cursor position
      var diff = formattedValue.length - originalValue.length;
      var newCursorPosition = cursorPosition + diff;

      // Set the new cursor position
      if (isSingleValue) {
        newCursorPosition = formattedValue.indexOf(".");
      }
      input[0].setSelectionRange(newCursorPosition, newCursorPosition);
    }

    $(".currency-input").on("input", handleCurrencyInput);
    $(".currency-input").on("paste", function (e) {
      e.preventDefault();
      var pastedText = (e.originalEvent || e).clipboardData.getData("text/plain");
      var numericOnly = pastedText.replace(/[^0-9.]/g, "");
      $(this).val(formatCurrency(numericOnly));
    });
  });
</script>
