<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="frm_map.aspx.cs" Inherits="mapmng.frm_map" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta http-equiv="Access-Control-Allow-Origin" content="*"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
    <title>
        Landsmaps : สำนักการวางผังและพัฒนาเมือง กรุงเทพมหานคร
    </title>

    <link rel="shortcut icon" href="favicon.ico"/>
    <%--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>--%>
    <link rel="stylesheet" href="js_tools/fontawesome/css/all.css"/>

   

    <link rel="stylesheet" type="text/css" href="node_modules/leaflet/dist/leaflet.css"/>
    <script type="text/javascript" src="node_modules/leaflet/dist/leaflet.js"></script>

    <link rel="stylesheet" type="text/css" href="node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css"/>
    <script src="node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js"></script>

    <script src="node_modules/leaflet-rotatedmarker/leaflet.rotatedMarker.js"></script>

    <script src="node_modules/leaflet.icon.glyph/Leaflet.Icon.Glyph.js"></script>

   <%-- <link href="node_modules/leaflet-measure/dist/leaflet-measure.css" rel="stylesheet" />
    <script src="node_modules/leaflet-measure/dist/leaflet-measure.js"></script>--%>

    <link href="node_modules/leaflet.markercluster/dist/MarkerCluster.css" rel="stylesheet" />
    <link href="node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css" rel="stylesheet" />
    <script src="node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js"></script>

    <script src="node_modules/leaflet-draw/dist/leaflet.draw-src.js"></script>
    <link href="node_modules/leaflet-draw/dist/leaflet.draw-src.css" rel="stylesheet" />

    <!--<link href="node_modules/leaflet-buffer/src/leaflet.buffer.css" rel="stylesheet" />
    <script src="node_modules/leaflet-buffer/dist/leaflet.buffer.min.js"></script>-->

    <!--<script src="node_modules/leaflet-buffer/src/leaflet.buffer.js"></script>
    <link href="node_modules/leaflet-buffer/src/leaflet.buffer.css" rel="stylesheet" />-->


    <script src="node_modules/leaflet-basemaps/L.Control.Basemaps.js"></script>
    <link href="node_modules/leaflet-basemaps/L.Control.Basemaps.css" rel="stylesheet" />

    <link rel="stylesheet" type="text/css" href="node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css"/>
    <script src="node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js"></script>

    <script src="node_modules/@turf/turf.js"></script>

    <!--<script src="node_modules/ag-grid.js"></script>-->
    <script src="node_modules/ag-grid/dist/ag-grid.js"></script>
    <link href="node_modules/ag-grid/dist/styles/ag-grid.css" rel="stylesheet" />
    <link href="node_modules/ag-grid/dist/styles/ag-theme-balham.css" rel="stylesheet" />

    <script src="node_modules/leaflet-plugins/layer/tile/Bing.js"></script>

    <script src="node_modules/leaflet.browser.print/dist/leaflet.browser.print.min.js"></script>

    <link href="js/CheckboxTree/hummingbird-treeview.css" rel="stylesheet" />

    <script src="js_tools/L.Control.ZoomBar-master/src/L.Control.ZoomBar.js"></script>
    <link href="js_tools/L.Control.ZoomBar-master/src/L.Control.ZoomBar.css" rel="stylesheet" />

    <link href="js_tools/leaflet-control-window-master/src/L.Control.Window.css" rel="stylesheet" />
    <script src="js_tools/leaflet-control-window-master/src/L.Control.Window.js"></script>

    <link href="node_modules/leaflet-measure-path/leaflet-measure-path.css" rel="stylesheet" />
    <script src="node_modules/leaflet-measure-path/leaflet-measure-path.js"></script>
    <!--<script src="node_modules/leaflet.control.opacity/dist/L.Control.Opacity.js"></script>
    <link href="node_modules/leaflet.control.opacity/dist/L.Control.Opacity.css" rel="stylesheet" />-->
    <!--<script src="https://unpkg.com/ag-grid/dist/ag-grid.js"></script>-->
    <!--<link rel="stylesheet" href="https://unpkg.com/ag-grid/dist/styles/ag-grid.css">
    <link rel="stylesheet" href="https://unpkg.com/ag-grid/dist/styles/ag-theme-balham.css">-->

    <script type="text/javascript" src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
    <script type="text/javascript" src="js/LTileLayerBetterWMS.js"></script>

    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.js"></script>--%>
    <script src="js_tools/leaflet-plugins-master/layer/tile/Bing.js"></script>
