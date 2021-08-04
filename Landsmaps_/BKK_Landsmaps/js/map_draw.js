
//DRAW ----------------------------------------------------------------------
var draw_layer = new L.FeatureGroup();
var draw_layer_2 = new L.FeatureGroup();
var draw_search_layer = new L.FeatureGroup();
var draw_m_line_layer = new L.FeatureGroup();
var draw_m_area_layer = new L.FeatureGroup();
var AOI_layer = new L.GeoJSON();//

map.addLayer(draw_layer);
map.addLayer(draw_layer_2);
map.addLayer(draw_m_line_layer);
map.addLayer(draw_m_area_layer);
map.addLayer(draw_search_layer);

map.addLayer(AOI_layer);

var draw_ctrl;

var seldraw_feature;
var AOI_feature;
var draw_popup;
var draw_mode = 'm';//m_line, m_area, draw, poi

select_draw_maptools('m_line');

var draw_Marker_icon= L.Icon.extend({
    options: {
        shadowUrl: null,
        iconAnchor: new L.Point(14, 14),
        iconSize: new L.Point(28, 28),
        iconUrl: 'images/poi01.png'
    }
});

var draw_pin_Icon = L.icon({
    iconUrl: 'images/poi01.png',
    iconSize: [28, 28],
    iconAnchor: [14, 14]
});

function select_draw_maptools(mode) {
    clear_map_mouse_action(null);
    map_mouse_mode = '';
    _ChangeMouseMode('');


    if (!draw_ctrl == null) map.removeControl(draw_ctrl);
    document.getElementById('draw_ctrl').innerHTML = '';
    //document.getElementById('draw_poi_ctrl').innerHTML = '';
    draw_mode = mode;
    document.getElementById('searchBufferPanel').style.display = 'none';
    //document.getElementById('pnl_ptlabel').style.display = 'none';
    switch (draw_mode) {
        case 'm_line':
            draw_ctrl = new L.Control.Draw({
                position: 'topright',
                draw: { circlemarker: false, marker: false, polygon: false, circle: false, rectangle: false },
                edit: {
                    featureGroup: draw_m_line_layer,
                    remove: true,
                },
            });
            draw_ctrl.addTo(map);
            document.getElementById('lbl_tool').innerHTML = 'เครื่องมือการวัดระยะทาง';
            document.getElementById('imgMapTools').src = 'Images/icons/48pixel/maptool/maptool_distant_48.png';
            setParent(draw_ctrl.getContainer(), document.getElementById('draw_ctrl'));
            break;
        case 'm_area':
            draw_ctrl = new L.Control.Draw({
                position: 'topright',
                draw: { circlemarker: false, marker: false, polyline: false },
                edit: {
                    featureGroup: draw_m_area_layer,
                    remove: true,
                },
            });
            draw_ctrl.addTo(map);
            document.getElementById('lbl_tool').innerHTML = 'เครื่องมือการวัดพื้นที่';
            document.getElementById('imgMapTools').src = 'Images/icons/48pixel/maptool/maptool_area_48.png';
            setParent(draw_ctrl.getContainer(), document.getElementById('draw_ctrl'));
            break;
        case 'draw':
            draw_ctrl = new L.Control.Draw({
                position: 'topright',
                draw: { 
                    circlemarker: false, polygon: false, circle: false, rectangle: false,
                    marker: {
                        icon: new draw_Marker_icon() //Here assign your custom marker
                    },
                    polyline: {
                        shapeOptions: {
			                            stroke: true,
			                            color: '#FF0000',
			                            weight: 2,
			                            opacity: 0.9,
			                            fill: false,
			                            clickable: true
		                            }
                        }
                    },
                edit: {
                    featureGroup: draw_layer,
                    remove: true//,
                    //buffer: {
                    //    replacePolylines: false,
                    //    separateBuffer: false,
                    //}
                }
            });

            draw_ctrl.addTo(map);
            document.getElementById('lbl_tool').innerHTML = 'เครื่องมือการวางจุด';
            document.getElementById('imgMapTools').src = 'Images/icons/48pixel/maptool/maptool_48.png';
            setParent(draw_ctrl.getContainer(), document.getElementById('draw_ctrl'));
            //document.getElementById('pnl_ptlabel').style.display = 'block';
            break;
        case 'draw_search':
            draw_ctrl = new L.Control.Draw({
                position: 'topright',
                draw: { circlemarker: false },
                edit: {
                    featureGroup: draw_search_layer,
                    remove: true,
                    buffer: {
                        replacePolylines: false,
                        separateBuffer: false,
                    }
                },
            });

            draw_ctrl.setDrawingOptions({
                polyline: {
                    icon: new L.DivIcon({
                        iconSize: new L.Point(10, 10),
                        className: 'leaflet-div-icon leaflet-editing-icon handleIcon01'
                    })
                },
                polygon: {
                    icon: new L.DivIcon({
                        iconSize: new L.Point(10, 10),
                        className: 'leaflet-div-icon leaflet-editing-icon handleIcon01'
                    })
                }
            });


            draw_ctrl.addTo(map);
            document.getElementById('lbl_tool').innerHTML = 'เครื่องมือการวาดพื้นที่ค้นหา';
            document.getElementById('imgMapTools').src = 'Images/icons/48pixel/maptool/maptool_draw_48.png';
            setParent(draw_ctrl.getContainer(), document.getElementById('draw_ctrl'));

            document.getElementById('searchBufferPanel').style.display = 'block';
            break;
        //case 'poi':
        //    draw_ctrl = new L.Control.Draw({
        //        position: 'topright',
        //        draw: { circlemarker: false, polygon: false, circle: false, rectangle: false, polyline: false }
        //    });
        //    draw_ctrl.addTo(map);
        //    break;
    }
};

