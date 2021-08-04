

//CAMERA GRID----------------------------------------------------------------------
// specify the columns

var columnDefs;
var grid_poi_Options;

function poi_grid_init(display_json) {
    if (pkk_login.sys_permission_id == '13') {
        columnDefs = [
            { headerName: "", field: "id", width: 80, cellRenderer: cell_POI_Edit_RendererFunc, resizable: false },
            { headerName: "ID", field: "id", width: 80, hide: true },//, hide: true},
            { headerName: "ชื่อ", field: "thname", width: 300 },
            { headerName: "ที่อยู่", field: "addr", width: 200 },
            { headerName: "คำอธิบาย", field: "descriptions", width: 200 },
            { headerName: "Shape", field: "geometry", width: 300, hide: true }
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
    } else {
        columnDefs = [
            { headerName: "", field: "id", width: 40, cellRenderer: cell_POI_Edit_RendererFunc, resizable: false},
            { headerName: "ID", field: "id", width: 80, hide: true },//, hide: true},
            { headerName: "ชื่อ", field: "thname", width: 300 },
            { headerName: "ที่อยู่", field: "addr", width: 200 },
            { headerName: "คำอธิบาย", field: "descriptions", width: 200 },
            { headerName: "Shape", field: "geometry", width: 300, hide: true }
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

    }
    // let the grid know which columns and what data to use
    grid_poi_Options = {
        columnDefs: columnDefs,
        rowSelection: 'single',
        enableColResize: true,
        enableSorting: true,
        enableFilter: true,
        pagination: true,
        paginationPageSize: 40,
        onSelectionChanged: onPOISelectionChanged,
        onRowClicked: onPOISelectionChanged
        //onRowDoubleClicked: onSelectionChanged
    };


    // lookup the container we want the Grid to use
    document.getElementById("poi_data_grid").innerHTML = '';
    var eGridDiv = document.querySelector('#poi_data_grid');
    // create the grid passing in the div to use together with the columns & data we want to use
    new agGrid.Grid(eGridDiv, grid_poi_Options);

    //pkk_Display_geojson = display_json;
    //pkk_Display_filter = pkk_Display_geojson.features;//pkk_Display_geojson.features;
    poi_grid_refresh();

}

function cell_POI_Edit_RendererFunc(params) {
    //console.log('pkk_login',pkk_login);
    var id = params.value;
    var btn = '<button type="button" title="ดูข้อมูล" onclick="poi_detail_popup_show_grid({id})" class="button05" style="margin-right:5px" ><i class="fas fa-info-circle"></i></button>';
    btn = btn.replace('{id}', id);

    if (pkk_login.sys_permission_id == '13') {
        btn += '<button type="button" title="แก้ไขข้อมูล" type="button" onclick="poi_form_open({id})" class="button05"><i class="fa fa-edit"></i></button>';//
        btn = btn.replace('{id}', id);
        btn += '<button type="button" title="ลบข้อมูล" type="button" onclick="onRemoveSelected_poi({id})" class="button06"><i class="fas fa-trash-alt"></i></button>';
        btn = btn.replace('{id}', id);
    }
    
    return btn;
}


function onRemoveSelected_poi(id) {
    grid_poi_Options.api.forEachNode(function (node) {
        if (node.data.id === id) {
            node.setSelected(true);
        }
    });
    var selectedData = grid_poi_Options.api.getSelectedRows();
    //console.log('selectedData', selectedData);
    var del_id = selectedData['0'].id.toString();;//res.remove['0'].data.id;
    var del_name = selectedData['0'].thname;//res.remove['0'].data.thname;

    var del_option = {
        "tbname": "mo_poi",
        "rid": del_id
    }
    //console.log('del_option', del_option);
    var r = confirm("ต้องการลบข้อมูล [" + del_name + "]");
    if (r == true) {

        $.post('http://61.7.192.6:8999/rm_id_table', del_option)
            .done(function (data) {
                var res = grid_poi_Options.api.updateRowData({ remove: selectedData });
                poi_grid_display('search');
            });
    }
    else
    {
    }
}


function poi_grid_refresh() {
    var rowData = [];
    if (pkk_search_poiLayer_geojson != null) {
        var data = pkk_search_poiLayer_geojson.features;
        for (var i = 0; i < data.length; i++) {
            rowData[i] = data[i].properties;
            var geo = JSON.stringify(data[i].geometry);
            rowData[i].geometry = geo;
        }
    }
    //console.log('rowData : ', rowData);
    grid_poi_Options.api.setRowData(rowData);
}

//function filterValuePart(arr, part) {
//    part = part.toLowerCase();
//    return arr.filter(function (obj) {
//        return Object.keys(obj.properties)
//            .some(function (k) {
//                return String(obj.properties[k]).toLowerCase().indexOf(part) !== -1;
//            });
//    });
//};

//var pkk_Display_filter;
var src_lyr_name;
var src_lyr_name_display;
var pkk_search_poiLayer_geojson = [];
var pkk_search_poiLayer;
var get_search_url = 'http://61.7.192.6:9898/search_lyr';
var poi_point_style = {
    radius: 8,
    fillColor: "#FF5500",
    color: "#FFFFFF",
    weight: 2,
    opacity: 0.9,
    fillOpacity: 0.5
};


var poi_pin_Icon = L.icon({
    iconUrl: 'images/poi01.png',
    iconSize: [28, 28],
    iconAnchor: [14, 14]
});
//var srclayer_line_style = {
//    color: "#FF0000",
//    weight: 3,
//    opacity: 0.9
//};
//var srclayer_polygon_style = {
//    fillColor: "#FFFFFF",
//    fill: true,
//    color: "#FF0000",
//    weight: 1,
//    opacity: 0.8,
//    fillOpacity: 0.5
//};
function POI_marker_display(feature, latlng) {
    if (feature.properties) {
        return L.circleMarker(latlng, poi_point_style);
        //return L.marker(latlng, { icon: poi_pin_Icon});
    };
};

document.getElementById("btn_poi_search").addEventListener("click", function () { poi_grid_display('search'); });
document.getElementById("btn_poi_showall").addEventListener("click", function () { poi_grid_display('all'); });

function poi_grid_display(mode) { //searchclick
    src_lyr_name = "mo_poi";
    src_lyr_name_display = "จุดสนใจ";
    var tbname = src_lyr_name;
    var srcword;
    var byarea = document.getElementById("chk_search_poi_byarea").checked;

    if (mode == 'all') {
        document.getElementById("txt_poi_filter_keyword").value = '';
        srcword = '';
    } else if (mode == 'search') {
        srcword = document.getElementById("txt_poi_filter_keyword").value;
    }



    //console.log('params', tbname, srcword);
    if (pkk_search_poiLayer != null) {
        map.removeLayer(pkk_search_poiLayer);
        pkk_search_poiLayer = null;
        pkk_search_poiLayer_geojson = null;
    }
    var search_option;


    if (byarea && searchPolygon_geojson != null) {
        //console.log('searchPolygon_geojson', JSON.stringify(searchPolygon_geojson.geometry));
        search_option = {
            "tablename": tbname,
            "searchkey": srcword,
            "polystr": searchPolygon_geojson.geometry//JSON.stringify(searchPolygon_geojson.geometry)
        }

    }
    else {
        search_option = {
            "tablename": tbname,
            "searchkey": srcword
        }
    }

    //console.log('search_option', search_option);
    $.post(get_search_url, search_option)
        .done(function (data) {
            pkk_search_poiLayer_geojson = data;
            //console.log('pkk_search_poiLayer_geojson', pkk_search_poiLayer_geojson);
            if (pkk_search_poiLayer_geojson.features.length > 0) {
                var t = pkk_search_poiLayer_geojson.features[0].geometry.type;
                if (t == 'Point') {
                    pkk_search_poiLayer = L.geoJSON(pkk_search_poiLayer_geojson, {
                        pointToLayer: POI_marker_display,
                        onEachFeature: onEach_POI_Feature
                    });
                }
                else if (t == 'MultiLineString') {
                    pkk_search_poiLayer = L.geoJSON(pkk_search_poiLayer_geojson, {
                        style: srclayer_line_style,
                        onEachFeature: onEach_POI_Feature
                    });
                }
                else if (t == 'MultiPolygon') {
                    pkk_search_poiLayer = L.geoJSON(pkk_search_poiLayer_geojson, {
                        style: srclayer_polygon_style,
                        onEachFeature: onEach_POI_Feature
                    });
                }

                
                map.addLayer(pkk_search_poiLayer);
            }
            else {
                if (map.hasLayer(pkk_search_poiLayer)) {
                    map.removeLayer(pkk_search_poiLayer);
                }
            } //alert('ไม่มีข้อมูลพิกัดที่ตั้ง');

            poi_grid_init(data);
        });
};

var POI_search_count = 0;
function onEach_POI_Feature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {

        content = '<div class="mapident">';
        content += '<div class="identcount"><b><img src="images/icon_demo2.png" class="imgheader">ดูรายละเอียดการค้นหา</b></br></div>';
        content += '<div class="listwrapper">';
        content += '<div class="identlist">';

        var lyrName = src_lyr_name;//src_lyr_name_display
        var img_url;
        var info = feature;
        var node_id = 'lyr_search_node';

        content += '<div id="{nodeid}" class="layeritem">'.replace('{nodeid}', node_id).replace('{index}', 0);
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
        content += '</div>';//layeritem


        //-----------------------------------------------------------------------------
        lyr_search_count++;
        content += '<div id="{node_detail}" class="lyrdetail wrapperdetail">'.replace('{node_detail}', 'lyr_detail_search_');//+ lyr_search_count
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
        //layer.bindTooltip(info.properties.thname, { permanent: true, className: "marker_label01", offset: [0, 0] });
        //console.log('layer', layer);
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



document.getElementById("btn_poi_clear_search").addEventListener("click", function () {
    //pkk_Display_filter = pkk_Display_geojson.features;

    if (search_poi_highlight != null) {
        if (map.hasLayer(search_poi_highlight)) {
            map.removeLayer(search_poi_highlight);
        }
    }

    if (pkk_search_poiLayer != null) {
        if (map.hasLayer(pkk_search_poiLayer)) {
            map.removeLayer(pkk_search_poiLayer);
        }
    }

    pkk_search_poiLayer = null;
    pkk_search_poiLayer_geojson = null;

    clear_poi_ident_marker();
    poi_grid_refresh();
});

var poi_zoomlv = 18;
var search_poi_highlight;

function onPOISelectionChanged(event) { //gridclick
    //console.log(event);
    if (search_poi_highlight != null) map.removeLayer(search_poi_highlight);

    var selectedRows = grid_poi_Options.api.getSelectedRows();
    var selectedRowsString = '';
    //var selectednode = grid_poi_Options.api.getSelectedNodes()[0].id;

    selectedRows.forEach(function (selectedRow, index) {

        if (search_poi_highlight != null) {
            if (map.hasLayer(search_poi_highlight)) {
                map.removeLayer(search_poi_highlight);
            }
        }

        selectedRowsString += selectedRow.geometry;
        var geo = JSON.parse(selectedRowsString);
        var coord = geo.coordinates;

        search_poi_highlight = new L.GeoJSON();
        if (geo.type == 'Point') {
            var p = L.GeoJSON.coordsToLatLng(coord);

            search_poi_highlight = new L.GeoJSON(geo, { interactive: false });
            search_poi_highlight.addTo(map);
            
        }
        else if (geo.type == 'MultiLineString') {
            var ccoor = L.GeoJSON.coordsToLatLngs(coord[0]);
            var pline = L.polyline(ccoor, { interactive: false })
            var p = pline.getBounds().getCenter();

            search_poi_highlight = pline;
            search_poi_highlight.addTo(map);
        }
        else if (geo.type == 'MultiPolygon') {
            var ccoor = L.GeoJSON.coordsToLatLngs(coord[0][0]);
            var polygon = L.polygon(ccoor, { interactive: false })
            var p = polygon.getBounds().getCenter();

            search_poi_highlight = polygon;
            search_poi_highlight.addTo(map);
        }

        //map.setZoom(poi_zoomlv);
        //map.setView(recenter_map(p, tMappoi_Width / 2, 0), poi_zoomlv);

        var zm = map.getZoom();
        if (zm < poi_zoomlv) 
        {
            map.setZoom(poi_zoomlv);
            setTimeout(function () { 
                map.panTo(recenter_map(p, tMappoi_Width / 2, 0));
            }, 800);
        } else {
            map.panTo(recenter_map(p, tMappoi_Width / 2, 0));
        }
    });
}

function clear_poi_ident_marker() {
    if (map.hasLayer(search_poi_highlight)) {
        map.removeLayer(search_poi_highlight);
    }

    search_poi_highlight = null;
};

function poi_detail_popup_show_grid(id) {
    //console.log('pkk_search_toxicLayer_geojson', pkk_search_toxicLayer_geojson, index);

    grid_poi_Options.api.forEachNode(function (node) {
        if (node.data.id === id) {
            node.setSelected(true);
        }
    });

    var selectedRows = grid_poi_Options.api.getSelectedRows();
    var lyrdetail = selectedRows[0];
    if (lyrdetail == null) return;

    //console.log("lyrdetail", lyrdetail);
    var lyrName = 'จุดสนใจ';
    var img_url = 'Images/icons/48pixel/mapbase_48.png';
    var info = lyrdetail;

    var title = '<img src="Images/icons/48pixel/mapbase_48.png" class="image_lyr_detail"> {name}'.replace('{name}', (info.thname === null ? "-" : info.thname));

    content = '<div class="lyrdetail">';
    content += '<div class="listwrapper">';
    content += '<div class="identlist">';

    content += '<div class="layeritem"">';
    content += '<div class="lyricon"><img src="{imgurl}" class="imglayer"></div>'.replace('{imgurl}', img_url); //info.id 
    content += '<div class="header">{lyrName}</div>'.replace('{lyrName}', lyrName);

    content += '<div class="lyricon"></div><div class="lyrinfo"><b>ชื่อ : </b>' + (info.thname === null ? "-" : info.thname) + '</div>';
    if (typeof info.addr !== 'undefined')
        content += '<div class="lyricon"></div><div class="lyrinfo"><b>ที่อยู่ : </b>' + (info.addr === null ? "-" : info.addr) + '</div>';
    content += '<div class="lyricon"></div><div class="lyrinfo"><b>คำอธิบาย : </b>' + (info.descriptions === null ? "-" : info.descriptions) + '</div>';
    content += '</div>';

    lyr_detail_popup_count++;
    content += '<div id="{node_detail}" class="wrapperdetail">'.replace('{node_detail}', 'lyr_detail_popup_' + lyr_detail_popup_count);
    content += '<div class="accordion">รายละเอียด</div>';
    content += '<div class="panel">';

    var prop = lyrdetail;
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
    lyr_detail_popup.on('hide', function (e) { clear_poi_ident_marker(); });
    lyr_detail_popup.show('center_up');
}

