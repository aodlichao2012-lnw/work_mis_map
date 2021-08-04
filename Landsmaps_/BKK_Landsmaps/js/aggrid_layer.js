var wms_service_url = 'http://61.7.192.6:8080/geoserver/pkk/wms?';

var columnDefs;
var gridOptions;
var txt_alarm_time;
var pkk_Display_geojson

var srch_layer = '';
function lyr_grid_init(display_json) {
    columnDefs = [
        { headerName: "ID", field: "id", width: 80, hide: true },//, hide: true},
        { headerName: "ชื่อ", field: "thname", width: 200 },
        { headerName: "ที่อยู่", field: "addr", width: 200 },
        { headerName: "คำอธิบาย", field: "descriptions", width: 200 },
        { headerName: "Shape", field: "geometry", width: 100, hide: true}
        //{ headerName: "ID", field: "OBJECTID", width: 80 },
        //{ headerName: "Road Name", field: "RDLNNAME", width: 200 },
        //{ headerName: "ชื่อถนน", field: "RDLNNAMT", width: 200},
        //{ headerName: "ช่องจราจร", field: "RDLNLANE", width: 100},
        //{ headerName: "ความกว้าง", field: "RDLNWIDTH", width: 100}
        //{ headerName: "Name", field: "name", hide: true },
        //{ headerName: "brande", field: "brande", hide: true },
        //{ headerName: "model", field: "model", hide: true },
        //{ headerName: "ip", field: "ip", hide: true },
        //{ headerName: "serial", field: "serial", hide: true },
        //{ headerName: "hva_id", field: "hva_id", hide: true }
    ];

    // let the grid know which columns and what data to use
    gridOptions = {
        columnDefs: columnDefs,
        rowSelection: 'single',
        enableColResize: true,
        enableSorting: true,
        enableFilter: true,
        pagination: true,
        paginationPageSize :40,
        onSelectionChanged: onLayerSelectionChanged,
        //onRowClicked: onLayerSelectionChanged
        //onRowDoubleClicked: onLayerSelectionChanged
    };


    // lookup the container we want the Grid to use
    document.getElementById("lyr_data_grid").innerHTML = '';
    var eGridDiv = document.querySelector('#lyr_data_grid');
    // create the grid passing in the div to use together with the columns & data we want to use
    new agGrid.Grid(eGridDiv, gridOptions);

    //pkk_Display_geojson = display_json;
    //pkk_Display_filter = pkk_Display_geojson.features;//pkk_Display_geojson.features;
    lyr_grid_refresh();
 
}

function lyr_grid_refresh() {
    var rowData = [];
    var data_grid = null;

    data_grid = pkk_srclayer_geojson;
    //console.log('data_grid : ', data_grid);

    if (data_grid != null)
    {
        var data = data_grid.features;
        for (var i = 0; i < data.length; i++) {
            rowData[i] = data[i].properties;
            var geo = JSON.stringify(data[i].geometry);
            rowData[i].geometry = geo;
        }
    }
    //console.log('rowData : ', rowData);
    gridOptions.api.setRowData(rowData);
}

function filterValuePart(arr, part) {
    part = part.toLowerCase();
    return arr.filter(function (obj) {
        return Object.keys(obj.properties)
            .some(function (k) {
                return String(obj.properties[k]).toLowerCase().indexOf(part) !== -1;
            });
    });
};

//var pkk_Display_filter;
var src_lyr_name;
var src_lyr_name_display;

var pkk_srclayer_geojson = [];
//var pkk_srclayer_geojson_bld = [];

var pkk_srcLayer;
var get_search_url = 'http://61.7.192.6:9898/search_lyr';

var srclayer_point_style = {
    radius: 8,
    fillColor: "#FF0000",
    color: "#FFFFFF",
    weight: 2,
    opacity: 0.9,
    fillOpacity: 0.5
};
var srclayer_line_style = {
    color: "#FF0000",
    weight: 3,
    opacity: 0.9
};
var srclayer_polygon_style = {
    fillColor: "#FFFFFF",
    fill: true,
    color: "#FF0000",
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.5
};

function marker_display(feature, latlng) {
    if (feature.properties) {
        return L.circleMarker(latlng, srclayer_point_style);
            //if (feature.geometry.type == 'Point') {
            //    return L.circleMarker(latlng, srclayer_point_style);
            //}
            //else if (feature.geometry.type == 'MultiLineString') {
            //    return srclayer_line_style;
            //}
            //else if (feature.geometry.type == 'MultiPolygon') {
            //    return srclayer_polygon_style;
            //}
    };
};

