import React, { useCallback, useContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { Context } from "../../Storage/Context";
import { baseUrl, url } from "./Address";

const useFetch = (domain, entrance = false, method = 'POST', body = null) => {
  const { GET_KEY } = useContext(Context)
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => { !entrance ? doFetch() : null }, []);

  const doFetch = useCallback(async (_body = null) => {
    console.log({
      auth: `${GET_KEY}`,
      url: `${baseUrl}${url}${domain}`,
      body: body,
      _body: _body,

    })
    setLoading(true);
    setRefreshing(true);

    const config_with_post = {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${GET_KEY}`
      },
      body: body !== null ? JSON.stringify(body) : JSON.stringify(_body)
    }
    const config_with_get = {
      method: 'GET',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${GET_KEY}`
      },
    }

    await fetch(`${baseUrl}${url}${domain}`, method == 'POST' ? config_with_post : config_with_get)
      .then((response) => {
        // console.log(response)
        if (response.status == 200) return response.json()
        else if (response.status == 500) {
          ToastAndroid.showWithGravity(
            `خطای ${response.status}`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          )
        }
      })
      .then((response) => {
        // console.log(response)
        typeof response !== 'undefined' && setData(response);
      })
      .catch((error) => {
        console.log('fetch error is : ', error)
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false)
      });
  }, []);
  return { doFetch, data, loading, refreshing };
};

export { useFetch }