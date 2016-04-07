var BOOK_WIDTH = 830;
var BOOK_HEIGHT = 260;
var PAGE_WIDTH = 400;
var PAGE_HEIGHT = 250;
var PAGE_Y = ( BOOK_HEIGHT - PAGE_HEIGHT ) / 2;
var CANVAS_PADDING = 60;
var canvas = document.getElementById( "flip-canvas" );
var context = canvas.getContext( "2d" );
// Resize the canvas to match the book size
canvas.width = BOOK_WIDTH + ( CANVAS_PADDING * 2 );
canvas.height = BOOK_HEIGHT + ( CANVAS_PADDING * 2 );
canvas.style.top = -CANVAS_PADDING + "px";
canvas.style.left = -CANVAS_PADDING + "px";
	var mouse = { x: 0, y: 0 };

	var flips = [];
// Create a reference to the book container element
var book = document.getElementById( "book" );

// Grab a list of all section elements (pages) within the book
var pages = book.getElementsByTagName( "section" );

for( var i = 0, len = pages.length; i < len; i++ ) {
    pages[i].style.zIndex = len - i;

    flips.push( {
    progress: 1,
    target: 1,
    page: pages[i],
    dragging: false
  });
}
var i=1;
function render() {


		var foldX = BOOK_WIDTH, foldWidth =15, verticalOutdent = foldWidth*0.1;
		context.translate( CANVAS_PADDING-15, CANVAS_PADDING+5 );
		var timer = setInterval(function(){
			context.clearRect( -CANVAS_PADDING, -CANVAS_PADDING, canvas.width, canvas.height );
			if(foldX-15<(BOOK_WIDTH/2)){
				clearInterval(timer);
			}
			context.beginPath();
			context.moveTo(foldX, 0);
			context.lineTo(foldX, PAGE_HEIGHT);
			context.quadraticCurveTo(foldX, PAGE_HEIGHT + (verticalOutdent * 2), (foldX - foldWidth +15), PAGE_HEIGHT + verticalOutdent);
			context.lineTo(foldX - foldWidth+15, -verticalOutdent);
			context.quadraticCurveTo(foldX, -verticalOutdent * 2, foldX, 0);
			context.fillStyle = "#c00";
			context.fill();
			context.stroke();
			flips[0].page.style.width = PAGE_WIDTH-- + "px";
			foldX--;
			foldWidth++;
		},1)



}

render();