//document.getElementById("btn_lyr_search_p").addEventListener("click", function () {
//    var keyw = document.getElementById("txt_filter_keyword").value;
//    var strjson = '{ "keyword":"' + keyw + '"}';
//    PageMethods.function_distributer('get_interest', JSON.parse(strjson), 'ret_search_interest', page_return_function);
//});

function ret_search_interest(data) {
    console.log('rt_get_bldg_shape', data);
    if (data == null) {

    }

    pkk_srclayer_geojson = data;

    var map_data = pkk_srclayer_geojson;
    if (map_data != null) {
        if (map_data.features.length > 0) {
            var t = map_data.features[0].geometry.type;
            if (t == 'Point') {
                pkk_srcLayer = L.geoJSON(map_data, {
                    pointToLayer: marker_display,
                    onEachFeature: onEach_search_Feature
                });
            }
            else if (t == 'MultiLineString') {
                pkk_srcLayer = L.geoJSON(map_data, {
                    style: srclayer_line_style,
                    onEachFeature: onEach_search_Feature
                });
            }
            else if (t == 'MultiPolygon') {
                pkk_srcLayer = L.geoJSON(map_data, {
                    style: srclayer_polygon_style,
                    onEachFeature: onEach_search_Feature
                });
            }
            map.addLayer(pkk_srcLayer);
        }
        else {
            if (map.hasLayer(pkk_srcLayer)) {
                map.removeLayer(pkk_srcLayer);
            }
        }
    }
    else {
        if (map.hasLayer(pkk_srcLayer)) {
            map.removeLayer(pkk_srcLayer);
        }
    }

    if (search_highlight != null) map.removeLayer(search_highlight);
    lyr_grid_init(data);
    onPerformLoading(false);
}



//document.getElementById("btn_lyr_search").addEventListener("click", function () { //searchclick
    
//    src_lyr_name = document.getElementById("lyr_sel").value;
//    src_lyr_name_display = $("#lyr_sel option:selected").text();

//    //console.log('layer', src_lyr_name, src_lyr_name_display);
//    if (src_lyr_name_display == '') {
//        alert('กรุณาเลือกชั้นข้อมูล');
//        return;
//    }

//    var tbname = src_lyr_name;
//    var byarea = document.getElementById("chk_search_byarea").checked;
//    var srcword = '';
//    var tam = '' ;
//    var mu = '' ;
//    var housen = '' ;

//    if (src_lyr_name == 'BLDG_PKK') 
//    {
//        tam = document.getElementById("tam_sel").value;
//        mu = document.getElementById("mu_sel").value;
//        housen = document.getElementById("txt_filter_housen").value;
//        //if (tam != '') {
//        //    tam = '%ต.' + tam;
//        //};
//        //if (mu != '') {
//        //    mu = '%ม. ' + mu;
//        //};
//        srcword = '%' + document.getElementById("txt_filter_keyword").value + '%';
//    } 
//    else 
//    {
//        srcword = document.getElementById("txt_filter_keyword").value;
//    }

//    if (pkk_srcLayer != null) {
//        map.removeLayer(pkk_srcLayer);
//        pkk_srcLayer = null;
//        pkk_srclayer_geojson = null;
//        pkk_srclayer_geojson_bld = null;
//    }
//    var search_option;

//    if (src_lyr_name == 'BLDG_PKK') 
//    {
//        if (byarea && searchPolygon_geojson != null)
//        {
//            search_option = {
//                "keyword": srcword,
//                "muu" : mu,
//                "tam" : tam,
//                "housen" : housen,
//                "polystr": searchPolygon_geojson.geometry
//            }
        
//        }
//        else
//        {
//            search_option = {
//                "keyword": srcword,
//                "muu" : mu,
//                "tam" : tam,
//                "housen" : housen
//                //"polystr": null
//            }
//        }
//    } 
//    else 
//    {
//        if (byarea && searchPolygon_geojson != null)
//        {
//            search_option = {
//                "tablename": tbname,
//                "searchkey": srcword,
//                "polystr": searchPolygon_geojson.geometry
//            }
        
//        }
//        else
//        {
//            search_option = {
//                "tablename": tbname,
//                "searchkey": srcword
//                //"polystr": null
//            }
//        }
//    }


//    console.log('search_option', search_option);
//    //console.log('search_option str',  JSON.stringify(search_option));

