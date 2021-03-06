let fetchs = {
   /**
     * 基于 fetch 封装的 GET请求
     * @param url
     * @param params {}
     * @param headers
     * @returns {Promise}
     */
    get: (url, params) => {
      if (params) {
          var paramsArray = [];
          Object.keys(params).forEach(function (key) {
              paramsArray.push(key + '=' + params[key])
          });
          if (url.search(/\?/) === -1) {
              url += '?' + paramsArray.join('&')
          } else {
              url += '&' + paramsArray.join('&')
          }
      }
      var fetchConfig = {
          method: 'get',
          headers: {
            authorization: window.sessionStorage.getItem('token') ? window.sessionStorage.getItem('token') : null,
            'Content-Type': 'application/json; charset=utf-8'
          },
          credentials: "include",
          mode: 'cors',
      }
      return fetch(url, fetchConfig).then(response => {
        return response.json().then((res) => {
          if (response.ok && res.code === 1) {
            return Promise.resolve(res)
          } else {
            return Promise.reject(res)
          }
        })
      })
  },
  post: (url, options) => {
    return fetch(url, {
      method: 'post',
      headers: {
        authorization: window.sessionStorage.getItem('token') ? window.sessionStorage.getItem('token') : null,
        'Content-Type': 'application/json; charset=utf-8'
      },
      credentials: "include",
      mode: 'cors',
      body: JSON.stringify(options)
    }).then(response => {
      return response.json().then((res) => {
        if (response.ok && res.code === 1) {
          return Promise.resolve(res)
        } else {
          return Promise.reject(res)
        }
      })
    })
  }
}

export default fetchs