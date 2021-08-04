<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="frm_section_92_details.aspx.cs" Inherits="mapmng.mis.frm_section_92_details" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../css/ny1_form.css" rel="stylesheet" />
</head>
<body>

    <form id="form1" runat="server">
        <div>

         <%--   เมนู--%>

            <div class="row">
                <asp:Menu ID="Menu1" runat="server" Orientation="Horizontal" Width="100%" Height="40%" StaticMenuStyle-VerticalPadding="50" StaticMenuStyle-HorizontalPadding="100" BackColor="#B5C7DE" DynamicHorizontalOffset="2" Font-Names="Verdana" Font-Size="0.8em" ForeColor="#284E98" StaticSubMenuIndent="10px" OnMenuItemClick="Menu1_MenuItemClick">
                    <DynamicHoverStyle BackColor="#284E98" ForeColor="White" />
                    <DynamicMenuItemStyle HorizontalPadding="5px" VerticalPadding="50px" />
                    <DynamicMenuStyle BackColor="#B5C7DE" />
                    <DynamicSelectedStyle BackColor="#507CD1" />
                    <Items>
                        <asp:MenuItem Text="ข้อมูลกรรมสิทธิ์" Value="ดูข้อมูล"></asp:MenuItem>
                        <asp:MenuItem Text="อาคารชุด" Value="New Item"></asp:MenuItem>
                        <asp:MenuItem Text="รูปภาพ" Value="รูปภาพ"></asp:MenuItem>
                        <asp:MenuItem Text="ข้อมูลจากการสำรวจ" Value="ข้อมูลจากการสำรวจ"></asp:MenuItem>
                    </Items>
                    <StaticHoverStyle BackColor="#284E98" ForeColor="White" />
                    <StaticMenuItemStyle HorizontalPadding="5px" VerticalPadding="2px" />
                    <StaticMenuStyle HorizontalPadding="100px" VerticalPadding="50px" />
                    <StaticSelectedStyle BackColor="#507CD1" />
                </asp:Menu>
            </div>
            <div class="row">

                <%--ข้อมูลส่วนแรก--%>

                <asp:Panel ID="Panel1" runat="server">
                    <table style="width: 85%; margin-left: 199px">
                        <tr>
                            <td style="width: 106px">
                                <asp:Label runat="server" CssClass="label_1 label_size1">เลขที่โฉนด</asp:Label></td>
                            <td style="width: 151px">
                                <asp:TextBox ID="PARCEL_NO" CssClass="text_Input textbox_size1" runat="server"></asp:TextBox></td>
                            <td rowspan="10" style="width: 472px">
                                <table>
                                    <tr>
                                        <td style="width: 209px" class="label_1 label_size1">งาน</td>
                                        <td>
                                            <asp:TextBox CssClass="text_Input textbox_size1" ID="NGAN0" runat="server"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 209px" class="label_1 label_size1">วา</td>
                                        <td>
                                            <asp:TextBox CssClass="text_Input textbox_size1" ID="WA0" runat="server"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 209px" class="label_1 label_size1">เศษวา</td>
                                        <td>
                                            <asp:TextBox CssClass="text_Input textbox_size1" ID="SUBWA0" runat="server"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 209px" class="label_1 label_size1">ประเภทการจดทะเบียน</td>
                                        <td>
                                            <asp:TextBox CssClass="text_Input textbox_size1" ID="REG_CODE0" runat="server"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 209px" class="label_1 label_size1">วันที่จดทะเบียน</td>
                                        <td>
                                            <asp:TextBox CssClass="text_Input textbox_size1" ID="REG_DATE0" runat="server"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 209px" class="label_1 label_size1">ราคาทุนทรัพย์</td>
                                        <td>
                                            <asp:TextBox CssClass="text_Input textbox_size1" ID="REG_AMT0" runat="server"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 209px" class="label_1 label_size1">รหัสสำนักงานที่ดินสาขา</td>
                                        <td>
                                            <asp:TextBox CssClass="text_Input textbox_size1" ID="Branch_ID0" runat="server"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 209px" class="label_1 label_size1">ชื่อสำนักงานที่ดินสาขา</td>
                                        <td>
                                            <asp:TextBox CssClass="text_Input textbox_size1" ID="Branch_NAME0" runat="server"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 209px" class="label_1 label_size1">รหัสแขวง</td>
                                        <td>
                                            <asp:TextBox CssClass="text_Input textbox_size1" ID="SUBDISTRICT_ID0" runat="server"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 209px" class="label_1 label_size1">ชื่อแขวง</td>
                                        <td>
                                            <asp:TextBox CssClass="text_Input textbox_size1" ID="SUBDISTRICT_NAME0" runat="server"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 209px" class="label_1 label_size1">รหัสเขต</td>
                                        <td>
                                            <asp:TextBox CssClass="text_Input textbox_size1" ID="DISTRICT_ID0" runat="server"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 209px" class="label_1 label_size1">ชื่อเขต</td>
                                        <td>
                                            <asp:TextBox CssClass="text_Input textbox_size1" ID="DISTRICT_NAME0" runat="server"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 209px" class="label_1 label_size1">รหัสจังหวัด</td>
                                        <td>
                                            <asp:TextBox CssClass="text_Input textbox_size1" ID="CHANGWAT_ID0" runat="server"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 209px" class="label_1 label_size1">ชื่อจังหวัด</td>
                                        <td>
                                            <asp:TextBox CssClass="text_Input textbox_size1" ID="CHANGWAT_NAME0" runat="server"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 106px" class="label_1 label_size1">ระวางภูมิประเทศ</td>
                            <td style="width: 151px">
                                <asp:TextBox CssClass="text_Input textbox_size1" ID="UTM_MAP1" runat="server"></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td style="width: 106px" class="label_1 label_size1">แผนที่ระวาง</td>
                            <td style="width: 151px">
                                <asp:TextBox CssClass="text_Input textbox_size1" ID="UTM_MAP2" runat="server"></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td style="width: 106px" class="label_1 label_size1">หมายเลขระวาง</td>
                            <td style="width: 151px">
                                <asp:TextBox CssClass="text_Input textbox_size1" ID="UTM_MAP3" runat="server"></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td style="width: 106px" class="label_1 label_size1">แผนที่</td>
                            <td style="width: 151px">
                                <asp:TextBox CssClass="text_Input textbox_size1" ID="UTM_MAP4" runat="server"></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td style="width: 106px" class="label_1 label_size1">มาตราส่วน</td>
                            <td style="width: 151px">
                                <asp:TextBox CssClass="text_Input textbox_size1" ID="UTM_SCALE" runat="server"></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td style="width: 106px" class="label_1 label_size1">เลขที่ดิน</td>
                            <td style="width: 151px">
                                <asp:TextBox CssClass="text_Input textbox_size1" ID="LAND_NO" runat="server"></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td style="width: 106px" class="label_1 label_size1">ตำบล</td>
                            <td style="width: 151px">
                                <asp:TextBox CssClass="text_Input textbox_size1" ID="TAMBOL" runat="server"></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td style="width: 106px" class="label_1 label_size1">หน้าสำรวจ</td>
                            <td style="width: 151px">
                                <asp:TextBox CssClass="text_Input textbox_size1" ID="SURVEY_NO" runat="server"></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td style="width: 106px" class="label_1 label_size1">ไร่</td>
                            <td style="width: 151px">
                                <asp:TextBox CssClass="text_Input textbox_size1" ID="RAI" runat="server"></asp:TextBox></td>
                        </tr>

                    </table>

                </asp:Panel>
                <div>
                 <%--   ข้อมูลส่วนที่สอง --%>

                    <asp:Panel ID="Panel2" runat="server">
                        <div id="grid_zone" style="margin-top: 10px">
                            <asp:GridView ID="GridView1" CssClass="grid_text" runat="server" BackColor="White"
                                BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CaptionAlign="Left"
                                CellPadding="4" ForeColor="Black" GridLines="Vertical"
                                PageSize="50" Style="margin-left: 0px" AutoGenerateColumns="False">
                                <AlternatingRowStyle BackColor="White" />
                                <Columns>
                                    <asp:BoundField DataField="line_no" HeaderText="ลำดับผู้ถือกรรมสิทธิ์" />
                                    <asp:BoundField DataField="pers_id" HeaderText="เลขประจำตัวประชาขน" />
                                    <asp:BoundField DataField="title" HeaderText="คำนำหน้า" />
                                    <asp:BoundField DataField="fname" HeaderText="ชื่อ" />
                                    <asp:BoundField DataField="lname" HeaderText="นามสกุล" />
                                    <asp:BoundField DataField="own_no" HeaderText="เลขที่" />
                                    <asp:BoundField DataField="own_moo" HeaderText="หมู่" />
                                    <asp:BoundField DataField="own_soi" HeaderText="ซอย" />
                                    <asp:BoundField DataField="own_village" HeaderText="หมู่บ้าน" />
                                    <asp:BoundField DataField="own_road" HeaderText="ถนน" />
                                    <asp:BoundField DataField="own_tambol" HeaderText="ตำบล" />
                                    <asp:BoundField DataField="own_amphur" HeaderText="อำเภอ" />
                                    <asp:BoundField DataField="own_province" HeaderText="จังหวัด" />
                                    <asp:BoundField DataField="own_tel" HeaderText="เบอร์โทร" />
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
                    </asp:Panel>
                </div>
                <div>
                   <%-- ข้อมูลส่วนที่ 3 --%>

                    <asp:Panel ID="Panel3" runat="server">
                        <div id="grid_zone" style="margin-top: 10px">
                            <asp:GridView ID="GridView2" CssClass="grid_text" runat="server" BackColor="White"
                                BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CaptionAlign="Left"
                                CellPadding="4" ForeColor="Black" GridLines="Vertical"
                                PageSize="50" Style="margin-left: 0px" AutoGenerateColumns="False">
                                <AlternatingRowStyle BackColor="White" />
                                <Columns>
                                    <asp:BoundField DataField="reg_code" HeaderText="ประเภทการจดทะเบียน" />
                                    <asp:BoundField DataField="reg_date" HeaderText="วันที่จดทะเบียน" />
                                    <asp:BoundField DataField="reg_amt" HeaderText="ราคาทุนทรัพย์" />
                                    <asp:BoundField DataField="lessor_lineno" HeaderText="ผู้ให้เช่า ลำดับผู้ถือกรรมสิทธิ" />
                                    <asp:BoundField DataField="lessor_pers_id" HeaderText="ผู้ให้เช่า เลขประจำตัวประชาชน" />
                                    <asp:BoundField DataField="lessor_title" HeaderText="ผู้ให้เช่า คำนำหน้า" />
                                    <asp:BoundField DataField="lessor_fname" HeaderText="ผู้ให้เช่า ชื่อ" />
                                    <asp:BoundField DataField="lessor_lname" HeaderText="ผู้ให้เช่า นามสกุล" />
                                    <asp:BoundField DataField="lessor_hse_no" HeaderText="ผู้ให้เช่า เลขที่" />
                                    <asp:BoundField DataField="lessor_moo" HeaderText="ผู้ให้เช่า หมู่" />
                                    <asp:BoundField DataField="lessor_sio" HeaderText="ผู้ให้เช่า ซอย" />
                                    <asp:BoundField DataField="lessor_village" HeaderText="ผู้ให้เช่า หมู่บ้าน" />
                                    <asp:BoundField DataField="lessor_road" HeaderText="ผู้ให้เช่า ถนน" />
                                    <asp:BoundField DataField="lessor_tambol" HeaderText="ผู้ให้เช่า ตำบล" />
                                    <asp:BoundField DataField="lessor_amphur" HeaderText="ผู้ให้เช่า อำเภอ" />
                                    <asp:BoundField DataField="lessor_province" HeaderText="ผู้ให้เช่าจังหวัด" />
                                    <asp:BoundField DataField="lessor_tel" HeaderText="ผู้ให้เช่า เบอร์โทร" />
                                    <asp:BoundField DataField="renter_lineno" HeaderText="ผู้เช่า ลำดับผู้ถือกรรมสิทธิ์" />
                                    <asp:BoundField DataField="renter_pers_id" HeaderText="ผู้เช่า เลขประจำตัวประชาชน" />
                                    <asp:BoundField DataField="renter_title" HeaderText="ผู้เช่า คำนำหน้า" />
                                    <asp:BoundField DataField="renter_fname" HeaderText="ผู้เช่า ชื่อ" />
                                    <asp:BoundField DataField="renter_lname" HeaderText="ผู้เช่า นามสกุล" />
                                    <asp:BoundField DataField="renter_hse_no" HeaderText="ผู้เช่า เลขที่" />
                                    <asp:BoundField DataField="renter_moo" HeaderText="ผู้เช่า หมู่" />
                                    <asp:BoundField DataField="renter_sio" HeaderText="ผู้เช่า ซอย" />
                                    <asp:BoundField DataField="renter_village" HeaderText="ผู้เช่า หมู่บ้าน" />
                                    <asp:BoundField DataField="renter_road" HeaderText="ผู้เช่า ถนน" />
                                    <asp:BoundField DataField="renter_tambol" HeaderText="ผู้เช่า ตำบล" />
                                    <asp:BoundField DataField="renter_amphur" HeaderText="ผู้เช่า อำเภอ" />
                                    <asp:BoundField DataField="renter_province" HeaderText="ผู้เช่า จังหวัด" />
                                    <asp:BoundField DataField="renter_tel" HeaderText="ผู้เช่า เบอร์โทร" />
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
                    </asp:Panel>
                </div>

            </div>
        </div>
    </form>
</body>
</html>