//    onPerformLoading(true, 'ค้นหาข้อมูล : ' + src_lyr_name_display);
    

//    if (src_lyr_name == 'BLDG_PKK') {
//        PageMethods.function_distributer('get_bldg_shape', search_option, 'ret_bldg_shape', page_return_function);
//    }
//    else 
//    {
//        $.post(get_search_url, search_option)
//            .done(function (data) {
//                //console.log('get_search_url', data);
//                pkk_srclayer_geojson = data;

//                if (pkk_srclayer_geojson.features.length > 0) {
//                    var t = pkk_srclayer_geojson.features[0].geometry.type;
//                    if (t == 'Point') {
//                        pkk_srcLayer = L.geoJSON(pkk_srclayer_geojson, {
//                            pointToLayer: marker_display,
//                            onEachFeature: onEach_search_Feature
//                        });
//                    }
//                    else if (t == 'MultiLineString') {
//                        pkk_srcLayer = L.geoJSON(pkk_srclayer_geojson, {
//                            style: srclayer_line_style,
//                            onEachFeature: onEach_search_Feature
//                        });
//                    }
//                    else if (t == 'MultiPolygon') {
//                        pkk_srcLayer = L.geoJSON(pkk_srclayer_geojson, {
//                            style: srclayer_polygon_style,
//                            onEachFeature: onEach_search_Feature
//                        });
//                    }
//                    else if (t == 'Polygon') {
//                        pkk_srcLayer = L.geoJSON(pkk_srclayer_geojson, {
//                            style: srclayer_polygon_style,
//                            onEachFeature: onEach_search_Feature
//                        });
//                    }
//                    map.addLayer(pkk_srcLayer);
//                }
//                else {
//                    if (map.hasLayer(pkk_srcLayer)) {
//                        map.removeLayer(pkk_srcLayer);
//                    }
//                }

//                lyr_grid_init(data);
//                onPerformLoading(false);
//            });
//    }


//});

function ret_bldg_shape(data) {
    console.log('rt_get_bldg_shape', data);
    if (data == null) {

    }

    pkk_srclayer_geojson_bld = data;

    var map_data = pkk_srclayer_geojson_bld.map_json;
    if (map_data != null) {
        if (map_data.features.length > 0) {
            var t = map_data.features[0].geometry.type;
            if (t == 'Point') {
                pkk_srcLayer = L.geoJSON(map_data, {
                    pointToLayer: marker_display,
                    onEachFeature: onEach_search_Feature
                });
            }
            else if (t == 'MultiLineString') {
                pkk_srcLayer = L.geoJSON(map_data, {
                    style: srclayer_line_style,
                    onEachFeature: onEach_search_Feature
                });
            }
            else if (t == 'MultiPolygon') {
                pkk_srcLayer = L.geoJSON(map_data, {
                    style: srclayer_polygon_style,
                    onEachFeature: onEach_search_Feature
                });
            }
            map.addLayer(pkk_srcLayer);
        }
        else {
            if (map.hasLayer(pkk_srcLayer)) {
                map.removeLayer(pkk_srcLayer);
            }
        }
    }
    else 
    {
        if (map.hasLayer(pkk_srcLayer)) {
            map.removeLayer(pkk_srcLayer);
        }
    }

    if (search_highlight != null) map.removeLayer(search_highlight);
    lyr_grid_init(data);
    onPerformLoading(false);
}


