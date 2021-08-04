using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Script.Serialization;
using Newtonsoft.Json.Linq;
using Npgsql;

namespace mapmng
{
    public class cl_find_geometry
    {
        public static object get_toc_list()
        {
            object jsonobject = new object();
            DataTable dt = new DataTable();

            string connstring = WebConfigurationManager.ConnectionStrings["PK_connection"].ConnectionString;

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();

            string Strsql = "";

            Strsql = "SELECT * from pkk_warning.warning_toc ";

            NpgsqlDataAdapter da = new NpgsqlDataAdapter(Strsql, conn);

            DataSet ds = new DataSet();

            ds.Reset();
            da.Fill(ds);
            dt = ds.Tables[0];

            conn.Close();

            string jsonstring = cl_jsonforleaflet.convert_to_simple_json(dt) ;
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            jsonobject = serializer.DeserializeObject(jsonstring);


            return jsonobject;
        }
        public static object get_bldg_shape(JObject objJson)
        {
            object jsonobject = new object();

            string keyword = (string)objJson["keyword"];
            string muu = (string)objJson["muu"];
            string tam = (string)objJson["tam"];

            string cri = make_addr_criteria(objJson);
            string geom_cri = make_geom_criteria(objJson);

            DataTable dt_grid = ret_table_for_show_grid(cri, geom_cri);
            DataTable dt_map = ret_bldg_geom(cri, geom_cri) ;
            DataTable dt_permit = ret_bldg_permit(dt_map);

            string jsonstring = "";
            string gridstring = "";
            string mapstring = "";
            string permitstring = "";
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            gridstring = cl_jsonforleaflet.convert_to_ll_geojson(dt_grid);
            mapstring = cl_jsonforleaflet.convert_to_ll_geojson(dt_map);
            permitstring = cl_jsonforleaflet.convert_to_simple_json(dt_permit);

            if (gridstring == "")
            {
                gridstring = "null";
            }

            if (mapstring == "")
            {
                mapstring = "null";
            }

            jsonstring = "{ \"map_json\" : " + mapstring + ", \"grid_json\" : " + gridstring + ", \"permit_json\" : " + permitstring + " }";

            jsonobject = serializer.DeserializeObject(jsonstring);


            return jsonobject;
        }

        public static string make_addr_criteria (JObject objJson)
        {
            
            string temp = "";

            string keyword = (string)objJson["keyword"];
            string housen = (string)objJson["housen"];
            string muu = (string)objJson["muu"];
            muu = muu.Replace("-", "");
            string tam = (string)objJson["tam"];
            tam = tam.Replace("-", "");

            

            if (keyword != "" && keyword != null)
            {
                temp = " (thname like '%" + keyword.Replace(" ","%") + "%' Or bl_housen like '%" + keyword +
                    "%' Or addr like '%" + keyword.Replace(" ", "%") + "%') ";

            }

            if (housen != "" && housen != null)
            {
                if (temp != "")
                {
                    temp = temp + " and ( bl_housen like '" + housen + "') ";
                }
                else
                {
                    temp = " ( bl_housen like '" + housen + "') ";
                }
            }

            if (muu != "" && muu != null)
            {
                if (temp != "")
                {
                    temp = temp + " and ( bl_villnum like '%" + muu + "%') ";
                }
                else
                {
                    temp = " ( bl_villnum like '%" + muu + "%') ";
                }
            }


            if (tam != "" && tam != null)
            {
                if (temp != "")
                {
                    temp = temp +  " and (bl_tb like '%" + tam + "%')";
                }
                else
                {
                    temp = " (bl_tb like '%" + tam + "%')";
                }
            }
            temp = "(" + temp + ")";
            return temp ;
        }
        public static string make_geom_criteria(JObject objJson)
        {

            string temp = "";

            if (objJson["polystr"] == null) { return ""; }

            string polystr = objJson["polystr"].ToString();



            if (polystr != "" && polystr != null)
            {

                    temp = " ST_Intersects(geom, ST_Transform(ST_GeomFromText(ST_AsText(ST_GeomFromGeoJSON('" + polystr + 
                    "')), 4326), 32647))";

            }


            

            return temp;
        }

