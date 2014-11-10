/**
 * Movements Adapter
 * @author Paolo Bianchini [paolo.bianchini@it.ibm.com]
 * @copyright IBM Corp. 2014
 */

/**
 * @description This adapter accesses a backend db to retrieve account movements
 * @class pb.bank.MovementsAdapter
 * @memberOf pb.bank
 */

/**
 * @description retrieves JSOn object listing account movements to list in view
 * @function getMovements
 * @memberOf pb.bank.MovementsAdapter
 * @param {string} account
 * @returns {object} json list of movements
 */
function getMovements(account) {
//400162854
	var path = "movements/_all_docs";
	
	var response;
	var i;
	var movements = [];
	
	var input = {
	    method : 'post',
	    returnedContentType : 'json',
	    path : path,
	    body : {
	    	content: {
	    		"selector" : { "accn" : account },
	    		"sort": [{"date": "asc"}],
	    	},
	    	contentType: "application/json"
	    }

	};
	
	response = WL.Server.invokeHttp(input);
	
	WL.Logger.debug(response);

	
	for (i = 0; i < response.total_rows; i++ ) {
		
		var rowinput;
		var rowresult;
		
		rowinput = {
				method : 'get',
			    returnedContentType : 'json',
			    path : 'movements/' + response.rows[i].id
		};
		
		rowresult = WL.Server.invokeHttp(rowinput);
		
		/** @todo could use WL filters here */
		movements.push({
			bala : rowresult.bala,
			date : rowresult.date,
			move : rowresult.move
		});

		WL.Logger.debug(movements);

	};
	
	return {
		
		movements: movements
	
	};
	
}