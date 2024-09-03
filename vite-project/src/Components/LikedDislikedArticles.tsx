// import React from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/store';
// import { useAuth0 } from '@auth0/auth0-react';

// const LikedDislikedArticles: React.FC = () => {
//   const { user } = useAuth0();
//   const likedArticles = useSelector((state: RootState) =>
//     state.likes.likedArticles.filter((item) => item.user === user?.email)
//   );
//   const dislikedArticles = useSelector((state: RootState) =>
//     state.likes.dislikedArticles.filter((item) => item.user === user?.email)
//   );

//   return (
//     <div className="max-w-4xl mx-auto my-8 p-4">
//       <h2 className="text-2xl font-semibold mb-4">Liked Articles</h2>
//       <div className="grid grid-cols-1 gap-4 mb-8">
//         {likedArticles.map(({ article }) => (
//           <div
//             key={article.url}
//             className="bg-white shadow-md rounded-lg p-4 flex flex-col"
//           >
//             <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-blue-600">
//               {article.url}
//             </a>
//           </div>
//         ))}
//       </div>

//       <h2 className="text-2xl font-semibold mb-4">Disliked Articles</h2>
//       <div className="grid grid-cols-1 gap-4">
//         {dislikedArticles.map(({ article }) => (
//           <div
//             key={article.url}
//             className="bg-white shadow-md rounded-lg p-4 flex flex-col"
//           >
//             <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-blue-600">
//               {article.url}
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LikedDislikedArticles;