        public static DataTable ret_table_for_show_grid (string criteria, string geom_criteria)
        {
            DataTable dt = new DataTable();

            string connstring = WebConfigurationManager.ConnectionStrings["PK_connection"].ConnectionString;

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();
            
            string Strsql;
            if (geom_criteria == "")
            {
                if (criteria != "")
                {
                    Strsql = "SELECT bl_name, mo_id, bl_housen, bl_villnum, village, bl_road, bl_tb, bl_ap, bl_cw,  ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom, " +
                        "thname, addr, descriptions FROM pkk.\"v_BLDG_addr_point\"" + " Where " + criteria;
                }
                else
                {
                    Strsql = "SELECT bl_name, mo_id, bl_housen, bl_villnum, village, bl_road, bl_tb, bl_ap, bl_cw,  ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom, " +
                        "thname, addr, descriptions FROM pkk.\"v_BLDG_addr_point\"";
                }
            } else
            {
                if (criteria != "")
                {
                    Strsql = "SELECT bl_name, mo_id, bl_housen, bl_villnum, village, bl_road, bl_tb, bl_ap, bl_cw,  ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom, " +
                        "thname, addr, descriptions FROM pkk.\"v_BLDG_addr_point\"" + " Where " + criteria +
                        " and  mo_id in (select mo_id from pkk.\"v_BLDG_PKK\" where " + geom_criteria + ")" ;
                }
                else
                {
                    Strsql = "SELECT bl_name, mo_id, bl_housen, bl_villnum, village, bl_road, bl_tb, bl_ap, bl_cw,  ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom, " +
                        "thname, addr, descriptions FROM pkk.\"v_BLDG_addr_point\" where mo_id in (select mo_id from pkk.\"v_BLDG_PKK\" where " + geom_criteria + ")";
                }
            }

            //if (criteria != "" )
            //{
            //    Strsql = "SELECT bl_name, mo_id, bl_housen, bl_villnum, village, bl_road, bl_tb, bl_ap, bl_cw,  ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom, " + 
            //        "thname, addr, descriptions FROM pkk.\"v_BLDG_addr_point\"" + " Where " + criteria;
            //} else
            //{
            //    Strsql = "SELECT bl_name, mo_id, bl_housen, bl_villnum, village, bl_road, bl_tb, bl_ap, bl_cw,  ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom, " + 
            //        "thname, addr, descriptions FROM pkk.\"v_BLDG_addr_point\"";
            //}

            //// Define a query ST_AsText(geom) as
            //NpgsqlCommand command = new NpgsqlCommand(Strsql, conn);

            //// Execute the query and obtain a result set
            //NpgsqlDataReader dr = command.ExecuteReader();
            //dr.Read();
            //string temp = dr["geom"].ToString();

            //dt.Load(dr);

            Strsql = Strsql + " limit 1000";
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(Strsql, conn);

            DataSet ds = new DataSet();

            ds.Reset();
            da.Fill(ds);
            dt = ds.Tables[0];

            conn.Close();
            return dt;

        }
        public static DataTable ret_bldg_geom(string criteria, string geom_criteria)
        {
            DataTable dt = new DataTable();


            string connstring = WebConfigurationManager.ConnectionStrings["PK_connection"].ConnectionString;

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();

            string Strsql;

            if (geom_criteria == "")
            {
                if (criteria != "")
                {
                    Strsql = "SELECT thname, addr, descriptions, type_name, use_name, id_1, ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom, objectid, id_0, id, area, perimeter, " +
                        "bl_id, bl_type, bl_frontg, bl_height, bl_depth, bl_nstorey, bl_nunit, bl_unit_f, bl_nres, bl_employ, bl_owner, bl_area, " +
                        " bl_area_f, bl_tax_id, prj_id, bl_use, bl_date, bl_matl, bl_name, bl_housen, bl_villnum, village, bl_road, bl_tb, bl_ap, " +
                        "bl_cw, bl_postc, bl_address, bl_act_maj, bl_act_min, bl_act_oth, remark_use, remark, id_copy, address_ty, addr_start, addr_end, date, " +
                        " bl_house_1, ent_id, mo_id FROM pkk.\"v_BLDG_PKK\" Where mo_id in (select distinct mo_id from pkk.\"v_BLDG_addr_point\" " +
                             " Where " + criteria + ")";
                }
                else
                {
                    Strsql = "SELECT thname, addr, descriptions, type_name, use_name, id_1, ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom, objectid, id_0, id, area, perimeter, " +
                        "bl_id, bl_type, bl_frontg, bl_height, bl_depth, bl_nstorey, bl_nunit, bl_unit_f, bl_nres, bl_employ, bl_owner, bl_area, " +
                        " bl_area_f, bl_tax_id, prj_id, bl_use, bl_date, bl_matl, bl_name, bl_housen, bl_villnum, village, bl_road, bl_tb, bl_ap, " +
                        "bl_cw, bl_postc, bl_address, bl_act_maj, bl_act_min, bl_act_oth, remark_use, remark, id_copy, address_ty, addr_start, addr_end, date, " +
                        " bl_house_1, ent_id, mo_id FROM pkk.\"v_BLDG_PKK\" ";
                }
            } else
            {
                if (criteria != "")
                {
                    Strsql = "SELECT thname, addr, descriptions, type_name, use_name, id_1, ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom, objectid, id_0, id, area, perimeter, " +
                        "bl_id, bl_type, bl_frontg, bl_height, bl_depth, bl_nstorey, bl_nunit, bl_unit_f, bl_nres, bl_employ, bl_owner, bl_area, " +
                        " bl_area_f, bl_tax_id, prj_id, bl_use, bl_date, bl_matl, bl_name, bl_housen, bl_villnum, village, bl_road, bl_tb, bl_ap, " +
                        "bl_cw, bl_postc, bl_address, bl_act_maj, bl_act_min, bl_act_oth, remark_use, remark, id_copy, address_ty, addr_start, addr_end, date, " +
                        " bl_house_1, ent_id, mo_id FROM pkk.\"v_BLDG_PKK\" Where mo_id in (select distinct mo_id from pkk.\"v_BLDG_addr_point\" " +
                             " Where " + criteria + ") and " + geom_criteria;
                }
                else
                {
                    Strsql = "SELECT thname, addr, descriptions, type_name, use_name, id_1, ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom, objectid, id_0, id, area, perimeter, " +
                        "bl_id, bl_type, bl_frontg, bl_height, bl_depth, bl_nstorey, bl_nunit, bl_unit_f, bl_nres, bl_employ, bl_owner, bl_area, " +
                        " bl_area_f, bl_tax_id, prj_id, bl_use, bl_date, bl_matl, bl_name, bl_housen, bl_villnum, village, bl_road, bl_tb, bl_ap, " +
                        "bl_cw, bl_postc, bl_address, bl_act_maj, bl_act_min, bl_act_oth, remark_use, remark, id_copy, address_ty, addr_start, addr_end, date, " +
                        " bl_house_1, ent_id, mo_id FROM pkk.\"v_BLDG_PKK\" Where  " + geom_criteria;
                }
            }

            //if (criteria != "")
            //{
            //    Strsql = "SELECT thname, addr, descriptions, type_name, use_name, id_1, ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom, objectid, id_0, id, area, perimeter, " + 
            //        "bl_id, bl_type, bl_frontg, bl_height, bl_depth, bl_nstorey, bl_nunit, bl_unit_f, bl_nres, bl_employ, bl_owner, bl_area, " + 
            //        " bl_area_f, bl_tax_id, prj_id, bl_use, bl_date, bl_matl, bl_name, bl_housen, bl_villnum, village, bl_road, bl_tb, bl_ap, " + 
            //        "bl_cw, bl_postc, bl_address, bl_act_maj, bl_act_min, bl_act_oth, remark_use, remark, id_copy, address_ty, addr_start, addr_end, date, "+ 
            //        " bl_house_1, ent_id, mo_id FROM pkk.\"v_BLDG_PKK\" Where mo_id in (select distinct mo_id from pkk.\"v_BLDG_addr_point\" " + 
            //             " Where " + criteria + ")" ;
            //}
            //else
            //{
            //    Strsql = "SELECT thname, addr, descriptions, type_name, use_name, id_1, ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom, objectid, id_0, id, area, perimeter, " +
            //        "bl_id, bl_type, bl_frontg, bl_height, bl_depth, bl_nstorey, bl_nunit, bl_unit_f, bl_nres, bl_employ, bl_owner, bl_area, " +
            //        " bl_area_f, bl_tax_id, prj_id, bl_use, bl_date, bl_matl, bl_name, bl_housen, bl_villnum, village, bl_road, bl_tb, bl_ap, " +
            //        "bl_cw, bl_postc, bl_address, bl_act_maj, bl_act_min, bl_act_oth, remark_use, remark, id_copy, address_ty, addr_start, addr_end, date, " +
            //        " bl_house_1, ent_id, mo_id FROM pkk.\"v_BLDG_PKK\" ";
            //}

            Strsql = Strsql + " limit 1000";
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(Strsql, conn);

            DataSet ds = new DataSet();

            ds.Reset();
            da.Fill(ds);
            dt = ds.Tables[0];

            conn.Close();
            return dt;

        }
        public static DataTable ret_bldg_permit(DataTable dt)
        {
            

            string connstring = WebConfigurationManager.ConnectionStrings["PK_connection"].ConnectionString;

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();

            string Strsql = "";
            string tmp_cri = make_in_cri(dt);

            if (tmp_cri != "")
            {
                Strsql = "SELECT mo_id, permit_no, id " +
                        " FROM pkk.v_find_permit_by_mo_id" + " Where " + tmp_cri;
            } else
            {
                Strsql = "SELECT mo_id, permit_no, id " +
                        " FROM pkk.v_find_permit_by_mo_id";
            }

            
            Strsql = Strsql + " limit 1000";
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(Strsql, conn);

            DataSet ds = new DataSet();

            ds.Reset();
            da.Fill(ds);
            dt = ds.Tables[0];

            conn.Close();
            return dt;

        }

