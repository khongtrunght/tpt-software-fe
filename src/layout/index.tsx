import { cookies } from "next/headers";
import { CustomLayout } from "./CustomLayout";
import { PropsWithChildren, memo } from "react";
import ReduxProvider from "./ReduxProvider";

export const LayoutWrapper = memo(function LayoutWrapper(
  props: PropsWithChildren<{}>
) {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  //   const defaultCollapsed = false;

  return (
    <ReduxProvider>
      <div className="hidden flex-col md:flex">
        <CustomLayout
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        >
          {props.children}
        </CustomLayout>
      </div>
    </ReduxProvider>
  );
});