<%--    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Promise"></script>
    <script src="js_tools/leaflet-bing-layer-gh-pages/leaflet-bing-layer.js"></script>--%>


    <script src="https://d3js.org/d3.v3.min.js"></script>
    <script src="https://d3js.org/topojson.v0.min.js"></script>


    <link href="StyleSheet01.css" rel="stylesheet" type="text/css" />
    <link href="css/leafletstyle.css" rel="stylesheet" type="text/css" />
    <link href="css/aggrid.css" rel="stylesheet" type="text/css" />
    <link href="css/mapprint.css" rel="stylesheet" />

    <style leaflet-browser-print-content>
	.grid-print-container { /*// grid holder that holds all content (map and any other content)*/
		grid-template: auto 1fr auto / 1fr;
		background-color: #FFFFFF;
        border: 1px solid #ebebeb;
        /*margin: 5px;*/
	}
	.grid-map-print { /*// map container itself*/
		grid-row: 2;
	}
	.print_title { /*// Dynamic title styling*/
		grid-row: 1;
		/*justify-self: center;*/
		color: black;
        text-align:center;
        width: 100%;
        display:block;
	}
	.print_sub-content { /*// Dynamic sub content styling*/
		grid-row: 5;
		padding: 10px;
        text-align: left;
        display:block;
	}
    </style>
    
    <script src="js/main.js"></script>
    
    
</head>
<body class="tundra" onresize="resize_screen();" id="_body">


    <div id="mainwrapper" class="main_wrapper">

        <!--MAP ----------------------------------->
        <div style="width:100%;height:100%">
            <div id="mapmain" class="Map01">
            <!--MAP DISPLAY HERE-->
            </div>
        </div>
        
         <%--LEFT TOOLBAR--%>
        <div id="lefttoolbar" class="lefttoolbar" style="opacity:1;display:none">
            <button type="button"  id="btn_ident_layer" title="ดูรายละเอียดชั้นข้อมูล"><i class="fas fa-info-circle"></i></button>
            <button type="button"  id="btn_clear_mouse" title="Pointer"><i class="fas fa-times-circle"></i></button>
        </div>
        <%--LEFT TOOLBAR--%>



        <div id="popup_cctv_info" class="ol-popup">
            <!--CCTV INFO-->
            <a href="#" id="popup-closer" class="ol-popup-closer"></a>
            <div id="popup-content"></div>
        </div>

        <!--MAP ----------------------------------->