        public static object get_mo_id(JObject objJson)
        {
            object jsonobject = new object();
            string coor_string = "";

            string lat = (string)objJson["lat"];
            string lon = (string)objJson["lon"];
            string cri = "";

            if (lat != "" && lon != "") {
                cri = "where ST_Intersects(geom, ST_Transform(ST_GeomFromText(ST_AsText(ST_GeomFromGeoJSON('{\"type\":\"Point\",\"coordinates\":[" + lon + 
                    "," + lat + "]}')), 4326), 32647))";
                coor_string = "{\"lat\" : " + lat + ",\"lon\" :" + lon + "}";
            }

            string connstring = WebConfigurationManager.ConnectionStrings["PK_connection"].ConnectionString;

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();

            string Strsql;
            Strsql = "SELECT mo_id, ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom, " +
                        "thname, addr, descriptions FROM pkk.\"v_BLDG_PKK\"" + cri;
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(Strsql, conn);

            DataSet ds = new DataSet();

            ds.Reset();
            da.Fill(ds);
            DataTable dt = ds.Tables[0];

            string jsonstring = "";
            string mo_id_string = "";
            
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            mo_id_string = cl_jsonforleaflet.convert_to_ll_geojson(dt);


            if (mo_id_string == "")
            {
                mo_id_string = "null";
            }