var lyr_search_count = 0;
var print_text_detail_from_srch = '';
function onEach_search_Feature(feature, layer) {
    // does this feature have a property named popupContent?
    //console.log('onEach_search_Feature', feature, layer);
    if (feature.properties) {

        content = '<div class="mapident">';
        content += '<div class="identcount"><b><img src="images/icon_demo2.png" class="imgheader">ดูรายละเอียดการค้นหา</b></br></div>';
        content += '<div class="listwrapper">';
        content += '<div class="identlist">';

        var lyrName = src_lyr_name;//src_lyr_name_display
        var img_url;
        var info = feature;
        var node_id = 'lyr_search_node';
        

        print_text_detail_from_srch = 'ชื่อ : ' + (info.properties.thname === null ? "-" : info.properties.thname) + '\n';
        print_text_detail_from_srch += 'ที่อยู่ : ' + (info.properties.addr === null ? "-" : info.properties.addr) + '\n';
        print_text_detail_from_srch += 'คำอธิบาย : ' + (info.properties.descriptions === null ? "-" : info.properties.descriptions);

        
        content += '<div id="{nodeid}" class="layeritem" onclick = "lyr_srch_click(this)" value = "{lyr_srch_value}">'.replace('{nodeid}', node_id).replace('{index}',0);
        content = content.replace('{lyr_srch_value}','\'' + print_text_detail_from_srch + '\'');
        //content += '<div id="schtextval" style="display:none">' + print_text_detail_from_srch + '</div>';
        //content = content.replace('{lyr_srch_click}','lyr_srch_click(\'' + print_text_detail_from_srch + '\');');

        if (info.properties.havelegend == 'true') {
            img_url = wms_service_url + 'TRANSPARENT=true&SERVICE=WMS&REQUEST=GetLegendGraphic&VERSION=1.1.1';
            img_url += '&EXCEPTIONS=application/vnd.ogc.se_blank&LAYER={lyr_name}';
            img_url += '&FORMAT=image/png&WIDTH=24&HEIGHT=24{RULE}';//FEATURETYPE&SCALE=27083.932228516387
            img_url = img_url.replace('{lyr_name}', lyrName);
            img_url = img_url.replace('{RULE}', '&rule=' + info.properties.sel_rule);

            content += '<div class="lyricon"><img src="{imgurl}" class="imglayer"></div>'.replace('{imgurl}', img_url);
        }
        else {
            img_url = wms_service_url + 'TRANSPARENT=true&SERVICE=WMS&REQUEST=GetLegendGraphic&VERSION=1.1.1';
            img_url += '&EXCEPTIONS=application/vnd.ogc.se_blank&LAYER={lyr_name}';
            img_url += '&FORMAT=image/png&WIDTH=24&HEIGHT=24';
            img_url = img_url.replace('{lyr_name}', lyrName);

            content += '<div class="lyricon"><img src="{imgurl}" class="imglayer"></div>'.replace('{imgurl}', img_url);
        }

        //lyr_standard_ident[i].layer.options.style_img_url = img_url; 

        content += '<div class="header">{lyrName}</div>'.replace('{lyrName}', lyrName);
        content += '<div class="lyricon"></div><div class="lyrinfo"><b>ชื่อ : </b>' + (info.properties.thname === null ? "-" : info.properties.thname) + '</div>';
        if (typeof info.properties.addr !== 'undefined')
            content += '<div class="lyricon"></div><div class="lyrinfo"><b>ที่อยู่ : </b>' + (info.properties.addr === null ? "-" : info.properties.addr) + '</div>';
        content += '<div class="lyricon"></div><div class="lyrinfo"><b>คำอธิบาย : </b>' + (info.properties.descriptions === null ? "-" : info.properties.descriptions) + '</div>';
        //content += '<hr/>';
        if (src_lyr_name == 'BLDG_PKK') 
        {
            //var ccoor = L.GeoJSON.coordsToLatLngs(coord[0][0]);
            //var polygon = L.polygon(ccoor, { interactive: false }) feature.geometry
            //console.log('mapident',feature, layer, p);

            //---Permit ----
            var moid = info.properties.mo_id;
            var permit_json = pkk_srclayer_geojson_bld.permit_json;

            var permit_data = permit_json.filter(function (entry) {
                return entry.mo_id === moid;
            });

            
            if (permit_data != null) {
                
                console.log('permit_data', permit_data);
                
                var strtmp = '';
                for (i = 0; i < permit_data.length; i++) {
                    var str_permit = '<a onclick="lic_form_open({id})">ใบอนุญาตเลขที่ {permit_no}</a>';
                    str_permit = str_permit.replace('{id}', permit_data[i].id);
                    str_permit = str_permit.replace('{permit_no}', permit_data[i].permit_no);
                    strtmp += str_permit;
                }

                if (permit_data.length > 0)
                {
                    content += '<div id="bldg_lic_node" class="permit_node">';
                    content += '<div class="title"><i class="far fa-file-alt"></i> ใบอนุญาติ</div>';
                    content += strtmp;
                    content += '</div><hr/>';
                }

            }
            //---Permit ----


            var p = layer.getBounds().getCenter();
            content += '<div style="text-align:center;margin-top:5px"><a href="https://www.google.com/maps/dir/?api=1&origin=13.912735,100.497957&destination={lat_lng}&travelmode=car" target = "_blank"><i class="fas fa-directions"></i> Google Maps Navigation</div>'.replace('{lat_lng}', p.lat + ',' + p.lng);
            content += '</a></div>';
        }
        content += '</div>';//layeritem

        //print_text_detail_from_ident = 'ชื่อ : ' + (info.properties.thname === null ? "-" : info.properties.thname) + '\n';
        //print_text_detail_from_ident += 'ที่อยู่ : ' + (info.properties.addr === null ? "-" : info.properties.addr) + '\n';
        //print_text_detail_from_ident += 'คำอธิบาย : ' + (info.properties.descriptions === null ? "-" : info.properties.descriptions);
        
        //if (document.getElementById("txt_print_d")) {
        //    document.getElementById('txt_print_d').value = print_text_detail_from_ident;
        //    document.getElementById('txt_print_desc').value = print_text_detail_from_ident;
        //} 


        //-----------------------------------------------------------------------------
        lyr_search_count++;
        content += '<div id="{node_detail}" class="lyrdetail wrapperdetail">'.replace('{node_detail}', 'lyr_detail_search_' );//+ lyr_search_count
        content += '<div class="accordion2">รายละเอียด</div>';
        content += '<div class="panel2">';

        var prop = feature.properties;
        var key = Object.keys(prop);

        for (var i in key) {
            var str = '<div class="lyrlabel"><b>{key}</b></div><div class="lyrinfo2">{value}</div>'.replace('{key}', key[i]);
            str = str.replace('{value}', (prop[key[i]] === null ? "-" : prop[key[i]]));
            content += str;
        }

        content += '</div>';
        content += '</div>';
        //-----------------------------------------------------------------------------



        content += "</div>";//identlist
        content += "</div>";//listwrapper
        content += "</div>";//mapident

        layer.bindPopup(content, { maxWidth: 800, autoPanPaddingTopLeft: [0, 40] });
        if (document.getElementById("chk_search_poi_label").checked) //bl_housen
            layer.bindTooltip(info.properties.bl_housen, { permanent: true, className: "marker_label01", direction :'center'});
            //layer.bindTooltip(info.properties.displaylabel, { permanent: true, className: "marker_label01", direction :'center'});//offset: [0, 0]
        //_init_lyr_search_popup('lyr_detail_search_'); //+ lyr_search_count
    }
};


