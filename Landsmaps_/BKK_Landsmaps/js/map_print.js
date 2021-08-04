
//L.control.browserPrint().addTo(map)

var customActionToPrint_NoDESC = function (context, mode) {
    return function () {
        //console.log('print', context, mode);
        //context._printPortrait();
        switch (mode.Mode) {
            case 'Landscape':
                showMapInfo(false);
                context._printLandscape();
                break;
            case 'Portrait':
                showMapInfo(false);
                context._printPortrait();
                break;
        }
    }
}

var customActionToPrint = function (context, mode) {
    return function () {
        //console.log('print', context, mode);
        //context._printPortrait();
        if (default_pagesize == 'A4') {
            switch (mode.Mode) {
                case 'Landscape':
                    //showMapInfo(true);
                    document.getElementById("txt_print_desc").style.setProperty("width", "800px", "important");
                    context._printLandscape();
                    break;
                case 'Portrait':
                    //showMapInfo(true);
                    document.getElementById("txt_print_desc").style.setProperty("width", "540px", "important");
                    context._printPortrait();
                    break;
            }
        }


        if (default_pagesize == 'A3') {
            switch (mode.Mode) {
                case 'Landscape':
                    //showMapInfo(true);
                    document.getElementById("txt_print_desc").style.setProperty("width", "1200px", "important");
                    context._printLandscape();
                    break;
                case 'Portrait':
                    //showMapInfo(true);
                    document.getElementById("txt_print_desc").style.setProperty("width", "700px", "important");
                    context._printPortrait();
                    break;
            }
        }

    }
}

function showPrintMapInfo(isShow) {
    
    if (isShow) {
        document.getElementById("map_print_title").style.setProperty("display", "block", "important");
        document.getElementById("map_print_desc").style.setProperty("display", "block", "important");
    }
    else
    {
        document.getElementById("map_print_title").style.setProperty("display", "none", "important");
        document.getElementById("map_print_desc").style.setProperty("display", "none", "important");
    }
}

function sel_papersize() {
    var pp = document.querySelector('input[name="pp_size"]:checked').value;
    default_pagesize = pp;

    map_browserPrint = null;
    document.getElementById('browserPrint_ctrl').innerHTML = '';

    map_browserPrint = L.control.browserPrint({
        Title: 'พิมพ์แผนที่',
        documentTitle: 'โครงการจัดทำระบบสารสนเทศภูมิศาสตร์เพื่อพัฒนาประสิทธิภาพในการบริหารงานด้านการช่างและการผังเมือง เทศบาลนครปากเกร็ด',
        closePopupsOnPrint: false,
        printModes: [
            L.control.browserPrint.mode("Landscape", "<i class='fa fa-image'></i> พิมพ์แบบ Landscape", default_pagesize, customActionToPrint, forcebounds),
            L.control.browserPrint.mode("Portrait", "<i class='far fa-file-image'></i> พิมพ์แบบ Portrait", default_pagesize, customActionToPrint, forcebounds)
            //L.control.browserPrint.mode("Landscape", "พิมพ์แบบ Landscape ตามรูปแบบของเทศบาล", default_pagesize, customActionToPrint, forcebounds),
            //L.control.browserPrint.mode("Portrait", "พิมพ์แบบ Portrait ตามรูปแบบของเทศบาล", default_pagesize, customActionToPrint, forcebounds),
            //L.control.browserPrint.mode.landscape("Land scape", "A4",),
            //"Portrait",
            //L.control.browserPrint.mode.auto("Automatico", "B4"),
            //L.control.browserPrint.mode.custom("Séléctionnez la zone", "B5")
        ],
        manualMode: false
    }).addTo(map);
    setParent(map_browserPrint.getContainer(), document.getElementById('browserPrint_ctrl'));

}
var map_browserPrint;
var default_pagesize = "A4";
var forcebounds = true;

sel_papersize();



/* Good way to create custom control */
L.LegendControl = L.Control.extend({
    onAdd: function (map) {

        var div = L.DomUtil.create('div', 'map_legend');
        div.id = 'maplegend';

        //if (document.getElementById("chk_Maplegend").checked)
        //    div.style.display = 'block';
        //else
        //    div.style.display = 'none';


        //margin - right: 2px;
        //margin - bottom: 2px;
        //div.innerHTML = '<h4>Mapprint</h4><p>โครงการจัดทำระบบสารสนเทศภูมิศาสตร์เพื่อพัฒนาประสิทธิภาพในการบริหารงานด้านการช่างและการผังเมือง เทศบาลนครปากเกร็ด</p>';
        div.innerHTML = legend_html;
        return div;
    }
});

