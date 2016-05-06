/**
 * Created by bruno on 03/05/16.
 */

var app = app || {};
app.tsp = app.tsp || {};

app.tsp.PathManager = function (nodes) {
    'use strict';

    // Aqui vamos guardar os custos já calculados
    this.costs = {};

    /**
     * Convert a object {x, y} to a City
     */
    this.pointToCity = function (point) {

        /**
         * Calculate the cost between the current point and a given point
         */
        point.costTo = function (otherPoint) {
            // Calcular a distância utilizando o Teorema de Pitagoras
            var cost = Math.ceil(Math.sqrt( (point.x - otherPoint.x) * (point.x - otherPoint.x) + (point.y - otherPoint.y) * (point.y - otherPoint.y) ));
            // var xDistance = Math.abs(point.x - otherPoint.x),
            //     yDistance = Math.abs(point.y - otherPoint.y),
            //     cost = (xDistance * xDistance) + (yDistance * yDistance);

            return cost;
        }.bind(this);

        point.toString = function () {
            return point.name + ":(" + point.x + "," + point.y + ")";
        };

        return point;
    };

    // Converter os pontos em "objectos" City
    var t = {};
    t.destinationCities = $(nodes).map(function (index, point) {
        return this.pointToCity(point);
    }.bind(this));

    t.getCities = function () {
        return t.destinationCities;
    };

    t.getCity = function (index) {
        return t.destinationCities[index];
    };

    return t;
};

app.tsp.Tour = function (routeManager) {
    'use strict';

    this.tour = [];
    this.cost = 0;

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
        // Reiniciar o custo visto que estamos a modificar a rota
        this.cost = 0;
    };

    this.getCost = function () {
        if (this.cost === 0) {
            var routeCost = 0,
                idx;

            // Passar por todas as cidades e somar o custo
            for (idx = 0; idx < this.tourSize(); idx++) {
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
                // adicionar ao custo acumulado, custo  entre as duas cidades
                routeCost += fromCity.costTo(destinationCity);
            }
            this.cost = routeCost;
        }
        return this.cost;
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

app.drawEdges = function (points) {
    'use strict';
    var canvasHeight = 900, canvasWidth = 900;

    var context = $('<canvas></canvas>')
        .attr('height', canvasHeight)
        .attr('width', canvasWidth)
        .appendTo($('.target'))
        [0]
        .getContext('2d');

    context.strokeStyle = '#000';

    context.beginPath();

    context.moveTo(points[0].x, points[0].y);

    $(points).each(function (index, point) {
        context.lineTo(point.x, point.y);
    });

    // context.closePath();
    context.stroke();

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

app.generateRandomDeltaPath = function (size, min, max) {
    var nodes = [];

    for (var i = 0; i < size; i++) {
        var valX = Math.floor(Math.random() * (max - min + 1) + min);
        var valY = Math.floor(Math.random() * (max - min + 1) + min);
        nodes.push({x: valX, y: valY, name: i});
    }

    // Para obter um d-path, temos de ter a ultima aresta ligada a um
    // dos nós anteriores
    var node = Math.floor(Math.random() * (size + 1));
    nodes.push({x: nodes[node].x, y: nodes[node].y, name: node + "x"});

    return nodes;
}
