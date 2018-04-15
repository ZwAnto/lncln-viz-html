dataImport = function () {

    $.getJSON("Data/tonnage_paris.json", function (json) {
        tonnage_paris = json;

        $('#loading > div > div:nth-of-type(2)').css('height', '5em');

        $.getJSON("Data/paris.json", function (json) {
            paris = json;

            $('#loading > div > div:nth-of-type(2)').css('height', '4em');

            $.getJSON("Data/dansMaRue_paris_type.json", function (json) {
                dansMaRue_paris_type = json;

                $('#loading > div > div:nth-of-type(2)').css('height', '3em');

                $.getJSON("Data/arr.geojson", function (json) {
                    arr_geo = json;

                    $('#loading > div > div:nth-of-type(2)').css('height', '2em');

                    $.getJSON("Data/tonnage_arr.json", function (json) {
                        tonnage_arr = json;

                        $('#loading > div > div:nth-of-type(2)').css('height', '0em');
                        $.getJSON("Data/tonnageIndex_arr.json", function (json) {
                            tonnageIndex_arr = json;

                            $('#loading > div > div:nth-of-type(2)').css('height', '0em');

                            $('body').load('index_body.html');
                        });

                    });

                });

            });




        });

    });



};