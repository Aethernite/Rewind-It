import React from 'react';
import { NavBar } from "./components/layout/NavBar";
import { BrowserRouter } from "react-router-dom";
import { Content } from "./components/layout/Content";
import { AppRoutes } from "./AppRoutes";
import { useSelector, useDispatch } from "react-redux";
import { checkSession } from './store/slices/auth.js';

function App() {
    const user = useSelector((state) => state.auth.user);


    const isSessionChecked = useSelector(state => state.auth.isSessionChecked);
    const dispatch = useDispatch();


    React.useEffect(() => {
        dispatch(checkSession());
    }, [dispatch]);

    if (!isSessionChecked) {
        return null;
    }

    return (
        <BrowserRouter>
            {user && <NavBar />}
            <Content>
                <AppRoutes />
            </Content>
        </BrowserRouter>
    );
}

export default App;
