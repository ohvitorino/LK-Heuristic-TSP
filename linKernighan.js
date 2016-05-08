/**
 * Created by bruno on 03/05/16.
 */

var app = app || {};
app.tsp = app.tsp || {};

app.tsp.LinKernighan = function (nodes) {
    'use strict';

    this.tourManager = new app.tsp.PathManager(nodes);

    this.solve = function () {
        var tour = new app.tsp.Tour(this.tourManager),
            i,
            j;

        tour.usingTourManagersPoints();

        window.output.println("Initial cost: " + tour.getCost());

        for (i = 0; i < tour.tourSize(); i++) {

            for (j = i; j < tour.tourSize(); j++) {
                if (j === i) {
                    continue;
                }

                var newTour = new app.tsp.Tour(this.tourManager);
                newTour.setCities(tour.tour);

                // Switch two cities
                var cityI = newTour.getCity(i),
                    cityJ = newTour.getCity(j);

                newTour.setCity(j, cityI);
                newTour.setCity(i, cityJ);

                // Decide if the neighbour solution should be accepted
                if (tour.getCost() > newTour.getCost()) {
                    tour = newTour;
                }
            }
        }

        window.output.println("Final cost: " + tour.getCost());

        return tour;

    }
};
