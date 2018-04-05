'use strict';

angular
        .module('AngularApp')
        .controller(
                'mainController',
                [
                    '$scope',
                    'swapiService',
                    '$q',
                   function($scope,swapiService,$q){
                   var self = this;  //self = this is a way of referencing the outer scope
                   self.getStarships = getStarships;
                   self.supplyStopsCalculator =supplyStopsCalculator;
                  
                   self.ships = [];//An array containing all the sw star ships and their corresponding attributes
                   self.shipsCount = 0;
                   self.ships_supply_stops = [];//An array containing all the sw star ships and the number of stops each starship must make 
                   self.maxDistance = 0;// self.maxDistance is the scope of the input field . It will be used to determine the number of stops each star ship will have to make
                 

                  self.hours = {'day':     24,
                                                       'days':    24,
                                                       'week':   168,
                                                       'weeks':  168,
                                                       'month':  730,
                                                       'months': 730,
                                                       'year':  8760,
                                                       'years': 8760}; //creates a key/value mapping for a given length of time and it's corresponding time in hours
             
                 getStarships();
                 function getStarships() {

                       //resets the arrays to empty 
                       self.ships_supply_stops = [];
                       self.ships = [];
                      
                          swapiService.starshipsCount().then(
                                        function(d) {
                                        self.shipsCount = d;//stores the resutls in an array c
                                          var shipsPerPage = 10;
                                          var pages= Math.ceil(self.shipsCount/10);
                                   for (var i = 1; i <=pages; i++) { 
                                         swapiService.allStarships(i).then(
                                        function(d) {
                                          self.ships = d;//stores the resutls in an array c
                                             for(var ship of self.ships) {
                                                  if(ship.MGLT!="unknown"){
                                                           console.log(ship); 
                                                           var maxDis = self.maxDistance;
                                                           var stops =  supplyStopsCalculator(ship,maxDis);
                                                          console.log(stops); 
                                                          self.ships_supply_stops.push({ name: ship.name, stops: stops });//populates the array with the required values
                                                  }
                                                }
                                      
                                         

                                        },
                                        function(errResponse) {
                                          console.error('Error while fetching ships Details');
                                          console.error(pageExists);
                                         
                                        });
                                                    }
                                        },
                                        function(errResponse) {
                                          console.error('Error while fetching ships Details');
                                          console.error(pageExists);
                                          
                                        });

                      }

                          function supplyStopsCalculator(ship,maxDis) {

                                                     var consumables = ship.consumables;//the length of time in,string format, that a starship can last with out resupply
                                                  var MGLT = ship.MGLT;// the max MGLT per hour each starship can go
                                                  var consumablesArray = consumables.split(" ");//creates an array form the string consumables split by spaces.
                                                  var quantity = parseInt(consumablesArray[0]);//parses the first element of the array to a number
                                                  var durationStr = consumablesArray[1];
                                                  
                                                  var durationHrs = self.hours[durationStr];//finds the corresponding value of the key in the map
                                                  var totalHrs = quantity*durationHrs;//computes the total hours the starship has to travel before having to reupply
                                                

                                                  var maxMGLTDistance = totalHrs*MGLT;//computes the total distance in MGLT the starship has to travel before having to resupply
                                                
                                               
                                                  var stops = Math.floor(maxDis/maxMGLTDistance);//computes the number of stops the starhsip has to make given a specified distance rounded down to the nearest whole number

                                         return stops;
                        } 

                    }])
 