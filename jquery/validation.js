
var maxDistance =  $('#maxDistance'); 
var invalidChars = [
		  "-",
		  "+",
		  "e",
		  "E",
		];
	
	maxDistance.on('keydown keyup', function(e){
	   
	   if(invalidChars.includes(e.key)){
		   $(this).val(1000000);  
	   }
	    	
	});