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
    public partial class frm_hist_sec10_constr : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {

                dgvResult.DataSource = get_data();
                dgvResult.DataBind();
            }
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
                strsql = "SELECT * FROM public.sec10_constr  Where " + criteria + "   area_id = " + global_variable.user_group_id +
                      " LIMIT 100"; /*" and area_code = '" + global_variable.user_dept_id +*/
            }

            else
            {
                strsql = "SELECT * FROM public.sec10_constr  Where  area_id = " + global_variable.user_group_id +
               " LIMIT 100"; /*" and area_code = '" + global_variable.user_dept_id +*/
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

        protected void btnsearch_parcel_Click(object sender, EventArgs e)
        {
            string cri = make_string_criteria();

            dgvResult.DataSource = get_data(cri);
            dgvResult.DataBind();
        }

        private string make_string_criteria()
        {
            string res = "";

            if (dd1_month.SelectedValue != "")
            {
                res =  " mm = " + dd1_month.Text + " And ";
            }

            if (dd1_year.SelectedValue != "")
            {
                if (res != "")
                {
                    res = res + " yy = " + dd1_year.Text + " And ";
                }
                else
                {
                    res = " yy =  " + dd1_year.Text + " and ";
                }
            }
            if(txt_keyword.Text != "")
            {
                res = res + " tambol like " + my_functions.pre_str("%" + txt_keyword.Text + "%") + " or type like " + my_functions.pre_str("%" + txt_keyword.Text + "%") + " or name like "  + my_functions.pre_str(" % " + txt_keyword.Text + " % ") + " and";
            }
          

            return res;
        }

    }
}