L.legendControl = function (options) {
    return new L.LegendControl(options);
};

// Here we are creating control to show it on the map;
L.legendControl({ position: 'bottomright' }).addTo(map);

map.on("browser-print-start", function (e) {
    /*on print start we already have a print map and we can create new control and add it to the print map to be able to print custom information */
    L.legendControl({ position: 'bottomright' }).addTo(e.printMap);
});


var legend_html = '';
function set_layer_standard_print_legend() {
    //CREATE LAYER OBJECT ------------------------------------------
    var strlyr;
    strlyr = '<div>';
    console.log('lyr_standard', lyr_standard);
    for (var i = 0; i < lyr_standard.length; i++) {

        if (lyr_standard[i].options.visible == 'true') {//check visible

            var strtmp = '';
            if (lyr_standard[i].options.src.havelegend == 'true') {
                strtmp += '<li><div class="listlayer_l"> {layer_name}</div>';
            }
            else {
                strtmp += '<li><img src="{img_src}" id="{img_id}" class="imgstyle"/><div class="listlayer"> {layer_name}</div>';//<img src="{_imglyr_}" class="imgicon" style="display:none"/>
            }

            //strtmp += '<div style="cursor:pointer;display:inline-block"> {layer_name}</div>';
            //strtmp += '<div{is_show}><div id="{node_opac}" class="nodeopac"><input id="{node_opac_ctrl}" type="range" min="1" max="100" value="{opac_val}" class="slider-layer-opac" ><br>';

            if (lyr_standard[i].options.src.havelegend == 'true') {
                strtmp += '<img src = "{img_src}" id = "{img_id}"  class="imgstyle"/>';
            };

            //strtmp += '</div></div></li>';
            strtmp += '</li>';



            strtmp = strtmp.replace('{imglyr}', 'images/icon_demo2.png');
            strtmp = strtmp.replace('{node_id}', 'lyr_std_node_' + i);
            strtmp = strtmp.replace('{layer_name}', lyr_standard[i].options.src.tblcontent);
            strtmp = strtmp.replace('{opac_val}', lyr_standard[i].options.src.tblOpacity);
            strtmp = strtmp.replace('{node_opac}', 'lyr_std_opac_node_' + i);
            strtmp = strtmp.replace('{node_opac_ctrl}', 'lyr_std_opac_ctrl_' + i);
            strtmp = strtmp.replace('{img_id}', 'lyr_std_img_' + i);

            var img_url = lyr_standard[i].options.src.tblServiceAddr + 'TRANSPARENT=true&SERVICE=WMS&REQUEST=GetLegendGraphic&VERSION=1.1.1';
            

            if (lyr_standard[i].options.src.havelegend == 'true') 
            {
                img_url += '&EXCEPTIONS=application/vnd.ogc.se_blank&LAYER={lyr_name}';
                img_url += '&FORMAT=image/png&WIDTH=24&HEIGHT=24';//FEATURETYPE&SCALE=27083.932228516387 //application/json;type=utfgrid
                img_url += '&legend_options=fontName:Kanit;fontSize:12;fontAntiAliasing:true;fontColor:0x666666;forceLabels:on;countMatched:true;';//bgColor:0xFFFFEE;fontStyle:bold;dpi:100;';
            }
            else
            {
                img_url += '&EXCEPTIONS=application/vnd.ogc.se_blank&LAYER={lyr_name}';
                img_url += '&FORMAT=image/png&WIDTH=24&HEIGHT=24';//FEATURETYPE&SCALE=27083.932228516387
                img_url = img_url.replace('{lyr_name}', lyr_standard[i].options.src.tblname);
            }
            img_url = img_url.replace('{lyr_name}', lyr_standard[i].options.src.tblname);


            strtmp = strtmp.replace('{img_src}', img_url);
            //if (lyr_standard[i].options.visible == 'true') {
            //    strtmp = strtmp.replace('{is_check}', 'checked');
            //    strtmp = strtmp.replace(/{is_show}/gi, '');
            //}
            //else {
            //    strtmp = strtmp.replace('{is_check}', '');
            //    if (isShow_only_visible_layer) {
            //        strtmp = strtmp.replace(/{is_show}/gi, ' style="display:none"');
            //    } else {
            //        strtmp = strtmp.replace(/{is_show}/gi, '');
            //    }
            //}

            strlyr = strlyr + strtmp;

        }//check visible

    }
    strlyr = strlyr + '</div>';

    legend_html = strlyr;
    document.getElementById("maplegend").innerHTML = strlyr;
    //if (document.getElementById("chk_Maplegend").checked)
    //    document.getElementById("maplegend").style.display = 'block'
    //else
    //    document.getElementById("maplegend").style.display = 'none';
}

