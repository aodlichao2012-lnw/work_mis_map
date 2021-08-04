using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;


namespace mapmng
{
    public partial class frm_map : System.Web.UI.Page
    {
        public static string login_jsonstring = "";
        public static string login_username = "";
        public static string login_name = "";
        public static string login_surname = "";
        public static string login_sys_name = "";
        public static string login_user_type = "";
        public static string login_sys_permission_id = "";
        public static string login_sys_permission_name = "";
        public static string login_mobile = "";

        public string sys_permission_id = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            string fromWeb = "";
            if (Request.Params["id"] != null)
            {
                fromWeb = Request.Params["id"];
            }
            else
            {
               }

            //if(fromWeb == "") Response.Redirect(@"http://61.7.192.6/pkkweb/");
            //login_jsonstring = main_Mapservice.user_login(fromWeb);


            login_jsonstring = @"{""username"": ""user02"",
                                    ""name"": ""Admin"",
                                    ""surname"": ""Pakkret"",
                                    ""mobile"": ""0809999999"",
                                    ""sys_id"": ""5"",
                                    ""sys_name"": ""Pandemic Map Online"",
                                    ""sys_permission_id"": ""{syspid}"",
                                    ""user_type"": ""เจ้าหน้าที่"",
                                    ""sys_permission_name"": ""เจ้าหน้าที่"",
                                    ""date"": ""01/01/2021 00:00""
                                }";//test value --------- 


            //login_jsonstring = login_jsonstring.Replace("{syspid}", RadioButtonList1.SelectedValue);//test value --------- 
            //if (RadioButtonList1.SelectedValue == "sys")
            //{
            //}
            //else
            //{
            //    dynamic jsonObj = Newtonsoft.Json.JsonConvert.DeserializeObject(login_jsonstring);
            //    jsonObj["sys_permission_id"] = RadioButtonList1.SelectedValue;
            //}
            

            JObject user = JObject.Parse(login_jsonstring);



            login_username = (string)user.SelectToken("username");
            login_name = (string)user.SelectToken("name");
            login_surname = (string)user.SelectToken("surname");
            login_user_type = (string)user.SelectToken("user_type");
            login_sys_permission_id = (string)user.SelectToken("sys_permission_id");
            login_sys_name = (string)user.SelectToken("user_type");
            login_sys_permission_name = (string)user.SelectToken("sys_permission_name");

            //if (RadioButtonList1.SelectedValue == "sys")
            //{
            //    login_sys_permission_id = (string)user.SelectToken("sys_permission_id");
            //    sys_permission_id = (string)user.SelectToken("sys_permission_id");
            //}
            //else
            //{ 
            //    login_sys_permission_id = RadioButtonList1.SelectedValue;  ////test value --------- 
            //    sys_permission_id = RadioButtonList1.SelectedValue;
            //}
            //txt_sys_permission_id.Text = login_sys_permission_id;


            //dbAllValue.db_username = login_username;
            //dbAllValue.db_name = login_name;
            //dbAllValue.db_surname = login_surname;
            //dbAllValue.db_sys_permission_id = login_sys_permission_id;
            //dbAllValue.db_mobile = login_mobile;


            //sys_permission_id = login_sys_permission_id;//test value --------- 
            login_user_type = login_sys_permission_name + ' ' + login_sys_permission_id;//test value --------- 
            //txtUser_login.InnerHtml = "<i class='fas fa-user'></i> " + login_name + " " + login_surname + " [" + login_user_type + "]";


            pandemic_map_config("13");

        }

        void Page_LoadComplete(object sender, EventArgs e)
        {

            //switch (login_sys_permission_id)
            //{
            //    //map online
            //    case "11":
            //    case "12":
            //    case "13":
            //        if (!Page.ClientScript.IsClientScriptIncludeRegistered("jsFileInclude"))
            //        {
            //            Page.ClientScript.RegisterClientScriptInclude("jsFileInclude", "js/poi.js");
            //            Page.ClientScript.RegisterClientScriptInclude("jsFileInclude", "js/aggrid_poi.js");
            //        }
            //        //var js = new HtmlGenericControl("script");
            //        //js.Attributes["type"] = "text/javascript";
            //        //js.Attributes["src"] = "js/poi.js";
            //        //Page.Header.Controls.Add(js);

            //        //var js2 = new HtmlGenericControl("script");
            //        //js2.Attributes["type"] = "text/javascript";
            //        //js2.Attributes["src"] = "js/aggrid_poi.js";
            //        //Page.Header.Controls.Add(js2);
            //        break;
            //    //ent
            //    case "21":
            //    case "22":
            //    case "23":
                   
            //        break;
            //    //serv
            //    case "31":
            //    case "32":
            //    case "33":
            //    case "34":
                    
            //        break;
            //}
        }

        public void pandemic_map_config(string sys_permission_id)
        {
            login_sys_name = "ระบบ Pandemic Map Online";
            //txtSys_login.InnerHtml = "PAKKRET CITY | " + login_sys_name;//"PAKKRET CITY - เทศบาลนครปากเกร็ด | "

            //menu_poi.Visible = true;


            //menu_lic.Visible = true;
            //menu_prj.Visible = false;//menu_prj.Visible = true;
            //menu_ent.Visible = false;
            //menu_entreport.Visible = false;
            //menu_ent_edit.Visible = false;
            //menu_toxic.Visible = false;
            //menu_serv.Visible = false;
            //menu_serv_edit.Visible = false;
            //menu_serv_user.Visible = false;
            //menu_serv_user_edit.Visible = false;
            //menu_serv_req.Visible = false;

            //t_mappoi.Visible = true;
            //t_mapprj.Visible = true;
            //t_mapent.Visible = false;
            //t_maptoxic.Visible = false;
            //t_mapserv.Visible = false;
            //t_mapserv_user.Visible = false;

            if (sys_permission_id == "13")//admin
            {
                //panel_poi_insert.Visible = true;
            }
            else
            {
                //panel_poi_insert.Visible = false;
            }
        }

        [System.Web.Services.WebMethod]
        public static string get_user_json()
        {
            return login_jsonstring;
        }



        protected void RadioButtonList1_SelectedIndexChanged(object sender, EventArgs e)
        {
        }

        [System.Web.Services.WebMethod]
        public static object function_distributer(string functionname, object jsonparam, string return_functionname)
        {
            return cl_distributer.distribute_function(functionname, jsonparam, return_functionname);
        }

    }
}