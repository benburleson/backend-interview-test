var Converter = require('./backend');

describe("Converter", function() {
    var converter = new Converter();

    var expanded = {
        'one': { 
            'two': 3,
            'four': [ 5,6,7]
        },
        'eight': {
            'nine': {
                'ten':11
            }
        }
    };

    var flattened = {
        'one/two':3,
        'one/four/0':5,
        'one/four/1':6,
        'one/four/2':7,
        'eight/nine/ten':11
    };

    it("flatten", function() {
        var result = converter.flatten(expanded);
        expect(result).toEqual(flattened);
    });

    it("expand", function() {
        var result = converter.expand(flattened);
        expect(result).toEqual(expanded);
    });

});
