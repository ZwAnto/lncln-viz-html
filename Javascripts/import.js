dataImport = function () {

    $('#loading > div > div:nth-of-type(2)').css('height', '5em');

    $.getJSON("Data/tonnage_paris.json", function (json) {
        tonnage_paris = json;

        $('#loading > div > div:nth-of-type(2)').css('height', '3em');

        $.getJSON("Data/paris.json", function (json) {
            paris = json;
          
            $('#loading > div > div:nth-of-type(2)').css('height', '0em');

            $.getJSON("Data/dansMaRue_paris_type.json", function (json) {
                dansMaRue_paris_type = json;
                    $('body').load('index_body.html');
            });




        });

    });



};