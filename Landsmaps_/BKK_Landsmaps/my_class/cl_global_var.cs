using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace mapmng
{
    public class cl_global_var
    {

            public string user_group_id
            {
                get
                {
                    try {
                        return HttpContext.Current.Session["group_id"].ToString();
                    }
                    catch
                    {   return "7"; }
                }
            }

            public string user_dept_id
            {
                get
                {
                    try
                    {
                        return HttpContext.Current.Session["dept_id"].ToString();
                    }
                    catch
                    { return "329"; }
                }
            }

            public string user_search_mm
            {
                get
                {
                    try
                    {
                        return HttpContext.Current.Session["s_mm"].ToString();
                    }
                    catch
                    { return "12"; }
                }
            }

            public string user_search_yy
            {
                get
                {
                    try
                    {
                        return HttpContext.Current.Session["s_yy"].ToString();
                    }
                    catch
                    { return "2019"; }
                }
            }

            
    }
}