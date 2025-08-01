import { useLocation, useNavigate } from 'react-router-dom';

export const useAppNavigate = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (url: string) => {
        if (location.pathname !== url) {
            navigate(url);
        }
    };
};
