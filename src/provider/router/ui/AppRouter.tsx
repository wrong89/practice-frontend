import Layout from '@/components/Layout/Layout';
import Loader from '@/components/ui/Loader/Loader';
import { routeConfig } from '@/config/routeConfig/routeConfig';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

const AppRouter = () => {
    return (
        <Routes>
            {Object.values(routeConfig).map(({ path, element }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <Layout>
                            <Suspense fallback={<Loader />}>{element}</Suspense>
                        </Layout>
                    }
                />
            ))}
        </Routes>
    );
};

export default AppRouter;