            if (coor_string == "")
            {
                coor_string = "null";
            }

            jsonstring = "{ \"mo_id_json\" : " + mo_id_string + ", \"lat_lon_json\" : " + coor_string + " }";

            jsonobject = serializer.DeserializeObject(jsonstring);


            return jsonobject;
        }
        public static object get_permit_no(JObject objJson)
        {
            object jsonobject = new object();
            string coor_string = "";

            string mo_id = (string)objJson["mo_id"];
            
            string cri = "";
            if (mo_id != "")
            {
                cri = " where mo_id = '" + mo_id + "'"; 
            }

            string connstring = WebConfigurationManager.ConnectionStrings["PK_connection"].ConnectionString;

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();

            string Strsql;
            Strsql = "SELECT mo_id, permit_no, id " +
                        " FROM pkk.v_find_permit_by_mo_id" + cri;
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(Strsql, conn);

            DataSet ds = new DataSet();

            ds.Reset();
            da.Fill(ds);
            DataTable dt = ds.Tables[0];

            string jsonstring = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();

            jsonstring = cl_jsonforleaflet.convert_to_simple_json(dt);
            jsonobject = serializer.DeserializeObject(jsonstring);


            return jsonobject;
        }

        public static object get_permit_shape(JObject objJson)
        {
            object jsonobject = new object();

            string keyword = (string)objJson["keyword"];
            if  (keyword != "")
            {
                keyword = " where permit_no like '%" + keyword + "%'";
            }

            //string cri = make_addr_criteria(objJson);
            //string geom_cri = make_geom_criteria(objJson);

            DataTable dt_grid = ret_permit_for_show_grid(keyword);
            DataTable dt_map = ret_permit_bldg(keyword);

            string jsonstring = "";
            string gridstring = "";
            string mapstring = "";
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            gridstring = cl_jsonforleaflet.convert_to_ll_geojson(dt_grid);
            mapstring = cl_jsonforleaflet.convert_to_ll_geojson(dt_map);

            if (gridstring == "")
            {
                gridstring = "null";
            }

            if (mapstring == "")
            {
                mapstring = "null";
            }

