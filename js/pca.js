function pca(){

    var self = this; // for internal d3 functions
    console.log("hehe");

    //Load data
    d3.csv("data/nytest.csv", function(data) {

        self.data = data;

        covariance(data);
    });

    function covariance(value){

        var dimensions = 0;
        var ev;
        for(var val in value[0]){
            dimensions++;
        }

        var avg = avgValue(value);
        var cm = covarianceMatrix(value, avg, dimensions);

    };

    function covarianceMatrix(value, avg, dim){

        var faktor1, faktor2, coValue, dim1, dim2, sum = 0;
        var covMatrix = new Array();
        
        for(var i = 0; i<dim; i++){
            covMatrix[i] = new Array();
        }

        for(var val in value[0]){
            for(var val2 in value[0]){
                for(var i = 0; i<value.length;i++){
                    faktor1 = parseInt(value[i][val]) - avg[val];
                    faktor2 = parseInt(value[i][val2]) - avg[val2];
                    sum += (faktor1*faktor2);
                    faktor1 = 0;
                    faktor2 = 0;
                }
                sum = sum / (value.length-1);
                covMatrix[dim1][dim2] = sum;
                dim2++;
                sum = 0;
            }
            dim1++;
            dim2 = 0;
        }

        return covMatrix;
    };

    function avgValue(value){

        var size = value.length;
        var first = 0;
        var avg = new Array();
        for(var j in value[0]){
            for(var i = 0; i<size;i++){

                first = parseInt(value[i][j]) + first;

            }

            avg[j] = first/size;
            first = 0; 
            
        }
        console.log(avg);
        return avg;
    };


}
