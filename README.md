# A currency input using jQuery
A simple implementation of auto-formatting input into currency upon typing.

**Characteristics:**
- Numeric only
- With two decimal places
- With thousands separator
- No currency sign

>** Sample output:** 1,000,000.00

**Behavior:**
- **Automatic Formatting:** When the user types in, the currency input automatically formats the value with the specified characteristics.

- **Dynamic Cursor Positioning: **As the user continues typing, the input dynamically formats the value without changing the cursor's position. The cursor always stays at the end of the last digit entered, enabling seamless editing and addition of decimal places if needed.

- **Copy-Paste Handling: **On copy-paste commands, the currency input intelligently removes all non-numeric characters and retains only the valid numeric value. It then applies the correct formatting, ensuring a consistent and accurate representation of the currency amount. For example, if the user copies "$1,234.56" from elsewhere, the input will accept only "1234.56" and format it as "1,234.56."


------------


**IMPLEMENTATION**
Assuming you have an input with a class name of `currency-input`.  

```html
<input type="text" class="currency-input">
```
Here is the jQuery functions that automatically handled the formatting of the input upon typing.
> Tested on **jQuery 3.3.1**

```javascript
$(function () {
  // This function is executed when the document is ready.

  function formatCurrency(value) {
    // This function takes a string 'value' and formats it as a currency.

    // Remove any non-digit and non-decimal point characters from the input string
    var numericValue = value.replace(/[^0-9.]/g, "");

    // Handle the case when the input is empty or only contains a decimal point
    if (numericValue === "" || numericValue === ".") {
      return ""; // Return an empty string
    }

    // Parse the numeric value as a floating-point number
    var number = parseFloat(numericValue);

    // Handle the case when the parsing results in NaN (Not a Number)
    if (isNaN(number)) {
      return ""; // Return an empty string
    }

    // Format the number as a currency using the locale-specific settings
    return number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function handleCurrencyInput() {
    // This function handles the input event for elements with the class "currency-input".

    var isSingleValue = false; // Flag to indicate if the input contains only a single character
    var input = $(this); // Get the input element that triggered the event
    var cursorPosition = input.get(0).selectionStart; // Store the cursor position within the input

    var originalValue = input.val(); // Get the original value of the input
    isSingleValue = originalValue.length == 1; // Check if the input contains only one character

    var formattedValue = formatCurrency(originalValue); // Format the original value as a currency

    input.val(formattedValue); // Update the input value with the formatted currency string

    // Calculate the new cursor position after formatting
    var diff = formattedValue.length - originalValue.length;
    var newCursorPosition = cursorPosition + diff;

    // Set the new cursor position to the decimal point if the input contains only one character
    if (isSingleValue) {
      newCursorPosition = formattedValue.indexOf(".");
    }

    // Set the new cursor position within the input element
    input[0].setSelectionRange(newCursorPosition, newCursorPosition);
  }

  // Attach the 'handleCurrencyInput' function to the 'input' event of elements with class 'currency-input'
  $(".currency-input").on("input", handleCurrencyInput);

  // Attach a 'paste' event handler to elements with class 'currency-input'
  $(".currency-input").on("paste", function (e) {
    // Prevent the default paste behavior
    e.preventDefault();

    // Get the pasted text from the clipboard
    var pastedText = (e.originalEvent || e).clipboardData.getData("text/plain");

    // Remove any non-digit and non-decimal point characters from the pasted text
    var numericOnly = pastedText.replace(/[^0-9.]/g, "");

    // Format the numeric text as currency and set it as the value of the input
    $(this).val(formatCurrency(numericOnly));
  });
});
```
