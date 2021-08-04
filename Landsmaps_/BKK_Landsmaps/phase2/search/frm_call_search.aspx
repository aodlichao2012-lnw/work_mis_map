<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="frm_call_search.aspx.cs" Inherits="pkmngdata.phase2.search.frm_call_search" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="nut_div.js"></script>
    <script>

        //================================================================================================
        function send_to_distributer(functionname, jsonparam) {
            PageMethods.function_distributer(functionname, jsonparam, '', page_return_function);
        }
        //================================================================================================


        function page_return_function(response, userContext, methodName) {
            var fn = window[response.return_functionname];
            fn(response.data);
        }

        function find_bldg_shape() {
            var keyw = document.getElementById("txtkeyword").value;
            var muu = document.getElementById("txtmuu").value;
            var tam = document.getElementById("txttambol").value;
            //var strjson = '{ "keyword":"' + keyw + '", "muu" : "' + muu + '", "tam" : "' + tam + '"}';
            var strjson = '{ "keyword":"' + keyw + '", "muu" : "' + muu + '", "tam" : "' + tam + '", "polystr":{"type":"Polygon","coordinates":[[[100.497447,13.914253],[100.497447,13.922426],[100.507654,13.922426],[100.507654,13.914253],[100.497447,13.914253]]]}  }';
            PageMethods.function_distributer('get_bldg_shape', JSON.parse( strjson), 'ret_bldg_shape', page_return_function);
        }

        function ret_bldg_shape(data) {
            document.getElementById("result").innerHTML = JSON.stringify(data, null, 4);
        }

        function find_bldg_mo_id() {
            
            var strjson = '{ "lat":' + 13.905 + ', "lon" : ' + 100.4982465 + '}';
            PageMethods.function_distributer('get_mo_id', JSON.parse(strjson), 'ret_bldg_mo_id', page_return_function);
        }

        function ret_bldg_mo_id(data) {
            document.getElementById("result").innerHTML = JSON.stringify(data, null, 4);
        }

        function find_bldg_from_aprv() {
            var keyw = document.getElementById("txtkeyword").value;
            var strjson = '{ "keyword":"' + keyw + '"}';
            PageMethods.function_distributer('get_bldg_from_aprv', JSON.parse(strjson), 'ret_bldg_from_aprv', page_return_function);
        }

        function ret_bldg_from_aprv(data) {
            document.getElementById("result").innerHTML = JSON.stringify(data, null, 4);
        }

        function find_permit() {
            var keyw = document.getElementById("txtkeyword").value;
            var strjson = '{ "mo_id":"' + keyw + '"}';
            PageMethods.function_distributer('get_permit', JSON.parse(strjson), 'ret_permit', page_return_function);
        }

        function ret_permit(data) {
            document.getElementById("result").innerHTML = JSON.stringify(data, null, 4);
        }



        function get_toc() {

            var strjson = '{}';
            alert('1');
            PageMethods.function_distributer('get_toc_list', JSON.parse(strjson), 'ret_toc', page_return_function);
        }

        function ret_toc(data) {
            document.getElementById("result").innerHTML = JSON.stringify(data, null, 4);
        }


        function get_pandemic() {

            var strjson = '{"lat":"13.9127870803188", "lon": "100.496266448546", "distance_m" : "500", "pand_id":"1"}';
            //alert('1');
            PageMethods.function_distributer('get_pandemic', JSON.parse(strjson), 'ret_pandemic', page_return_function);
        }

        function ret_pandemic(data) {
            document.getElementById("result").innerHTML = JSON.stringify(data, null, 4);
        }


        function get_interest() {

            var keyw = document.getElementById("txtkeyword").value;
            var strjson = '{ "keyword":"' + keyw + '"}';
            PageMethods.function_distributer('get_interest', JSON.parse(strjson), 'ret_interest', page_return_function);
        }

        function ret_interest(data) {
            document.getElementById("result").innerHTML = JSON.stringify(data, null, 4);
        }


        function init() {
            create_div();
            onload_old();
        }

        function test_call(counter) {
            var i;
            for (i = 0; i < counter; i++) {
                alert('ครั้งที่ ' + i);
            }
        }
    </script>
</head>
<body >
    <form id="form1" runat="server">
    <div>
    <input type="text" id="txtkeyword" value="146/1"/>
        <input type="text" id="txtmuu" value="1"/>
        <input type="text" id="txttambol" value="ปากเกร็ด"/>
        <input type="text" id="txtshp" value="คลองเกลือ"/>
        <input type="button" value="search" onclick="find_bldg_shape();" />
        <input type="button" value="test nut div"  onclick="create_div();" />
        <input type="button" value="toc"  onclick="get_toc();" />
        <input type="button" value="Pandemic"  onclick="get_pandemic();" />
        <input type="button" value="Interest Point"  onclick="get_interest();" />
         <div id="result">ผลลัพธ์</div>
    </div>
        <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="True">
        </asp:ScriptManager>
     <div id ="displaydiv">

     </div>
        <input type="button" value="ค้นหาด้วยจุด" onclick="find_bldg_mo_id();" />
        <input type="button" value="ค้นหาตึกด้วยใบอนุญาต" onclick="find_bldg_from_aprv();" />
        <input type="button" value="ค้นหาใบอนุญาต" onclick="find_permit();" />
        <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Server Side Button" Width="178px" />
    </form>
</body>
</html>
