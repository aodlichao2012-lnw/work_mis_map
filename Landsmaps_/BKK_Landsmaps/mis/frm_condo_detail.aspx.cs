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
    public partial class frm_condo_detail : System.Web.UI.Page
    {
        public string reg = "";
        public string area = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            reg = Session["regno"].ToString();
            area = Session["area"].ToString();
            if (!Page.IsPostBack)
            {
                //getcondo(reg, area);
                GridView1.DataSource = get_data("reg_no = '" + reg + "' and area_code = '" + area + "' and");
                GridView1.DataBind();
            }
        }

        public void getcondo(string reg, string area)
        {
            string connstring = WebConfigurationManager.ConnectionStrings["bkk_con"].ConnectionString;

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();
            string strsql;
            strsql = "SELECT * FROM public.v_current_condo_room where reg_no = '" + reg + "' and area_code = '" + area + "' order by floor_no , room_no , line_no";

            NpgsqlCommand objcmd = new NpgsqlCommand(strsql, conn);
            objcmd.CommandType = CommandType.Text;

            NpgsqlDataReader dr = objcmd.ExecuteReader();

            if (dr.HasRows)
            {
                dr.Read();
                GridView1.DataSource = dr;
                GridView1.DataBind();

            }
            conn.Close();
        }

        protected void btnsearch_parcel_Click(object sender, EventArgs e)
        {
            string cri = make_string_criteria();

            GridView1.DataSource = get_data(cri);
            GridView1.DataBind();
        }

        private string make_string_criteria()
        {
            string res = "";

            if (fname.Text != "")
            {
                res = " fname like " + my_functions.pre_str("%" + fname.Text + "%")+" and ";
            }

            if (lname.Text != "")
            {
                if (res != "")
                {
                    res = res + " and  lname like " + my_functions.pre_str("%" + lname.Text + "%") + " and ";
                }
                else
                {
                    res = " and lname like " + my_functions.pre_str("%" + lname.Text + "%") + " and ";
                }
            }
            if (floor_no.Text != "")
            {
                res = res + "floor_no = '" + floor_no.Text + "' and";
            }
            if(room_no.Text != "")
            {
                res = res + " room_no = '" + room_no.Text + "' and";
            }
            if(pers_id.Text != "")
            {
                res = res + " pers_id = '" + pers_id.Text + "' and";
            }


            return res;
        }

        private DataTable get_data(string criteria = "")
        {
            string connstring = WebConfigurationManager.ConnectionStrings["bkk_con"].ConnectionString;
            DataTable res = new DataTable();
            // *** ตัวแปรกลาง สำหรับใช้ทั้งโปรจก ** 
            cl_global_var global_variable = new cl_global_var();

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();

            string strsql;

            if (criteria != "")
            {
                strsql = "SELECT * FROM public.v_current_condo_room Where " + criteria + " area_id = " + global_variable.user_group_id +
                     " and area_code = '" + global_variable.user_dept_id + "' LIMIT 100";
            }

            else
            {
                strsql = "SELECT * FROM  public.v_current_condo_room Where  area_id = " + global_variable.user_group_id +
               " and area_code = '" + global_variable.user_dept_id + "' LIMIT 100";
            }


            NpgsqlCommand objcmd = new NpgsqlCommand(strsql, conn);
            objcmd.CommandType = CommandType.Text;

            NpgsqlDataReader dr = objcmd.ExecuteReader();

            if (dr.HasRows)
            {
                res.Load(dr);

            }

            return res;
        }
    }
}