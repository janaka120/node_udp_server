import { Layout } from 'antd';
import React, {lazy, Suspense} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {RoutePath} from './Constant';

const { Content } = Layout;

export const RenderRoutes = (routes= []) => {
	return (
		<Suspense fallback={<div>Loading ....</div>}>
			<Switch>
				{routes.map((route, i) => {
					// const Layout = route.layout || Fragment;
					const Component = route.component;

					return (
						<Route key={i} path={route.path} exact={route.exact}>
							<Layout className="site-layout">
								<Content
									className="site-layout-background"
									style={{
									margin: '24px 16px',
									padding: 24,
									minHeight: 280,
									}}
								>
									<Component />
								</Content>
							</Layout>
						</Route>
					);
				})}
				<Route exact path="/">
					<Redirect to={RoutePath.DASHBOARD} />
				</Route>
			</Switch>
		</Suspense>
	);
};

const routes = [
	{
		exact: true,
		path: `${RoutePath.DASHBOARD}`,
		// layout: Dashboard,
		component: lazy(() => import('../pages/dashboard/containers/DashboardContainer')),
	},
	{
		exact: true,
		path: `${RoutePath.USERS}`,
		// layout: Dashboard,
		component: lazy(() => import('../pages/users/containers/UsersContainer')),
	},
];

export default routes;
