// import React, { useState } from 'react';
// import { useApi } from '../../context/Context';

// const SomeComponent = () => {
//   const [response, setResponse] = useState(null);
//   const { postApiCall } = useApi();

//   const callApi = async () => {
//     try {
//       const data = await postApiCall('http://localhost:9000/', {
//         question: 'what is HTML',
//         // key2: 'value2',
//       });
//       setResponse(data);
//     } catch (error) {
//       console.error('Error calling API:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={callApi}>Call API</button>
//       {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
//     </div>
//   );
// };

// export default SomeComponent;
