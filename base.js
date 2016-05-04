/**
 * Created by bruno on 03/05/16.
 */

var app = app || {};
app.tsp = app.tsp || {};

app.tsp.PathManager = function (initialPoints) {
    'use strict';

    this.distances = {};

    this.pointToCity = function (point) {

        point.distanceTo = function (otherPoint) {
            if (this.distances[point.toString() + "_" + otherPoint.toString()]) {
                return this.distances[point.toString() + "_" + otherPoint.toString()];
            }

            if (this.distances[otherPoint.toString() + "_" + point.toString()]) {
                return this.distances[otherPoint.toString() + "_" + point.toString()];
            }

            var xDistance = Math.abs(point.x - otherPoint.x),
                yDistance = Math.abs(point.y - otherPoint.y),
                distance = (xDistance * xDistance) + (yDistance * yDistance);

            this.distances[this.toString() + "_" + otherPoint.toString()] = distance;
            return distance;
        }.bind(this);

        point.toString = function () {
            return "(" + point.x + "/" + point.y + ")";
        };

        return point;
    };


    // Converter os pontos em "objectos" cidade
    var t = {};
    t.destinationCities = $(initialPoints).map(function (index, point) {
        return this.pointToCity(point);
    }.bind(this));

    t.getCities = function () {
        return t.destinationCities;
    };

    t.getCity = function (index) {
        return t.destinationCities[index];
    };

    t.numberOfCities = function () {
        return t.destinationCities.length;
    };

    return t;
};

app.tsp.PathCreator = function (routeManager) {
    'use strict';

    this.tour = [];
    this.distance = 0;


    this.setCities = function (cities) {
        $(cities).each(function (index, city) {
            this.setCity(index, city);
        }.bind(this));
        return this;
    };

    this.usingTourManagersPoints = function () {
        this.setCities(routeManager.getCities());
        return this;
    };

    this.getCity = function (routePosition) {
        return this.tour[routePosition];
    };

    this.setCity = function (routePosition, city) {
        this.tour[routePosition] = city;
        // Reiniciar a distância visto que estamos a modificar a rota
        this.distance = 0;
    };


    this.getDistance = function () {
        if (this.distance === 0) {
            var routeDistance = 0,
                idx;

            // Passar por todas as cidades e somar a distância
            for (idx = 0; idx < this.tourSize(); idx += 1) {
                // A cidade de partida
                var fromCity = this.getCity(idx),
                // A cidade de destino
                    destinationCity;
                // Se estivermos na ultima cidade da tour, então devemos
                // colocar a primeira cidade como cidade destino
                if (idx + 1 < this.tourSize()) {
                    destinationCity = this.getCity(idx + 1);
                }
                else {
                    destinationCity = this.getCity(0);
                }
                // Acumular a distância entre as duas cidades
                routeDistance += fromCity.distanceTo(destinationCity);
            }
            this.distance = routeDistance;
        }
        return this.distance;
    };

    this.tourSize = function () {
        return this.tour.length;
    };


    this.toString = function () {
        var geneString = "|",
            i;
        for (i = 0; i < this.tourSize(); i += 1) {
            geneString += this.getCity(i).toString() + "|";
        }
        return geneString;
    };


};

app.drawEdges = function (points, string) {
    'use strict';
    var canvasHeight = 300, canvasWidth = 300;

    var context = $('<canvas></canvas>')
        .attr('height', canvasHeight)
        .attr('width', canvasWidth)
        .appendTo($('.target'))
        [0]
        .getContext('2d');

    context.strokeStyle = '#000';

    context.beginPath();

    context.moveTo(points[points.length - 1].x, points[points.length - 1].y);
    $(points).each(function (index, point) {
        context.lineTo(point.x, point.y);
    });

    context.closePath();
    context.stroke();
    context.fillStyle = '#000';
    context.textBaseline = 'bottom';
    context.fillText(string, 10, 250);

    // Desenhar os pontos para marcar as cidades
    $(points).each(function (index, point) {
        app.drawPoint(point.x, point.y, context);
    });
};

app.drawPoint = function (x, y, canvas) {
    canvas.beginPath();
    canvas.arc(x, y, 3, 0, 2 * Math.PI, true);
    canvas.fill();
};

app.output = function ($elem) {
    this.element = $elem;

    this.println = function (txt) {
        this.element.val(this.element.val() + '\n' + txt);
    };
};