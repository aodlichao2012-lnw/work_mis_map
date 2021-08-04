using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace mapmng
{
    public class cl_jsonforleaflet
    {


        public static string convert_to_ll_geojson(DataTable dt)
        {
            string res = "";

            string prefix = "{\"type\":\"FeatureCollection\",\"features\":[";
            string eachrow = "";
            string allrow = "";
            string subfix = "]}";
            try
            {

            
            if (dt.Rows.Count > 0) { 
            
                for (var i = 0; i < dt.Rows.Count; i++)
                {
                    if (dt.Rows[i]["geom"] != DBNull.Value && dt.Rows[i]["geom"] != null)
                    { try
                        {
                            eachrow = "{\"type\":\"Feature\",\"geometry\":" + dt.Rows[i]["geom"].ToString() + ",\"properties\":{";
                        } catch (Exception ex)
                        {
                            eachrow = "{\"type\":\"Feature\",\"geometry\":null,\"properties\":{";
                        }
                        
                    } else
                    {
                        eachrow = "{\"type\":\"Feature\",\"geometry\":null,\"properties\":{";
                    }
                
                    foreach (DataColumn dcol in dt.Columns)
                    {
                        if (dcol.ColumnName != "geom")
                        {
                            if (dt.Rows[i][dcol.ColumnName] != DBNull.Value && dt.Rows[i][dcol.ColumnName] != null)
                            {
                                try
                                {
                                    eachrow = eachrow + "\"" + dcol.ColumnName + "\":\"" + dt.Rows[i][dcol.ColumnName].ToString() + "\",";
                                }
                                catch (Exception ex)
                                {
                                    eachrow = eachrow + "\"" + dcol.ColumnName + "\":\"" + ex.Message + "\",";
                                }
                                    
                            }
                            else
                            {
                                eachrow = eachrow + "\"" + dcol.ColumnName + "\":\"\",";
                            }
                            
                        }
                    }
                    
                    eachrow = eachrow.Replace("\\", "\\\\");
                    eachrow = eachrow.Substring(0, eachrow.Length - 1) + "}}";
                    allrow = allrow + eachrow + ",";
                }

                allrow = allrow.Substring(0, allrow.Length - 1);
                res = prefix + allrow + subfix;
            }

            }
            catch (Exception ex)
            {
                res = ex.Message;
            }

            return res;
        }

        public static string convert_to_simple_json(DataTable dt)
        {
            string res = "";

            string prefix = "[";
            string eachrow = "";
            string allrow = "";
            string subfix = "]";
            for (var i = 0; i < dt.Rows.Count; i++)
            {
                eachrow = "{";
                foreach (DataColumn dcol in dt.Columns)
                {
                    if (dcol.DataType == typeof(System.Single)
                         || dcol.DataType == typeof(System.Double)
                         || dcol.DataType == typeof(System.Decimal)
                         || dcol.DataType == typeof(System.Byte)
                         || dcol.DataType == typeof(System.Int16)
                         || dcol.DataType == typeof(System.Int32)
                         || dcol.DataType == typeof(System.Int64))
                    {
                        eachrow = eachrow + "\"" + dcol.ColumnName + "\":" + dt.Rows[i][dcol.ColumnName].ToString() + ",";
                    }
                    else
                    {
                        eachrow = eachrow + "\"" + dcol.ColumnName + "\":\"" + dt.Rows[i][dcol.ColumnName].ToString() + "\",";
                    }
                    
                   
                }
                //eachrow = eachrow.Replace("D:", "D");
                eachrow = eachrow.Replace("\\", "\\\\");
                eachrow = eachrow.Substring(0, eachrow.Length - 1) + "}";
                allrow = allrow + eachrow + ",";
            }
            if (allrow.Length > 0)
            {
                allrow = allrow.Substring(0, allrow.Length - 1);
            } 
            
            res = prefix + allrow + subfix;

            return res;
        }

    }
}