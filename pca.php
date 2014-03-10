<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
        <!-- Bootstrap core CSS -->
        <link rel="stylesheet" href="css/bootstrap.css">
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/colorbrewer.css">
        <link rel="stylesheet" href="css/main.css">

        <!--modules css-->
        <link rel="stylesheet" href="css/pc.css">
        <link rel="stylesheet" href="css/sp.css">
        <link rel="stylesheet" href="css/pca.css">
        <link rel="stylesheet" href="css/map.css">

    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <!-- Wrap all page content here -->
        <div id="wrap">

            <!-- Fixed navbar -->
            <?php require('templates/header.php') ?>
   
            <!-- Begin page content -->

            <div class="container">
                <!-- row of columns -->

                <div class="row">
                
                    <div id="menu" class="col-md-4 col-sm-4 col-xs-4">
                        <div id="pcaText">
                        <h2>Principal Components Analysis (PCA)</h2>
                            <p>The principal component analysis is a techique that allows us to reduce multi-dimensional dataset by using eigenvectors, eigenvalues
                            and singularity decomposition. It is possible to plot the data into two dimensions (x and y axis). The axis are
                            represented as the eigenvectors and are called Principal components (PC). The values along the axis are represented
                            as the eigenvalues and are also known as the variation.</p>
                            <p>By using PCA it will be easier to find relations between the dimensions.</p>
                        </div>
                        </div>
                    </div>
                    
                <div id="mapDiv">
                    <div id="sp2" style="height: 60vh"></div>
                </div>
                   
                </div>
            </div>

        </div>

        <div id="footer">
            <div class="container">
            </div>
        </div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.2.min.js"><\/script>')</script>
        <script src="js/vendor/bootstrap.min.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
        <script src="js/vendor/d3.min.js"></script>
        <script src="js/vendor/topojson.v1.min.js"></script>
        <script src="js/vendor/underscore-min.js"></script>
        <script src="js/vendor/colorbrewer.js"></script>

        <!--modules js-->
        <script src="js/sylvester/sylvester.js"></script>
        <script src="js/sylvester/sylvester.src"></script>
        <script src="js/numeric-1.2.6.js"></script>
        <script src="js/pc.js"></script>
        <script src="js/sp.js"></script>
        <script src="js/map.js"></script>
        <script src="js/pca.js"></script>
        <script src="js/main.js"></script>
        <script src="js/getColor.js"></script>


    </body>
</html>
