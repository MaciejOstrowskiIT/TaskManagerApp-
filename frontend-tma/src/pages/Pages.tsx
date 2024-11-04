import { Navigate, Route, BrowserRouter as Router, Routes as RouterRoutes } from "react-router-dom";
import { UserList } from "./TaskManager/UserList";
import { Menu } from "./menu/Menu";

export const Pages = () => {
	return (
		<Router>
			<RouterRoutes>
				<Route path="/"
					element={<Navigate to="/dashboard" />} />
				<Route path="dashboard"
					element={<Menu />}>
					<Route path="users"
						element={<UserList />} />
				</Route>
			</RouterRoutes>
		</Router>
	);
};