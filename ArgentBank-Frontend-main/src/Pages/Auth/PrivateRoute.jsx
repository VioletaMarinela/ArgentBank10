import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { accountService } from '../../_Service/accountService';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            accountService.ConnectorNotConnect() ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

export default PrivateRoute;