function init_drw_poi() {
    draw_ctrl = new L.Control.Draw({
        position: 'topright',
        draw: { circlemarker: false, polygon: false, circle: false, rectangle: false, polyline: false }
    });
    draw_ctrl.addTo(map);
    //setParent(draw_ctrl.getContainer(), document.getElementById('draw_poi_ctrl'));
}

var searchPolygon_geojson;
var htmlset = 'draw marker';
var draw_marker_icon = L.divIcon({
    className: 'cam_photo_icon',
    html: htmlset
});

function measure_distance(d) {
    var unit,
        feet;

    if (measure_unit == 'imp') {
        feet = d / 0.3048;
        if (feet > 3000) {
            d = d / 1609.344;
            unit = 'mi';
        } else {
            d = feet;
            unit = 'ft';
        }
    } else {
        if (measure_unit == 'km') {
            d = d / 1000;
            unit = 'km';
        } else {
            unit = 'm';
        }
    }

    if (d < 100) {
        return d.toFixed(1) + ' ' + unit;
    } else {
        return Math.round(d) + ' ' + unit;
    }
}

function measure_area(a) {
    var unit,
        sqfeet;

    if (measure_unit == 'imp') {
        if (a > 404.685642) {
            a = a / 4046.85642;
            unit = 'ac';
        } else {
            a = a / 0.09290304;
            unit = 'ft²';
        }
    } else {
        if (measure_unit == 'km') {
            a = a / 100000;
            unit = 'km²';
        } else {
            unit = 'm²';
        }
    }

    if (a < 100) {
        return a.toFixed(1) + ' ' + unit;
    } else {
        return Math.round(a) + ' ' + unit;
    }
}

