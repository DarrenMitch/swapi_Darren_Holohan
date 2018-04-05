
describe("mainController", function() {
 
    var controller;
    var swapiService;
     var scope;
     var q;
     var shipCount;
      var deferred;

    beforeEach(module("AngularApp"));


     beforeEach(function () {
     shipCount=37;
      var i = 3;
        swapiService = {
            starshipsCount: function () {
                deferred = q.defer();
                shipCount=deferred.promise;
                return deferred.promise;
            },
             allStarships: function (i) {
                deferred = q.defer();
                return deferred.promise;
            }
        };
    });


    beforeEach(inject(function($rootScope, $controller,$q) {
             q= $q;
            scope = $rootScope.$new();
            controller = $controller('mainController', {
            	$scope: scope,
             swapiService: swapiService
            });
       
        }));


it('confirm that starshipCount function was called from swapiService', function () {
     
        
        spyOn(swapiService, 'starshipsCount');
        swapiService.starshipsCount();
      
        expect(swapiService.starshipsCount).toHaveBeenCalled();
        
    });

 });


describe("mainController ", function() {
 
   var controller;
    var millenniumFalcon;
    var rebelTransport;

     var yWing;
   
    var maxDis;
     var scope;
    beforeEach(module("AngularApp"));

    beforeEach(inject(function($rootScope, $controller) {

            scope = $rootScope.$new();
            controller = $controller('mainController', {
            	$scope: scope
            });
       
        }));

beforeEach(function () {
      millenniumFalcon={name: "Millennium Falcon", 
						MGLT:"75",
						consumables:"2 months"};
	    rebelTransport={name: "Rebel transport", 
						MGLT:"20",
						consumables:"6 months"};
	             yWing={name: "Y-Wing", 
						MGLT:"80",
						consumables:"1 week"};
	 					
	 
    maxDis = 1000000;
     
    });

    it("millennium Falcon has 9 stops for distance of 1000000 ", function() {
    
    
    var falconStops = controller.supplyStopsCalculator(millenniumFalcon,maxDis);
  
    expect(falconStops).toBe(9);

    
 });
      it("Y-Wing has 74 stops for distance of 1000000 ", function() {
    
    
    var ywingStops = controller.supplyStopsCalculator(yWing,maxDis);
  
    expect(ywingStops).toBe(74);

    
 });
        it("Rebel transport has 11 stops for distance of 1000000 ", function() {
    
    
    var rebelStops = controller.supplyStopsCalculator(rebelTransport,maxDis);
  
    expect(rebelStops).toBe(11);

    
 });
   });


