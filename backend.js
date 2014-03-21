function Converter() {

    this.flatten = function(input) {
    	var output = {};

    	function flattenator(current, property) {
    		if (Object(current) !== current) {
    			output[property] = current;
    		} else if (Array.isArray(current)) {
    			for (var i = 0, len = current.length; i < len; i++) {
    				flattenator(current[i], property + '/' + i);
    			}

    			if (0 == len) {
    				output[property] = [];
    			}
    		} else {
    			var isEmpty = true;

    			for (var p in current) {
    				isEmpty = false;
    				flattenator(current[p], property ? property + '/' + p : p);
    			}

    			if (isEmpty && property) {
    				output[property] = {};
    			}
    		}
    	}

    	flattenator(input);

    	return output;
    };

    this.expand = function(input) {
    	if (Object(input) !== input) {
    		return input;
    	}

    	var regexp = /([^\/]+)/g,
        	output = {};

        for (var p in input) {
        	var current = output,
        	    property = '',
        	    match;

        	while (match = regexp.exec(p)) {
        		current = current[property] || (current[property] = (match[2] ? [] : {}));
        		property = match[2] || match[1];
        	}

        	current[property] = input[p];
        }

        return output[''] || output;
    };
};

module.exports = Converter;