function _init_lyr_search_popup(node) {

    var acc = document.getElementById(node).getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {

            this.classList.toggle("active");
            var panel = this.nextElementSibling;

            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                panel.style.display = 'none';
                document.getElementById(node).style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.style.display = 'inline-block';
                document.getElementById(node).style.maxHeight = (window.innerHeight - 300) + "px";
            }
        });
    }
};



document.getElementById("btn_lyr_clear_search").addEventListener("click", function () {
    //pkk_Display_filter = pkk_Display_geojson.features;
    if (search_highlight != null) map.removeLayer(search_highlight);
    if (pt_pdm_search != null) map.removeLayer(pt_pdm_search);

    draw_pdm_layer.eachLayer(
    function (l) {
        draw_pdm_layer.removeLayer(l);
    });

    if (map.hasLayer(pkk_srcPandemic)) {
        map.removeLayer(pkk_srcPandemic);
    }


    if (map.hasLayer(pkk_srcLayer)) {
        map.removeLayer(pkk_srcLayer);
    }

    pkk_srcPandemic = null;
    pkk_srcLayer = null;
    pkk_srclayer_geojson = null;
    pkk_srclayer_geojson_bld = null;
    lyr_grid_refresh();
});

var src_zoomlv = 17;
var search_highlight;

function onLayerSelectionChanged(event) { //gridclick
    //console.log(event);
    if (search_highlight != null) map.removeLayer(search_highlight);
    if (pt_pdm_search != null) map.removeLayer(pt_pdm_search);
    pt_pdm_search = null;

    var selectedRows = gridOptions.api.getSelectedRows();
    var selectedRowsString = '';
    var selectednode = gridOptions.api.getSelectedNodes()[0].id;

    selectedRows.forEach(function (selectedRow, index) {

        selectedRowsString += selectedRow.geometry;
        var geo = JSON.parse(selectedRowsString);
        var coord = geo.coordinates;
        //console.log('coord', coord);

        search_highlight = new L.GeoJSON();
        pt_pdm_search = new L.GeoJSON();

        if (geo.type == 'Point') {
            var p = L.GeoJSON.coordsToLatLng(coord);

            //console.log("p:", p);

            //search_highlight = new L.GeoJSON(geo, { interactive: false });
            //search_highlight.addTo(map);

            //search_highlight = new L.GeoJSON(geo, { interactive: false });
            //search_highlight.addTo(map);

            pt_pdm_search = L.marker(p, { icon: pdm_pin_Icon }).addTo(map);
            get_pandemic_search();
            document.getElementById('frmMainModal').style.display = "none";
        }
        else if (geo.type == 'MultiLineString') {
            var ccoor = L.GeoJSON.coordsToLatLngs(coord[0]);
            var pline = L.polyline(ccoor, { interactive: false })
            var p = pline.getBounds().getCenter();

            search_highlight = pline;
            search_highlight.addTo(map);
        }
        else if (geo.type == 'MultiPolygon') {
            var ccoor = L.GeoJSON.coordsToLatLngs(coord[0][0]);
            var polygon = L.polygon(ccoor, { interactive: false })
            var p = polygon.getBounds().getCenter();

            search_highlight = polygon;
            search_highlight.addTo(map);
        }
        else if (geo.type == 'Polygon') {
            var ccoor = L.GeoJSON.coordsToLatLngs(coord[0]);
            var polygon = L.polygon(ccoor, { interactive: false })
            var p = polygon.getBounds().getCenter();

            search_highlight = polygon;
            search_highlight.addTo(map);
        }

        var zm = map.getZoom();
        if (geo.type == 'MultiPolygon' || geo.type == 'Polygon') {
            map.panTo(recenter_map(p, tMapsearch_Width / 2, 0));
        }
        else {
            //console.log("window width:", window.innerWidth);
            var w_wdt = window.innerWidth;
            if (zm < src_zoomlv) {
                map.panTo(recenter_map(p, 0, 0));
                setTimeout(function () {
                    map.setZoom(src_zoomlv);
                    //if (w_wdt - tMapsearch_Width < 200) {
                    //    map.panTo(recenter_map(p, 0, 0));
                    //}
                    //else {
                    //    map.panTo(recenter_map(p, tMapsearch_Width / 2, 0));
                    //}
                }, 800);
            } else {
                map.panTo(recenter_map(p, 0, 0));
                //if (w_wdt - tMapsearch_Width < 200) {
                //    map.panTo(recenter_map(p, 0, 0));
                //}
                //else {
                //    map.panTo(recenter_map(p, tMapsearch_Width / 2, 0));
                //}
            }
        }
        //map.setZoom(src_zoomlv);
        //map.setView(recenter_map(p, tMapsearch_Width / 2, 0), src_zoomlv);
        
        //setTimeout(function () {
        //    map.setZoom(src_zoomlv);
        //    gridOptions.api.ensureIndexVisible(parseInt(selectednode));
        //    //if (search_highlight != null) map.removeLayer(search_highlight);
        //}, 800);
        

        //display_cameradetail(selectedRow);
        //Toggle_panel('camera_detail', tcamera_detail);
        //console.log('id', selectedRowsString);
        

    });
}

