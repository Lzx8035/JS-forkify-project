// contain functions reused
import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////

/*
export const getJSON = async function (url) {
  try {
    const fetchURL = fetch(url);
    const res = await Promise.race([fetchURL, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok)
      throw new Error(`${data.message} (${res.status} ${res.statusText})`);
    return data;
  } catch (err) {
    // rethrow the error
    throw err;
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////

export const sendJSON = async function (url, uploadData) {
  try {
    // create fetch request
    const fetchURL = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetchURL, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok)
      throw new Error(`${data.message} (${res.status} ${res.statusText})`);
    return data;
  } catch (err) {
    // rethrow the error
    throw err;
  }
};
*/

//////////////////////////////////////////////////////////////////////////////////////////////////

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok)
      throw new Error(`${data.message} (${res.status} ${res.statusText})`);
    return data;
  } catch (err) {
    throw err;
  }
};