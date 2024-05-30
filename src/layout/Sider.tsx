import { UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, Layout, Menu, MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { memo, useMemo, useState } from "react";
import { Box } from "../common/Box";
import styled from "styled-components";
import {
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconFileInvoice,
  IconFileSearch,
  IconHome2,
  IconPhoneCall,
  IconReportAnalytics,
  IconSettings,
} from "@tabler/icons-react";
import {
  BodyMedium500,
  CaptionMedium400,
  CaptionMedium500,
} from "../config/typography.config";
import { LogoApp } from "../icons/Logo";

type MenuItem = Required<MenuProps>["items"][number];

type SiderItemProps = {
  label: string;
  Icon: React.ReactNode;
  collapsible: boolean;
  href?: string;
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
// const siderConfig = useMemo<SiderItemProps[]>(
//   () => [
//     { label: "Tổng quan", Icon: UserOutlined, href: "/" },
//     { label: "Quản lý hóa đơn", Icon: MailOutlined, href: "/" },
//     {
//       label: "Công cụ",
//       Icon: BarChartOutlined,
//       href: "/",
//       childs: [
//         {
//           label: "Analytics",
//           Icon: BarChartOutlined,
//           href: "/",
//         },
//         {
//           label: "Report",
//           Icon: BarChartOutlined,
//           href: "/",
//         },
//       ],
//     },
//     { label: "Báo cáo", Icon: SettingOutlined, href: "/" },
//   ],
//   []
// );
const SiderItem = ({ label, Icon, collapsible, href }: SiderItemProps) => {
  const pathName = usePathname();
  return (
    <Flex
      vertical
      gap={8}
      align="center"
      style={{
        marginLeft: collapsible ? 20 : 0,
        display: collapsible ? "flex" : "none",
        padding: "8px 0",
      }}
    >
      {Icon}
      {collapsible && (
        <CaptionMedium400
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: href && pathName.includes(href) ? "#fff" : "#373743",
          }}
        >
          {label}
        </CaptionMedium400>
      )}
    </Flex>
  );
};
const rootSubmenuKeys = [
  "/dashboard",
  "/manage",
  "/tools",
  "/reports",
  "system",
];
export const Sider = memo(function Sider({
  collapsible,
  toggle,
}: {
  collapsible: boolean;
  toggle: () => void;
}) {
  const router = useRouter();
  const [openKeys, setOpenKeys] = useState(["/dashboard"]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const itemsSider: MenuProps["items"] = useMemo(() => {
    return [
      getItem(
        "Tổng quan hóa đơn",
        "/dashboard",
        <SiderItem
          label="Tổng quan"
          Icon={<IconHome2 size={20} />}
          href="/dashboard"
          collapsible={collapsible}
        />
      ),
      getItem(
        "Quản lý hóa đơn",
        "/manage",
        <SiderItem
          label="QL hóa đơn"
          Icon={<IconFileInvoice size={20} />}
          href="/manage"
          collapsible={collapsible}
        />,
        [
          getItem("Hóa đơn mua vào", "/manage/invoice-purchase"),
          getItem("Hóa đơn bán ra", "/manage/invoice-sold"),
          // getItem("Hóa đơn, chứng từ khác", "/manage/invoice-other"),
          // getItem(
          //   "Thông báo hóa đơn sai sót 04/SS-HDDT",
          //   "/manage/invoice-notify"
          // ),
        ]
      ),
      getItem(
        "Công cụ tra cứu",
        "/tools",
        <SiderItem
          label="Tra cứu"
          Icon={<IconFileSearch size={20} />}
          href="/tools"
          collapsible={collapsible}
        />,
        [
          // getItem("MST cá nhân", "/tools/search-cccd"),
          getItem("Tình trạng MST", "/tools/search-mst"),
          getItem("Hàng hóa, dịch vụ GTGT", "/tools/search-reduced-gtgt"),
          // getItem("Văn bản giảm thuế GTGT", "/tools/search-docs-gtgt"),
          // getItem("Mã HS Code xuất nhập khẩu", "/tools/search-code"),
        ]
      ),
      getItem(
        "Báo cáo kế toán",
        "/reports",
        <SiderItem
          label="Báo cáo"
          Icon={<IconReportAnalytics size={20} />}
          href="/reports"
          collapsible={collapsible}
        />,
        [
          getItem("Bảng kê hóa đơn mua vào", "/reports/report-purchase"),
          getItem("Bảng kê hóa đơn bán ra", "/reports/report-sold"),
          getItem(
            "Bảng kê hóa đơn tải vào phần mềm kế toán",
            "/reports/report-receive"
          ),
          getItem(
            "Bảng kê mua vào/bán ra hoàn thuế",
            "/reports/report-hoan-thue"
          ),
        ]
      ),
      getItem(
        "Hệ thống tài khoản",
        "/system",
        <SiderItem
          label="Hệ thống"
          Icon={<IconSettings size={20} />}
          href="/system"
          collapsible={collapsible}
        />,
        [
          getItem("Tài khoản HDĐT", "/system/taxAccounts"),
          getItem("Lịch sử đồng bộ", "/system/history"),
          // getItem("Phân loại hóa đơn", "/system/tax-categories"),
        ]
      ),
      getItem(
        "Hỗ trợ",
        "/",
        <SiderItem
          label="Hỗ trợ"
          Icon={<IconPhoneCall size={20} />}
          href="/"
          collapsible={collapsible}
        />
      ),
    ];
  }, [collapsible]);

  return (
    <Layout.Sider
      style={{
        paddingRight: 16,
        paddingLeft: 8,
        paddingTop: 13,
        background: "#FAFAFA",
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        width: collapsible ? 110 : 240,
      }}
      width={collapsible ? 110 : 240}
      trigger={null}
      collapsible
      collapsed={collapsible}
    >
      <Flex
        align="center"
        justify="space-between"
        style={{
          marginBottom: 8,
          width: "100%",
        }}
      >
        <LogoApp width={64} height={64} />
        <Box
          style={{
            display: "flex",
            cursor: "pointer",
            width: 32,
            height: 32,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={toggle}
        >
          {collapsible ? (
            <IconChevronsRight size={20} color="#919094" />
          ) : (
            <IconChevronsLeft size={20} color="#919094" />
          )}
        </Box>
      </Flex>

      <StyledMenu
        mode="inline"
        defaultSelectedKeys={["/dashboard"]}
        items={itemsSider}
        onClick={({ key }) => {
          router.push(key as string);
        }}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
      />

      {/* footer sider */}
      <Box
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
        }}
      >
        <InfoWrapper>
          <Flex
            gap={8}
            onClick={() => {
              router.push("/account");
            }}
            style={{
              cursor: "pointer",
              width: "100%",
              alignItems: collapsible ? "center" : "flex-start",
              transition: "all 0.3s ease",
            }}
          >
            <Avatar size={30} icon={<UserOutlined />} />
            {!collapsible && (
              <Flex
                align="center"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box>
                  <CaptionMedium500
                    style={{
                      color: "#919094",
                    }}
                  >
                    Tài khoản
                  </CaptionMedium500>
                  <BodyMedium500>trial@tptinvoice.vn</BodyMedium500>
                </Box>
                <IconChevronRight color="#919094" />
              </Flex>
            )}
          </Flex>
        </InfoWrapper>
      </Box>
    </Layout.Sider>
  );
});
const StyledMenu = styled(Menu)`
  .ant-menu-inline {
    border-inline-end: none !important;
  }
  .ant-menu-item.ant-menu-item-selected {
    background-color: #397bde !important;
    color: #fff !important;
    font-weight: 600;
  }
  li.ant-menu-item.ant-menu-item-selected.ant-menu-item-only-child {
    background-color: transparent !important;
    color: #397bde !important;
    font-weight: 600;
  }

  .ant-menu-submenu-title {
    padding-left: 8px !important;
    gap: 4px !important;
    transition: all 0.3s ease;
    margin-bottom: 8px;
  }

  .ant-menu-submenu.ant-menu-submenu-inline.ant-menu-submenu-selected div {
    background-color: #397bde !important;
    color: #fff !important;
    font-weight: 600;
  }

  li.ant-menu-item.ant-menu-item-only-child span.ant-menu-title-content {
    line-height: 20px !important;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .ant-menu-item {
    height: 40px;
    padding-left: 8px !important;
    gap: 4px !important;
    transition: all 0.3s ease;
  }

  .ant-menu-item-only-child {
    padding-left: 30px !important;
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    height: auto !important;
    white-space: normal !important;
  }

  background-color: transparent;
  border: none !important;
`;

const InfoWrapper = styled(Box)`
  display: flex;
  padding: 24px 16px;
  border: 1px solid #e1e1ea;
  background: #f7f7f8;
`;
