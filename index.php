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
                        <h2>World map and parallell coordinates</h2>
                        <p>Start by choose something from the first dropdown 
                            menu, the map will depend on that data. After that,
                            feel free to pick data from as many dropdowns as you like.
                            You can compare the data you choose in the parallell coordinate system.<br><br>

                        <B>The map will show this data</B> <BR>
                        <SELECT class id="dropdown1" NAME="Fruit">
                            <OPTION SELECTED> Select data for the map
    
                        </SELECT>

                         <BR><BR>
                        <SELECT class id="dropdown2" NAME="Fruit">
                            <OPTION SELECTED> Select data to look at
    
                        </SELECT>

                         <BR><BR>
                        <SELECT class id="dropdown3" NAME="Fruit">
                            <OPTION SELECTED> Select data to look at
    
                        </SELECT>

                         <BR><BR>
                        <SELECT class id="dropdown4" NAME="Fruit">
                            <OPTION SELECTED> Select data to look at
    
                        </SELECT>

                         <BR><BR>
                        <SELECT class id="dropdown5" NAME="Fruit">
                            <OPTION SELECTED> Select data to look at
    
                        </SELECT>

                         <BR><BR>
                        <SELECT class id="dropdown6" NAME="Fruit">
                            <OPTION SELECTED> Select data to look at
    
                        </SELECT>

                         <BR><BR>
                        <SELECT class id="dropdown7" NAME="Fruit">
                            <OPTION SELECTED> Select data to look at
    
                        </SELECT>

                         <BR><BR>
                        <SELECT class id="dropdown8" NAME="Fruit">
                            <OPTION SELECTED> Select data to look at
    
                        </SELECT>
                        <BR>
                        <button class id="btn" onclick="drawPc()">Draw</button>
                    
                    </div>
                   


                    <div id="map" class="col-md-7 col-sm-7 col-xs-7">
                    </div>

                    <div id="scale" class="col-md-1 col-sm-1 col-xs-1"></div>
                  

                </div>

                <div class="row">
                    <br><br><br>
                   
                        <div id="pc" style="height: 30vh"></div>
                    
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
