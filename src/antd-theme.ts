import TailwindConfig from "../tailwind.config";

const colors = TailwindConfig.theme.extend.colors;
// const shadows = TailwindConfig.theme.extend.boxShadow;

export const theme = {
  token: {
    fontFamily: "Montserrat, sans-serif",
    colorPrimary: colors.primary,
    colorPrimaryActive: colors.primary2,
    colorPrimaryBorder: colors.primary3,
    colorPrimaryHover: colors.primary3,
    colorBorderSecondary: colors["border-secondary"],
    colorSplit: colors["border-separator"],
    colorLink: colors.link,
    colorLinkHover: colors["link-hover"],
    fontWeightStrong: 400,
    colorTextPlaceholder: "rgba(0, 0, 0, 0.6)",
    colorBorder: "rgba(0, 0, 0, 0.3)",
  },
  components: {
    Menu: {
      darkItemColor: "#fff",
      iconSize: 18,
      collapsedIconSize: 18,
      itemHoverBg: colors.primary3,
      itemSelectedBg: colors.primary2,
      darkItemHoverBg: colors.primary3,
      darkItemSelectedBg: colors.primary2,
    },
    Form: {
      labelFontSize: 16,
    },
    Button: {
      primaryColor: "#fff",
      primaryShadow: TailwindConfig.theme.extend.boxShadow.button,
    },
    Select: {
      optionActiveBg: colors["primary-bg"],
      optionSelectedBg: colors["secondary-bg"],
    },
  },
};