function update_measurement() {
    measure_unit = document.querySelector('input[name="m_unit"]:checked').value;

    if (draw_m_line_layer != null) {
        draw_m_line_layer.eachLayer(function (layer) {
            layer.updateMeasurements();
        });
    }
    if (draw_m_area_layer != null) {
        draw_m_area_layer.eachLayer(function (layer) {
            layer.updateMeasurements();
        });
    }
}
var measure_unit = 'm';
var draw_line_id = 0;
map.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType;
    var layer = e.layer;
    
    measure_unit = document.querySelector('input[name="m_unit"]:checked').value;


    switch (draw_mode) {
        case 'm_line':
            if (!(type === 'marker')) {
                layer.options.showMeasurements = true;
                draw_m_line_layer.addLayer(layer);

                layer._measurementOptions.imperial = true;
                layer._measurementOptions.formatDistance = measure_distance;
                layer._measurementOptions.formatArea = measure_area;
                layer.updateMeasurements();
            }
            break;
        case 'm_area':
            if (!(type === 'marker')) {
                //console.log('layer', layer);

                layer.options.showMeasurements = true;
                draw_m_area_layer.addLayer(layer);

                layer._measurementOptions.imperial = true;
                layer._measurementOptions.formatDistance = measure_distance;
                layer._measurementOptions.formatArea = measure_area;
                layer.updateMeasurements();
                //console.log('_measurementOptions', layer._measurementOptions);
                
            }

            break;
        case 'draw':
            if (type === 'marker') {
                var lat = Number(layer._latlng.lat).toFixed(5);
                var lng = Number(layer._latlng.lng).toFixed(5);
                //var strgoogle = 'http://maps.google.com/maps?q=&layer=c&cbll=' + lat + ',' + lng + '&cbp=11,0,0,0,0';

                var str = document.getElementById('txt_ptlabel').value;
                var content = '<div class="drawpinpopup" style="padding: 4px 1px 1px;">' + str + '</div>';
                content += '<div class="drawpinpopup"><i class="fas fa-map-pin"></i> ' + lat + ',' + lng + '</div>';
                //content += '<div class="drawpinpopup"><a href="{googlestreet}" target ="_blank"><i class="fas fa-street-view"></i> Street View</a></div>';
                //content = content.replace('{googlestreet}', strgoogle);
                layer.bindPopup(content, {closeOnClick: false, autoClose: false});

                layer.on('click', function (ev) {
                    layer.openPopup();
                });

                draw_layer.addLayer(layer);
            }
             if (type === 'polyline') {
                draw_line_id++;

                layer.on('click', function (ev) {
                    layer.openPopup();
                });

                //var arrowHead = L.polylineDecorator(layer, {
                //    patterns: [
                //        {offset: '100%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions: {color: '#FF0000', weight: 2, opacity: 0.9}})}
                //    ]
                //});

                var arrowHead =  L.polylineDecorator(layer, {
                    patterns: [
                        {offset: '100%', repeat: 50, symbol: L.Symbol.arrowHead({pixelSize: 15, pathOptions: {color: '#FF0000', weight: 2, opacity: 0.9}})}
                    ]
                })
                

                 //console.log('arrowHead  :', arrowHead);
                 //arrowHead.editing.disable();
                //layer.on('mouseover', function (ev) {
                //    layer.openPopup();

                //});
                //layer.on('mouseout', function (ev) {
                //    layer.closePopup();

                //});
                layer.dwline_id = draw_line_id;
                arrowHead.dwline_id = draw_line_id;
                draw_layer_2.addLayer(arrowHead);
                draw_layer.addLayer(layer);
                console.log('arrowHead  layer:', arrowHead, layer);
            }

            
            //console.log('draw_layer  :', draw_layer);
            break;

        case 'draw_search':
            searchPolygon_geojson = null;
            draw_search_layer.eachLayer(
                function (l) {
                    draw_search_layer.removeLayer(l);
                });

            //console.log('layer ', layer);
            //console.log('geoj layer ', layer.toGeoJSON());
            var geoJSON_layer = layer.toGeoJSON();
            if (type == 'circle')//make circle to polygon
            {
                var center = geoJSON_layer.geometry.coordinates;
                var radius = layer.options.radius;
                var options = { steps: 180, units: 'meters' };
                var poly = turf.circle(center, radius, options);
                geoJSON_layer = poly; 
            }

            var bufferPolygon = document.getElementById("chk_BufferDrawPolygon").checked;
            var bufferdist = document.getElementById("txt_bufferkm").value;
            var bufferunit = document.getElementById("searchBuffer_unit_sel").value;
            
            //console.log('draw input ', geoJSON_layer);
            if ((type === 'marker' || type === 'polyline') || bufferPolygon) {
                var options = { steps: 180, units: bufferunit };
                var buffered = turf.buffer(geoJSON_layer, bufferdist, options);

                searchPolygon_geojson = buffered;
                var bufferlayer = L.geoJSON(buffered);
                draw_search_layer.addLayer(bufferlayer);
            }
            else
            {
                //layer.on('click', function (ev) {
                //    var content = '';

                //    if (ev.target._radius) {
                //        //console.log(ev.target.getRadius());
                //        seldraw_feature = ev.target.toGeoJSON();
                //        seldraw_feature.properties.radius = ev.target.getRadius();
                //        seldraw_feature.properties.featuretype = 'circle';
                //    }
                //    else {
                //        seldraw_feature = ev.target.toGeoJSON();
                //        seldraw_feature.properties.featuretype = 'polygon';
                //    }
                //    var content = '<a href="#" onclick ="get_draw_AOI();map.closePopup();"><i class="fa fa-plus-circle" style="font-size:1.5em;color:#ff5f00;vertical-align: top;"></i> สร้างพื้นที่ค้นหา</a>';
                //    draw_popup = L.popup({
                //        offset: new L.Point(0, 0)
                //    })
                //        .setLatLng(ev.latlng)
                //        .setContent(content)
                //        .openOn(map);

                //});

                searchPolygon_geojson = geoJSON_layer;
                draw_search_layer.addLayer(layer);
            }

            //console.log('draw_search_layer  :', draw_search_layer);
            break;

        //case 'poi':
        //    if (type === 'marker') {
        //        console.log(layer._latlng);
        //        zoom_to_coor(layer._latlng.lat, layer._latlng.lng);
        //        show_form('t_poi_form', tpoi_form_Width);
        //        form_load('poi_form', 'poi_form.html');
        //    }
        //    break;
    }
});

