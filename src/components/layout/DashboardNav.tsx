import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import Add from "@mui/icons-material/Add";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FlagIcon from "@mui/icons-material/Flag";
import Groups from "@mui/icons-material/Groups";
import ArticleIcon from "@mui/icons-material/Article";
import Abc from "@mui/icons-material/Abc";
import FolderIcon from "@mui/icons-material/Folder";
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { URL } from "../../routes";
import { authed, AUTHORITY } from "../../commons";
import theme from "../../theme";
import { PageItem } from "../../global/types";
import project from "../../../package.json";

interface DashboardNavProps {
  setOpenDrawer: (newValue: boolean) => void;
  openDrawer: boolean;
  drawerWidth: number;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const basicPageItems: PageItem[] = [
  {
    label: "dashboard-nav.pages.statistics",
    icon: <DashboardIcon />,
    url: URL.STATISTICS,
    requiredRoles: [AUTHORITY.ROLE_BASIC, AUTHORITY.ROLE_ADMIN],
  },
  {
    label: "dashboard-nav.pages.projects",
    icon: <FlagIcon />,
    url: URL.PROJECTS,
    secondaryUrl: URL.CREATE_PROJECT,
    requiredRoles: [AUTHORITY.ROLE_BASIC, AUTHORITY.ROLE_ADMIN],
  },
  {
    label: "dashboard-nav.pages.articles",
    icon: <ArticleIcon />,
    url: URL.ARTICLES,
    secondaryUrl: URL.CREATE_ARTICLE,
    requiredRoles: [AUTHORITY.ROLE_BASIC, AUTHORITY.ROLE_ADMIN],
  },
  {
    label: "dashboard-nav.pages.vocabularies",
    icon: <Abc />,
    url: URL.VOCABULARIES,
    secondaryUrl: URL.CREATE_VOCABULARY,
    requiredRoles: [AUTHORITY.ROLE_BASIC, AUTHORITY.ROLE_ADMIN],
  },
  {
    label: "dashboard-nav.pages.subjects",
    icon: <FolderIcon />,
    url: URL.SUBJECTS,
    secondaryUrl: URL.CREATE_SUBJECT,
    requiredRoles: [AUTHORITY.ROLE_BASIC, AUTHORITY.ROLE_ADMIN],
  },
];

const adminPageItems: PageItem[] = [
  {
    label: "dashboard-nav.pages.users",
    icon: <Groups />,
    url: URL.USERS,
    requiredRoles: [AUTHORITY.ROLE_ADMIN],
  },
];

const NavItem = styled(ListItem)(({ theme }) => ({
  "& .MuiListItemButton-root.Mui-selected": {
    borderRight: "5px solid",
    paddingRight: "5px",
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main + " !important",
    "& .MuiListItemIcon-root": {
      color: theme.palette.secondary.main + " !important",
    },
  },
}));

const NavItems = (props: { pageItems: PageItem[] }) => {
  let location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const authedPages = props.pageItems.filter((pageItem) =>
    authed(pageItem.requiredRoles)
  );
  return (
    <>
      <List>
        {authedPages.map((pageItem) => (
          <NavItem
            key={pageItem.label}
            disablePadding
            onMouseOver={() => setHoveredItem(pageItem.label)}
            onMouseOut={() => setHoveredItem(null)}
            secondaryAction={
              pageItem.secondaryUrl &&
              pageItem.label === hoveredItem && (
                <IconButton
                  edge="end"
                  aria-label="Add"
                  sx={{
                    borderRadius: 0,
                    mr: "2px",
                    color: "rgba(0,0,0,0.4)",
                  }}
                  onClick={() => navigate(pageItem.secondaryUrl || "/")}
                >
                  <Add />
                </IconButton>
              )
            }
          >
            <ListItemButton
              onClick={() => navigate(pageItem.url)}
              selected={pageItem.url === location.pathname}
            >
              <ListItemIcon>{pageItem.icon}</ListItemIcon>
              <ListItemText primary={t(pageItem.label)} />
            </ListItemButton>
          </NavItem>
        ))}
      </List>
      {authedPages.length > 0 && <Divider />}
    </>
  );
};

export default function DashboardNav(props: DashboardNavProps) {
  const navigate = useNavigate();
  const underSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Drawer
      sx={{
        width: props.drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: props.drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant={underSmScreen ? "temporary" : "persistent"}
      anchor="left"
      open={props.openDrawer}
      onClose={() => props.setOpenDrawer(false)}
    >
      <DrawerHeader sx={{ backgroundColor: theme.palette.primary.main }}>
        <IconButton onClick={() => props.setOpenDrawer(!props.openDrawer)}>
          <MenuOpenIcon
            sx={{
              color: "#fff",
              border: "1.5px solid #fff",
              borderRadius: 2,
              fontSize: "2rem",
              p: "3px",
              "&:hover": {
                background: "grey",
              },
            }}
          />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="a"
          onClick={() => navigate("/")}
          sx={{
            ml: 2,
            display: { xs: "flex" },
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "white",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          {project.name.toUpperCase()}
        </Typography>
      </DrawerHeader>
      <NavItems pageItems={basicPageItems} />
      <NavItems pageItems={adminPageItems} />
    </Drawer>
  );
}
