# NYC Crime Rate Map

This project is an interactive map that visualizes crime rates in New York City (NYC) using Leaflet.js for mapping and Chroma.js for color scales. It displays NYC neighborhoods with color coding based on crime rates, along with interactive elements like tooltips, custom labels, and a legend.

## Features
- **Interactive Map**: Explore NYC and hover over neighborhoods to view crime rate information.
- **Color-Coded Crime Rates**: Visualize crime rates with a color scale for quick identification.
- **Custom Labels and Tooltip**: See neighborhood names, crime rates, and ranks with custom labels and tooltip interactions.
- **Responsive Zoom**: Adjusts the label sizes according to the map's zoom level for optimal readability.

## Requirements
To run this project, you need a web browser that supports JavaScript. The project uses the following libraries:
- [Leaflet.js](https://leafletjs.com/): A JavaScript library for interactive maps.
- [Chroma.js](https://gka.github.io/chroma.js/): A JavaScript library for color manipulation.

## Getting Started
Open the `index.html` file in a web browser to view the interactive map.

## Structure
- `index.html`: Main HTML file with the map and linked libraries.
- `styles.css`: CSS file for styling the map and custom labels.
- `script.js`: JavaScript file containing the map setup, data fetching, and interactions.
- `data.geojson`: GeoJSON file with NYC neighborhoods and crime rate data.

## Data Source
The crime rate data used in this project is sourced from publicly available NYC crime statistics. Ensure you have the proper rights to use this data if it's external or proprietary.

## Inferences

When reviewing the interactive NYC crime rate map, the following conclusions can be drawn:

- **High Crime Areas**: Some neighborhoods in NYC with higher crime rates are:
  - Brownsville
  - East New York
  - Midtown Manhattan
  - Hunts Point

- **Areas to Avoid**: To stay on the safe side, consider avoiding the following areas:
  - Parts of Brooklyn that are far east
  - Some sections in the South Bronx

These conclusions are based on crime rate data visualized on the interactive map. They aim to guide residents and visitors on which neighborhoods may have higher risks.


## Customization
To customize the project, you can:
- Update the `data.geojson` file with new neighborhood data or additional attributes.
- Adjust the color scale in `script.js` to change the crime rate visualization.
- Modify the `styles.css` file to alter the map's appearance and label styles.

## License
This project is licensed under the MIT License. For more information, see the [LICENSE](./LICENSE) file.

## Contributions
Contributions are welcome! If you would like to contribute, please fork the repository and submit a pull request with your changes.

## Contact
For questions or issues, please open an [issue](https://github.com/rayidali4/rayidali4.github.io/issues) or contact the repository owner.

## Creator
This project was created by Rayid Ali. For any inquiries, you can reach me at rayidam@g.clemson.edu.
The dataset and the project was inspired from Ben Wellington. The article can be found here: https://iquantny.tumblr.com/post/136641945194/your-neighborhoods-crime-rank-insights-from-the