            jsonstring = "{ \"map_json\" : " + mapstring + ", \"grid_json\" : " + gridstring + " }";
            jsonstring = jsonstring.Replace("1.#INF", "0.00");
            jsonobject = serializer.DeserializeObject(jsonstring);


            return jsonobject;
        }
        public static DataTable ret_permit_for_show_grid(string criteria)
        {
            DataTable dt = new DataTable();

            string connstring = WebConfigurationManager.ConnectionStrings["PK_connection"].ConnectionString;

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();

            string Strsql;
            Strsql = "SELECT pkk.v_search_permit.id, mo_id, permit_no, concat('ใบอนุญาตเลขที่ ' , permit_no ) AS thname, " +
             "   concat(bldg_address, '', bldg_moo, ' ', bldg_soi, ' ',  " +
             "   bldg_road, ' ', bldg_tumbol, ' ', bldg_city, ' ', bldg_province) AS addr,  " +
             "   concat('ขอโดย ' , req_name) AS descriptions, lat, lon,  " +
             //"   ST_AsGeoJSON(ST_Transform(v_search_permit.geom, 4326)) as geom  " +
             "   ST_AsGeoJSON(ST_Transform(pkk.\"v_BLDG_addr_search\".cen_geom, 4326)) as geom  " +
             //"   ST_AsGeoJSON(ST_Transform(pkk.\"v_BLDG_addr_search\".pol_geom, 4326)) as pol_geom  " +
             "   FROM pkk.v_search_permit left join pkk.\"v_BLDG_addr_search\" on  " +
             "       pkk.v_search_permit.bl_housen = pkk.\"v_BLDG_addr_search\".bl_housen and  " +
             "       pkk.v_search_permit.mu = pkk.\"v_BLDG_addr_search\".bl_villnum and  " +
             "       pkk.v_search_permit.tambol = pkk.\"v_BLDG_addr_search\".bl_tb  " + criteria;

            Strsql = Strsql + " limit 500";
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(Strsql, conn);

            DataSet ds = new DataSet();

            ds.Reset();
            da.Fill(ds);
            dt = ds.Tables[0];

            conn.Close();
            return dt;

        }
        public static DataTable ret_permit_bldg(string criteria)
        {
            DataTable dt = new DataTable();


            string connstring = WebConfigurationManager.ConnectionStrings["PK_connection"].ConnectionString;

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();

            string Strsql;

            Strsql = "SELECT thname, addr, descriptions, type_name, use_name, id_1, ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom, objectid, id_0, id, area, perimeter, " +
                        "bl_id, bl_type, bl_frontg, bl_height, bl_depth, bl_nstorey, bl_nunit, bl_unit_f, bl_nres, bl_employ, bl_owner, bl_area, " +
                        " bl_area_f, bl_tax_id, prj_id, bl_use, bl_date, bl_matl, bl_name, bl_housen, bl_villnum, village, bl_road, bl_tb, bl_ap, " +
                        "bl_cw, bl_postc, bl_address, bl_act_maj, bl_act_min, bl_act_oth, remark_use, remark, id_copy, address_ty, addr_start, addr_end, date, " +
                        " bl_house_1, ent_id, mo_id FROM pkk.\"v_BLDG_PKK\"  " +
                        " where mo_id in ( SELECT distinct mo_id " +
                           " FROM pkk.v_search_permit left join pkk.\"v_BLDG_addr_point\" on " +
                           " pkk.v_search_permit.bl_housen = pkk.\"v_BLDG_addr_point\".bl_housen and  " +
                           " pkk.v_search_permit.mu = pkk.\"v_BLDG_addr_point\".bl_villnum and  " +
                           " pkk.v_search_permit.tambol = pkk.\"v_BLDG_addr_point\".bl_tb " + criteria + ")";


            Strsql = Strsql + " limit 500";
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(Strsql, conn);

            DataSet ds = new DataSet();

            ds.Reset();
            da.Fill(ds);
            dt = ds.Tables[0];

            conn.Close();
            return dt;

        }

        public static object get_ent_shape(JObject objJson)
        {
            object jsonobject = new object();

            string keyword = (string)objJson["rid"];
            if (keyword != "")
            {
                keyword = " where permit_no like '%" + keyword + "%'";
            }

            //string cri = make_addr_criteria(objJson);
            //string geom_cri = make_geom_criteria(objJson);