function selectrow_camera(cam_id) {
    gridOptions.api.forEachNode(function (node) {
        if (node.data.cam_id === cam_id) {
            node.setSelected(true);
        }
    });
    onLayerSelectionChanged(null);
}

function selectrow_alarm(cam_id, alarmid) {
    //Toggle_panel('camera_detail', 0);
    gridOptions.api.forEachNode(function (node) {
        if (node.data.cam_id === cam_id) {
            node.setSelected(true);
        }
    });
    onLayerSelectionChanged(null);
    //setTimeout(function () {

    //}, 50);
}

function display_cameradetail(selectedRow) {
    

    document.getElementById("cam_alarm_time").innerHTML = txt_alarm_time;
    document.getElementById("cam_name").innerHTML = selectedRow.cam_id;
    document.getElementById("cam_place").innerHTML = selectedRow.place;
    document.getElementById("cam_brande").innerHTML = selectedRow.brande;
    document.getElementById("cam_model").innerHTML = selectedRow.model;
    document.getElementById("cam_ip").innerHTML = selectedRow.ip;
    document.getElementById("cam_serial").innerHTML = selectedRow.serial;

    var html_temp = '<div class="cardlist01"><div class="alarm_img_container01" onclick="alarm_video_popup_show({alarmid})">';
    html_temp += '<img src="{imgurl}" /><a href="#"><span class="fa fa-play-circle-o fa-5x"></span></a></div>';
    html_temp +=  '<div class="cardtitle"><p><b>{alarmname} : </b>&nbsp;Time {time}</p></div></div>';

    var htmlcardlist ='';
    var tmp1 = '';

    if (alarm_json_all == null) return;
    //console.log('camera_alarm_json not null  : ' + JSON.stringify(alarm_json_all.data.rows));

    var this_cam_alarm = alarm_json_all.data.rows.filter(function (entry) {
        return entry.cam_id === selectedRow.cam_id;
    });

    //console.log('this_cam_alarm : ' + this_cam_alarm);
    var data = this_cam_alarm;
    var n = data.length;
    
    for (var i = 0; i < n-1; i++)
    {
        var dt = new Date(parseInt(data[i].timestamputc));
        var dnow = datetostring(dt);
        var imgurl = alarm_image_server + dt.getFullYear() + '/' + formatnum((dt.getMonth() + 1), 2) + '/' + formatnum(dt.getDate(), 2) + '/' + data[i].alarmid + '.png';

        tmp1 = html_temp;
        tmp1 = tmp1.replace('{alarmid}', data[i].alarmid);
        tmp1 = tmp1.replace('{imgurl}', imgurl);
        tmp1 = tmp1.replace('{alarmname}', 'Alarm : ' + data[i].alarmid);
        tmp1 = tmp1.replace('{time}', dnow);

        htmlcardlist += tmp1;
    }
    
    toggle_notify(false);
    document.getElementById("alarm_cardlist").innerHTML = htmlcardlist;

}

