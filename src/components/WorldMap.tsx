'use client';

import { useEffect } from 'react';

const visitedCountries = ['FIN', 'EST', 'SWE', 'CZE', 'BEL', 'NLD', 'DEU', 'FRA', 'ITA', 'CHE', 'AUT', 'POL'];
const numberOfCountriesInEu = 44;

const WorldMap = () => {
  useEffect(() => {
    const worldMap = new window.Datamap({
      element: document.getElementById('map'),
      responsive: true,
      fills: {
        defaultFill: '#d1d5db',
        authorHasTraveledTo: '#ea580c',
      },

      data: visitedCountries.reduce((acc: Record<string, object>, country: string) => {
        acc[country] = { fillKey: 'authorHasTraveledTo' };
        return acc;
      }, {}),
    });
    const euMap = new window.Datamap({
      element: document.getElementById('eu-map'),
      responsive: true,
      scope: 'world',
      projection: 'mercator',
      fills: {
        defaultFill: '#d1d5db',
        authorHasTraveledTo: '#ea580c',
      },

      data: visitedCountries.reduce((acc: Record<string, object>, country: string) => {
        acc[country] = { fillKey: 'authorHasTraveledTo' };
        return acc;
      }, {}),

      // zoom in on Europe
      setProjection: function (element: any) {
        var projection = window.d3.geo
          .equirectangular()
          .center([10, 40])
          .rotate([10, -13, 0])
          .scale(700)
          .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
        var path = window.d3.geo.path().projection(projection);

        return { path: path, projection: projection };
      },
    });
  }, []);

  return (
    <div className="worldmap">
      <h1>World Map</h1>
      <div style={{ width: 1000, height: 600, position: 'relative' }} id="map"></div>
      <h1 className="mt-10">Europe Map</h1>
      <p>
        Visited countries:{' '}
        <strong>
          {visitedCountries.length} over {numberOfCountriesInEu}
        </strong>
      </p>
      <p>
        Percentage: <strong>{((visitedCountries.length / numberOfCountriesInEu) * 100).toFixed(2)}%</strong>
      </p>
      <div style={{ width: 500, height: 600, position: 'relative' }} id="eu-map"></div>
    </div>
  );
};

export default WorldMap;
