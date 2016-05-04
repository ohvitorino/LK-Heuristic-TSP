/**
 * Created by bruno on 03/05/16.
 */

var app = app || {};
app.tsp = app.tsp || {};

app.tsp.LinKernighan = function (pointSet) {
    'use strict';

    this.tourManager = new app.tsp.PathManager(pointSet);

    this.solve = function () {
        var tour = (new app.tsp.PathCreator(this.tourManager)).usingTourManagersPoints(),
            i,
            j;

        window.output.println("Distância Inicial: " + tour.getDistance());

        for (i = 0; i < tour.tourSize(); i += 1) {
            // Do the city swapping
            for (j = i; j < tour.tourSize(); j += 1) {
                if (j === i) {
                    continue;
                }

                var newTour = new app.tsp.PathCreator(this.tourManager);
                newTour.setCities(tour.tour);

                // Trocar duas cidades
                newTour.setCity(j, newTour.getCity(i));
                newTour.setCity(i, newTour.getCity(j));

                // Decide if we should accept the neighbour
                if (tour.getDistance() > newTour.getDistance()) {
                    tour = newTour;
                }
            }
        }

        window.output.println("Distância Final: " + tour.getDistance());

        return tour.tour;

    }
};