function search_detail_popup_show(index) {
    var lyrdetail = lyr_search_ident[index];
    if (lyrdetail == null) return;

    //console.log("lyrdetail", lyrdetail);
    var lyrName = lyrdetail.layer.options.layerName;
    var img_url = lyrdetail.layer.options.style_img_url;
    var info = lyrdetail.data.features[0];

    var title = '<img src="images/icon_demo2.png" class="image_lyr_detail"> {name}'.replace('{name}', (info.properties.thname === null ? "-" : info.properties.thname));

    content = '<div class="lyrdetail">';
    content += '<div class="listwrapper">';
    content += '<div class="identlist">';

    content += '<div class="layeritem"">';
    content += '<div class="lyricon"><img src="{imgurl}" class="imglayer"></div>'.replace('{imgurl}', img_url); //info.id 
    content += '<div class="header">{lyrName}</div>'.replace('{lyrName}', lyrName);

    content += '<div class="lyricon"></div><div class="lyrinfo"><b>ชื่อ : </b>' + (info.properties.thname === null ? "-" : info.properties.thname) + '</div>';
    if (typeof info.properties.addr !== 'undefined')
        content += '<div class="lyricon"></div><div class="lyrinfo"><b>ที่อยู่ : </b>' + (info.properties.addr === null ? "-" : info.properties.addr) + '</div>';
    content += '<div class="lyricon"></div><div class="lyrinfo"><b>คำอธิบาย : </b>' + (info.properties.descriptions === null ? "-" : info.properties.descriptions) + '</div>';
    content += '</div>';

    lyr_detail_popup_count++;
    content += '<div id="{node_detail}" class="wrapperdetail">'.replace('{node_detail}', 'lyr_detail_popup_' + lyr_detail_popup_count);
    content += '<div class="accordion">รายละเอียด</div>';
    content += '<div class="panel">';

    var prop = lyrdetail.data.features['0'].properties;
    var key = Object.keys(prop);
    //console.log("prop", prop, key);


    for (var i in key) {
        var str = '<div class="lyrlabel"><b>{key}</b></div><div class="lyrinfo2">{value}</div>'.replace('{key}', key[i]);
        str = str.replace('{value}', (prop[key[i]] === null ? "-" : prop[key[i]]));
        content += str;
    }

    content += '</div>';
    content += '</div>';


    content += '</div>';
    content += '</div>';


    //content += '<div><a href="https://www.google.com/maps/dir/13.912585/@{lat_lng}">Google map</div>'.replace('{lat_lng}', lyrdetail.latlng.lat + ',' + lyrdetail.latlng.lng);
    content += '</div>';

    //console.log(title, content);
    lyr_detail_popup = L.control.window(map, { title: title, content: content });
    lyr_detail_popup.on('show', function (e) { _init_lyr_detail_popup('lyr_detail_popup_' + lyr_detail_popup_count) });
    lyr_detail_popup.show('center_up');
}

//var lyr_search_ident = [];
//var lyr_search_ident_count = 0;
//var showResults_SEARCH = L.Util.bind(showGetFeatureInfo_SEARCH, null);

