/**
 * Created by bruno on 03/05/16.
 */

var points = [
    {x: 60, y: 200},
    {x: 180, y: 200},
    {x: 80, y: 180},
    {x: 140, y: 180},
    {x: 20, y: 160},
    {x: 100, y: 160},
    {x: 200, y: 160},
    {x: 140, y: 140},
    {x: 40, y: 120},
    {x: 100, y: 120},
    {x: 180, y: 100},
    {x: 60, y: 80},
    {x: 120, y: 80},
    {x: 180, y: 60},
    {x: 20, y: 40},
    {x: 100, y: 40},
    {x: 200, y: 40},
    {x: 20, y: 20},
    {x: 60, y: 20},
    {x: 160, y: 20}
];

var output = new app.output($('#output'));

var lk = new app.tsp.LinKernighan(points);
lk.solve();


app.drawEdges(points, "Lin Kernighan");