using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using Newtonsoft.Json.Linq;

namespace mapmng
{
    public class cl_distributer
    {
        public static object distribute_function(string functionname, object jsonparam, string return_functionname)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            object res = new { };
            JObject jsontmp = new JObject();
            switch (functionname)
            {
                case "get_bldg_shape":
                    
                    {
                        jsontmp = JObject.FromObject(jsonparam);// JObject.Parse(jsonparam);
                        res = new
                        {
                            functionname = functionname,
                            return_functionname = return_functionname,
                            data = cl_find_geometry.get_bldg_shape(jsontmp)
                        };
                        

                    }
                    break;
                case "test_nut_div":    
                    {
                        //jsontmp = JObject.FromObject(jsonparam);// JObject.Parse(jsonparam);
                        //res = new
                        //{
                        //    functionname = functionname,
                        //    return_functionname = return_functionname,
                        //    data = cl_gen_div.gen_div(jsontmp)
                        //};


                    }
                    break;
                case "get_mo_id":
                    {
                        jsontmp = JObject.FromObject(jsonparam);// JObject.Parse(jsonparam);
                        res = new
                        {
                            functionname = functionname,
                            return_functionname = return_functionname,
                            data = cl_find_geometry.get_mo_id(jsontmp)
                        };


                    }
                    break;
                case "get_bldg_from_aprv":
                    {
                        jsontmp = JObject.FromObject(jsonparam);// JObject.Parse(jsonparam);
                        res = new
                        {
                            functionname = functionname,
                            return_functionname = return_functionname,
                            data = cl_find_geometry.get_permit_shape(jsontmp)
                        };


                    }
                    break;
                case "get_permit":
                    {
                        jsontmp = JObject.FromObject(jsonparam);// JObject.Parse(jsonparam);
                        res = new
                        {
                            functionname = functionname,
                            return_functionname = return_functionname,
                            data = cl_find_geometry.get_permit_no(jsontmp)
                        };


                    }
                    break;
                case "get_toc_list":

                    {
                        //jsontmp = JObject.FromObject(jsonparam);// JObject.Parse(jsonparam);
                        res = new
                        {
                            functionname = functionname,
                            return_functionname = return_functionname,
                            data = cl_find_geometry.get_toc_list()
                        };


                    }
                    break;
                case "get_pandemic":

                    {
                        jsontmp = JObject.FromObject(jsonparam);// JObject.Parse(jsonparam);
                        res = new
                        {
                            functionname = functionname,
                            return_functionname = return_functionname,
                            data = cl_find_geometry.get_Pandemic_shape(jsontmp)
                        };


                    }
                    break;
                case "get_interest":

                    {
                        jsontmp = JObject.FromObject(jsonparam);// JObject.Parse(jsonparam);
                        res = new
                        {
                            functionname = functionname,
                            return_functionname = return_functionname,
                            data = cl_find_geometry.get_interest_shape(jsontmp)
                        };


                    }
                    break;
                default:
                    {

                    }
                    break;
            }

            return res;

        }
    }
}