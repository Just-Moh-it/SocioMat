import Layout from "../../components/Layout";
import styles from "./index.module.scss";
import Image from "next/image";
import { appwrite } from "../../store/global";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";

import { themeColors } from "../../utils/constants";

import TabControl from "../../components/TabControl";
import CustomRadioList from "../../components/CustomRadioList";
import NotImplemented from "../../components/NotImplemented";

const SettingsPage = () => {
  const router = useRouter();

  const logout = async () => {
    await appwrite.account.deleteSession("current");
    window.localStorage.removeItem("jwt");
    window.localStorage.removeItem("jwt_expire");
    router.push("/login");
  };

  return (
    <Layout title="Settings">
      {/* Section */}
      <TabControl
        title="Settings"
        className={styles.wrapper}
        data={[
          {
            info: {
              iconUri: "/assets/icons/filled/eye.svg",
              text: "Appearance",
            },
            content: (
              <>
                <AppearancePage />
              </>
            ),
          },
          {
            info: {
              iconUri: "/assets/icons/filled/Lock.svg",
              text: "Security",
            },
            content: <NotImplementedPage />,
          },
          {
            info: {
              iconUri: "/assets/icons/filled/Notification.svg",
              text: "Notifications",
            },
            content: <NotImplementedPage />,
          },
          {
            info: {
              iconUri: "/assets/icons/filled/Users.svg",
              text: "Account",
            },
            content: <NotImplementedPage />,
          },
          {
            info: {
              iconUri: "/assets/icons/filled/Logout.svg",
              text: "Logout",
              onClickOverride: logout,
            },
            content: <NotImplementedPage />,
          },
        ]}
      />
    </Layout>
  );
};

const AppearancePage = () => {
  const { theme, setTheme } = useTheme();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      theme: "system",
      accent: "#a974ff",
    },
  });

  return (
    <article className={["page", styles.wrapper].join(" ")}>
      <h3 className="text-small title">Appearance</h3>
      <section className={styles.settingTab}>
        <form className={["form"].join(" ")}>
          {/* Accent Color */}
          <div className={styles.settingItem}>
            <label className="label" htmlFor="theme-selector">
              Choose your Accent Color
            </label>
            <CustomRadioList
              borderRadius="50%"
              id="theme-selector"
              childProps={{
                ...register("accent"),
              }}
              onChange={() => {
                handleSubmit((data) => console.log("data", data))();
              }}
            >
              {themeColors.map((color) => ({
                ele: <Circle color={color} />,
                outlineColor: color,
                value: color,
              }))}
            </CustomRadioList>
          </div>

          {/* Theme Color */}
          <div className={styles.settingItem}>
            <label className="label" htmlFor="theme-selector">
              Choose your theme
            </label>
            <CustomRadioList
              id="themexa"
              isShowingChecks
              boderRadius="8px"
              childProps={{
                onClick: (e) => setTheme(e.target.value),
              }}
            >
              {[
                {
                  ele: (
                    <ThemeElement src="/assets/images/utils/system-theme.svg" />
                  ),
                  label: "System",
                  value: "system",
                },
                {
                  ele: (
                    <ThemeElement src="/assets/images/utils/light-theme.svg" />
                  ),
                  label: "Light",
                  value: "light",
                },
                {
                  ele: (
                    <ThemeElement src="/assets/images/utils/dark-theme.svg" />
                  ),
                  label: "Dark",
                  value: "dark",
                  defaultChecked: true,
                },
              ]}
            </CustomRadioList>
          </div>
        </form>
      </section>
    </article>
  );
};

const NotImplementedPage = () => {
  return (
    <>
      <NotImplemented />
    </>
  );
};

const Circle = ({ color, size = 36 }) => (
  <div
    style={{
      height: size,
      width: size,
      borderRadius: "50%",
      backgroundColor: color,
    }}
  />
);

const ThemeElement = ({ src }) => (
  <div className={styles.themeElement}>
    <div className={styles.image}>
      <Image src={src} alt="Theme image" height={78} width={113} />
    </div>
  </div>
);

export default SettingsPage;
