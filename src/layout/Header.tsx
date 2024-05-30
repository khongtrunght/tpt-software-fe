import {
  Layout,
  Select,
  Flex,
  Typography,
  Avatar,
  Space,
  Dropdown,
  MenuProps,
} from "antd";
import React, { memo, useCallback, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useGetExternalAccountQuery } from "../store/APIs/external-accounts";
import { resetGlobalState, setCompanySelecting } from "../store/modules/global";
import { LogoApp } from "../icons/Logo";
import styled from "styled-components";
import {
  IconBuildingCommunity,
  IconLogout,
  IconPhone,
  IconUserCircle,
} from "@tabler/icons-react";
import { UserOutlined } from "@ant-design/icons";
import { BodyMedium400 } from "../config/typography.config";
import Link from "next/link";
import { APP_ACCESSTOKEN, APP_REFRESHTOKEN } from "../config/auth.config";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { NavBarMenu } from "./NavBarMenu";
import { useBreakPoint } from "../hooks/useBreakPoint";

export const Header = memo(function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const screens = useBreakPoint();

  const companySelecting = useAppSelector(
    (state) => state.global.companySelecting
  );
  const { data: taxAccounts } = useGetExternalAccountQuery({
    page: 1,
    size: 0,
  });

  const accountOptions = useMemo(() => {
    return taxAccounts?.items.map((account) => ({
      label: `${account.username} - ${account.profile.name}`,
      value: account._id,
    }));
  }, [taxAccounts]);

  const onLogout = useCallback(() => {
    dispatch(resetGlobalState());
    deleteCookie(APP_ACCESSTOKEN);
    deleteCookie(APP_REFRESHTOKEN);
    router.push("/login");
  }, [dispatch, router]);

  const isHidden = useMemo(() => {
    return (
      !screens.includes("lg") &&
      !screens.includes("xl") &&
      !screens.includes("xxl")
    );
  }, [screens]);

  const profileDropdowns: MenuProps["items"] = useMemo(() => {
    return [
      {
        key: "1",
        label: (
          <Space align="center">
            <IconUserCircle />
            <Link href={"/account"}>
              <BodyMedium400>Thông tin tài khoản</BodyMedium400>
            </Link>
          </Space>
        ),
      },
      {
        key: "2",
        label: (
          <Space
            align="center"
            onClick={onLogout}
            style={{
              cursor: "pointer",
            }}
          >
            <IconLogout color="#D13232" />
            <BodyMedium400
              style={{
                color: "#D13232",
              }}
            >
              Đăng xuất
            </BodyMedium400>
          </Space>
        ),
      },
    ];
  }, [onLogout]);
  return (
    <Layout.Header
      style={{
        width: "100%",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 100,
        padding: 0,
        height: 124,
        borderBottom: "1px solid #E1E1EA",
      }}
    >
      <Flex
        align="center"
        style={{
          width: "100%",
          background: "#fff",
          borderBottom: "1px solid #E1E1EA",
          padding: "8px 24px",
        }}
      >
        <Flex
          style={{
            width: "100%",
          }}
          align="center"
        >
          <LogoApp width={48} height={48} />
          {!isHidden && <STitleApp>TPT INVOICE</STitleApp>}
          <SelectWrapper align="center" gap={12}>
            <SIconWrapper align="center" justify="center">
              <IconBuildingCommunity size={18} color="#fff" />
            </SIconWrapper>
            <Select
              variant={"borderless"}
              style={{
                width: "92%",
              }}
              filterOption={filterOption}
              showSearch
              placeholder={"Chọn tài khoản theo tên hoặc MST"}
              optionFilterProp="children"
              onChange={(value) => {
                const account = taxAccounts?.items.find(
                  (account) => account._id === value
                );
                if (account) {
                  dispatch(setCompanySelecting(account));
                }
              }}
              value={companySelecting?._id || null}
              options={accountOptions}
            />
          </SelectWrapper>
        </Flex>
        <Flex align="center" gap={24}>
          <Flex
            align="center"
            justify="center"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              background: "#F7F7F8",
              cursor: "pointer",
            }}
          >
            <IconPhone />
          </Flex>
          <Dropdown
            menu={{
              items: profileDropdowns,
            }}
            placement="bottom"
          >
            <Avatar
              style={{
                cursor: "pointer",
              }}
              size={40}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </Flex>
      </Flex>
      <NavBarMenu isHidden={isHidden} />
    </Layout.Header>
  );
});
const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
const STitleApp = styled(Typography)`
  color: #397bde;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 133.333% */
  letter-spacing: -0.36px;
`;
const SelectWrapper = styled(Flex)`
  margin-left: 24px;
  min-width: 400px;
  width: max-content;
  padding: 0 12px;
  height: 48px;
  border-radius: 4px;
  border: 1px solid #e1e1ea;
  background: #f7f7f8;
`;
const SIconWrapper = styled(Flex)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #397bde;
`;
