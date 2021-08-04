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
    public partial class frm_update_distriet : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                Panel1.Visible = false;
                Panel2.Visible = false;
                Panel3.Visible = false;
                dgvResult.DataSource = get_data();
                dgvResult.DataBind();
            }
        }
        private DataTable get_data(string criteria = "")
        {
            try
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
                    strsql = "SELECT * FROM public.v_current_sec92_not_set_dist Where " + criteria + " and  area_id = " + global_variable.user_group_id +
                         " and area_code = " + global_variable.user_dept_id + " LIMIT 100";
                }
                else
                {
                    strsql = "SELECT * FROM public.v_current_sec92_not_set_dist Where  area_id = " + global_variable.user_group_id +
                   " and area_code = " + global_variable.user_dept_id + " LIMIT 100";
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
            catch
            {

                Response.Write("<script>alert('กรุณาเลือกข้อมูลให้ถูกต้อง');</script>");
                return null;
            }
        }
        protected void btnsearch_parcel_Click(object sender, EventArgs e)
        {
            string cri = make_string_criteria();

            dgvResult.DataSource = get_data(cri);
            dgvResult.DataBind();
        }

        private string make_string_criteria()
        {
            try
            {
                string res = "";

                if (txt_land_no.Text != "")
                {
                    res = " land_no = " + my_functions.pre_str("" + txt_land_no.Text + "") + " ";
                }

                if (txt_multi_distinict.Text != "")
                {
                    if (res != "")
                    {
                        res = res + " and  multi_district like " + my_functions.pre_str("%" + txt_multi_distinict.Text + "%") + " ";
                    }
                    else
                    {
                        res = " fname multi_district " + my_functions.pre_str("%" + txt_multi_distinict.Text + "%") + " ";
                    }
                }

                if (ctr_distinict.Checked)
                {
                    if (res != "")
                    {
                        res = res + " and ctr_subdist = 0 ";
                    }
                    else
                    {
                        res = "ctr_subdist = 0 ";
                    }

                }

                return res;
            }
            catch
            {
                Response.Write("<script>alert('กรุณาเลือกข้อมูลให้ถูกต้อง');</script>");
                return null;
            }
        }

        protected void btn_update_Click(object sender, EventArgs e)
        {
            try
            {
                    //CheckBox checkbox = gvrow.FindControl("cb_select") as CheckBox;
                    //if (checkbox.Checked)
                    //{
                        //Label id = gvrow.FindControl("pk_link") as Label;

                        string s_distinict_i = !ddl_dist.SelectedItem.Value.Equals("")
                            ? ddl_dist.SelectedItem.Value : "null";
                        string s_distinict_n = !ddl_dist.SelectedItem.Text.Equals("")
                            ? ddl_dist.SelectedItem.Text : "null";
                        string s_distinictka_i = !ddl_subdistk.SelectedItem.Value.Equals("")
                         ? ddl_subdistk.SelectedItem.Value : "null";
                        string s_distinictka_n = !ddl_subdistk.SelectedItem.Text.Equals("")
                            ? ddl_subdistk.SelectedItem.Text : "null";
                        string sql = "UPDATE public.cur_sec92_shp " +
                                     "SET subdistrict_id = '" + s_distinict_i + "' , subdistrict_name = '" + s_distinict_n + "'" +
                                     ", district_id = '" + s_distinictka_i + "' , district_name = '" + s_distinictka_n + "' " +
                                     "WHERE id = " + Session["id"] + "";
                string connstring = WebConfigurationManager.ConnectionStrings["bkk_con"].ConnectionString;
                NpgsqlConnection conn = new NpgsqlConnection(connstring);
                conn.Open();

                NpgsqlCommand objcmd = new NpgsqlCommand(sql, conn);
                objcmd.CommandType = CommandType.Text;

                NpgsqlDataReader dr = objcmd.ExecuteReader();

                Response.Redirect(@"frm_update_distriet.aspx");
            }
            catch
            {
                Response.Write("<script>alert('กรุณาเลือกข้อมูลให้ถูกต้อง');</script>");
            }
        }
        public void set_combo()
        {
            try
            {
                ddl_dist.DataSource = getdata_combo("SELECT district_i, district_n FROM public.admin_district order by district_i");
                ddl_dist.DataBind();

                Panel1.Visible = true;
                Panel2.Visible = true;
                Panel3.Visible = true;
            }
            catch
            {
                Response.Write("<script>alert('กรุณาเลือกข้อมูลให้ถูกต้อง');</script>");
            }
         
        }
        //protected void cb_select_CheckedChanged(object sender, EventArgs e)
        //{
        //    try
        //    {
        //        ddl_dist.DataSource = getdata_combo("SELECT district_i, district_n FROM public.admin_district order by district_i");
        //        ddl_dist.DataBind();

        //        Panel1.Visible = true;
        //        Panel2.Visible = true;
        //        Panel3.Visible = true;
        //    }
        //    catch
        //    {
        //        Response.Write("<script>alert('กรุณาเลือกข้อมูลให้ถูกต้อง');</script>");
        //    }
        //}


        #region combo รวม แยก พารามิเตอร์
        public DataTable getdata_combo(string sql)
        {
            DataTable dt = new DataTable();
            string connstring = WebConfigurationManager.ConnectionStrings["bkk_con"].ConnectionString;
            cl_global_var global_variable = new cl_global_var();

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();

            NpgsqlCommand objcmd = new NpgsqlCommand(sql, conn);
            objcmd.CommandType = CommandType.Text;

            NpgsqlDataReader dr = objcmd.ExecuteReader();

            if (dr.HasRows)
            {
                dt.Load(dr);

            }
            return dt;
        }
        #endregion

        protected void ddl_dist_SelectedIndexChanged(object sender, EventArgs e)
        {
            ddl_subdistk.DataSource = getdata_combo("SELECT subdistric , subdistr_1  FROM public.admin_subdis_bnd where district_i = " + ddl_dist.SelectedItem.Value + " ");
            ddl_subdistk.DataBind();
        }

        protected void dgvResult_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            int rowindex = Convert.ToInt32(e.CommandArgument);
            dgvResult.SelectedIndex = rowindex;
            int index = 0;
            if (e.CommandName == "view_details")
            {
                index = my_functions.GetColumnIndexByHeaderText(dgvResult, "id");
                index = my_functions.GetColumnIndexByDBName(dgvResult, "id");
                //Session["id"] = dgvResult.SelectedRow.Cells[6].Text;
                GridViewRow row = dgvResult.SelectedRow;
                Session["id"] = row.Cells[index].Text;
                set_combo();
            }
        }
    }
}