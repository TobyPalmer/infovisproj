function pca(){

    var self = this; // for internal d3 functions
    console.log("hehe");

    //Load data
    d3.csv("data/test.csv", function(data) {

        self.data = data;

        covariance(data);
    });

    function covariance(value){

        var dimensions = 0;
        var evMatrix;
        var centered;
        var centeredMatrix;
        var dataPoints;
        var sum = 0;
        var covarianceMatrix;
        var plott = new Array();
        for(var val in value[0]){
            dimensions++;
        }

        var avg = avgValue(value);

        //covariance matrix and centered matrix
        var cacdm = covAndCDMatrix(value, avg, dimensions);
        centered = cacdm.bar;
        covarianceMatrix = cacdm.cov;

        //eigenvectors and eigenvalues from covariance matrix
        var eig = numeric.eig(covarianceMatrix);

        centeredMatrix = Matrix.create(centered);
        evMatrix = Matrix.create(eig.E.x);

        for(var i = 0; i<dimensions; i++){
            plott[i] = new Array();
        }

        //datavalues to be plotted
        dataPoints = centeredMatrix.multiply(evMatrix);
        
        var lambda = eig.lambda.x;
        for(var i = 0; i<lambda.length; i++){
            sum = parseFloat(lambda[i]) + sum;
        }   

        var dataScore = new Array();
        for(var i = 0; i<lambda.length; i++){
            dataScore[i] = lambda[i]/sum;
        }

        /*for(var i = 0; i<dimensions; i++){
            for(var j = 0; j<dataPoints.elements.length;j++){
                sum = parseFloat(dataPoints.elements[j][i]) + sum;
            }
            console.log("sadas: " + dataPoints.elements[9][1]);
            console.log("----------------");
            sum = sum/(dataPoints.elements.length-1);
            plott[i] = sum;
            sum=0;
        }   */      


        //centered = Matrix.create(cacdm.bar);
        //covarianceMatrix = Matrix.create(cacdm.cov);

    };

    //covariance and centered data matrix
    function covAndCDMatrix(value, avg, dim){

        var faktor1 = 0;
        var faktor2 = 0;
        var coValue = 0;
        var sum = 0;
        var dim1 = 0;
        var dim2 = 0;
        var covMatrix = new Array();
        var dimBar = new Array();
        var obj = {
            "bar": "",
            "cov": ""
        };
        for(var i = 0; i<dim; i++){
            covMatrix[i] = new Array();
        }
        for(var i = 0; i<value.length; i++){
            dimBar[i] = new Array();
        }

        for(var val in value[0]){
            for(var val2 in value[0]){
                for(var i = 0; i<value.length;i++){
                    if(val == val2){
                        dimBar[i][dim2] = parseFloat(value[i][val]) - avg[val2];
                    }

                    faktor1 = parseFloat(value[i][val]) - avg[val];
                    faktor2 = parseFloat(value[i][val2]) - avg[val2];
                    
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

        obj.bar = dimBar;
        obj.cov = covMatrix;
        return obj;
    };

    function avgValue(value){

        var size = value.length;
        var first = 0;
        var avg = new Array();
        for(var j in value[0]){
            for(var i = 0; i<size;i++){

                first = parseFloat(value[i][j]) + first;

            }

            avg[j] = first/size;
            first = 0; 
            
        }
        return avg;
    };


}
