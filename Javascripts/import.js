dataImport = function () {
    setTimeout(function () {
        $('#loading > div > div:nth-of-type(2)').css('height', '5em');
        setTimeout(function () {
            $.getJSON("Data/tonnage_paris.json", function (json) {
                var tonnage_paris = JSON.parse(json);

                tonnage_paris_date = [];
                tonnage_paris_verre = [];
                tonnage_paris_vert = [];
                tonnage_paris_jaune = [];

                for (i = 0; i < tonnage_paris.length; i++) {
                    tonnage_paris_date.push(tonnage_paris[i]['date']);
                    tonnage_paris_vert.push(tonnage_paris[i]['tonnageverts']);
                    tonnage_paris_verre.push(tonnage_paris[i]['tonnageverre']);
                    tonnage_paris_jaune.push(tonnage_paris[i]['tonnagejaunes']);
                }
                ;

                $('#loading > div > div:nth-of-type(2)').css('height', '3em');
                setTimeout(function () {
                    $.getJSON("Data/paris.json", function (json) {
                        paris = JSON.parse(json)[0];
                        paris.p13_pop_m = paris.p13_pop / 1000000;
                        paris.tonnage = paris.tonnageJaunes + paris.tonnageVerre + paris.tonnageVerts;

                        paris.tonnage_hab = paris.tonnage / paris.p13_pop * 1000;
                        paris.pou_hab = paris.p13_pop / paris.POU;
                        paris.pou_m = 1 / Math.sqrt(paris.POU / (paris.area));

                        $('#loading > div > div:nth-of-type(2)').css('height', '0em');

                        setTimeout(function () {
                            $('body').load('index_body.html');
                        }, 1000);

                    });
                }, 1000);
            });
        }, 2000);
    }, 1000);

};