document.getElementById("lst_print_t").addEventListener("change", function (e) {
    //console.log('sel_print_title',e,e.srcElement.selectedOptions);
    var sel = e.srcElement.selectedOptions[0];
    var str = '';
    if (sel.value == '0') {
        str = '';
    } else {
        str = sel.text;
    }
    document.getElementById('txt_print_t').value = str;
    document.getElementById('txt_print_title').value = str;
});

function lyr_srch_click(e) {
    //console.log('txt',e,document.getElementById("lyr_search_node"));
    //print_text_detail_from_ident = document.getElementById("schtextval").innerHTML;
    print_text_detail_from_ident = e.getAttribute("value");

    if (document.getElementById("txt_print_d")) {
        document.getElementById('txt_print_d').value = print_text_detail_from_ident;
        document.getElementById('txt_print_desc').value = print_text_detail_from_ident;
    } 
};

//---------------------------------------------------------------------------------------------------------------------------------
//var map_print_legend = L.control();

//map_print_legend.onAdd = function (map) {
//    this._div = L.DomUtil.create('div', 'info');
//    this.update();
//    return this._div;
//};

//map_print_legend.update = function (props) {
//    this._div.innerHTML = '<h4>Mapprint</h4><p>โครงการจัดทำระบบสารสนเทศภูมิศาสตร์เพื่อพัฒนาประสิทธิภาพในการบริหารงานด้านการช่างและการผังเมือง เทศบาลนครปากเกร็ด</p>';
//};

//map_print_legend.addTo(map);
//console.log('map_print_legend', map_print_legend);

//var map_browserPrint = L.control.browserPrint({
//    Title: 'พิมพ์แผนที่',
//    documentTitle: 'โครงการจัดทำระบบสารสนเทศภูมิศาสตร์เพื่อพัฒนาประสิทธิภาพในการบริหารงานด้านการช่างและการผังเมือง เทศบาลนครปากเกร็ด',
//    closePopupsOnPrint: false,
//    printModes: [
//        L.control.browserPrint.mode("Landscape", "<i class='fa fa-image'></i> พิมพ์แบบ Landscape", default_pagesize, customActionToPrint, forcebounds),
//        L.control.browserPrint.mode("Portrait", "<i class='far fa-file-image'></i> พิมพ์แบบ Portrait", default_pagesize, customActionToPrint, forcebounds)
//        //L.control.browserPrint.mode("Landscape", "พิมพ์แบบ Landscape ตามรูปแบบของเทศบาล", default_pagesize, customActionToPrint, forcebounds),
//        //L.control.browserPrint.mode("Portrait", "พิมพ์แบบ Portrait ตามรูปแบบของเทศบาล", default_pagesize, customActionToPrint, forcebounds),
//        //L.control.browserPrint.mode.landscape("Land scape", "A4",),
//        //"Portrait",
//        //L.control.browserPrint.mode.auto("Automatico", "B4"),
//        //L.control.browserPrint.mode.custom("Séléctionnez la zone", "B5")
//    ],
//    manualMode: false
//}).addTo(map);
//setParent(map_browserPrint.getContainer(), document.getElementById('browserPrint_ctrl'));

//var map_browserPrint = L.control.browserPrint({ position:'topleft'}).addTo(map);

//document.getElementById("leaflet-browser-print--manualMode-button").addEventListener("click", function () {

//    console.log('map_browserPrint', map_browserPrint);
//    //map_browserPrint.options.documentTitle = 'TITLE Leaflet Browser print TITLE';
//    L.control.browserPrint.mode("P1", "พิมพ์แบบ Portrait ตามรูปแบบของเทศบาล", default_pagesize, customActionToPrint, forcebounds);
//});

//window.print = function () {
//    domtoimage
//        .toPng(document.body)
//        .then(function (dataUrl) {
//            var link = document.createElement('a');
//            link.download = map.printControl.options.documentTitle || "exportedMap" + '.png';
//            link.href = dataUrl;
//            link.click();
//        });
//};

//L.control.browserPrint({
//    printModes: [
//        L.control.browserPrint.mode.auto("Download PNG"),
//        L.control.browserPrint.mode.landscape(),
//        L.control.browserPrint.mode.portrait(),
//        L.control.browserPrint.mode.auto(),
//        L.control.browserPrint.mode.custom()
//    ]
//}).addTo(map);
