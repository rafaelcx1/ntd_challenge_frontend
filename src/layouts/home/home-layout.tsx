import { Outlet, useNavigate } from "react-router-dom";
import { TopBar } from "../../components/top-bar/top-bar";
import { Content, MainRegion, TopRegion } from "./home-layout.styles";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/users/users-service";
import { getBalance } from "../../services/records/records-service";

export default function HomeLayout() {
    const navigate = useNavigate()

    const userQuery = useQuery({ queryKey: ['user'], queryFn: getUser })
    const userBalanceQuery = useQuery({ queryKey: ['userBalance'], queryFn: getBalance })

    const logout = () => {
        localStorage.setItem('token', '')
        navigate("/login")
    }

    const isTopBarLoading = userQuery.isLoading || userBalanceQuery.isLoading;

    return <>
        <Content>
            <TopRegion>
                <TopBar
                    email={userQuery.data?.email}
                    userBalance={userBalanceQuery.data}
                    isLoading={isTopBarLoading}
                    onLogout={logout}
                />
            </TopRegion>

            <MainRegion>
                <Outlet />
            </MainRegion>
        </Content>
    </>
}