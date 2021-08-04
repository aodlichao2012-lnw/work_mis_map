<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="frm_hist_ sec10_condoroom.aspx.cs" Inherits="mapmng.mis.frm_hist__sec10_condoroom" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
       <link href="../css/ny1_form.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <%--ส่วนค้นหา--%>
            <div class="div_inline_box">
                <asp:Label runat="server">เดือน</asp:Label>
                <asp:DropDownList CssClass="text_Input textbox_size1" ID="dd1_month" runat="server">
                    <asp:ListItem Value="1">มกราคม</asp:ListItem>
                    <asp:ListItem Value="2">กุมภาพันธ์</asp:ListItem>
                    <asp:ListItem Value="3">มีนาคม</asp:ListItem>
                    <asp:ListItem Value="4">เมษายน</asp:ListItem>
                    <asp:ListItem Value="5">พฤษภาคม</asp:ListItem>
                    <asp:ListItem Value="6">มิถุนายน</asp:ListItem>
                    <asp:ListItem Value="7">กรกฎาคม</asp:ListItem>
                    <asp:ListItem Value="8">สิงหาคม</asp:ListItem>
                    <asp:ListItem Value="9">กันยายน</asp:ListItem>
                    <asp:ListItem Value="10">ตุลาคม</asp:ListItem>
                    <asp:ListItem Value="11">พฤศจิกายน</asp:ListItem>
                    <asp:ListItem Value="12">ธันวาคม</asp:ListItem>
                </asp:DropDownList>
            </div>
            <div class="div_inline_box">
                <asp:Label runat="server">ปี</asp:Label>
                <asp:DropDownList CssClass="text_Input textbox_size1" ID="dd1_year" runat="server">
                    <asp:ListItem Value="2021">2564</asp:ListItem>
                    <asp:ListItem Value="2020">2563</asp:ListItem>
                    <asp:ListItem Value="2019">2562</asp:ListItem>
                    <asp:ListItem Value="2018">2561</asp:ListItem>
                </asp:DropDownList>
            </div>

            <div class="div_inline_box">
                <asp:Label runat="server">คำค้น</asp:Label>
                <asp:TextBox ID="txt_keyword" runat="server"></asp:TextBox>
            </div>
            <div id="submit_button" class="div_inline_box">
                <asp:Button ID="btnsearch_parcel" CssClass="button_gray  button_size1" runat="server" Text="ค้นหา" OnClick="btnsearch_parcel_Click" />
            </div>
            <%--ส่วนแสดงผล--%>

            <div id="grid_zone" style="margin-top: 10px">
                <asp:GridView ID="dgvResult" CssClass="grid_text" runat="server" BackColor="White"
                    BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CaptionAlign="Left"
                    CellPadding="4" ForeColor="Black" GridLines="Vertical"
                    PageSize="50" AllowPaging="True" AllowSorting="True">
                    <AlternatingRowStyle BackColor="White" />
                    <%--  <Columns>
                        <asp:ButtonField ButtonType="Image" CommandName="view_Map" ImageUrl="~/Images/icons/24pixel/mapbase_24.png" Text="Map" />
                        <asp:ButtonField ButtonType="Image" CommandName="view_details" ImageUrl="~/Images/icons/24pixel/search_24.png" Text="รายละเอียด" />
                        <asp:ButtonField ButtonType="Image" CommandName="view_Error" ImageUrl="" Text="error" />
                        <asp:BoundField DataField="area_code" HeaderText="area_code" />
                        <asp:BoundField DataField="reg_no" HeaderText="reg_no" />
                    </Columns>--%>
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
    </form>
</body>
</html>
