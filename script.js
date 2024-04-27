// Initialize the map
const map = L.map('map', {
    maxBounds: L.latLngBounds(L.latLng(40.477399, -74.25909), L.latLng(40.917577, -73.700272)),
}).setView([40.7128, -74.0060], 11);

// Add a tile layer (adjust the URL if needed)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);

// Create a tooltip
const tooltip = L.tooltip({
    permanent: false,
    direction: 'top',
    opacity: 0.8,
});

// Load the GeoJSON data (replace 'data.geojson' with your file path)
fetch('data.geojson')
    .then(response => response.json())
    .then(data => {
        // Create a color scale based on crime rates
        const crimeRates = data.features.map(feature => feature.properties.nypdpivotsnoparks_all2);
        const colorScale = chroma.scale(['red', 'orange', 'yellow', 'green']).domain([Math.min(...crimeRates), Math.max(...crimeRates)]).mode('lch').colors(5);

        // Define the list of popular neighborhoods
        const popularNeighborhoods = [''];

        // Create a layer for the neighborhoods
        const neighborhoodsLayer = L.geoJSON(data, {
            style: feature => ({
                fillColor: colorScale[Math.floor((feature.properties.overall_rank - 1) / (data.features.length / 5))],
                fillOpacity: 0.7,
                weight: 1,
                color: 'white',
            }),
            onEachFeature: (feature, layer) => {
                const labelContent = `
                    <div class="neighborhood-label">
                        ${popularNeighborhoods.includes(feature.properties.ntaname) ? feature.properties.ntaname + '<br>' : ''}
                        <small>(${feature.properties.overall_rank}/${data.features.length})</small>
                    </div>
                `;
                
                // Create a custom label icon
                const labelIcon = L.divIcon({
                    className: 'custom-label',
                    html: labelContent,
                    iconSize: null,
                    iconAnchor: [10, 10],
                });
                
                // Add the label to the layer
                const labelMarker = L.marker(layer.getBounds().getCenter(), {
                    icon: labelIcon,
                    interactive: false,
                }).addTo(map);

                // Show tooltip on mouseover
                layer.on('mouseover', function (e) {
                    tooltip.setContent(`<b>${feature.properties.ntaname}</b><br>Crime Rate: ${feature.properties.nypdpivotsnoparks_all2} (Rank: ${feature.properties.overall_rank}/${data.features.length})`);
                    tooltip.setLatLng(e.latlng);
                    map.openTooltip(tooltip);
                });

                // Hide tooltip on mouseout
                layer.on('mouseout', function () {
                    map.closeTooltip(tooltip);
                });
            },
        }).addTo(map);

        // Fit the map bounds to NYC
        map.fitBounds(neighborhoodsLayer.getBounds());

        // Create a legend
        const legend = L.control({ position: 'bottomright' });
        legend.onAdd = function (map) {
            const div = L.DomUtil.create('div', 'legend');
            div.innerHTML = `
                <div><span style="background-color: ${colorScale[0]}"></span> High</div>
                <div><span style="background-color: ${colorScale[1]}"></span></div>
                <div><span style="background-color: ${colorScale[2]}"></span> Medium</div>
                <div><span style="background-color: ${colorScale[3]}"></span></div>
                <div><span style="background-color: ${colorScale[4]}"></span> Low</div>
            `;
            return div;
        };
        legend.addTo(map);

        // Adjust label size based on zoom level
        function updateLabelSize() {
            const zoomLevel = map.getZoom();
            const labelSize = zoomLevel < 12 ? 8 : zoomLevel < 14 ? 10 : 12;
            const rankSize = labelSize - 2;
            const labels = document.getElementsByClassName('custom-label');
            for (let i = 0; i < labels.length; i++) {
                labels[i].style.fontSize = labelSize + 'px';
                labels[i].querySelector('small').style.fontSize = rankSize + 'px';
            }
        }

        // Call updateLabelSize initially and on zoom end
        updateLabelSize();
        map.on('zoomend', updateLabelSize);
    });