<form id="form1" runat="server"> 
<asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="True"></asp:ScriptManager>

        <div id="titlepanel" class="title01">
            <div></div>

            <div class="logo" style="float:left"></div>

            <div class="titletxt01" style="float:left">
                Landsmaps : สำนักการวางผังและพัฒนาเมือง กรุงเทพมหานคร 
            </div>

            <div id="logintest" class="titletxt02" style="display:none">
                <asp:RadioButtonList ID="RadioButtonList1" runat="server" RepeatDirection="Horizontal" AutoPostBack="True">
                    <asp:ListItem Selected="True">sys</asp:ListItem>
                    <asp:ListItem>10</asp:ListItem>
                    <asp:ListItem>11</asp:ListItem>
                    <asp:ListItem>12</asp:ListItem>
                    <asp:ListItem>13</asp:ListItem>

                    <asp:ListItem>20</asp:ListItem>
                    <asp:ListItem>21</asp:ListItem>
                    <asp:ListItem>22</asp:ListItem>
                    <asp:ListItem>23</asp:ListItem>

                    <asp:ListItem>30</asp:ListItem>
                    <asp:ListItem>31</asp:ListItem>
                    <asp:ListItem>32</asp:ListItem>
                    <asp:ListItem>33</asp:ListItem>
                    <asp:ListItem>34</asp:ListItem>

                </asp:RadioButtonList>
            </div>
        </div>

        <div id="main_nav" class="menucontainer brackets">
            <!--<button type="button"  id="btn_toggle_mainmenu" ><i class="fa fa-bars"></i></button>-->
            <div class="panel_btn_toggle">
                <button type="button"  id="btn_toggle_mainmenu" class="button_toggle" onclick="main_menu_sel('TOGGLE')"><i class="fa fa-bars"></i></button>
            </div>
            <!--<a href="#" onclick="" class="btn_toggle">
                <img src="images/icon_demo.png" /> <i class="fa fa-search"></i>
            </a>-->
            <div id="main_menu_list" style="display:block;transition: 0.2s;">
               <%-- <div class="button" onclick="main_menu_sel('BASEMAP')">
                    <img src="Images/icons/48pixel/public_48.png" /> แผนที่ฐาน
                </div>--%>
                <div class="button" onclick="main_menu_sel('LAYER')">
                    <img src="Images/icons/48pixel/layer_48.png" /> ชั้นข้อมูล
                </div>
                <div class="button" onclick="main_menu_sel('MAPTOOL')">
                    <img src="Images/icons/48pixel/maptool_48.png" /> เครื่องมือแผนที่
                </div>
                <div class="button" onclick="main_menu_sel('SEARCH')">
                    <img src="Images/icons/48pixel/search_48.png" /> ค้นหาข้อมูล
                </div>
                 <div class="button" onclick="main_menu_sel('RESOURCE01')">
                    <img src="Images/icons/48pixel/search_48.png" /> Tool1
                </div>
                <div class="button" onclick="main_menu_sel('RESOURCE02')">
                    <img src="Images/icons/48pixel/search_48.png" /> Tool2
                </div>
                <%--<div class="button" onclick="main_menu_sel('POI')" id="menu_poi" runat="server">
                    <img src="Images/icons/48pixel/mapbase_48.png" /> จุดสนใจ
                </div>--%>

                <div class="button"  id="menu_location" title="ตำแหน่งปัจจุบัน" style="text-align: center;">
                    <i class="fas fa-map-pin"></i>
                </div>
                 <%--<div class="button"  id="menu_clearmouse" title="Clear Mouse" style="text-align: center;">
                    <i class="fas fa-mouse-pointer"></i>
                </div>--%>
             <%--   <div class="button" title="กลับสู่หน้าหลัก" style="text-align: center;">
                    <i class="fas fa-home"></i>
                </div> 
                <div class="button" title="ออกจากระบบ" style="text-align: center;">
                    <i class="fas fa-sign-out-alt"></i>
                 </a>--%>
            </div>
        </div>


        <!--*RIGHT PANEL****************************************************************************************-->
        <!--BASEMAP-------------------------------------------------------------------------------->
        <div id="t_basemap" class="sidepanel01_L" style="left:-300px;">

            <div class="pnltitlebar01" onclick="ToggleTools_Left('t_basemap', tBasemap_Width)">
                <div class="tooltitle01" style="float:right;text-align:right;font-size: 1em;">&nbsp;&#9587;&nbsp;&nbsp;</div>
                <div class="tooltitle01" style="float:left;">
                    <img src="Images/icons/48pixel/public_48.png" class="imgToolTitle" /> แผนที่ฐาน
                </div>
            </div>
            <div class="toolpanel01">
                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                <div style="height:auto">
                    <%--<div id="basemap_ctrl"></div>--%>
                </div>
                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                <div style="clear:both; width: 10px;height:150px"></div><!--NEW LINE-->
                <!---------------------------------------------------------------------------------------------------->
            </div>

        </div>
        <!--BASEMAP-------------------------------------------------------------------------------->
        <!--MAPLAYER-------------------------------------------------------------------------------->
        <div id="t_maplayer" class="sidepanel01_L" style="left:-300px;">

            <div class="pnltitlebar01" onclick="ToggleTools_Left('t_maplayer', tMaplayer_Width)">
                <div class="tooltitle01" style="float:right;text-align:right;font-size: 1em;">&nbsp;&#9587;&nbsp;&nbsp;</div>
                <div class="tooltitle01" style="float:left;">
                    <img src="Images/icons/48pixel/layer_48.png" class="imgToolTitle" /> แผนที่ฐานและชั้นข้อมูล
                </div>
            </div>
            <div class="toolpanel01" style="overflow:scroll">
               
                <div style="clear:both; width: 10px;height:5px"></div><!--NEW LINE-->
                <div class="sub_title01">แผนที่ฐาน</div>
                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                    <div id="basemap_ctrl" class="basemap_node"></div>
                <hr />
                <div class="sub_title01">ชั้นข้อมูล</div>
                <label class="check01">
                    ดูรายละเอียดชั้นข้อมูล
                    <input id="chk_ident_lyr" type="checkbox" name="chk" value="MAP_LAYER_IDENT" onclick="_setMouseMode_Ctrl(this);"/>
                    <span class="checkmark_chk"></span>
                </label>
                <label class="check01">
                    แสดงเฉพาะชั้นข้อมูลที่เลือก
                    <input id="chk_only_v_lyr" type="checkbox" name="chk" />
                    <span class="checkmark_chk"></span>
                </label>

               <%-- <label class="check01">
                    แสดง Map Legend บนแผนที่
                    <input id="chk_Maplegend" type="checkbox" name="chk" value=""/>
                    <span class="checkmark_chk"></span>
                </label>--%>

                <div style="height:auto">

                    <div id="layer_toc" class="lyrtoc">
                        <div class="accordion active">ชั้นข้อมูลพื้นฐาน</div>
                        <div class="panel" style="display:inline-block;max-height:50px">
                            <div class="hummingbird-treeview" id="layer_standard_list" style="margin:10px 0">
                            </div>
                        </div>
                        <div class="accordion active" style="display:none">ชั้นข้อมูลเพิ่มเติม</div>
                        <div class="panel" style="display:inline-block;max-height:50px;display:none">
                            <div class="hummingbird-treeview" id="layer_addon_list" style="margin:10px 0">
                            </div>
                        </div>
                    </div>
                    <div style="clear:both; width: 10px;height:100px"></div> <!--NEW LINE-->

                    <div>

                    </div>
                    <!---------------------------------------------------------------------------------------------------->

                </div>

            </div>

        </div>
        <!--MAPLAYER-------------------------------------------------------------------------------->
        <!--MAPTOOL-------------------------------------------------------------------------------->
        <div id="t_maptool" class="sidepanel01" style="right:-300px;">

            <div class="pnltitlebar01" onclick="ToggleTools('t_maptool', tMaptool_Width)">
                <div class="tooltitle01" style="float:right;text-align:right;font-size: 1em;">&nbsp;&#9587;&nbsp;&nbsp;</div>
                <div class="tooltitle01" style="float:left;">
                    <img src="Images/icons/48pixel/maptool/maptool_48.png" class="imgToolTitle" /> เครื่องมือแผนที่
                </div>
            </div>
            <div class="toolpanel01">

                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                <span style="text-decoration:underline;font-weight:bold;margin-top:10px;">เครื่องมือการวาด</span>
                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->

                <div style="height:auto">
                    <label class="radio01">
                        <img src="Images/icons/48pixel/maptool/maptool_distant_48.png" class="img_icon_01" /> เครื่องมือการวัดระยะทาง
                        <input id="chk_m_line" type="radio" checked="checked" name="radio" onclick="select_draw_maptools(this.value)" value="m_line"/>
                        <span class="checkmark_rd"></span>
                    </label>
                    <label class="radio01">
                        <img src="Images/icons/48pixel/maptool/maptool_area_48.png" class="img_icon_01" /> เครื่องมือการวัดพื้นที่
                        <input id="chk_m_area" type="radio" name="radio" onclick="select_draw_maptools(this.value)" value="m_area"/>
                        <span class="checkmark_rd"></span>
                    </label>
                    <label class="radio01">
                        <img src="Images/icons/48pixel/maptool/maptool_48.png" class="img_icon_01" /> เครื่องมือการวาด
                        <input id="chk_draw" type="radio" name="radio" onclick="select_draw_maptools(this.value)" value="draw"/>
                        <span class="checkmark_rd"></span>
                    </label>
                    <label class="radio01" style="display:none">
                        <img src="Images/icons/48pixel/maptool/maptool_draw_48.png" class="img_icon_01" /> เครื่องมือการวาดพื้นที่ค้นหา
                        <input id="chk_draw_search" type="radio" name="radio" onclick="select_draw_maptools(this.value)" value="draw_search"/>
                        <span class="checkmark_rd"></span>
                    </label>
                </div>
                <div style="clear:both; width: 10px;height:30px"></div><!--NEW LINE-->
                <!---------------------------------------------------------------------------------------------------->
                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                <img id="imgMapTools" src="Images/icons/48pixel/maptool/maptool_draw_48.png" class="img_icon_01" style="width: 32px;height: 32px;" />
                <span style="text-decoration:underline;font-weight:bold;margin-top:10px;" id="lbl_tool"> เครื่องมือการวัดระยะทาง</span>
                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                <div style="height:auto">
                    <div id="draw_ctrl" style="overflow: auto;margin-bottom:20px;"></div>
                </div>

                <div id="searchBufferPanel" style="display:none">

                  <%--  <div style="height:auto;display:block;width:95%">
                        <label>
                            <input id="chk_BufferDrawPolygon" type="checkbox" name="chk" value="SEARCH_BY_AREA" class="check02"/>
                            ทำ Buffer สำหรับการวาด Polygon

                            <!--<span class="checkmark_chk"></span>-->
                        </label>
                    </div>

                    <div style="display:block;width:95%;margin-top:10px">ระยะการทำ Buffer </div>
                    <input id="txt_bufferkm" type="text" name="txt_bufferkm" style="width:80px" value="1"/>
                    <select id="searchBuffer_unit_sel" style="width:100px" onchange="selLayer();">
                        <option value="kilometers">กิโลเมตร</option><!--'miles', 'feet', 'kilometers', 'meters', or 'degrees'-->
                        <option value="meters">เมตร</option>
                        <option value="miles">ไมล์</option>
                    </select>--%>
                </div>

                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                <span style="text-decoration:underline;font-weight:bold;margin-top:10px;">หน่วยการวัด</span>
                <div style="height:auto;margin-top: 10px;margin-left:10px;display:inline-block">
                    <input id="chk_m" type="radio" name="m_unit"  checked="checked"
                        value="m" style="vertical-align:middle;margin-left:15px" onclick="update_measurement()"/> เมตร
                    <input id="chk_km" type="radio" name="m_unit"  
                        value="km" style="vertical-align:middle;margin-left:15px" onclick="update_measurement()"/> กิโลเมตร
                    <input id="chk_imp" type="radio" name="m_unit"  
                        value="imp" style="vertical-align:middle;margin-left:15px" onclick="update_measurement()"/> Imperial
                </div>
                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                <div style="clear:both; width: 10px;height:10px"></div><hr /> <!--NEW LINE-->
                <!---------------------------------------------------------------------------------------------------->
                 <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                <span style="text-decoration:underline;font-weight:bold;margin-top:10px;">เครื่องมือการหาพิกัด</span>
                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                    <div style="display:inline-block;width:100px">Latitude : </div>
                    <input id="txt_lat_loc" type="text" name="txt_lat_loc" style="width:180px" value=""/>
                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                    <div style="display:inline-block;width:100px">Longitude : </div>
                    <input id="txt_lon_loc" type="text" name="txt_lon_loc" style="width:180px" value=""/>
                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                <div style="display:block;width:100%;margin-left: 5px;">
                    <button type="button"  id="btn_loc" class="button09"><i class="fa fa-search"></i> ค้นหา</button>
                    <button type="button"  id="btn_loc_gg" class="button09"><i class="fa fa-search"></i> Google Map</button>
                    <button type="button"  id="btn_loc_clear" class="button09"><i class="fa fa-reply"></i> ล้างค่า</button>
                </div>
                <div style="clear:both; width: 10px;height:30px"></div><hr /> <!--NEW LINE-->
                <!---------------------------------------------------------------------------------------------------->
                <div style="display:none">
                <span style="text-decoration:underline;font-weight:bold;margin-top:10px;">เครื่องมือการค้นหาเส้นทาง</span>
                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                 <label>
                     <label class="check01">
                        ค้นหาเส้นทาง
                        <input id="chk_route_work" type="checkbox" name="chk" value="MAP_ROUTING" onclick="routing_formOpen(this);"/>
                        <span class="checkmark_chk"></span>
                    </label>
                </label>
                </div>
                <!---------------------------------------------------------------------------------------------------->
               
                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                <span style="text-decoration:underline;font-weight:bold;margin-top:10px;">การพิมพ์แผนที่</span>
                <div style="height:auto;margin-top: 10px;margin-left:10px;display:none">
                    <input id="chk_ppA3" type="radio" name="pp_size"  
                        value="A3" style="vertical-align:middle;margin-left:15px" onclick="sel_papersize()"/> A3
                    <input id="chk_ppA4" type="radio" name="pp_size"  checked="checked"
                        value="A4" style="vertical-align:middle;margin-left:15px" onclick="sel_papersize()"/> A4
                </div>
                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                    <div id="browserPrint_ctrl" style="overflow: auto;margin-bottom:20px;"></div>
                    <%--<button type="button"   id="leaflet-browser-print--manualMode-button"  class="button01"><i class="fa fa-search"></i> พิมพ์แผนที่</button>--%>
                    <div style="height:auto;display:block;width:95%">
                        <label>
                            <input id="chk_print_desc" type="checkbox" name="chk" value="PRINT_MAP_DESC" class="check02" 
                                onchange="showPrintMapInfo(this.checked)" checked/> พิมพ์แผนที่ตามรูปแบบ
                            <!--<span class="checkmark_chk"></span>-->
                        </label><br />
                         <label>
                            <input id="chk_Maplegend" type="checkbox" name="chk" value="" class="check02"/> แสดง Map Legend บนแผนที่
                        </label>
                    </div>

               


                    <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                    <div style="display:inline-block;width:100px">หัวข้อแผนที่ : </div>
                    <input id="txt_print_t" type="text" name="txt_print_t" style="width:340px" value=""
                            onchange="document.getElementById('txt_print_title').value = this.value"/>
                    <div style="display:inline-block;width:100px">มาตราส่วน 1 : </div>
                    <input id="txt_print_sc" type="text" name="txt_print_sc" style="width:340px" value=""
                            onchange="document.getElementById('txtmapscale_print').innerHTML = 'มาตราส่วน  1 : ' + this.value"/>
                    <div style="display:inline-block;width:100px">รายละเอียด : </div>
                    <textarea id="txt_print_d" name="txt_print_d" rows="10"  style="width:340px;resize:none;"
                            onchange="document.getElementById('txt_print_desc').value = this.value"></textarea>
                    <hr />
                <div style="clear:both; width: 10px;height:150px"></div> <!--NEW LINE-->
                <!---------------------------------------------------------------------------------------------------->
            </div>

        </div>
        <!--MAPTOOL-------------------------------------------------------------------------------->
        <!--SEARCH-------------------------------------------------------------------------------->
        <div id="t_mapsearch" class="sidepanel01" style="right:-300px;">

            <div class="pnltitlebar01" onclick="ToggleTools('t_mapsearch', tMapsearch_Width);">
                <div class="tooltitle01" style="float:right;text-align:right;font-size: 1em;">&nbsp;&#9587;&nbsp;&nbsp;</div>
                <div class="tooltitle01" style="float:left;">
                    <img src="Images/icons/48pixel/search_48.png" class="imgToolTitle" /> ค้นหาข้อมูล
                </div>
            </div>

            <div class="toolpanel01">
                <div style="clear:both; width:10px;height:10px"></div><!--NEW LINE-->
                <span style="text-decoration:underline;font-weight:bold;margin-top:10px;"></span>
                <div style="clear:both; width:10px;height:10px"></div><!--NEW LINE-->
                <div id="lyr_filter" style="left:0;right:0">
                    <div style="display:inline-block;width:100px">เลือกชั้นข้อมูล : </div>
                    <select id="lyr_sel" style="width:350px" onchange="selLayer(this.value);">
                       
                    </select>
                </div>

                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->

                <div style="display:inline-block;width:100px">ใส่คำค้น : </div>
                <input id="txt_filter_keyword" type="text" name="txt_filter_keyword" style="width:340px" value=""/>
                <div id="pnl_search_bldg" style="margin:5px 0;display:none">
                    <div style="display:inline-block;width:100px">ตำบล : </div>
                    <select id="tam_sel" style="width:200px" onchange="selTambon(this.value);">
                        <option value="">-</option>
                        <option value="ปากเกร็ด">ปากเกร็ด</option>
                        <option value="บางพูด">บางพูด</option>
                        <option value="บ้านใหม่">บ้านใหม่</option>
                        <option value="คลองเกลือ">คลองเกลือ</option>
                        <option value="บางตลาด">บางตลาด</option>
                    </select>
                    <div style="display:inline-block;width:39px;text-align:center">หมู่ : </div>
                    <select id="mu_sel" style="width:100px">
                       
                    </select>
                    <div style="clear:both; width:10px;height:5px"></div><!--NEW LINE-->
                    <div style="display:inline-block;width:240px">ค้นหาบ้านเลขที่ (สำหรับหาบ้านเลขที่โดยตรง) : </div>
                    <input id="txt_filter_housen" type="text" name="txt_filter_housen" style="width:200px" value=""/>
                </div>
                <div style="height:auto;margin-top: 10px;margin-left: 85px;">
                    <label class="check02">
                        <input id="chk_search_byarea" type="checkbox" name="chk" value="SEARCH_BY_AREA" class="check02"/>
                        ค้นหาด้วยพื้นที่จากพื้นที่ที่กำหนด (Search by Area)
                        <!--<span class="checkmark_chk"></span>-->
                    </label>
                    <div style="clear:both;"></div><!--NEW LINE-->
                    <label class="check02">
                        <input id="chk_search_poi_label" type="checkbox" class="check02"/>
                        แสดง Label 
                        <!--<span class="checkmark_chk"></span>-->
                    </label>
                </div>
                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                <div style="display:block;width:100%;margin-left: 105px;">
                    <button type="button"  id="btn_lyr_search" class="button01"><i class="fa fa-search"></i> ค้นหา</button>
                    <button type="button"  id="btn_lyr_clear_search" class="button01"><i class="fa fa-reply"></i> ล้างการค้นหา</button>
                </div>
                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                <div style="height:auto;display:none">
                    <label class="check01">
                        ดูรายละเอียดข้อมูลการค้นหา
                        <input id="chk_ident_search" type="checkbox" name="chk" value="SEARCH_IDENT" onclick="_setMouseMode_Ctrl(this);"/>
                        <span class="checkmark_chk"></span>
                    </label>
                </div>


                <div class="panel_aggrid_layer">
                    <div id="lyr_data_grid" class="ag-theme-balham" style="flex:1;margin-bottom:40px"></div>
                    <div style="clear:both; width: 10px;height:30px"></div><hr /> <!--NEW LINE-->
                    <!---------------------------------------------------------------------------------------------------->
                </div>

            </div>
        </div>
        <!--SEARCH-------------------------------------------------------------------------------->
        <!--RESOURCE01-------------------------------------------------------------------------------->
        <div id="t_mapresource01" class="sidepanel01" style="right:-500px;">

            <div class="pnltitlebar01" onclick="ToggleTools('t_mapresource01', tMapresource01_Width);">
                <div class="tooltitle01" style="float:right;text-align:right;font-size: 1em;">&nbsp;&#9587;&nbsp;&nbsp;</div>
                <div class="tooltitle01" style="float:left;">
                    <img src="Images/icons/48pixel/search_48.png" class="imgToolTitle" /> Tools 01
                </div>
            </div>
            <div class="toolpanel01">
                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                <div style="height:auto">
                    





                </div>

                <div id="pnl_frm_rs01" style="width:100%;height: 100%;border:none;"></div>
                <%--<iframe src="frm_resources.aspx" style="width:100%;height: 100%;border:none;" id ="iframe_rs01"></iframe>';--%>
            </div>
        </div>
        <!--RESOURCE01-------------------------------------------------------------------------------->
        <!--RESOURCE02-------------------------------------------------------------------------------->
        <div id="t_mapresource02" class="sidepanel01" style="right:-500px;">

            <div class="pnltitlebar01" onclick="ToggleTools('t_mapresource02', tMapresource02_Width);">
                <div class="tooltitle01" style="float:right;text-align:right;font-size: 1em;">&nbsp;&#9587;&nbsp;&nbsp;</div>
                <div class="tooltitle01" style="float:left;">
                    <img src="Images/icons/48pixel/search_48.png" class="imgToolTitle" /> Tools 02
                </div>
            </div>
            <div class="toolpanel01">
                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                <div style="height:auto">

                     



                </div>

                <div id="pnl_frm_rs02" style="width:100%;height: 100%;border:none;"></div>
                <%--<iframe src="frm_resource2.aspx" style="width:100%;height: 100%;border:none;" id ="iframe_rs02"></iframe>';--%>
            </div>
        </div>
        <!--RESOURCE02-------------------------------------------------------------------------------->
        <!--*****************************************************************************************************-->
        


        <!--*LEFT PANEL****************************************************************************************-->
        <!--MAP IDENT-------------------------------------------------------------------------------->
        <div id="t_mapident_form" class="sidepanel03" style="left:-500px;">

            <div id="t_mapident_form_title" class="pnltitlebar01" onclick="close_form('t_mapident_form');">
                <div class="tooltitle01" style="float:right;text-align:right;font-size: 1em;">&nbsp;&#9587;&nbsp;&nbsp;</div>
                <div class="tooltitle01" style="float:left;">
                    <img src="images/icon_demo2.png" class="imgToolTitle" /> รายละเอียดชั้นข้อมูล
                </div>
            </div>

            <div class="toolpanel02">
                <div id="mapident_form" style="height:calc(100% - 50px)">
                </div>
            </div>

        </div>
        <!--MAP IDENT-------------------------------------------------------------------------------->
        
        <!--POI-------------------------------------------------------------------------------->
        <div id="t_poi_form" class="sidepanel03" style="left:-500px">

            <div id="t_poi_form_title" class="pnltitlebar01" onclick="clear_poi_ident_marker();POI_formClose();">
                <div class="tooltitle01" style="float:right;text-align:right;font-size: 1em;">&nbsp;&#9587;&nbsp;&nbsp;</div>
                <div class="tooltitle01" style="float:left;">
                    <img src="Images/icons/48pixel/mapbase_48.png" class="imgToolTitle" /> จุดสนใจ
                </div>
            </div>

            <div class="toolpanel02">
                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
                <div id="poi_form" style="width:100%;height:100%">
                   
                </div>
                <div style="clear:both; width: 10px;height:10px"></div><!--NEW LINE-->
            </div>

        </div>
        <!--POI-------------------------------------------------------------------------------->


        <!--*****************************************************************************************************-->
        <!--MAIN MENU-->
        <div class="menutxt01" style="position:fixed;top:0;right:0;z-index:999;width:80px;height:30px;display:none" onclick="ToggleMenu()">
            <span id="menubutton01" class="button01">&#9776;MENU&nbsp;</span>
        </div>


        <!--LOWER BAR-------------------------------------------------------------------------------->
        <div id="lowerbar" class="lowerbar" style="opacity:1">
            <div id="mapscale" class="panel_mapscale">
                    <div class="mapscale_button">
                        <button type="button"  id="btn_toggle_mapscale" class="button_toggle02" onclick=""><i class="fa fa-bars"></i></button>
                    </div>
                    <div id="main_menu_list_mapscale" class="mapscale_menu" style="display:none">
                        <div id="mapscaleheader" class="mapscale_header">Map Scale</div>
                        <div class="button" onclick="map.setZoom(18);">1 : 2,500</div>
                        <div class="button" onclick="map.setZoom(17.25);">1 : 4,000</div>
                        <div class="button" onclick="map.setZoom(14.5);">1 : 25,000</div>
                        <div class="button" onclick="map.setZoom(13.5);">1 : 50,000</div>
                        <div class="button" onclick="map.setZoom(12.5);">1 : 100,000</div>
                        <div class="button" onclick="map.setZoom(11.25);">1 : 250,000</div>
                        <div class="button" onclick="map.setZoom(10.25);">1 : 500,000</div>

                        <%--<input id="txtLogin" type="text" name="" style="width:250px;display:block;margin-bottom:3px" value="one"/>
                        <input id="txtposition" type="text" name="" style="width:250px;display:block;margin-bottom:3px" value="ศูนย์ปภ. เขต 16 ชัยนาท"/>
                        <input id="txtincidence" type="text" name="" style="width:250px;display:block;margin-bottom:3px" value="*เหตุการณ์สาธารณภัยประจำวัน"/>
                        <button type="button"  id="btn_login" class="button01" onclick="set_default_criteria();">Login</button>--%>
                    </div>
                   
            </div>

            <div id="pnlloc" style="height:20px;font-size:1em;display:inline-block">
                <div class="textblock01" style="width:100%;padding-left:8px">
                    <span id="mlatlon">Lat, Lon : 00000000</span>
                    <span id="scalefactor" style="margin-left:10px">Scale  1 : 00000000</span>
                </div>
                <div id="sc" class="textblock01" style="width:100%;position: absolute;bottom: 25px;"></div>
            </div>

        </div>

    </form>
    </div> <%--mainwrapper--%>




     <%--HIDDEN PRINT--%>
    <div id="map_print_info" class="printinfo" style="display:none"> 
            <div id="map_print_title" class="print_title" leaflet-browser-print-content>
                <input id="txt_print_title" type="text" name="Title" style="width:100%" value="" class="textprint01"/>
            </div>
            
            <div id="map_print_desc" class="print_sub-content" leaflet-browser-print-content>
                <img src="Images/logo01.png" class="imgprint01" style="display:none"/>

                    <textarea id="txt_print_desc" rows = "8" name = "Description" class="textprint02">
                      </textarea>
                <div class="divprint02">
                    <img src="Images/northarrow.png" class="imgprint02"/>
                    <div id ="txtmapscale_print" style="text-align:center"></div>

                </div>
                
            </div>
    </div>
    <%--HIDDEN PRINT--%>

    <!-- The Modal -->
    <div id="frmMainModal" class="modal_main_form">
      <!-- Modal content -->
      <div class="modal_main_form_content">
        <div class="tooltitle01" style="float:right;text-align:right;font-size: 1em;"><span id="frmMainModal_close">&nbsp;&#9587;&nbsp;&nbsp;</span></div>
        <div id="modal_content" style="height: calc(100% - 50px);width: 100%;">
        </div>
      </div>
    </div>
    <!-- The Modal -->

    <!-- loading -->
    <div id="scn_loading" class="loading_modal" style="display:none">
        <div class="loader_animate">

        </div>
        <div id="scn_loading_text"class="loader_text"></div>
    </div>
    <!-- loading -->


    <script src="js/main.js"></script>
    <script type="text/javascript" src="js/ui.js"></script>
    <script src="js/map_ll.js"></script>

    <script src="js/CheckboxTree/hummingbird-treeview.js"></script>
    <%--<script src="js/map_print.js"></script>--%>
    <script src="js/map_layer.js"></script>
    <script src="js/map_ident.js"></script>
    <script src="js/map_draw.js"></script>
    <script src="js/aggrid_layer.js"></script>

<%--    <script src="cims/getlayerdata.js"></script>
    <script src="cims/js/setcombo.js"></script>
    <script src="cims/js/search_keyword.js"></script>
    <script src="cims/js/my_functions.js"></script>--%>


    <script>
        $("#Layer_treeview").hummingbird();

        //getUserjson();
        //function getUserjson() {
        //    PageMethods.get_user_json(getUserjson_success);
        //}
        window.onload = function () {
            //set_default_criteria();
            get_layer_standard();
            //set_ddl_center();
            //setInputFilter(document.getElementById("txt_bufferkm"), function (value) {
            //    return /^\d*\.?\d*$/.test(value);
            //});
        };
    </script>
    
</body>
</html>