map.on(L.Draw.Event.EDITED, function (e) {
    var layers = e.layers;
    //console.log('EDITED', e);
    switch (draw_mode) {
        case 'm_line':
            
            break;
        case 'm_area':
            
            break;
        case 'draw':
            layers.eachLayer(function (layer) {
                //console.log('edit layer', layer);
                if (layer instanceof L.Marker) {
                    var lat = Number(layer._latlng.lat).toFixed(5);
                    var lng = Number(layer._latlng.lng).toFixed(5);
                    var str = document.getElementById('txt_ptlabel').value;
                    var content = '<div class="drawpinpopup" style="padding: 4px 1px 1px;">' + str + '</div>';
                    content += '<div class="drawpinpopup"><i class="fas fa-map-pin"></i> ' + lat + ',' + lng + '</div>';

                    layer.bindPopup(content, {closeOnClick: false, autoClose: false});

                    layer.on('click', function (ev) {
                        layer.openPopup();
                    });
                }
            });
            break;
    }
});
map.on('draw:editvertex', function (e) {
    var layers = e.layers;
    //console.log('editvertex', e);

    switch (draw_mode) {
        case 'm_line'://L.Path
            e.poly.updateMeasurements();
            break;
        case 'm_area':
            e.poly.updateMeasurements();
            break;
        case 'draw':

             draw_layer_2.eachLayer(
                function (l) {
                     //console.log('dwline_id', l.dwline_id, e.poly.dwline_id);
                     if (l.dwline_id == e.poly.dwline_id) { 
                         //console.log('dwline_id remove', l.dwline_id, e.poly.dwline_id);
                         draw_layer_2.removeLayer(l); 
                     }
                });

            var arrowHead =  L.polylineDecorator(e.poly, {
                    patterns: [
                        {offset: '100%', repeat: 50, symbol: L.Symbol.arrowHead({pixelSize: 15, pathOptions: {color: '#FF0000', weight: 2, opacity: 0.9}})}
                    ]
                })
                arrowHead.dwline_id = e.poly.dwline_id;
                draw_layer_2.addLayer(arrowHead);
            break;
    }

});

