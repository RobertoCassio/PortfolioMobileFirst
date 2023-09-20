var $container = $(".container");
var noElements = 500;
var maxSize = 5;
var dots = {};
var containerWidth = $(".container").width();
var containerHeight = $(".container").height();

function randomSize() {
  return Math.floor(Math.random() * maxSize + 1);
}

function randomPosition() {
  var coordinates = {};
  coordinates.left = Math.floor(Math.random() * containerWidth + 1);
  coordinates.top = Math.floor(Math.random() * containerHeight + 1);

  return coordinates;
}

function drawDots() {
  for (i = 0; i <= noElements; i++) {
    $element = $("<span>", { class: "dot" });
    var size = randomSize();
    var position = randomPosition();
    $element.addClass("size-" + size);
    $element.css({
      height: size + "px",
      width: size + "px",
      left: position.left + "px",
      top: position.top + "px"
    });

    $container.append($element);
  }
  for (i = 1; i <= maxSize; i++) {
    dots[i] = $(".size-" + i);
  }
}

function invertNumber(number) {
  if(number < 0) {
    return Math.abs(number)
  } else {
    return -Math.abs(number)
  }
}

$container.mousemove(function(event) {
  var objLeft = $container.offset().left;
  var objTop = $container.offset().top;

  var objCenterX = objLeft + $container.width() / 2;
  var objCenterY = objTop + $container.height() / 2;

  var x = invertNumber(Math.floor(event.pageX - objCenterX));
  var y = invertNumber(Math.floor(event.pageY - objCenterY));
  
  
  for (i = 1; i <= maxSize; i++) {
    dots[i].velocity(
      { translateX: x * (i / 60) + "px", translateY: y * (i / 20) + "px" },
      { duration: 10 }
    );
  }
});

drawDots();
