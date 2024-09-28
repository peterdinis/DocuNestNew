import type { NextPage } from 'next';
import GlobalErrorComponent from '../_components/shared/GlobalErrorComponent';

const NotFoundPage: NextPage = () => {
    return (
        <GlobalErrorComponent
            statusCode={'404'}
            message={'Page does not exists'}
            linkHref='/dashboard'
            linkText='Return to dashboard'
        />
    );
};

export default NotFoundPage;
