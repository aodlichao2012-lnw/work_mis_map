

//CAMERA GRID----------------------------------------------------------------------
// specify the columns

var columnDefs;
var gridOptions;
var txt_alarm_time;
var pkk_Display_geojson


var pkk_ROADCL_L_url = 'geojson/ROADCL_L.geojson';
var pkk_ROADCL_L_geojson = [];
$.getJSON(pkk_ROADCL_L_url, function (json) {
    pkk_ROADCL_L_geojson = json;
    //pkk_ROADCL_L = L.geoJSON(pkk_ROADCL_L_geojson, {
    //    style: road_style
    //});
    console.log(pkk_ROADCL_L_geojson);
    lyr_grid_init(pkk_ROADCL_L_geojson);
});

function lyr_grid_init(display_json) {
    columnDefs = [
        { headerName: "ID", field: "id", width: 80 },
        { headerName: "ชื่อถนน", field: "addr", width: 200 },
        { headerName: "คำอธิบาย", field: "descriptions", width: 200 },
        { headerName: "ชนิด", field: "rc_mat", width: 100 },
        //{ headerName: "ความกว้าง", field: "RDLNWIDTH", width: 100 }
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
        paginationPageSize :40
        //onSelectionChanged: onSelectionChanged
    };


    // lookup the container we want the Grid to use
    var eGridDiv = document.querySelector('#lyr_data_grid');
    // create the grid passing in the div to use together with the columns & data we want to use
    new agGrid.Grid(eGridDiv, gridOptions);

    pkk_Display_geojson = display_json;
    pkk_Display_filter = pkk_Display_geojson.features;
    lyr_grid_refresh();
 
}

function lyr_grid_refresh() {
    var data = pkk_Display_filter;
    var rowData = [];

    for (var i = 0; i < data.length; i++) {
        rowData[i] = data[i].properties;
        //var chk = AOI_cam_id.indexOf(data[i].properties.cam_id);
        //if (chk >= 0) { rowData[i] = data[i].properties; };
    }

    gridOptions.api.setRowData(rowData);
}

function filterValuePart(arr, part) {
    part = part.toLowerCase();
    return arr.filter(function (obj) {
        //console.log('obj : ', obj);
        return Object.keys(obj.properties)
            .some(function (k) {
                //console.log('k : ', k);
                //console.log('obj[k] : ', obj.properties[k]);
                return String(obj.properties[k]).toLowerCase().indexOf(part) !== -1;
            });
    });
};

var pkk_Display_filter;

document.getElementById("btn_lyr_search").addEventListener("click", function () {
    pkk_Display_filter = filterValuePart(pkk_Display_filter, document.getElementById("txt_filter_keyword").value);
    lyr_grid_refresh();
});

document.getElementById("btn_lyr_clear_search").addEventListener("click", function () {
    pkk_Display_filter = pkk_Display_geojson.features;
    lyr_grid_refresh();
});

function onSelectionChanged(event) {
    var selectedRows = gridOptions.api.getSelectedRows();
    var selectedRowsString = '';
    var selectednode = gridOptions.api.getSelectedNodes()[0].id;


    selectedRows.forEach(function (selectedRow, index) {
        var zm = map.getZoom();
        if (zm < 18) {zm=18}
        map.setView([selectedRow.lat, selectedRow.lon], zm);
        selectedRowsString += selectedRow.cam_id;
        display_cameradetail(selectedRow);
        Toggle_panel('camera_detail', tcamera_detail);

        gridOptions.api.ensureIndexVisible(parseInt(selectednode));

    });
}

function selectrow_camera(cam_id) {
    gridOptions.api.forEachNode(function (node) {
        if (node.data.cam_id === cam_id) {
            node.setSelected(true);
        }
    });
    onSelectionChanged(null);
}

function selectrow_alarm(cam_id, alarmid) {
    //Toggle_panel('camera_detail', 0);
    gridOptions.api.forEachNode(function (node) {
        if (node.data.cam_id === cam_id) {
            node.setSelected(true);
        }
    });
    onSelectionChanged(null);
    //setTimeout(function () {

    //}, 50);
}

//function display_cameradetail(selectedRow) {
    

//    document.getElementById("cam_alarm_time").innerHTML = txt_alarm_time;
//    document.getElementById("cam_name").innerHTML = selectedRow.cam_id;
//    document.getElementById("cam_place").innerHTML = selectedRow.place;
//    document.getElementById("cam_brande").innerHTML = selectedRow.brande;
//    document.getElementById("cam_model").innerHTML = selectedRow.model;
//    document.getElementById("cam_ip").innerHTML = selectedRow.ip;
//    document.getElementById("cam_serial").innerHTML = selectedRow.serial;

//    var html_temp = '<div class="cardlist01"><div class="alarm_img_container01" onclick="alarm_video_popup_show({alarmid})">';
//    html_temp += '<img src="{imgurl}" /><a href="#"><span class="fa fa-play-circle-o fa-5x"></span></a></div>';
//    html_temp +=  '<div class="cardtitle"><p><b>{alarmname} : </b>&nbsp;Time {time}</p></div></div>';

//    var htmlcardlist ='';
//    var tmp1 = '';

//    if (alarm_json_all == null) return;
//    //console.log('camera_alarm_json not null  : ' + JSON.stringify(alarm_json_all.data.rows));

//    var this_cam_alarm = alarm_json_all.data.rows.filter(function (entry) {
//        return entry.cam_id === selectedRow.cam_id;
//    });

//    //console.log('this_cam_alarm : ' + this_cam_alarm);
//    var data = this_cam_alarm;
//    var n = data.length;
    
//    for (var i = 0; i < n-1; i++)
//    {
//        var dt = new Date(parseInt(data[i].timestamputc));
//        var dnow = datetostring(dt);
//        var imgurl = alarm_image_server + dt.getFullYear() + '/' + formatnum((dt.getMonth() + 1), 2) + '/' + formatnum(dt.getDate(), 2) + '/' + data[i].alarmid + '.png';

//        tmp1 = html_temp;
//        tmp1 = tmp1.replace('{alarmid}', data[i].alarmid);
//        tmp1 = tmp1.replace('{imgurl}', imgurl);
//        tmp1 = tmp1.replace('{alarmname}', 'Alarm : ' + data[i].alarmid);
//        tmp1 = tmp1.replace('{time}', dnow);

//        htmlcardlist += tmp1;
//    }
    
//    toggle_notify(false);
//    document.getElementById("alarm_cardlist").innerHTML = htmlcardlist;

//}

