import { FC, lazy, Suspense } from "react";
import "./Home.css";

const HomePage: FC = () => {
    const Chart = lazy(() => import('../../components/chart/Chart'));
    return (
        <div className="home">
            <Suspense fallback={""}>
                <Chart/>
            </Suspense>
        </div>
    );
}

export default HomePage;