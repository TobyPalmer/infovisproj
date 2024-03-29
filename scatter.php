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


                <br><br><br>


                <div class="row">
                
                    <div id="menu" class="col-md-4 col-sm-4 col-xs-4">
                        <B>Scatter plot Y-axis</B> <BR>
                        <SELECT class id="drop1" NAME="scat">
                            <OPTION SELECTED>Select data for Y
                            </SELECT>
                        <br>
                         <B>Scatter plot X-axis</B> <BR>
                        <SELECT class id="drop2" NAME="scat">
                            <OPTION SELECTED>Select data for X
                            </SELECT>
                        <br>
                         <B>Scatter plot radius</B> <BR>
                        <SELECT class id="drop3" NAME="scat">
                            <OPTION SELECTED>Select data for radius
                            </SELECT>
                        <br>
                         <B>Scatter plot color</B> <BR>
                        <SELECT class id="drop4" NAME="scat">
                            <OPTION SELECTED>Select data for color
                            </SELECT>
                        <br>
                        <br>

                        <button class id="but" onclick="drawFunction()">Go</button>
                        <button class id="but2" onclick="clearFunction()">Clear</button>
                        <br>
                        <H2>Scatter plot</H2>
                        <p>The scatter plot is used to plot data in two dimensions (x and y axis). There are a few measures to fit more dimensions into this plot. In the dropdown menues above you can chose what dimensions to use on x and y axis and also what other dimensions should decide the radius and the color (fading from yellow/biege to red where yellow represents a low value)</p>
                        <br>
                    </div>
                   


                    <div id="sp" style="height: 80vh" class="col-md-8 col-sm-8 col-xs-8">
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
        <script src="js/pc.js"></script>
        <script src="js/sp.js"></script>
        <script src="js/map.js"></script>
        <script src="js/main.js"></script>
        <script src="js/getColor.js"></script>


    </body>
</html>