            DataTable dt_grid = ret_permit_for_show_grid(keyword);
            DataTable dt_map = ret_permit_bldg(keyword);

            string jsonstring = "";
            string gridstring = "";
            string mapstring = "";
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            gridstring = cl_jsonforleaflet.convert_to_ll_geojson(dt_grid);
            mapstring = cl_jsonforleaflet.convert_to_ll_geojson(dt_map);

            if (gridstring == "")
            {
                gridstring = "null";
            }

            if (mapstring == "")
            {
                mapstring = "null";
            }

            jsonstring = "{ \"map_json\" : " + mapstring + ", \"grid_json\" : " + gridstring + " }";
            jsonstring = jsonstring.Replace("1.#INF", "0.00");
            jsonobject = serializer.DeserializeObject(jsonstring);


            return jsonobject;
        }
        public static DataTable ret_ent_for_show_grid(string criteria)
        {
            DataTable dt = new DataTable();

            string connstring = WebConfigurationManager.ConnectionStrings["PK_connection"].ConnectionString;

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();

            string Strsql;
            Strsql = "SELECT pkk.v_search_permit.id, mo_id, permit_no, concat('ใบอนุญาตเลขที่ ' , permit_no ) AS thname, " +
             "   concat(bldg_address, '', bldg_moo, ' ', bldg_soi, ' ',  " +
             "   bldg_road, ' ', bldg_tumbol, ' ', bldg_city, ' ', bldg_province) AS addr,  " +
             "   concat('ขอโดย ' , req_name) AS descriptions, lat, lon,  " +
             //"   ST_AsGeoJSON(ST_Transform(v_search_permit.geom, 4326)) as geom  " +
             "   ST_AsGeoJSON(ST_Transform(pkk.\"v_BLDG_addr_search\".cen_geom, 4326)) as geom  " +
             //"   ST_AsGeoJSON(ST_Transform(pkk.\"v_BLDG_addr_search\".pol_geom, 4326)) as pol_geom  " +
             "   FROM pkk.v_search_permit left join pkk.\"v_BLDG_addr_search\" on  " +
             "       pkk.v_search_permit.bl_housen = pkk.\"v_BLDG_addr_search\".bl_housen and  " +
             "       pkk.v_search_permit.mu = pkk.\"v_BLDG_addr_search\".bl_villnum and  " +
             "       pkk.v_search_permit.tambol = pkk.\"v_BLDG_addr_search\".bl_tb  " + criteria;

            Strsql = Strsql + " limit 500";
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(Strsql, conn);

            DataSet ds = new DataSet();

            ds.Reset();
            da.Fill(ds);
            dt = ds.Tables[0];

            conn.Close();
            return dt;

        }
        public static DataTable ret_ent_bldg(string criteria)
        {
            DataTable dt = new DataTable();


            string connstring = WebConfigurationManager.ConnectionStrings["PK_connection"].ConnectionString;

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();

            string Strsql;

            Strsql = "SELECT thname, addr, descriptions, type_name, use_name, id_1, ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom, objectid, id_0, id, area, perimeter, " +
                        "bl_id, bl_type, bl_frontg, bl_height, bl_depth, bl_nstorey, bl_nunit, bl_unit_f, bl_nres, bl_employ, bl_owner, bl_area, " +
                        " bl_area_f, bl_tax_id, prj_id, bl_use, bl_date, bl_matl, bl_name, bl_housen, bl_villnum, village, bl_road, bl_tb, bl_ap, " +
                        "bl_cw, bl_postc, bl_address, bl_act_maj, bl_act_min, bl_act_oth, remark_use, remark, id_copy, address_ty, addr_start, addr_end, date, " +
                        " bl_house_1, ent_id, mo_id FROM pkk.\"v_BLDG_PKK\"  " +
                        " where mo_id in ( SELECT distinct mo_id " +
                           " FROM pkk.v_search_permit left join pkk.\"v_BLDG_addr_point\" on " +
                           " pkk.v_search_permit.bl_housen = pkk.\"v_BLDG_addr_point\".bl_housen and  " +
                           " pkk.v_search_permit.mu = pkk.\"v_BLDG_addr_point\".bl_villnum and  " +
                           " pkk.v_search_permit.tambol = pkk.\"v_BLDG_addr_point\".bl_tb " + criteria + ")";


            Strsql = Strsql + " limit 500";
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(Strsql, conn);

            DataSet ds = new DataSet();

            ds.Reset();
            da.Fill(ds);
            dt = ds.Tables[0];

            conn.Close();
            return dt;

        }

