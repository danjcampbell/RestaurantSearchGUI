Assumptions:

All parameters will be populated on the request, otherwise we will return HTTP 400 Bad Request
The location of the user will not change because this is a tool for people in the same building/company
There will not be restaurants added to the csv files while the application is up and running
The restaurants.csv columns can have any order and the data should always match the headers
The cuisines column order will always be the same since it is only id,value
Design: Based on this I created a Singleton to cache all of the restaurant csv data, the singleton will sort the restaurants based on distance, rating, and price on the initial load. There will only be a sort on the initial load of the csv files, subsequent loads will utilize the already sorted lists of restaurants and select the first 5 or less items that match the restaurant name and cuisine type

Running the application: From the root of RestaurantSearch run docker-compose up -d, this will bring up the app on localhost:8080

From the root of RestaurantSearchGUI run npm start, this will bring up the app on localhost:3000
