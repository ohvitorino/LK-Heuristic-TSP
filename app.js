/**
 * Created by bruno on 03/05/16.
 */


// var nodes = [
//     {x: 50, y: 10, name: 'a'},
//     {x: 100, y: 30, name: 'b'},
//     {x: 50, y: 50, name: 'c'},
//     {x: 50, y: 60, name: 'd'},
//     {x: 60, y: 70, name: 'e'},
//     {x: 40, y: 80, name: 'f'},
//     {x: 50, y: 90, name: 'g'},
//     {x: 70, y: 50, name: 'h'},
//     {x: 100, y: 30, name: 'b2'}
//
//     // {x: 160, y: 20, name: 'a'},
//     // {x: 60, y: 20, name: 'b'},
//     // {x: 20, y: 20, name: 'c'},
//     // {x: 200, y: 40, name: 'd'},
//     // {x: 100, y: 40, name: 'e'},
//     // {x: 20, y: 40, name: 'f'},
//     // {x: 180, y: 60, name: 'g'},
//     // {x: 120, y: 80, name: 'h'},
//     // {x: 60, y: 80, name: 'i'},
//     // {x: 180, y: 100, name: 'j'},
//     // {x: 100, y: 120, name: 'k'},
//     // {x: 40, y: 120, name: 'l'},
//     // {x: 140, y: 140, name: 'm'},
//     // {x: 200, y: 160, name: 'n'},
//     // {x: 100, y: 160, name: 'o'},
//     // {x: 20, y: 160, name: 'p'},
//     // {x: 140, y: 180, name: 'q'},
//     // {x: 80, y: 180, name: 'r'},
//     // {x: 180, y: 200, name: 's'},
//     // {x: 60, y: 200, name: 't'},
//     // {x: 20, y: 160, name: 'u'}
//
// ];

var nodes = app.generateRandomDeltaPath(500, 10, 800);

app.drawEdges(nodes);

var output = new app.output($('#output'));

var lk = new app.tsp.LinKernighan(nodes);
var finalTour = lk.solve();

output.println("Final Tour: " + finalTour.toString());

app.drawEdges(finalTour.tour);