        public static object get_ser_shape(JObject objJson)
        {
            object jsonobject = new object();

            string keyword = (string)objJson["keyword"];
            if (keyword != "")
            {
                keyword = " where permit_no like '%" + keyword + "%'";
            }

            //string cri = make_addr_criteria(objJson);
            //string geom_cri = make_geom_criteria(objJson);

            DataTable dt_grid = ret_permit_for_show_grid(keyword);
            DataTable dt_map = ret_permit_bldg(keyword);

            string jsonstring = "";
            string gridstring = "";
            string mapstring = "";
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            gridstring = cl_jsonforleaflet.convert_to_ll_geojson(dt_grid);
            mapstring = cl_jsonforleaflet.convert_to_ll_geojson(dt_map);

            if (gridstring == "")
            {
                gridstring = "null";
            }

            if (mapstring == "")
            {
                mapstring = "null";
            }

            jsonstring = "{ \"map_json\" : " + mapstring + ", \"grid_json\" : " + gridstring + " }";
            jsonstring = jsonstring.Replace("1.#INF", "0.00");
            jsonobject = serializer.DeserializeObject(jsonstring);


            return jsonobject;
        }
        public static DataTable ret_ser_for_show_grid(string criteria)
        {
            DataTable dt = new DataTable();

            string connstring = WebConfigurationManager.ConnectionStrings["PK_connection"].ConnectionString;

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();

            string Strsql;
            Strsql = "SELECT pkk.v_search_permit.id, mo_id, permit_no, concat('ใบอนุญาตเลขที่ ' , permit_no ) AS thname, " +
             "   concat(bldg_address, '', bldg_moo, ' ', bldg_soi, ' ',  " +
             "   bldg_road, ' ', bldg_tumbol, ' ', bldg_city, ' ', bldg_province) AS addr,  " +
             "   concat('ขอโดย ' , req_name) AS descriptions, lat, lon,  " +
             //"   ST_AsGeoJSON(ST_Transform(v_search_permit.geom, 4326)) as geom  " +
             "   ST_AsGeoJSON(ST_Transform(pkk.\"v_BLDG_addr_search\".cen_geom, 4326)) as geom  " +
             //"   ST_AsGeoJSON(ST_Transform(pkk.\"v_BLDG_addr_search\".pol_geom, 4326)) as pol_geom  " +
             "   FROM pkk.v_search_permit left join pkk.\"v_BLDG_addr_search\" on  " +
             "       pkk.v_search_permit.bl_housen = pkk.\"v_BLDG_addr_search\".bl_housen and  " +
             "       pkk.v_search_permit.mu = pkk.\"v_BLDG_addr_search\".bl_villnum and  " +
             "       pkk.v_search_permit.tambol = pkk.\"v_BLDG_addr_search\".bl_tb  " + criteria;

            Strsql = Strsql + " limit 500";
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(Strsql, conn);

            DataSet ds = new DataSet();

            ds.Reset();
            da.Fill(ds);
            dt = ds.Tables[0];

            conn.Close();
            return dt;

        }
        public static DataTable ret_ser_bldg(string criteria)
        {
            DataTable dt = new DataTable();


            string connstring = WebConfigurationManager.ConnectionStrings["PK_connection"].ConnectionString;

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();

            string Strsql;

            Strsql = "SELECT thname, addr, descriptions, type_name, use_name, id_1, ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom, objectid, id_0, id, area, perimeter, " +
                        "bl_id, bl_type, bl_frontg, bl_height, bl_depth, bl_nstorey, bl_nunit, bl_unit_f, bl_nres, bl_employ, bl_owner, bl_area, " +
                        " bl_area_f, bl_tax_id, prj_id, bl_use, bl_date, bl_matl, bl_name, bl_housen, bl_villnum, village, bl_road, bl_tb, bl_ap, " +
                        "bl_cw, bl_postc, bl_address, bl_act_maj, bl_act_min, bl_act_oth, remark_use, remark, id_copy, address_ty, addr_start, addr_end, date, " +
                        " bl_house_1, ent_id, mo_id FROM pkk.\"v_BLDG_PKK\"  " +
                        " where mo_id in ( SELECT distinct mo_id " +
                           " FROM pkk.v_search_permit left join pkk.\"v_BLDG_addr_point\" on " +
                           " pkk.v_search_permit.bl_housen = pkk.\"v_BLDG_addr_point\".bl_housen and  " +
                           " pkk.v_search_permit.mu = pkk.\"v_BLDG_addr_point\".bl_villnum and  " +
                           " pkk.v_search_permit.tambol = pkk.\"v_BLDG_addr_point\".bl_tb " + criteria + ")";


            Strsql = Strsql + " limit 500";
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(Strsql, conn);

            DataSet ds = new DataSet();

            ds.Reset();
            da.Fill(ds);
            dt = ds.Tables[0];

            conn.Close();
            return dt;

        }

