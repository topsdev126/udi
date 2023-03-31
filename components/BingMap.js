import React, { useEffect } from "react";

const BingMap = ({ latitude,longitude }) => {
    useEffect(() => {
        const loadMap = () => {
            const map = new Microsoft.Maps.Map("#myMap", {
                credentials: "AqZRa0FXlQBCUTxt0faLA6w9bfzdLnT5_HvyPiRVGKJzNyKhn37rD8_jpppGJ6mU",
                center: new Microsoft.Maps.Location(latitude, longitude)
            });

            const pin = new Microsoft.Maps.Pushpin(
                new Microsoft.Maps.Location(latitude, longitude)
            );

            map.entities.push(pin);
        };

        if (window.Microsoft && window.Microsoft.Maps) {
            loadMap();
        } else {
            // Load the Bing Maps API asynchronously
            const script = document.createElement("script");
            script.defer = true;
            script.async = true;
            script.src = `https://www.bing.com/api/maps/mapcontrol?key=AqZRa0FXlQBCUTxt0faLA6w9bfzdLnT5_HvyPiRVGKJzNyKhn37rD8_jpppGJ6mU&callback=loadMap`;

            document.body.appendChild(script);
        }
    }, [latitude, longitude]);

    return (
        <div id="myMap" style={{ height: "500px" }}></div>
    );
};

export default BingMap;
