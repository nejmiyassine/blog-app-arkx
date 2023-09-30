// import { useRouteError } from 'react-router-dom';

// export default function ErrorPage() {
//     const error = useRouteError();
//     console.error(error);

//     return (
//         <div id='error-page'>
//             <h1>Oops!</h1>
//             <p>Sorry, an unexpected error has occurred.</p>
//             <p>
//                 <i>{error.statusText || error.message}</i>
//             </p>
//         </div>
//     );
// }

import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='mt-2'>
            Page not found. Go back to <Link to='/'>Home</Link>
        </div>
    );
};

export default NotFound;