map.on('draw:deletestop', function (e) {
        //console.log('START deletestop', e);
        switch (draw_mode) {
        case 'draw':
                draw_layer_2.eachLayer(
                function (arw) {
                    var del = true;

                    draw_layer.eachLayer(
                        function (pln) {
                            //console.log('pln',pln);
                            if (pln.dwline_id) {
                                //console.log('dwline_id remove', arw.dwline_id, pln.poly.dwline_id);
                                if (arw.dwline_id == pln.dwline_id) {

                                    del = false;
                                }
                            }
                        });

                    if(del) draw_layer_2.removeLayer(arw); 

                });
        }
});

map.on('draw:drawstart', function (e) {
    clear_map_mouse_action(null);
    map_mouse_mode = '';
    _ChangeMouseMode('');
});

map.on('draw:editstart', function (e) {
    //console.log('START EDITED', e);
    clear_map_mouse_action(null);
    map_mouse_mode = '';
    _ChangeMouseMode('');
});
//map.on(, polygon.updateMeasurements, polygon);

function onEach_AOI_Feature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
        var content = '';
        var content = '<a href="#" onclick ="remove_draw_AOI();"><i class="fa fa-minus-circle" style="font-size:1.5em;color:#ff5f00;vertical-align: top;"></i> ลบพื้นที่ค้นหา</a>';
        layer.bindPopup(content);
    }
};
var AOI_cam_id = [];

function get_draw_AOI() {
    if (seldraw_feature == null) return;

    //console.log(seldraw_feature);
    map.removeLayer(AOI_layer);
    AOI_feature = seldraw_feature;
    AOI_layer = L.geoJSON(AOI_feature, {
        style: AOI_Style,
        pointToLayer: function (feature, latlng) {
            if (feature.properties.radius) {
                return new L.Circle(latlng, feature.properties.radius);
            }
            return;
        },
        onEachFeature: onEach_AOI_Feature
    });
    //console.log(AOI_feature);
    AOI_layer.addTo(map);
    filter_cam_AOI();


}

function remove_draw_AOI() {

    if (seldraw_feature == null) return;


    map.removeLayer(AOI_layer);
    AOI_feature = null;
    filter_cam_AOI();
}

function filter_cam_AOI() {
    if (cctv_geojson == null) return;
    AOI_cam_id.length = 0;
    var n = cctv_geojson.features.length;

    if (AOI_feature == null) {
        for (var i = 0; i < n; i++) {
            cctv_geojson.features[i].properties.isShow = true;
            AOI_cam_id.push(cctv_geojson.features[i].properties.cam_id);
        }
    }
    else {
        console.log(AOI_feature);
        if (AOI_feature.properties.featuretype == 'circle') {
            var center = AOI_feature.geometry.coordinates;
            var radius = AOI_feature.properties.radius;
            var options = { steps: 180, units: 'meters' };
            var poly = turf.circle(center, radius, options);
        }
        else {
            var poly = turf.polygon(AOI_feature.geometry.coordinates);
        }




        for (var i = 0; i < n; i++) {
            var pt = turf.point(cctv_geojson.features[i].geometry.coordinates);
            var isin = turf.booleanPointInPolygon(pt, poly);
            cctv_geojson.features[i].properties.isShow = isin;
            if (isin) { AOI_cam_id.push(cctv_geojson.features[i].properties.cam_id); };
        }

    }
    render_cctv_onmap();
    render_alarm_onmap();
    cameragrid_refresh();
    alarm_display();

}

function clear_all_draw_layer() {

    draw_layer.eachLayer(
        function (l) {
            draw_layer.removeLayer(l);
        });
    draw_layer_2.eachLayer(
        function (l) {
            draw_layer_2.removeLayer(l);
        });
    draw_search_layer.eachLayer(
        function (l) {
            draw_search_layer.removeLayer(l);
        });
    draw_m_line_layer.eachLayer(
        function (l) {
            draw_m_line_layer.removeLayer(l);
        });
    draw_m_area_layer.eachLayer(
        function (l) {
            draw_m_area_layer.removeLayer(l);
        });
}