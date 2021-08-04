<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="frm_update_distriet.aspx.cs" Inherits="mapmng.mis.frm_update_distriet" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../css/ny1_form.css" rel="stylesheet" />
    <style type="text/css">
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>

            <div style="width: 100%">
                <div>
                    <div colspan="5" style="text-align: center">ที่ดินที่ไม่สามารถระบุได้</div>
                </div>
            </div>
            <div colspan="5" style="text-align: center">
                <asp:Label ID="Label1" CssClass="label_1 label_size1" runat="server" Text="เลขที่ดิน   : "></asp:Label>
                <asp:TextBox ID="txt_land_no" CssClass="text_Input textbox_size1" placeholder="...ระบุเลขโฉนด" runat="server"></asp:TextBox>

                <asp:Label ID="Label2" CssClass="label_1 label_size1" runat="server" Text="เขตที่พบ : "></asp:Label>
                <asp:TextBox ID="txt_multi_distinict" CssClass="text_Input textbox_size1" placeholder="...ระบุเขต" runat="server"></asp:TextBox>
                <asp:CheckBox ID="ctr_distinict" CssClass="text_Input textbox_size1" AutoPostBack="true" runat="server" Text="ไม่อยู่ใน ก.ท.ม :"></asp:CheckBox>
                <br />
            </div>
        </div>
        <div>
            <div style="width: 142px">
                <div id="submit_button" class="div_inline_box" style="width: 1358px; text-align: center">
                    <asp:Button ID="btnsearch_parcel" OnClick="btnsearch_parcel_Click" CssClass="button_gray  button_size1" runat="server" Text="ค้นหา" />
                </div>
            </div>
        </div>
        <div>
            <div colspan="5">
                <div id="grid_zone" style="margin-top: 10px">
                    <asp:GridView ID="dgvResult" CssClass="grid_text" runat="server" BackColor="White"
                        BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CaptionAlign="Left"
                        CellPadding="4" ForeColor="Black" GridLines="Vertical"
                        PageSize="50" AllowPaging="True" AllowSorting="True" OnRowCommand="dgvResult_RowCommand">
                        <AlternatingRowStyle BackColor="White"/>
                        <Columns>
                            <%--<asp:TemplateField HeaderText="เลือก">
                                <EditItemTemplate>
                                    <asp:CheckBox ID="cb_select" OnCheckedChanged="cb_select_CheckedChanged" AutoPostBack="true" runat="server" />
                                </EditItemTemplate>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cb_select" OnCheckedChanged="cb_select_CheckedChanged" AutoPostBack="true" runat="server" />
                                </ItemTemplate>
                            </asp:TemplateField>--%>
                            <asp:ButtonField ButtonType="Image" CommandName="view_Map" ImageUrl="~/Images/icons/24pixel/mapbase_24.png" Text="Map" />
                            <asp:ButtonField ButtonType="Image" CommandName="view_details" ImageUrl="~/Images/icons/24pixel/search_24.png" Text="รายละเอียด" />
                            <%--<asp:TemplateField HeaderText="id">
                                <ItemTemplate>
                                      <asp:Label ID="pk_link"  runat="server"  Text='<%# Bind("gid") %>' />
                                </ItemTemplate>
                                </asp:TemplateField>--%>
                             <asp:BoundField DataField="id" HeaderText="id" />
                          
                            <asp:ButtonField ButtonType="Image" CommandName="view_Error" ImageUrl="" Text="error" />
                        </Columns>
                        <FooterStyle BackColor="#b9edb2" />
                        <HeaderStyle BackColor="#058733" Font-Bold="True" ForeColor="White" Font-Size="16px" />
                        <PagerSettings Position="TopAndBottom" />
                        <PagerStyle BackColor="#e4fad4" ForeColor="Black" HorizontalAlign="Left" />
                        <RowStyle BackColor="#e4fad4" HorizontalAlign="Left" VerticalAlign="Top"
                            Wrap="False" />
                        <SelectedRowStyle BackColor="#edce68" Font-Bold="True" ForeColor="White" />
                        <SortedAscendingCellStyle BackColor="#FBFBF2" />
                        <SortedAscendingHeaderStyle BackColor="#848384" />
                        <SortedDescendingCellStyle BackColor="#EAEAD3" />
                        <SortedDescendingHeaderStyle BackColor="#575357" />
                    </asp:GridView>
                </div>
            </div>
        </div>
        <div>
            <div style="height: 29px; width: 142px"></div>
            <div colspan="3" style="height: 29px">
                <asp:Panel ID="Panel1" runat="server">
                    <div class="row" style="text-align: center">
                        <asp:Label ID="Label3" runat="server" Text="เขตที่ระบุ     "></asp:Label>
                        <asp:DropDownList ID="ddl_dist" CssClass="text_Input textbox_size1" runat="server" OnSelectedIndexChanged="ddl_dist_SelectedIndexChanged" DataTextField="district_n" AutoPostBack="true" DataValueField="district_i" Width="195px"></asp:DropDownList>
                    </div>
                </asp:Panel>
            </div>
            <div style="height: 29px"></div>
        </div>

        <div>
            <div style="height: 29px; width: 142px">&nbsp;</div>
            <div colspan="3" style="height: 29px">
                <asp:Panel ID="Panel2" runat="server">
                    <div class="row" style="text-align: center">
                        <asp:Label ID="Label4" runat="server" Text="แขวงที่ระบุ     "></asp:Label>
                        <asp:DropDownList ID="ddl_subdistk" runat="server" DataTextField="subdistr_1" DataValueField="subdistric" CssClass="text_Input textbox_size1" AutoPostBack="true" Height="16px" Width="186px"></asp:DropDownList>
                    </div>
                </asp:Panel>
            </div>
        </div>

        <div>
            <div style="height: 29px; width: 142px">&nbsp;</div>
            <div colspan="3" style="height: 29px">
                <asp:Panel ID="Panel3" runat="server">
                    <div class="row" style="text-align: center">

                        <asp:Button ID="btn_update" OnClick="btn_update_Click" CssClass="button_gray  button_size1" runat="server" Text="Upadte" />
                    </div>
                </asp:Panel>
            </div>
            <div style="height: 29px">&nbsp;</div>
        </div>
    </form>
</body>
</html>
