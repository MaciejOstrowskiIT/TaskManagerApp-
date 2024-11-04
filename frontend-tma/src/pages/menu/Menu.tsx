import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
	Box,
	CssBaseline,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from "@mui/material";
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Menu as MenuIcon } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar } from "./components/AppBar";
import { Main } from "./components/Main";
import { DrawerHeader } from "./components/DrawerHeader";
import { MenuElements } from "./constants";

const drawerWidth = 240;

export const Menu = () => {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const navigate = useNavigate();
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};


	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: "none" }) }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6"
						noWrap
						component="div">
						Dashboard
					</Typography>
				</Toolbar>
			</AppBar>
			<Box sx={{ display: "flex", justifyContent: "stretch" }}>
				<Drawer
					sx={{
						padding: "10px",
						width: drawerWidth,
						flexShrink: 0,
						"& .MuiDrawer-paper": {
							width: drawerWidth,
							boxSizing: "border-box",
						},
					}}
					variant="persistent"
					anchor="left"
					open={open}
				>
					<DrawerHeader>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
						</IconButton>
					</DrawerHeader>
					<Typography variant="h6"
						sx={{ p: 1, fontFamily: "monospace" }}>GENERAL</Typography>
					<Divider variant={"middle"} />
					<List>
						{MenuElements.map((menuItem, index) => (
							<ListItem
								key={menuItem.label}
								onClick={() => navigate(`/dashboard/${menuItem.pathTo}`)}
								disablePadding
							>
								<ListItemButton
									selected={selectedIndex === index}
									onClick={() => setSelectedIndex(index)}
								>
									<ListItemIcon>{menuItem.icon}</ListItemIcon>
									<ListItemText primary={menuItem.label} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Drawer>
			</Box>
			<Main open={open}>
				<DrawerHeader />
				<Outlet />
			</Main>
		</Box>
	);
};