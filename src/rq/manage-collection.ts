import { DATABASE_URL } from 'src/database/database';
import { getAuth, getIdToken } from 'firebase/auth';

const auth = getAuth();

export async function getCollection({ key }: { key: string }) {
  const uid = auth.currentUser?.uid;
  const res = await fetch(`${DATABASE_URL}/users/${uid}/${key}.json`)
  return await res.json()
}


async function getCollection2({ key }: { key: string }) {
  const uid = auth.currentUser?.uid;
  const idToken = await getIdToken(auth.currentUser);

  try {
    const res = await fetch(`${DATABASE_URL}/users/${uid}/${key}.json`, {
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    // If the fetch failed, try refreshing the token and retrying the fetch
    const newToken = await getIdToken(auth.currentUser, true);
    const res = await fetch(`${DATABASE_URL}/users/${uid}/${key}.json`, {
      headers: {
        'Authorization': `Bearer ${newToken}`
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  }
}


export async function addElementFn<T>({ element, key }: { element: T, key: string }) {
  const uid = auth.currentUser?.uid;
  const res = await fetch(`${DATABASE_URL}/users/${uid}/${key}.json`, {
    method: 'POST',
    body: JSON.stringify(element),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await res.json()
}
// add option to edit many elements
export async function editSingleElementFn<T extends { id: string }>({ element, key }: { element: T, key: string }) {
  const uid = auth.currentUser?.uid;
  const res = await fetch(`${DATABASE_URL}/users/${uid}/${key}/${element.id}.json`, {
    method: 'PUT',
    body: JSON.stringify(element),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await res.json()
}

// add optipn to delete all / many elements
export async function deleteSingleElementFn({ id, key }: { id: string, key: string }) {
  const uid = auth.currentUser?.uid;
  const res = await fetch(`${DATABASE_URL}/users/${uid}/${key}/${id}.json`, {
    method: 'DELETE',
  })
  return await res.json()
}
// jak to działa ????
// const fetchWithToken = ky.extend({
//   hooks: {
//     beforeRequest: [
//       async (request) => {
//         if (!auth.currentUser) {
//           throw new Error('User not authenticated');
//         }

//         const idToken = await getIdToken(auth.currentUser);
//         request.headers.set('Authorization', `Bearer ${idToken}`);
//       },
//     ],
//     beforeRetry: [
//       async (request, options, errors) => {
//         if (errors.response?.status === 401) {
//           // If the response status is 401 (Unauthorized), refresh the token
//           const newToken = await getIdToken(auth.currentUser, true);
//           request.headers.set('Authorization', `Bearer ${newToken}`);
//         }
//       },
//     ],
//   },
// });

// async function fetchWithToken<T>(input: RequestInfo, options?: ky.Options): Promise<T> {
//   if (!auth.currentUser) {
//     throw new Error('User not authenticated');
//   }

//   const idToken = await getIdToken(auth.currentUser);

//   try {
//     return await ky(input, {
//       ...options,
//       headers: {
//         ...options?.headers,
//         'Authorization': `Bearer ${idToken}`
//       }
//     }).json<T>();
//   } catch (error) {
//     // If the fetch failed, try refreshing the token and retrying the fetch
//     const newToken = await getIdToken(auth.currentUser, true);
//     return await ky(input, {
//       ...options,
//       headers: {
//         ...options?.headers,
//         'Authorization': `Bearer ${newToken}`
//       }
//     }).json<T>();
//   }
// }

// export async function getCollection({ key }: { key: string }) {
//   const uid = auth.currentUser?.uid;
//   return fetchWithToken(`${DATABASE_URL}/users/${uid}/${key}.json`);
// }

// export async function addElementFn<T>({ element, key }: { element: T, key: string }) {
//   const uid = auth.currentUser?.uid;
//   return fetchWithToken(`${DATABASE_URL}/users/${uid}/${key}.json`, {
//     method: 'post',
//     json: element
//   });
// }

// export async function editSingleElementFn<T extends { id: string }>({ element, key }: { element: T, key: string }) {
//   const uid = auth.currentUser?.uid;
//   return fetchWithToken(`${DATABASE_URL}/users/${uid}/${key}/${element.id}.json`, {
//     method: 'put',
//     json: element
//   });
// }

// export async function deleteSingleElementFn({ id, key }: { id: string, key: string }) {
//   const uid = auth.currentUser?.uid;
//   return fetchWithToken(`${DATABASE_URL}/users/${uid}/${key}/${id}.json`, {
//     method: 'delete'
//   });
// }