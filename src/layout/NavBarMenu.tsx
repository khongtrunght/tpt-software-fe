import { memo, useMemo } from "react";
import { Button, Dropdown, Flex, MenuProps } from "antd";
import {
  IFeaturesConfig,
  manageInvoicesFeaturesConfig,
  reportsFeaturesConfig,
  systemFeaturesConfig,
  toolsFeaturesConfig,
} from "../config/features.config";
import { BodyMedium500 } from "../config/typography.config";
import {
  IconCategory,
  IconChevronDown,
  IconHome,
  IconNews,
  IconReportMoney,
  IconReportSearch,
  IconUserCircle,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CustomDrawer } from "./CustomDrawer";
import { useBoolean } from "../hooks/useBoolean";

const NavBarItem = memo(function NavBarItem({
  icon,
  label,
  subMenu,
  isFocused,
}: {
  icon: React.ReactNode;
  label: string;
  subMenu?: IFeaturesConfig[];
  isFocused: boolean;
}) {
  const items: MenuProps["items"] = useMemo(() => {
    if (subMenu)
      return subMenu?.map((child) => ({
        key: child.key,
        label: <Link href={child.key}>{child.label}</Link>,
      }));
    else return [];
  }, [subMenu]);
  if (!subMenu)
    return (
      <Link href="/dashboard">
        <Flex
          align="center"
          gap={8}
          style={{
            cursor: "pointer",
            padding: 12,
            borderRadius: 4,
            background: isFocused ? "#E5EEFF" : "transparent",
          }}
        >
          {icon}
          <BodyMedium500
            style={{
              color: isFocused ? "#397BDE" : "#919094",
            }}
          >
            {label}
          </BodyMedium500>
          {subMenu && (
            <IconChevronDown
              size={16}
              color={isFocused ? "#397BDE" : "#919094"}
            />
          )}
        </Flex>
      </Link>
    );
  return (
    <Dropdown menu={{ items }}>
      <Flex
        align="center"
        gap={8}
        style={{
          cursor: "pointer",
          padding: 12,
          borderRadius: 4,
          background: isFocused ? "#E5EEFF" : "transparent",
        }}
      >
        {icon}
        <BodyMedium500
          style={{
            color: isFocused ? "#397BDE" : "#919094",
          }}
        >
          {label}
        </BodyMedium500>
        {subMenu && (
          <IconChevronDown
            size={16}
            color={isFocused ? "#397BDE" : "#919094"}
          />
        )}
      </Flex>
    </Dropdown>
  );
});

export const NavBarMenu = memo(function NavBarMenu({
  isHidden,
}: {
  isHidden?: boolean;
}) {
  const pathName = usePathname();

  const [drawerVisible, show, hide] = useBoolean();

  if (isHidden)
    return (
      <>
        <Button
          icon={<IconCategory color="gray" />}
          style={{
            marginLeft: 24,
          }}
          onClick={show}
          type="dashed"
        />
        <CustomDrawer isOpen={drawerVisible} hide={hide} />
      </>
    );

  return (
    <>
      <Flex
        align="center"
        style={{
          padding: "8px 24px",
        }}
        gap={16}
      >
        <NavBarItem
          icon={
            <IconHome
              size={20}
              color={pathName.includes("dashboard") ? "#397BDE" : "#919094"}
            />
          }
          label="Tổng quan hóa đơn"
          isFocused={pathName.includes("dashboard")}
        />
        <NavBarItem
          icon={
            <IconNews
              size={20}
              color={pathName.includes("manage/") ? "#397BDE" : "#919094"}
            />
          }
          label="Quản lý hóa đơn"
          subMenu={manageInvoicesFeaturesConfig}
          isFocused={pathName.includes("manage/")}
        />
        <NavBarItem
          icon={
            <IconReportSearch
              size={20}
              color={pathName.includes("tools/") ? "#397BDE" : "#919094"}
            />
          }
          label="Công cụ tra cứu"
          subMenu={toolsFeaturesConfig}
          isFocused={pathName.includes("tools/")}
        />
        <NavBarItem
          icon={
            <IconReportMoney
              size={20}
              color={pathName.includes("reports/") ? "#397BDE" : "#919094"}
            />
          }
          label="Báo cáo kế toán"
          subMenu={reportsFeaturesConfig}
          isFocused={pathName.includes("reports/")}
        />
        <NavBarItem
          icon={
            <IconUserCircle
              size={20}
              color={pathName.includes("system/") ? "#397BDE" : "#919094"}
            />
          }
          label="Hệ thống tài khoản"
          subMenu={systemFeaturesConfig}
          isFocused={pathName.includes("system/")}
        />
      </Flex>
    </>
  );
});
