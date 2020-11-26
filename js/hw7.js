/*hw7.js
Heron Melo
heron_melo@student.uml.edu
Student of GUI Programming I 91.61 - UML
File Created on: 11/21/2020
In this assignment we will implement our previous homework which was creating a dynamic table and 
we will include JQuery UI library. Using sliders and tabs.*/

// Two-way binding between each slider and it's corresponding text field
['minColVal', 'maxColVal', 'minRowVal', 'maxRowVal'].forEach((i) => {
  var sliderId = "#" + i + "Slider";
  var inputId = i + "Input";
  $(sliderId).slider({
    min: -50,
    max: 50,
    change: function (event, ui) {
      document.getElementById(inputId).value = ui.value;
    }
  });
  $("#" + inputId).on("change paste keyup", function () {
    $(sliderId).slider("value", parseInt(document.getElementById(inputId).value));
  });
});

// Tabs
var tabs = [];
$("#tabs").tabs();

// Delete selected tabs button
document.getElementById('deleteButton').style.visibility = 'hidden';
document.getElementById('deleteButton').onclick = function (e) {
  e.preventDefault();
  for (let i = 0; i < tabs.length; i++) { // Removing selected tabs
    if (tabs[i]) {
      $('#' + i).remove();
      $('.' + i).remove();
    }
  }
  tabs = [];
  $("#tabs").tabs('refresh');
};

// jQuery Validation
$(document).ready(function () {

  $(".form").submit(function (e) {
    e.preventDefault();
    readInput();
  })
    // Validation rules
    .validate({
      rules: {
        minColValInput: { required: true, range: [-50, 50], },
        maxColValInput: { required: true, range: [-50, 50], greaterThan: "#minColValInput", },
        minRowValInput: { required: true, range: [-50, 50], },
        maxRowValInput: { required: true, range: [-50, 50], greaterThan: "#minRowValInput", },
      },
      // Error messages
      messages: {
        minColValInput: { required: "Min Col Value Required!", range: "Must be between -50 to 50.", },
        maxColValInput: { required: "Max Col Value Required!", range: "Must be between -50 to 50.", },
        minRowValInput: { required: "Min Row Value Required!", range: "Must be between -50 to 50.", },
        maxRowValInput: { required: "Max Row Value Required!", range: "Must be between -50 to 50.", },
      },
    });
});

// check if min > max
$.validator.addMethod(
  "greaterThan",
  function (value, element, param) {
    if (this.optional(element)) return true;
    var $otherElement = $(param);
    return parseInt(value, 10) >= parseInt($otherElement.val(), 10);
  },
  "Min Value Needs To Be Smaller Than Max Value!"
);

// Read input from form
function readInput() {

  var minColVal = parseInt(document.getElementById("minColValInput").value);
  var maxColVal = parseInt(document.getElementById("maxColValInput").value);
  var minRowVal = parseInt(document.getElementById("minRowValInput").value);
  var maxRowVal = parseInt(document.getElementById("maxRowValInput").value);

  //check for errors
  if (minColVal > maxColVal) { return; }
  else if (minRowVal > maxRowVal) { return; }

  createTable(minColVal, maxColVal, minRowVal, maxRowVal);
}

function createTable(minColVal, maxColVal, minRowVal, maxRowVal) {
  var j, i;
  var table = "";

  // Create table
  for (j = minRowVal - 1; j <= maxRowVal; j++) {
    table += "<tr>";
    if (j == minRowVal - 1) {
      table += "<td></td>"; // empty cell
      for (i = minColVal; i <= maxColVal; i++) {
        table += "<td>" + i + "</td>";
      }
    } else {
      table += "<td>" + j + "</td>";
      for (i = minColVal; i <= maxColVal; i++) {
        table += "<td>" + i * j + "</td>";
      }
    }
    table += "</tr>";
  }

  // Adding tab
  var k = tabs.length;
  $("#tabs").append(`
    <div class="container" id="${k}">
      <table id="multiplicationTable">${table}</table>
    </div>
  `);
  tabs.push(false);
  $("#tabsList").append(`
    <li class="${k}">
      <a href='#${k}' class="${k}">
        ${[minColVal, maxColVal, minRowVal, maxRowVal].map((i) => i).join(' ')}
        
      </a>
      <input type="checkbox" 
      onClick='tabs[${k}] = !tabs[${k}];document.getElementById("deleteButton").style.visibility=(tabs.includes(true) ? "visible" : "hidden");'
      >
    </li>
  `);
  $("#tabs").tabs('refresh');

}

// invalid chars
var invalidChars = ["+", "e", ".", "/", "*", "#", "$", "%", "&", "!"];
inputArray.forEach(function (element) {
  element.addEventListener("keydown", function (e) {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  });
});


// check input

var minColValInput = document.getElementById("minColValInput");
var maxColValInput = document.getElementById("maxColValInput");
var minRowValInput = document.getElementById("minRowValInput");
var maxRowValInput = document.getElementById("maxRowValInput");
var inputArray = [minColValInput, maxColValInput, minRowValInput, maxRowValInput];