        public static object get_Pandemic_shape(JObject objJson)
        {
            object jsonobject = new object();

            string lat = (string)objJson["lat"];
            string lon = (string)objJson["lon"];
            string distance_m = (string)objJson["distance_m"];
            string pand_id = (string)objJson["pand_id"];

            string cri = "";

            if (lat != "" && lon != "")
            {
                cri = " type_id = " + pand_id + " and  ST_Intersects(geom, ST_Buffer(st_transform(st_setsrid(st_makepoint(" + lon + ", " + lat + "), 4326), 32647), " + distance_m + ", ''))";
            }
            
            //string geom_cri = make_geom_criteria(objJson);

            DataTable dt_grid = ret_Pandemic_for_show_grid(cri);
            

            
            string gridstring = "";
            
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            gridstring = cl_jsonforleaflet.convert_to_ll_geojson(dt_grid);
            

            if (gridstring == "")
            {
                gridstring = "null";
            }

            gridstring = gridstring.Replace("1.#INF", "0.00");
            jsonobject = serializer.DeserializeObject(gridstring);
            return jsonobject;
        }
        public static DataTable ret_Pandemic_for_show_grid(string criteria)
        {
            DataTable dt = new DataTable();

            string connstring = WebConfigurationManager.ConnectionStrings["PK_connection"].ConnectionString;

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();

            string Strsql;
            Strsql = "SELECT thname, descriptions, addr, even_date, ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom " +
                "From pkk_warning.v_event_poi ";

            if (criteria != "")
            {
                Strsql = Strsql + " Where " + criteria;
            }

            Strsql = Strsql + " limit 500";
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(Strsql, conn);

            DataSet ds = new DataSet();

            ds.Reset();
            da.Fill(ds);
            dt = ds.Tables[0];

            conn.Close();
            return dt;

        }

        public static object get_interest_shape(JObject objJson)
        {
            object jsonobject = new object();

            string keyword = (string)objJson["keyword"];


            string cri = "";

            if (keyword != "")
            {
                cri = " thname like '%" + keyword + "%' or descriptions like '%" + keyword + "%' or addr like '%" + keyword + "%'";
            }

            //string geom_cri = make_geom_criteria(objJson);

            DataTable dt_grid = ret_interest_for_show_grid(cri);



            string gridstring = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();

            gridstring = cl_jsonforleaflet.convert_to_ll_geojson(dt_grid);


            if (gridstring == "")
            {
                gridstring = "null";
            }

            gridstring = gridstring.Replace("1.#INF", "0.00");
            jsonobject = serializer.DeserializeObject(gridstring);
            return jsonobject;
        }
        public static DataTable ret_interest_for_show_grid(string criteria)
        {
            DataTable dt = new DataTable();

            string connstring = WebConfigurationManager.ConnectionStrings["PK_connection"].ConnectionString;

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();

            string Strsql;
            Strsql = "SELECT thname, descriptions, addr,  ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom " +
                "From pkk_warning.v_interesting_poi ";

            if (criteria != "")
            {
                Strsql = Strsql + " Where " + criteria;
            }

            Strsql = Strsql + " limit 500";
            NpgsqlDataAdapter da = new NpgsqlDataAdapter(Strsql, conn);

            DataSet ds = new DataSet();

            ds.Reset();
            da.Fill(ds);
            dt = ds.Tables[0];

            conn.Close();
            return dt;

        }

        public static string make_in_cri (DataTable dt)
        {
            string tmp_in = "";

            if  (dt.Rows.Count > 0)
            {
                tmp_in = "'" + dt.Rows[0]["mo_id"].ToString() + "'" ;
                for (int i = 1; i < dt.Rows.Count;i++)
                {
                    tmp_in = tmp_in + ",'" + dt.Rows[i]["mo_id"].ToString() + "'";
                }
                tmp_in = " mo_id in (" + tmp_in + ")";
            }

            return tmp_in;
        }


    }
}