//function _SEARCHIdent(evt) {

//    var lyr_src = L.tileLayer.wms(wms_service_url, {
//        layers: src_lyr_name,
//        format: 'image/png',
//        transparent: true,
//        attribution: "Search"
//    });

//    var i = lyr_std_count;
//    var wms_layer = lyr_src;
//    var url = getFeatureInfoUrl(evt.latlng, lyr_src._url, wms_layer);

//    //console.log("poi ident wms_layer", wms_layer);
//    if (lyr_src) {
//        $.ajax({
//            url: url,
//            success: function (data, status, xhr) {

//                var err = typeof data === 'string' ? null : data;
//                //console.log("poi ident data", data);
//                //showResults(err, evt.latlng, data);
//                if (data != null && data.numberReturned > 0) {

//                    var ident = {
//                        "latlng": evt.latlng,
//                        "layer": wms_layer,
//                        "data": data
//                    }
//                    //console.log("poi ident", ident);
//                    lyr_search_ident[0] = ident;
//                    showResults_SEARCH(err, evt.latlng, lyr_search_ident);
//                }

//            },
//            error: function (xhr, status, error) {
//                showResults_SEARCH(error);
//            },
//        });

//    }
//};

//function showGetFeatureInfo_SEARCH(err, latlng, content) {
//    //console.log('lyr_search_ident content', lyr_search_ident);
//    //if (err) { console.log(err); return; } // do nothing if there's an error
//    // Otherwise show the content in a popup, or something.
//    console.log('lyr_search_ident content', lyr_search_ident);

//    content = '<div class="mapident">';
//    if (lyr_search_ident.length > 0) {
//        content += '<div class="identcount"><b><img src="images/icon_demo2.png" class="imgheader">ดูรายละเอียดการค้นหา</b></br></div>';
//        content += '<div class="listwrapper">';
//        content += '<div class="identlist">';
//        for (var i = 0; i < lyr_search_ident.length; i++) {
//            var lyrName = lyr_search_ident[i].layer.options.layerName;
//            var img_url;
//            var info = lyr_search_ident[i].data.features[0];
//            var node_id = 'lyr_ident_' + i;

//            content += '<div id="{nodeid}" class="layeritem" onclick ="search_detail_popup_show({index})">'.replace('{nodeid}', node_id).replace('{index}', i);

//            img_url = wms_service_url + 'TRANSPARENT=true&SERVICE=WMS&REQUEST=GetLegendGraphic&VERSION=1.1.1';
//            img_url += '&EXCEPTIONS=application/vnd.ogc.se_blank&LAYER={lyr_name}';
//            img_url += '&FORMAT=image/png&WIDTH=24&HEIGHT=24';
//            img_url = img_url.replace('{lyr_name}', 'mo_poi');

//            content += '<div class="lyricon"><img src="{imgurl}" class="imglayer"></div>'.replace('{imgurl}', img_url);

//            lyr_search_ident[i].layer.options.style_img_url = img_url;

//            content += '<div class="header">{lyrName}</div>'.replace('{lyrName}', lyrName);
//            content += '<div class="lyricon"></div><div class="lyrinfo"><b>ชื่อ : </b>' + (info.properties.thname === null ? "-" : info.properties.thname) + '</div>';
//            if (typeof info.properties.addr !== 'undefined')
//                content += '<div class="lyricon"></div><div class="lyrinfo"><b>ที่อยู่ : </b>' + (info.properties.addr === null ? "-" : info.properties.addr) + '</div>';
//            content += '<div class="lyricon"></div><div class="lyrinfo"><b>คำอธิบาย : </b>' + (info.properties.descriptions === null ? "-" : info.properties.descriptions) + '</div>';
//            //content += '<hr/>';

//            content += '</div>';
//        }
//        content += "</div>";
//        content += "</div>";



//    }
//    else {
//        content += '<b><img src="images/icon_demo2.png" class="imgheader"> ไม่พบข้อมูล </b></br>';
//    }
//    content += "</div>";



//    if (content != null || content != '') {
//        lyr_std_ident_popup = L.popup({ maxWidth: 800, autoPanPaddingTopLeft: [0, 40] })
//            .setLatLng(latlng)
//            .setContent(content)
//            .openOn(map);
//    }
//};




//map.on('click', function (evt) {


//    if (map_mouse_mode == 'SEARCH_IDENT') {
//        console.log(evt);
//        _SEARCHIdent(evt);
//        return;
//    };

//});