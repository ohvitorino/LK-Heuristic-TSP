/**
 * Created by bruno on 03/05/16.
 */

var app = app || {};
app.tsp = app.tsp || {};

app.tsp.LinKernighan = function (pointSet) {
    'use strict';

    this.tourManager = new app.tsp.PathManager(pointSet);

    this.solve = function () {
        var tour = new app.tsp.Tour(this.tourManager),
            i,
            j;

        tour.usingTourManagersPoints();

        window.output.println("Custo Inicial: " + tour.getCost());

        for (i = 0; i < tour.tourSize(); i++) {

            for (j = i; j < tour.tourSize(); j++) {
                if (j === i) {
                    continue;
                }

                var newTour = new app.tsp.Tour(this.tourManager);
                newTour.setCities(tour.tour);

                // Trocar duas cidades
                var cityI = newTour.getCity(i),
                    cityJ = newTour.getCity(j);

                newTour.setCity(j, cityI);
                newTour.setCity(i, cityJ);

                // Decidir se aceitamos a solução vizinha
                if (tour.getCost() > newTour.getCost()) {
                    tour = newTour;
                }
            }
        }

        window.output.println("Custo Final: " + tour.getCost());

        return tour;

    }
};
