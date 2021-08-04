using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;
using Npgsql;

namespace mapmng.mis
{
    public partial class frm_section_92_details : System.Web.UI.Page
    {
        public string pkk_link = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            pkk_link = Session["id"].ToString();
            if (!Page.IsPostBack)
            {
                getdata(pkk_link);

                GridView2.DataSource = getrenter(pkk_link);
                GridView2.DataBind();
                GridView1.DataSource = getowner(pkk_link);
                GridView1.DataBind();
            }
        }

        public void getdata(string pkk)
        {
            string connstring = WebConfigurationManager.ConnectionStrings["bkk_con"].ConnectionString;

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();
            string strsql;
            strsql = "SELECT * FROM public.v_current_sec92_properties where pk_link = '" + pkk_link + "'";

            NpgsqlCommand objcmd = new NpgsqlCommand(strsql, conn);
            objcmd.CommandType = CommandType.Text;

            NpgsqlDataReader dr = objcmd.ExecuteReader();

            if (dr.HasRows)
            {
                dr.Read();
                PARCEL_NO.Text = dr["PARCEL_NO"].ToString();
                NGAN0.Text = dr["NGAN"].ToString();
                WA0.Text = dr["WA"].ToString();
                SUBWA0.Text = dr["SUBWA"].ToString();
                //REG_CODE0.Text = dr["REG_CODE"].ToString();
                //REG_DATE0.Text = dr["REG_DATE"].ToString();
                //REG_AMT0.Text = dr["REG_AMT"].ToString();
                //Branch_ID0.Text = dr["Branch_ID"].ToString();
                //Branch_NAME0.Text = dr["Branch_NAME"].ToString();
                //SUBDISTRICT_ID0.Text = dr["SUBDISTRICT_ID"].ToString();
                //SUBDISTRICT_NAME0.Text = dr["SUBDISTRICT_NAME"].ToString();
                //DISTRICT_ID0.Text = dr["DISTRICT_ID"].ToString();
                //DISTRICT_NAME0.Text = dr["DISTRICT_NAME"].ToString();
                //CHANGWAT_ID0.Text = dr["CHANGWAT_ID"].ToString();
                //CHANGWAT_NAME0.Text = dr["CHANGWAT_NAME"].ToString();
                UTM_MAP1.Text = dr["UTM_MAP1"].ToString();
                UTM_MAP2.Text = dr["UTM_MAP2"].ToString();
                UTM_MAP3.Text = dr["UTM_MAP3"].ToString();
                UTM_MAP4.Text = dr["UTM_MAP4"].ToString();
                UTM_SCALE.Text = dr["UTM_SCALE"].ToString();
                LAND_NO.Text = dr["LAND_NO"].ToString();
                TAMBOL.Text = dr["TAMBOL"].ToString();
                SURVEY_NO.Text = dr["SURVEY_NO"].ToString();
                RAI.Text = dr["RAI"].ToString();
            }
            conn.Close();
        }

        public DataTable getowner(string pkk)
        {
            DataTable dt = new DataTable();
            string connstring = WebConfigurationManager.ConnectionStrings["bkk_con"].ConnectionString;

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();
            string strsql;
            strsql = "SELECT pk_link, line_no , pers_id , title , fname , lname , own_no  , own_moo  , own_soi  , own_village , own_road , own_tambol , own_amphur , own_province , own_tel  FROM public.v_current_sec92_owner where pk_link = '" + pkk + "' order by line_no";

            NpgsqlCommand objcmd = new NpgsqlCommand(strsql, conn);
            objcmd.CommandType = CommandType.Text;

            NpgsqlDataReader dr = objcmd.ExecuteReader();

            if (dr.HasRows)
            {
                dt.Load(dr);
                //GridView1.DataSource = dr;
                //GridView1.DataBind();

            }
            conn.Close();
            return dt;
        }

        public DataTable getrenter(string pkk)
        {
            DataTable dt = new DataTable();
            string connstring = WebConfigurationManager.ConnectionStrings["bkk_con"].ConnectionString;

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();
            string strsql;
            strsql = "SELECT reg_code , reg_date , reg_amt  , lessor_lineno  , lessor_pers_id , lessor_title , lessor_fname  , lessor_lname  , lessor_hse_no  , lessor_moo  , lessor_sio  , lessor_village  , lessor_road  , lessor_tambol  , lessor_amphur  , lessor_province , lessor_tel , renter_lineno , renter_pers_id  , renter_title  , renter_fname  , renter_lname  , renter_hse_no  , renter_moo , renter_sio , renter_village  , renter_road , renter_tambol  , renter_amphur  , renter_province  , renter_tel  , area_id   , area_code  , mm  , yy , pk_link FROM public.v_current_sec92_renter where pk_link = '" + pkk + "'";

            NpgsqlCommand objcmd = new NpgsqlCommand(strsql, conn);
            objcmd.CommandType = CommandType.Text;

            NpgsqlDataReader dr = objcmd.ExecuteReader();

            if (dr.HasRows)
            {
                dt.Load(dr);
       

            }
            conn.Close();
            return dt;
        }

        protected void Menu1_MenuItemClick(object sender, MenuEventArgs e)
        {
            if (e.Item.Value == "ดูข้อมูล")
            {
                getdata(pkk_link);
                getowner(pkk_link);
                getrenter(pkk_link);
                Panel1.Visible = true;
                Panel2.Visible = true;
                Panel3.Visible = true;
            }
            else if (e.Item.Value == "New Item")
            {
                Response.Write(@"<script>window.open ('frm_condo_main.aspx','_blank');</script>");
            }
        }

    }
}
